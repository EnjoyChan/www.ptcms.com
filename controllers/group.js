//
//== 小组


//
//== 引入
var Group = require('../models/Group');
var User  = require('../models/User');


//
//== 引入控制器
var builder = require('./builder');


//
//== 方法

// 添加
var add = function(req, res) {
  var newGroup = new Group({
    name          : req.body.name,
    currentLeader : req.body.leader,
    isOpen        : req.body.isopen,
    beginTime     : req.body.begintime || Date.now(),
    description   : req.body.description
  });

  var conditions = { name: newGroup.name };

  var tmp = function(seq) {
    Group.findOne(conditions, function(err, doc) {
      if (err) return console.error(err);
      if (doc) return res.json({ status: 0, msg: '该小组已存在' });
      newGroup._id = seq;

      newGroup.save(function(err, group) {
        console.log(group);
        res.json({ status: 1, data: { group: group } });
      });
    });
  };
  builder.getNextSequence('groups', tmp);
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
  var _id = req._id;
  if (!_id) return res.json({ status: 0, msg: '发生错误' });
  Group.findOne({ _id: _id }, function(err, group) {
    if (group.currentStaffs.length !== 0) {
      return res.json({ status: 0, msg: '该小组还有人员存在' });
    }
    group.remove(function(err, group) {
      if (err) return console.error(err);
      res.json({ status: 1, data: { group: group } });
    });
  });
};

// 一个
var one = function(req, res) {
  res.json({ status: 1, method: 'one' });
};

// 更新
var update = function(req, res) {
  var _id = req._id;
  var updateGroup = {
    name          : req.body.name,
    currentLeader : req.body.leader,
    isOpen        : req.body.isopen,
    beginTime     : req.body.begintime || Date.now(),
    description   : req.body.description
  };

  Group.findOneAndUpdate({ _id: _id }, updateGroup, function(err, group) {
    if (err) return console.error(err);
    res.json({ status: 1, msg: '更新成功' });
  });
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