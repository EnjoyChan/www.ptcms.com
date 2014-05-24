//
//== 用户


//
//== 引入
var User = require('../models/User');
var roleMenus = require('../config/role.json');
var key = require('../modules/key');
var crypto = require('crypto');


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
    base.introduction = user.introduction;
    base.role = {
      number: roleMenus[roleNumber].number,
      name: roleMenus[roleNumber].name
    }
    console.dir(user);
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
  var account = req.body.account,
      jointime = req.body.jointime || Date.now(),
      password = req.body.password || '123',
      group = req.body.group || [],
      role = req.body.role || [],
      newUser = {},
      query = { account: account };

  var hash = crypto.createHash('md5');
  password = hash.update(password).digest('base64');

  role = unionRole.apply(null, role);


  var tmp = function(key) {
    User.findOne(query, function(err, doc) {
      if (err) return console.error(err);
      if (doc) return res.json({ status: 0, msg: '登录账号已存在' });
      newUser = new User({
        number: key,
        account: account,
        password: password,
        jointime: jointime,
        currentGroup: group,
        role: role
      });

      newUser.save(function(err, doc) {
        if (err) return console.error(err);
        res.json({ status: 1, msg:'添加成功', data: { user: doc } });
      });
    });
  };

  key.increase('users', tmp);
};

// 删除
var del = function(req, res) {
  res.json({ status: 1, method: 'del' });
};

// 更新
var update = function(req, res) {
  res.json({ status: 1, method: 'update' });
};

// 联合角色
var unionRole = function() {
  var len, i, role = 0, prefix = '';
  if ((len = arguments.length) === 0) return false;

  for (i = 0; i < len; i += 1) {
    var tmp = arguments[i];
    role += parseInt(tmp, 2);
  }
  role = Number(role).toString(2);

  for (i = 0; i < 8 - role.length; i += 1) {
    prefix += '0';
  }

  return prefix + role;
};

module.exports = {
  isOnline: isOnline,
  getAllInfo: getAllInfo,
  all: all,
  add: add,
  del: del,
  update: update
};