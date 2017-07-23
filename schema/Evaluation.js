const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvaluationShema = new Schema({
    // 商家ID
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
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

module.exports = mongoose.model('EvaluationShema', EvaluationShema);
