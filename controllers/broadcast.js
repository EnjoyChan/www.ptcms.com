//
//== 小组


//
//== 引入
var Broadcast = require('../models/Broadcast');


//
//== 引入控制器
var builder = require('./builder');


//
//== 方法

// 添加
var add = function(req, res) {
  var query = req.body;
  var newBroadcast = new Broadcast(query);

  var tmp = function(seq) {
    newBroadcast._id = seq;
    newBroadcast.save(function(err, broadcast) {
      res.json({ status: 1, msg: '发布成功！' });
    });
  };
  builder.getNextSequence('broadcasts', tmp);
};

// 所有
var all = function(req, res) {
  Broadcast.find().sort({'_id': -1}).exec(function(err, docs) {
    if (err) return console.error(err);
    res.json({ status: 1, broadcasts: docs});
  });
};

// 删除
var del = function(req, res) {
  var _id = req._id;
  if (!_id) return res.json({ status: 0, msg: '发生错误' });
  Broadcast.findOne({ _id: _id }, function(err, broadcast) {
    broadcast.remove(function(err, broadcast) {
      if (err) return console.error(err);
      res.json({ status: 1, msg: '删除成功！'});
    });
  });
};

//
//== 暴露
module.exports = {
  add: add,
  del: del,
  all: all
};