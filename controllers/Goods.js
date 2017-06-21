const express = require('express');
const router = express.Router();

const ShopModel = require('../schema/Shop');
const GoodsModel = require('../schema/Goods');

const upload = require('../tools/Upload')({savePath: 'goods'});

/**
 * 商品列表
 */
router.all('/', (req, res) => {
    GoodsModel.find().populate('shop', 'name').then(function(data) {
        res.json(data);
    });
});

/**
 * 添加
 */
router.post('/add', (req, res) => {
    let name = (req.body.name || '').trim();
    let shop = (req.body.shop || '').trim();

    if (!name || !shop) {
        res.json({
            code: 1,
            message: '商品名称或商家不能为空'
        });
        return;
    }

    ShopModel.findById(shop)
    .then( shop => {
        if (!shop) {
            return Promise.reject({
                code: 2,
                message: '不存在的商家'
            })
        } else {
            let goods = new GoodsModel({
                name,shop
            });
            return goods.save();
        }
    } )
    .then((newGoods) => {
        if (!newGoods) {
            return Promise.reject({
                code: 3,
                message: '添加失败'
            });
        }
        return res.json(newGoods);
    })
    .catch((err) => {
        if (err && err.code) {
            res.json(err);
        } else {
            res.json({
                code: -1,
                message: '未知错误'
            });
        }
    })
});

/**
 * 修改
 */
router.post('/edit', (req, res) => {
    let id = req.body.id;
    let name = (req.body.name || '').trim();
    let shop = (req.body.shop || '').trim();

    if (!name || !shop) {
        res.json({
            code: 1,
            message: '商品名称或商家不能为空'
        });
        return;
    }

    GoodsModel.findById(id)
    .then( goods => {
        if (!goods) {
            return Promise.reject({
                code: 2,
                message: '指定商品不存在'
            });
        }
        goods.name = name;
        goods.shop = shop;

        return goods.save();
    } )
    .then( newGoods => {
        if (!newGoods) {
            return Promise.reject({
                code: 3,
                message: '更新失败'
            });
        }
        res.json(newGoods);
    } )
    .catch((err) => {
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
 * 删除
 */
router.all('/delete', (req, res) => {
    let id = (req.query.id || req.body.id || '').split(',');

    if (!id || !id[0]) {
        res.json({
            code: 1,
            message: '请传入ID'
        });
        return;
    }

    GoodsModel.deleteMany({
        _id: {$in: id}
    })
    .then(function(result) {
        if (!result.deletedCount) {
            return Promise.reject({
                code: 2,
                message: '删除失败，没有删除任何数据'
            });
        } else {
            res.json({
                deletedCount: result.deletedCount
            })
        };
    })
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
 * 商品封面上传
 */
router.post('/cover', upload.single('cover'), (req, res) => {
    let id = (req.body.id || '').trim();

    GoodsModel.findById(id)
    .then( goods => {
        if (!goods) {
            return Promise.reject({
                code: 1,
                message: '商品不存在'
            });
        }
        if (!req.file) {
            return Promise.reject({
                code: 2,
                message: '上传失败'
            });
        }
        goods.cover = req.file.path;
        return goods.save();
    })
    .then( newGoods => {
        if (!newGoods) {
            return Promise.reject({
                code: 3,
                message: '上传成功，但是更新数据失败了'
            })
        }
        res.json(newGoods);
    })
    .catch((err) => {
        if (err && err.code) {
            res.json(err);
        } else {
            res.json({
                code: -1,
                message: '未知错误'
            })
        }
    });
});

module.exports = router;
