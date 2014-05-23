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

  if (!action.users.isOnline(req, res)) {
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


//============== 用户
router.param('users_number', function(req, res, next, number) {
  req.number = number;
  next();
});

router.route('/users/:users_number')
  .get(action.users.getAllInfo)
  .put(action.users.update)
  .delete(action.users.del);

// 查找所有
router.get('/users', action.users.all);

// 添加
router.post('/users', action.users.add);


//============== 班级
router.param('classe_number', function(req, res, next, number) {
  req.number = number;
  next();
});

router.route('/classes/:classe_number')
  .get(action.classes.one)
  .put(action.classes.update)
  .delete(action.classes.del);

// 添加
router.post('/classes', action.classes.add);

// 查找所有
router.get('/classes', action.classes.all);


//============== 小组
router.param('groups_number', function(req, res, next, number) {
  req.number = number;
  next();
});

router.route('/groups/:groups_number')
  .get(action.groups.one)
  .put(action.groups.update)
  .delete(action.groups.del);

// 查找所有
router.get('/groups', action.groups.all);

// 添加
router.post('/groups', action.groups.add);


//
//== 暴露路由
module.exports = router;
