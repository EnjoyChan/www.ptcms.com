//
//== 小组


//
//== 引入
var Resume = require('../models/Resume');
var User = require('../models/User');
var async = require('async');
var _ = require('lodash');

//
//== 引入控制器
var builder = require('./builder');


//
//== 方法

// 添加
var add = function(req, res) {
  var query = req.body;

  var tmp = function(seq) {
    query._id = seq;
    var newResume = new Resume(query);

    newResume.save(function(err, resume) {
      if(err) return console.log(err)

      User.findOneAndUpdate({_id: req.body.userid},{resume: seq}, function(err, user){
        if(err) return console.log(err);
        res.json({ status: 1, msg: '保存成功！'});
      })
    });
  };
  builder.getNextSequence('resumes', tmp);
};

// 所有
var all = function(req, res) {
  var query = req.query || {};
  Resume.find(query, function(err, docs) {
    if (err) return console.error(error);

  //   async.mapSeries(docs, function(doc, cb){
  //     User.findOne({_id: doc.currentLeader}, 'username', function(err, leader){
  //       if(err) return console.log(err);
  //       var leaderName = leader ? leader.username : '';
  //       cb(err, {leaderName: leaderName});
  //     });
  //   }, function(err, results) {
      res.json({ status: 1, resumes: docs});
  //   });
  });
};

// 删除
var del = function(req, res) {
  // var _id = req._id;
  // if (!_id) return res.json({ status: 0, msg: '发生错误' });
  // Group.findOne({ _id: _id }, function(err, group) {
  //   if (group.currentStaffs.length !== 0) {
  //     return res.json({ status: 0, msg: '该小组还有人员存在' });
  //   }
  //   group.remove(function(err, group) {
  //     if (err) return console.error(err);
  //     res.json({ status: 1, data: { group: group } });
  //   });
  // });
};

// 一个
var one = function(req, res) {
  var query = { _id: req._id},
      base = {};

  Resume.findOne(query, function(err, resume) {
    if(err) return console.error(err);
    res.json({ status: 1, resume: resume });
  });
};

// 更新
var update = function(req, res) {
  console.log('hi')
  var _id = req._id;
  var updateResume = req.body;

  Resume.findOneAndUpdate({ _id: _id }, updateResume, function(err, resume) {
    if (err) return console.error(err);
    res.json({ status: 1, msg: '更新成功!' });
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