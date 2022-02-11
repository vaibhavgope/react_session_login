const { isEmail } = require('validator')
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true,
        validate: [isEmail, 'Please enter a valid email address']
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
