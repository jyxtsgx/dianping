const express = require('express');
const router = express.Router();

const upload = require('../../tools/Upload')({savePath: 'user'});

const UserModel = require('../../schema/User');

/**
 * 注册
 */
router.post('/reg', (req, res) => {
    let username = (req.body.username || '').trim();
    let password = (req.body.password || '').trim();
    let repassword = (req.body.repassword || '').trim();

    if (req.userInfo._id) {
        res.json({
            code: 100,
            message: '你已经登录了，请先退出'
        });
        return;
    }

    if (username.length < 3 || username.length > 20) {
        res.json({
            code: 1,
            message: '用户在3到20个字符之间'
        });
        return;
    }
    if (password.length < 3) {
        res.json({
            code: 2,
            message: '密码长度不能小于3个字符'
        });
        return;
    }

    if (password != repassword) {
        res.json({
            code: 3,
            message: '两次输入密码不一致'
        });
        return;
    };

    UserModel.findOne({
        username: username
    }).then( user=> {
        if (user) {
            return Promise.reject({
                code: 4,
                message: '用户名已经被注册了'
            });
        }
        let newUser = new UserModel({
            username: username,
            password: password
        });
        return newUser.save();
    } )
    .then( newUser => {
        if (!newUser) {
            return Promise.reject({
                code: 5,
                message: '注册失败'
            });
        }
        res.cookie('userinfo', JSON.stringify({
            _id: newUser._id,
            username: newUser.username
        }), { maxAge: 900000, path: '/' });

        res.json({
            _id: newUser._id,
            username: newUser.username
        });
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
 * 登录
 */
router.post('/login', (req, res) => {
    let username = (req.body.username || '').trim();
    let password = (req.body.password || '').trim();

    if (req.userInfo._id) {
        res.json({
            code: 100,
            message: '你已经登录了'
        });
        return;
    }

    UserModel.findOne({
        username: username
    }).then( user => {
        if (!user) {
            return Promise.reject({
                code: 1,
                message: '用户不存在'
            });
        }
        if (password != user.password) {
            return Promise.reject({
                code: 2,
                message: '密码不正确'
            })
        }
        res.cookie('userinfo', JSON.stringify({
            _id: user._id,
            username: user.username
        }), { maxAge: 900000, path: '/' });

        res.json({
            _id: user._id,
            username: user.username
        });
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
 * 退出
 */
router.all('/logout', (req, res) => {
    if (!req.userInfo._id) {
        res.json({
            code: 10,
            message: '你还没有登录'
        });
    } else {
        res.clearCookie('userinfo', { path: '/' });
        res.json({
            _id: req.userInfo._id,
            username: req.userInfo.username
        });
    }

});

/**
 * 用户头像上传
 */
router.post('/avatar', upload.single('avatar'), (req, res) => {

    if (!req.userInfo._id) {
        res.json({
            code: 10,
            message: '你还没有登录'
        });
        return;
    }

    UserModel.findById({
        _id: req.userInfo._id
    })
    .then( user => {
        if (!user) {
            return Promise.reject({
                code: 1,
                message: '用户不存在'
            });
        }
        if (!req.file) {
            return Promise.reject({
                code: 2,
                message: '上传失败'
            });
        }
        user.avatar = req.file.path;
        return user.save();
    })
    .then( newUser => {
        if (!newUser) {
            return Promise.reject({
                code: 3,
                message: '上传成功，但是更新数据失败了'
            })
        }
        res.json(newUser);
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
