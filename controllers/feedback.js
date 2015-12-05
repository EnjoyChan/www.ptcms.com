//
//== 小组


//
//== 引入
var Group = require('../models/Group');
var User  = require('../models/User');
var Project  = require('../models/Project');
var Feedback  = require('../models/Feedback');


//
//== 引入控制器
var builder = require('./builder');


//
//== 方法

// 添加
var add = function(req, res) {
  var query = req.body;
  var newFeedback = new Feedback(query);

  var tmp = function(seq) {
    newFeedback._id = seq;
    newFeedback.save(function(err, feedback) {
      console.log(feedback);
      res.json({ status: 1, data: { feedback: feedback } });
    });
  };
  builder.getNextSequence('feedbacks', tmp);
};

// 所有
var all = function(req, res) {
  Feedback.find(function(err, docs) {
    if (err) return console.error(error);

    res.json({ status: 1, data: {
      projects: docs
    } });
  });
};

// 删除
var del = function(req, res) {
  var _id = req._id;
  if (!_id) return res.json({ status: 0, msg: '发生错误' });
  Feedback.findOne({ _id: _id }, function(err, feedback) {
    feedback.remove(function(err, feedback) {
      if (err) return console.error(err);
      res.json({ status: 1, msg: '删除成功！'});
    });
  });
};

// 一个
var one = function(req, res) {
  var query = { _id: req._id},
      base = {};

  // Feedback.findOne(query, function(err, feedback) {
  //   if(err) return console.error(err);
  //   base.name = feedback.name;

  //   Group.findOne({_id: feedback.group}, '_id name', function(err, group) {
  //     if(err) return console.error(err);
  //     base.group = group;
  //     res.json({ status: 1, feedback: base});
  //   });
  // });
};

//
//== 暴露
module.exports = {
  add: add,
  all: all,
  del: del,
  one: one
};