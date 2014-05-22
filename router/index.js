//
//== 模块定义

var express = require('express');
var action = require('../controllers');
var User = require('../models/User');


//
//== 定义路由

var router = express.Router();


//
//== 路由设置


// 对所有请求过滤，如果用户未登录则跳至login
router.use(function(req, res, next) {
  if (req.path === '/login') {
    next();
    return;
  }

  if (!action.user.isOnline(req, res)) {
    res.redirect(301, '/login');
    return;
  } else {
    next();
  }
});

// 根目录
router.get('/', function(req, res) {
  res.redirect(301, '/index');
});

// 登录页
router.get('/login', action.goLogin);

// 登录
router.post('/login', action.signup);

// 首页
router.get('/index', action.goIndex);

// 登出
router.use('/logout', action.logout);

// 用户
router.param('user', function(req, res, next, number) {
  req.userNumber = number;
  next();
});

router.get('/users/:user/all', action.user.getAll);

// 班级
router.param('classe_number', function(req, res, next, number) {
  req.number = number;
  next();
});

router.route('/classes/:classe_number')
  .get(function(req, res, next) {
    res.json({
      status: 1,
      data: {
        method: 'get'
      }
    });
  })
  .put(action.classes.update)
  .delete(action.classes.del);

// 添加
router.post('/classes', action.classes.add);

// 查找所有
router.get('/classes', action.classes.all);


//
//== 暴露路由
module.exports = router;
