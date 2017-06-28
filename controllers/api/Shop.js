const express = require('express');
const router = express.Router();

const ShopModel = require('../../schema/Shop');

/**
 * 获取指定商家的信息
 * @type {[type]}
 */
router.all('/', (req, res) => {
    let id = Number(req.query.id || req.body.id);

    ShopModel.findById(id)
    .then( shop => {
        if (!shop) {
            return Promise.reject({
                code: 1,
                message: '不存在该商家信息'
            });
        }
        return res.json(shop);
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

/**
 * 获取商家列表
 */
router.all('/list', (req, res) => {

    let limit = Number(req.query.limit || req.body.limit);
    limit = !Number.isNaN(limit) ? limit : 10;
    let page = Number(req.query.page || req.body.page);
    page = !Number.isNaN(page) ? page : 1;
    let pages = 0;
    let type = (req.query.type || req.body.type || '').trim();
    let where = {};

    if (type) {
        where.type = type;
    }

    ShopModel.where(where).count()
    .then(count => {
        if (!count) {
            return Promise.reject();
        }
        pages = Math.ceil(count / limit);
        page = Math.max(page, 1);
        page = Math.min(page, pages);
        let skip = limit * (page - 1);
        return ShopModel.where(where).find().limit(limit).skip(skip);
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
