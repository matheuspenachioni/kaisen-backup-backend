
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
