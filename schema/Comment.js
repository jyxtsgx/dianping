const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    content: {
        type: String,
        default: ''
    },
    score: {
        type: Object,
        default: {
            // 口味
            taste: 0,
            // 环境
            environment: 0,
            // 服务
            service: 0
        }
    },
    datetime: {
        type: Date,
        default: Date.now()
    }
});

module.exprots = mongoose.model('Comment', CommentSchema);
