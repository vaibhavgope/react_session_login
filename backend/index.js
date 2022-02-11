const express = require('express');
require('dotenv').config()
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const login = require('./utils/login')
const cors = require('cors')
const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const userModel = require("./db/models");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
app.use(bodyParser.json());
app.use(
    cors({
        credentials: true,
        origin: '*',
        optionsSuccessStatus: 200,
    })
);
app.get('/', async (req, res) => {
    res.send(200)
})

app.post('/login', async (req, res) => {
    try {
        let user = await userModel.findOne({ emailId: req.body.email }).exec()
        console.log("user =", user)
        if (user) res.sendStatus(409)
        else {
            login.login(req.body.email).then(resp => {
                if (resp.error) throw new Error('Invalid Email')
                else {
                    try {
                        const user = new userModel({ 'emailId': req.body.email })
                        user.save()
                    } catch (error) {
                        res.status(500).send(error)
                    }
                }
            }).then(resp => res.sendStatus(200)).catch(e => res.status(404).send(e))
        }
    } catch {
        res.status(501).send('Internal Server Error');
    }
});

app.post('/verify', async (req, res) => {
    try {
        if (login.verifyOtp(req.body.otp))
            res.send(200)
        else res.status(401).send('OTP is not correct')
    } catch {
        res.send(501, 'Internal Server Error')
    }
})

app.post('/logout', async (req, res) => {
    try {
        await userModel.findOneAndDelete({ emailId: req.body.email })
            .then(resp => res.status(200).send('Logged out succesfully'))
    } catch {
        res.send(501, 'Internal Server Error')
    }
})


server.listen(process.env.PORT || 8080, function () {
    console.log("server is listening on port: 8080");
});