const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

/**
 * 评论
 * @type {Schema}
 */
const CommentSchema = new Schema({
    // 商家ID
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }，
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    datetime: {
        type: Date,
        default: Date.now()
    }
});

module.exprots = mongoose.Model('Comment', CommentSchema);
