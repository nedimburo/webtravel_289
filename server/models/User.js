const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unque: true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    role: { type: String },
    status: { type: String }
});

const User = mongoose.model('User', userSchema);
module.exports = User;