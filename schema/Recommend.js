const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 推荐
 * @type {Schema}
 */
const RecommendSchema = new Schema({

    // 商品
    goods: {
        type: Schema.Types.ObjectId,
        ref: 'Goods'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    datetime: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Recommend', RecommendSchema);
