const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopShema = new Schema({
    // 商家名称
    name: String,
    // 商家封面
    cover: String,
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
    // 图库
    gallery: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Shop', ShopShema);
