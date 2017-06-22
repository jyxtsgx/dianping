/**
 * Created by zmouse on 2017/6/16.
 * E-mail: zmouse@miaov.com
 * GitHub: zmouse@github.com
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopTypeSchema = new Schema({
    name: String
});

module.exports = mongoose.model('ShopType', ShopTypeSchema);
