//
//== 小组


//
//== 引入
var Group = require('../models/Group');
var key = require('../modules/key');


//
//== 方法

// 添加
var add = function(req, res) {
  res.json({ status: 1, method: 'add' });
};

// 所有
var all = function(req, res) {
  Group.find(function(err, docs) {
    if (err) return console.error(error);

    res.json({ status: 1, data: {
      groups: docs
    } });
  });
};

// 删除
var del = function(req, res) {
  res.json({ status: 1, method: 'del' });
};

// 一个
var one = function(req, res) {
  res.json({ status: 1, method: 'one' });
};

// 更新
var update = function(req, res) {
  res.json({ status: 1, method: 'update' });
};


//
//== 暴露
module.exports = {
  add: add,
  all: all,
  del: del,
  one: one,
  update: update
};