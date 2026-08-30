const mongoose = require('mongoose');

/**
 * User Schema notes
 * User is a schema that represents a user of the application.
 * It contains the username, email, password, and role.
 * @typedef {Object} User
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} role - The role of the user.
 */

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'host'],
        default: 'user',
    },
});

module.exports = mongoose.model('User', userSchema);