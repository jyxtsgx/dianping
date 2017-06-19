const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopShema = new Schema({
    // 商家名称
    name: String,
    // 商家头图
    pic: String,
    // 商家类型
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ShopType'
    },
    // 商家地址
    address: String,
    // 商家电话
    phone: String,
    // 商家简介
    description: String,
    gallery: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Shop', ShopShema);
