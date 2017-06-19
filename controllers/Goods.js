const express = require('express');
const router = express.Router();

const ShopModel = require('../schema/Shop');
const GoodsModel = require('../schema/Goods');

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

});

/**
 * 修改
 */
router.edit('/edit', (req, res) => {

});

/**
 * 删除
 */
router.all('/delete', (req, res) => {

});

module.exports = router;
