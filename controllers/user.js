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
var getAllInfo = function(req, res) {
  var number = req.number,
      query = { number: number },
      roleNumber = 0,
      menus = {},
      role = {},
      base = {};

  User.findOne(query, function(err, user) {
    if (err) return console.error(err);

    roleNumber = parseInt(user.role, 2);
    menus = roleMenus[roleNumber].menus;

    base.number = user.number;
    base.account = user.account;
    base.username = user.username;
    base.role = {
      number: roleMenus[roleNumber].number,
      name: roleMenus[roleNumber].name
    }
    res.json({ status: 1, data: { user: base, menus: menus } });
  });
};

// 所有
var all = function(req, res) {
  User.find(function(err, users) {
    if (err) return console.error(err);
    res.json({ status: 1, data: { users: users } });
  });
};

// 添加
var add = function(req, res) {
  res.json({ status: 1, method: 'add' });
};

// 删除
var del = function(req, res) {
  res.json({ status: 1, method: 'del' });
};

// 更新
var update = function(req, res) {
  res.json({ status: 1, method: 'update' });
};

module.exports = {
  isOnline: isOnline,
  getAllInfo: getAllInfo,
  all: all,
  add: add,
  del: del,
  update: update
};