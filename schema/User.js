const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserShema = new Schema({
    username: String,
    password: String,
    avatar: String
});

module.exports = mongoose.model('User', UserShema);
