//
//== 引入模块
var User = require('../models/User');
var crypto = require('crypto');
var builder = require('./builder');


//
//== 控制器
var signup = function(req, res) {
  var account,
      password,
      hash = crypto.createHash('md5');

  account = req.body.account || 'xxxxxxxxxx';
  password = req.body.password || '';

  User.find({ account: account}, function(err, users) {
    if (err) return console.error(err);

    // 用户存在
    if (users.length !== 0) return res.json({ status: 0, msg: '该帐号已被注册过!' });
    //往数据库添加一个用户
    builder.getNextSequence('users', function(seq) {
      var proposer = new User({
        _id: seq,
        account: account,
        password: hash.update(password).digest('base64'),
        introduction: '面试成员'
      });
      proposer.save(function() {
        res.cookie('_id', seq);
        res.cookie('_account', account);
        res.cookie('_username', '佚名');
        res.json({ status: 1 });
      });
    });    
  });
};

//
//== 暴露
module.exports = signup;