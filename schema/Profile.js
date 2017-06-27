const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileShema = new Schema({
    // 用户ID
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gender: {
        type: String,
        default: '保密'
    },
    birthday: String,
    shippingAddress: String
});

module.exports = mongoose.model('Profile', ProfileShema);
