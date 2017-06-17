const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoodsSchema = new Schema({

    // 商品名称
    name: String
    // 商家ID
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }

});

module.exports = mongoose.model('GoodsSchema', GoodsSchema);
