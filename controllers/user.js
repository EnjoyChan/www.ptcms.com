//
//== 用户


//
//== 引入
var User = require('../models/User');
var roleMenus = require('../config/role.json');


// 用户是否在线
var isOnline = function(req, res) {
  var account = req.cookies['_account'];

  if (account) {
    return true;
  } else {
    return false;
  }
};


// 用户信息
var getAll = function(req, res) {
  var userNumber = req.userNumber,
      query = { number: userNumber },
      roleNumber = 0,
      menus = {},
      role = {},
      userinfo = {};

  User.findOne(query, function(err, user) {
    if (err) return console.error(err);

    roleNumber = parseInt(user.role, 2);
    menus = roleMenus[roleNumber].menus;

    userinfo.number = user.number;
    userinfo.account = user.account;
    userinfo.username = user.username;
    userinfo.role = {
      number: roleMenus[roleNumber].number,
      name: roleMenus[roleNumber].name
    }

    res.json({
      status: 1,
      user: userinfo,
      menus: menus
    });
  });
};

module.exports = {
  isOnline: isOnline,
  getAll: getAll
};