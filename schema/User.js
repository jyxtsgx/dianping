const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserSchema = new Schema({
    content: String,
    password: String,
    email: String,
    avatar: String
});

module.exports = mongoose.Model('User', UserSchema);
