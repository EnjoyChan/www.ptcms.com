//
//== 控制器模块

var classeCtrl    = require('./classe');
var loginCtrl     = require('./login');
var userCtrl      = require('./user');


//
//== 简单的请求控制器

// 获取登录页
var goLogin = function(req, res) {
  res.clearCookie('_username');
  res.clearCookie('_account');
  res.clearCookie('_number');
  res.render('login.html');
};

// 获取首页
var goIndex = function(req, res) {
  res.render('index.html');
};


//
//== 暴露
module.exports = {
  goLogin: goLogin,
  goIndex: goIndex,
  signup: loginCtrl,
  logout: goLogin,
  user: userCtrl,
  classes: classeCtrl
};