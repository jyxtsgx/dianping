const express = require('express');
const router = express.Router();

const ShopTypeModel = require('../../schema/ShopType');

/**
 * 获取商家类型
 */
router.all('/', (req, res) => {

    ShopTypeModel.find()
    .then( shopType => {
        res.json(shopType);
    })
    .catch(err => {
        res.json([]);
    })

});

module.exports = router;
