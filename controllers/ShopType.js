const express = require('express');
const router = express.Router();

const ShopTypeModel = require('../schema/ShopType');

/*
* 获取所有商户类型列表
* */
router.all('/', function(req, res) {
    ShopTypeModel.find({}).then(function(data) {
        res.json(data);
    });
});

/*
* 添加商户类型
* method: post
* fields:
*   name: 商户名称
* */
router.post('/add', function (req, res) {
    let name = (req.body.name || '').trim();

    if (name == '') {
        res.json({
            code: 1,
            message: '请输入商户类型名称'
        });
        return;
    }

    ShopTypeModel.findOne({
        name: name
    }).exec(function (err, shopTypeInfo) {
        if (!err) {
            if (shopTypeInfo) {
                res.json({
                    code: 2,
                    message: '添加失败 - 已经存在该分类了'
                });
            } else {
                let shopType = new ShopTypeModel({name: name});
                shopType.save(function (err) {
                    if (err) {
                        res.json({
                            code: 3,
                            message: '添加失败'
                        });
                    } else {
                        res.json({
                            code: 0,
                            message: '添加成功'
                        });
                    }
                });
            }
        }
    });
});

/*
* 修改
* */
router.post('/edit', function(req, res) {
    let id = req.body.id;
    let name = (req.body.name || '').trim();

    if (name == '') {
        res.json({
            code: 1,
            message: '要修改的商户类型名称不能为空'
        });
        return;
    }

    ShopTypeModel.findOne({
        _id: {$ne: id},
        name: name
    })
    .then(function(result) {
        if (result) {
            return Promise.reject({
                code: 2,
                message: '已经存在相同名称的商户类型了'
            });
        }
        return ShopTypeModel.findById(id).exec();
    })
    .then(function(shopTypeInfo) {
        if (shopTypeInfo == null) {
            return Promise.reject({
                code: 3,
                message: '要修改的商户类型不存在'
            });
        }
        shopTypeInfo.name = name;
        return shopTypeInfo.save();
    })
    .then(function(newShopTypeInfo) {
        if (newShopTypeInfo) {
            res.json(newShopTypeInfo);
        }
    })
    .catch(function(err) {
        if (err.code) {
            res.json(err);
        } else {
            res.json({
                code: -1,
                message: err
            });
        }
    })
});

/*
* 删除
*   parmas:
*    id : 要删除的商户类型的ID
* */
router.all('/delete', function(req, res) {
    let id = (req.query.id || req.body.id || '').split(',');

    if (!id.length) {
        res.json({
            code: -1,
            message: '请传入ID'
        });
        return;
    }

    ShopTypeModel.deleteMany({
        _id: {$in: id}
    }).then(function(result) {
        res.json({
            code: 0,
            message: '删除成功'
        })
    }).catch(function(err) {
        res.json({
            code: 1,
            message: '删除失败'
        });
    });
});

module.exports = router;
