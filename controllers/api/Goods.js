const express = require('express');
const router = express.Router();

const GoodsModel = require('../../schema/Goods');
const RecommendModel = require('../../schema/Recommend');

/**
 * 获取商家
 */
router.all('/list', (req, res) => {

    let shop = (req.query.shop || req.body.shop || '').trim();
    let limit = Number(req.query.limit || req.body.limit);
    limit = !Number.isNaN(limit) ? limit : 10;
    let page = Number(req.query.page || req.body.page);
    page = !Number.isNaN(page) ? page : 1;
    let pages = 0;
    let type = (req.query.type || req.body.type || '').trim();
    let where = {};

    if (!shop) {
        res.json({
            code: 1,
            message: '参数商家ID不存在'
        });
        return;
    }

    where.shop = shop;
    if (type) {
        where.type = type;
    }

    GoodsModel.where(where).count()
    .then(count => {
        if (!count) {
            return Promise.reject();
        }
        pages = Math.ceil(count / limit);
        page = Math.max(page, 1);
        page = Math.min(page, pages);
        let skip = limit * (page - 1);
        return GoodsModel.where(where).find().limit(limit).skip(skip);
    })
    .then( shop => {
        res.json({
            limit,
            pages,
            page,
            data: shop
        });
    })
    .catch(err => {
        res.json({
            limit,
            pages: 0,
            page,
            data: []
        });
    })

});

/**
 * 推荐
 * @type {[type]}
 */
router.all('/recommend', (req, res) => {
    let id = Number(req.query.id || req.body.id);

    if (!req.userInfo._id) {
        res.json({
            code: 10,
            message: '你还没有登录'
        });
        return;
    }

    if (!id) {
        res.json({
            code: 1,
            message: '请传入要推荐的商品ID'
        });
    }

    RecommendModel.findOne({
        goods: id,
        user: req.userInfo._id
    })
    .then( recommend => {
        if (recommend) {
            return Promise.reject({
                code: 2,
                message: '你已经推荐该商品了，请不要重复推荐'
            });
        }
        let recommend = new RecommendModel({
            goods: id,
            user: req.userInfo._id
        });
        return recommend.save();
    } )
    .then( recommend => {
        if (!recommend) {
            return Promise.reject({
                code: 3,
                message: '推荐失败'
            })
        }
        res.json(recommend);
    } )
    .catch(function(err) {
        if (err && err.code) {
            res.json(err);
        } else {
            res.json({
                code: -1,
                message: '未知错误'
            });
        }
    });
});

module.exports = router;
