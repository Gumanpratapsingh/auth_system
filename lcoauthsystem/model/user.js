const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        default: null

    },
    lastname: {
        type: String,
        required: true,
        default: null

    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);