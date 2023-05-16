const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    points: {
        type: Number,
        default: 0
    },
    achievements: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('user', userSchema);