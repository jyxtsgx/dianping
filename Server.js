/**
 * Created by zmouse on 2017/6/16.
 * E-mail: zmouse@miaov.com
 * GitHub: zmouse@github.com
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const shopTypeRouter = require('./controllers/ShopType');
const shopRouter = require('./controllers/Shop');

app.use( '/', bodyParser.urlencoded({extended: true}) );

mongoose.connect('mongodb://localhost/app');

app.use('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/admin/shoptype', shopTypeRouter);
app.use('/admin/shop', shopRouter);

app.listen(8888, function () {
    console.log('服务器启动成功');
});
