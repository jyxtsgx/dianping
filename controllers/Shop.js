const express = require('express');
const router = express.Router();
const upload = require('../tools/Upload')({savePath: 'shop'});

const ShopModel = require('../schema/Shop');
const ShopTypeModel = require('../schema/ShopType');
const GoodsModel = require('../schema/Goods');

/*
 * 商家列表
 * */
router.all('/' ,function(req, res) {
    ShopModel.find().populate('type', 'name').then(function(data) {
        res.json(data);
    });
});

/**
 * 添加商家信息
 */
router.post('/add', function(req, res) {
    let name = (req.body.name || '').trim();
    let type = (req.body.type || '').trim();
    let address = (req.body.address || '').trim();
    let phone = (req.body.phone || '').trim();
    let description = (req.body.description || '').trim();

    if (!name || !type) {
        res.json({
            code: 1,
            message: '商家名称或类型不能为空'
        });
        return;
    }

    ShopTypeModel.findById(type)
    .then(function(shopType) {
        if (!shopType) {
            return Promise.reject({
                code: 2,
                message: '不存在的商家类型'
            })
        } else {
            let shop = new ShopModel({
                name,type,address,phone,description
            });
            return shop.save();
        }
    })
    .then(function(newShop) {
        console.log(newShop);
        if (!newShop) {
            return Promise.reject({
                code: 3,
                message: '添加失败'
            });
        }
        res.json(newShop);
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

router.post('/edit', function(req, res) {
    let id = req.body.id;
    let name = (req.body.name || '').trim();
    let type = (req.body.type || '').trim();
    let address = (req.body.address || '').trim();
    let phone = (req.body.phone || '').trim();
    let description = (req.body.description || '').trim();

    if (!name || !type) {
        res.json({
            code: 1,
            message: '商家名称或类型不能为空'
        });
        return;
    }

    ShopModel.findById(id)
    .then(function(shop) {
        if (!shop) {
            return Promise.reject({
                code: 2,
                message: '商家不存在'
            });
        } else {
            shop.name = name;
            shop.type = type;
            shop.address = address;
            shop.phone = phone;
            shop.description = description;

            return shop.save();
        }
    })
    .then(function(newShop) {
        if (!newShop) {
            return Promise.reject({
                code: 3,
                message: '更新失败'
            });
        }
        res.json(newShop);
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

/*
* 删除
* */
router.all('/delete', function(req, res) {
    let id = (req.query.id || req.body.id || '').split(',');

    if (!id || !id[0]) {
        res.json({
            code: 1,
            message: '请传入ID'
        });
        return;
    }

    GoodsModel.find({
        shop: {$in: id}
    })
    .then(function(result) {
        if (result.length) {
            return Promise.reject({
                code: 3,
                message: '该商家下还有商品存在，不能删除'
            });
        } else {
            return ShopModel.deleteMany({
                _id: {$in: id}
            });
        }
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
 * 商家头图上传
 */
router.post('/cover', upload.single('cover'), (req, res) => {
    let id = (req.body.id || '').trim();

    ShopModel.findById(id)
    .then((shop) => {
        if (!shop) {
            return Promise.reject({
                code: 1,
                message: '商家不存在'
            });
        }
        if (!req.file) {
            return Promise.reject({
                code: 2,
                message: '上传失败'
            });
        }
        shop.cover = req.file.path;
        return shop.save();
    })
    .then((newShop) => {
        if (!newShop) {
            return Promise.reject({
                code: 3,
                message: '上传成功，但是更新数据失败了'
            })
        }
        res.json(newShop);
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
