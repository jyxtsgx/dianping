/**
 * Created by zmouse on 2017/6/16.
 * E-mail: zmouse@miaov.com
 * GitHub: zmouse@github.com
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const UserRouter = require('./controllers/api/User');
const ShopTypeRouter = require('./controllers/api/ShopType');
const ShopRouter = require('./controllers/api/Shop');

const AdminShopTypeRouter = require('./controllers/admin/ShopType');
const AdminShopRouter = require('./controllers/admin/Shop');
const AdminGoodsRouter = require('./controllers/admin/Goods');
const AdminUserRouter = require('./controllers/admin/User');

app.use('/public', express.static('./public'));

app.use( bodyParser.urlencoded({extended: true}) );
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1/app');

app.use('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use((req, res, next) => {
    req.userInfo = {};
    if (req.cookies && req.cookies.userinfo) {
        req.userInfo = JSON.parse(req.cookies.userinfo);
    }
    next();
});

app.use('/api/user', UserRouter);
app.use('/api/shoptype', ShopTypeRouter);
app.use('/api/shop', ShopRouter);

app.use('/admin/shoptype', AdminShopTypeRouter);
app.use('/admin/shop', AdminShopRouter);
app.use('/admin/goods', AdminGoodsRouter);
app.use('/admin/user', AdminUserRouter);

app.listen(8888, function () {
    console.log('服务器启动成功');
});
