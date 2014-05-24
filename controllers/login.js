//
//== 引入模块
var User = require('../models/User');
var crypto = require('crypto');


//
//== 控制器
var login = function(req, res) {
  var account,
      ftPassword,
      dbPassword,
      hash = crypto.createHash('md5');

  account = req.body.account || 'xxxxxxxxxx';
  ftPassword = req.body.password || '';

  User.findOne({ account: account}, function(err, user) {
    if (err) return console.error(err);

    // 用户不存在
    if (!user) return res.json({ status: 0, msg: '用户不存在!' });

    dbPassword = user.password;
    ftPassword = hash.update(ftPassword).digest('base64');

    // 密码不正确
    if (dbPassword !== ftPassword) return res.json({ status: 0, msg: '密码不正确' });

    res.cookie('_id', user._id);
    res.cookie('_account', account);
    res.cookie('_username', user.username);
    res.json({ status: 1 });
  });
};

//
//== 暴露
module.exports = login;