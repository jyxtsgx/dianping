const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        default: ''
    },
    addTime: {
        type: Date,
        default: Date.now()
    }
});

module.exprots = mongoose.Model('Comment', CommentSchema);
