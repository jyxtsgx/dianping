const express = require('express');
const router = express.Router();

const CommentModel = require('../../schema/Comment');
const ShopModel = require('../../schema/Shop');

/**
 * 获取评论
 * @type {[type]}
 */
router.all('/', (req, res) => {
	let shopid = (req.body.shopid || '').trim();
	let limit = Number(req.query.limit || req.body.limit);
	limit = !Number.isNaN(limit) ? limit : 10;
	let page = Number(req.query.page || req.body.page);
	page = !Number.isNaN(page) ? page : 1;
	let pages = 0;
	let where = {};

	if (!shopid) {
		res.json({
			code: 1,
			message: '请传入评论的商家id'
		});
		return;
	}

	CommentModel.where(where).count()
		.then(count => {
			if (!count) {
				return Promise.reject();
			}
			pages = Math.ceil(count / limit);
			page = Math.max(page, 1);
			page = Math.min(page, pages);
			let skip = limit * (page - 1);
			return CommentModel.where(where).find().limit(limit).skip(skip).populate('user', 'username');
		})
		.then( comment => {
			res.json({
				limit,
				pages,
				page,
				data: comment
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
 * 提交评论
 * @type {[type]}
 */
router.post('/post', (req, res) => {
    let shopid = (req.body.shopid || '').trim();
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
        let comment = new CommentModel({
			shop: shopid,
            user: req.userInfo._id,
            content: content,
			score: {
				taste: scoreTaste,
				environment: scoreEnvironment,
				service: scoreService
            }
        });
        return comment.save();
    } )
    .then( comment => {
        if (!comment) {
            return Promise.reject({
                code: 5,
                message: '评论失败'
            });
        } else {
            return comment;
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
