const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const login = require('./utils/login')
const cors = require('cors')

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
        login.login(req.body.email).then(resp => {
            if (resp.error) res.status(404).send(resp.error)
            else res.send(200)
        })
    } catch {
        res.send(501, 'Internal Server Error');
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


server.listen(8080, function () {
    console.log("server is listening on port: 8080");
});