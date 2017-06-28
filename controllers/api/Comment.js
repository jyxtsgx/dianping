const express = require('express');
const router = express.Router();

const CommentModel = require('../../schema/Comment');
const ShopModel = require('../../schema/Shop');

/**
 * 获取评论
 * @type {[type]}
 */
router.all('/', (req, res) => {

});

/**
 * 提交评论
 * @type {[type]}
 */
router.post('/post', (req, res) => {
    let shopid = (req.body.shopid || '').trim();
    let userid = (req.body.userid || '').trim();
    let content = (req.body.content || '').trim();
    let scoreTaste = Number(req.body.score_taste) || 0;
    let scoreEnvironment = Number(req.body.score_environment) || 0;
    let scoreService = Number(req.body.score_service) || 0;

    if (!req.userInfo._id) {
        res.json({
            code: 10,
            message: '你还没有登录'
        });
        return;
    }

    if (!shopid) {
        res.json({
            code: 1,
            message: '请传入评论的商家id'
        });
        return;
    }

    if (!content) {
        res.json({
            code: 2,
            message: '评论内容不能为空'
        });
        return;
    }
    if ( scoreTaste < 0 || scoreTaste > 10 || scoreEnvironment < 0 || scoreEnvironment > 10 || scoreService < 0 || scoreService > 10 ) {
        res.json({
            code: 3,
            message: '评分不能小于0或大于10'
        });
        return;
    }

    ShopModel.findById(shopid)
    .then( shop => {
        if (!shop) {
            return Promise.reject({
                code: 4,
                message: '不存在该商家信息'
            });
        }
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
