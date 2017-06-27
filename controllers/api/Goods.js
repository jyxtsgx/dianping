const express = require('express');
const router = express.Router();

const GoodsModel = require('../../schema/Goods');

/**
 * 获取商家
 */
router.all('/', (req, res) => {

    let shop = (req.query.shop || req.body.shop || '').trim();
    let limit = Number(req.query.limit || req.body.limit);
    limit = !Number.isNaN(limit) ? limit : 1;
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

module.exports = router;
