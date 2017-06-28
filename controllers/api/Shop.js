const express = require('express');
const router = express.Router();

const ShopModel = require('../../schema/Shop');
const FavoritesModel = require('../../schema/Favorites');

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

/**
 * 收藏
 * @type {[type]}
 */
router.all('/favorites', (req, res) => {
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
            message: '请传入要收藏的商家ID'
        });
    }

    FavoritesModel.findOne({
        shop: id,
        user: req.userInfo._id
    })
    .then( favorites => {
        if (favorites) {
            return Promise.reject({
                code: 2,
                message: '你已经收藏过该商家了'
            });
        }
        let newFavorites = new FavoritesModel({
            shop: id,
            user: req.userInfo._id
        });
        return newFavorites.save();
    } )
    .then( favorites => {
        if (!favorites) {
            return Promise.reject({
                code: 3,
                message: '收藏失败'
            })
        }
        res.json(favorites);
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
 * 取消收藏
 * @type {[type]}
 */
router.all('/favorites/remove', (req, res) => {
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
            message: '请传入要收藏的商家ID'
        });
    }

    FavoritesModel.findOne({
        shop: id,
        user: req.userInfo._id
    })
    .then( favorites => {
        if (!favorites) {
            return Promise.reject({
                code: 2,
                message: '你还没有收藏该商家'
            });
        }

        return FavoritesModel.remove({
            shop: id,
            user: req.userInfo._id
        });
    } )
    .then( result => {
        if (!result.deletedCount) {
            return Promise.reject({
                code: 2,
                message: '取消收藏失败'
            });
        } else {
            res.json({
                count: result.count
            });
        };
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
