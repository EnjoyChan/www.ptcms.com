//
//== 小组


//
//== 引入
var Group = require('../models/Group');
var User  = require('../models/User');
var Project  = require('../models/Project');
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
  var conditions = { name: query.name };

  var tmp = function(seq) {
    Group.findOne(conditions, function(err, doc) {
      if (err) return console.error(err);
      if (doc) return res.json({ status: 0, msg: '该小组已存在' });
      query._id = seq;
      newGroup = new Group(query);
      
      async.waterfall([function(cb){
        newGroup.save(function(err, group) {
          cb(null, group);
        });
      }, function(group, cb1){
        var staffs = group.currentStaffs || [];
        staffs.push(group.currentLeader);
        if(staffs.length != 0) {
          async.map(staffs, function(staff, cb2) {
            async.waterfall([function(cb3) {
              User.findOne({_id: staff}, function(err, user) {
                var theGroup = user.currentGroup || [];
                theGroup.push(group._id);
                cb3(null, user._id, theGroup);
              });
            }, function(id, theGroup, cb3) {
              User.update({_id: id}, {currentGroup: theGroup}, function(err, doc) {
                cb3(null, 'done');
              })
            }], function(err, result){
              if(err) return console.log(err);
              cb2(err,'done');
            }); 
          }, function(err, results) {
            cb1(null, group)
          });
        } else {
          cb1(null, group)
        }       
      }],function(err, result){
        if(err) return console.log(err);
        res.json({ status: 1, msg: '添加成功！', data: { group: result } });        
      });
    });
  };
  builder.getNextSequence('groups', tmp);
};

// 所有
var all = function(req, res) {
  var query = req.query || {};
  Group.find(query, function(err, docs) {
    if (err) return console.error(error);

    async.mapSeries(docs, function(doc, cb){
      User.findOne({_id: doc.currentLeader}, 'username', function(err, leader){
        if(err) return console.log(err);
        var leaderName = leader ? leader.username : '';
        cb(err, {leaderName: leaderName});
      });
    }, function(err, results) {
      res.json({ status: 1, data: { groups: docs, leaders: results} });
    });
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
  var query = { _id: req._id},
      base = {};

  Group.findOne(query, function(err, group) {
    if(err) return console.error(err);
    base.name = group.name;
    base.createTime = group.createTime;
    base.description = group.description;
    base.isOpen = group.isOpen;

    User.findOne({_id: group.currentLeader}, '_id username', function(err, leader) {
      if(err) return console.error(err);
      base.currentLeader = leader;

      User.find({_id: {$in: group.currentStaffs}}, '_id username', function(err, staffs) {
        if(err) return console.error(err);
        base.currentStaffs = staffs;

        Project.find({_id: {$in: group.projects}}, '_id name', function(err, projects) {
          if(err) return console.error(err);
          base.projects = projects;
          res.json({ status: 1, group: base});
        });
      });
    });
  })
};

// 更新
var update = function(req, res) {
  var _id = req._id;
  // var updateGroup = {
  //   name          : req.body.name,
  //   currentLeader : req.body.currentLeader,
  //   currentStaffs : req.body.currentStaffs,
  //   isOpen        : req.body.isOpen,
  //   description   : req.body.description
  // };
  var updateGroup = req.body;

  Group.findOneAndUpdate({ _id: _id }, updateGroup, function(err, group) {
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