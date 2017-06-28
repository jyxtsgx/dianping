const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({

    // 商品名称
    name: String,
    // 商家
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    // 封面
    cover: String,
    // 价格
    price: {
        type: Number,
        default: 0.00
    }

});

module.exports = mongoose.model('Goods', GoodsSchema);
