const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvaluationShema = new Schema({
    // 商家ID
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }
});

module.exports = mongoose.model('EvaluationShema', EvaluationShema);
