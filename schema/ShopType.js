/**
 * Created by zmouse on 2017/6/16.
 * E-mail: zmouse@miaov.com
 * GitHub: zmouse@github.com
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShopTypeSchema = new Schema({
    name: String
});

module.exports = mongoose.model('ShopType', ShopTypeSchema);