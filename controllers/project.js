//
//== 小组


//
//== 引入
var Group = require('../models/Group');
var User = require('../models/User');
var Project  = require('../models/Project');
var async = require('async');


//
//== 引入控制器
var builder = require('./builder');


//
//== 方法

// 添加
var add = function(req, res) {
  var query = req.body;
  var newProject = new Project(query);

  var conditions = { name: newProject.name };

  var tmp = function(seq) {
    Project.findOne(conditions, function(err, doc) {
      if (err) return console.error(err);
      if (doc) return res.json({ status: 0, msg: '该项目已存在' });
      newProject._id = seq;

      async.waterfall([function(cb) {
        newProject.save(function(err, project) {
          cb(null,project);
        });
      }, function(project, cb) {
        if(project.group) {
          async.waterfall([function(cb1) {
            Group.findOne({_id: project.group}, function(err, group){
              var theProjects = group.projects || [];
              theProjects.push(project._id);
              cb1(null, group._id, theProjects);
            });
          },function(id, theProjects, cb1){
            console.log('id***' + id)
            Group.update({_id: id}, {projects: theProjects}, function(err, doc){
              cb1(null, 'done');
            });
          }], function(err, result) {
            cb(null, 'done');
          });
        }else {
          cb(null, project);
        }
      }],function(err, result) {
        if(err) return console.log(err);
        res.json({ status: 1, msg: '添加成功！', data: { project: result } });
      })      
    });
  };
  builder.getNextSequence('projects', tmp);
};

// 所有
var all = function(req, res) {
  var query = req.query || {};
  async.waterfall([function(cb){
    Project.find(query, function(err, docs) {
      if (err) return console.error(error);
      cb(null, docs);
    });
  }, function(docs, cb){
    async.mapSeries(docs, function(doc, cb1) {
      Group.findOne({_id: doc.group}, 'name', function(err, group){
        var groupName = group ? group.name : '';
        cb1(err, {groupName: groupName});
      });
    }, function(err, results) {
      cb(null, docs, results);
    });
  }], function(err, docs, results) {
    if(err) return console.log(err);
    res.json({ status: 1, data: {projects: docs, groupNames: results} });
  });
  
};

// 删除
var del = function(req, res) {
  var _id = req._id;
  if (!_id) return res.json({ status: 0, msg: '发生错误' });
  // Project.findOne({ _id: _id }, function(err, group) {
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

  Project.findOne(query, function(err, project) {
    if(err) return console.error(err);
    base.name = project.name;
    base.createTime = project.createTime;
    base.description = project.description;
    base.endTime = project.endTime;
    base.beginTime = project.beginTime;
    base.status = project.status;

    Group.findOne({_id: project.group}, '_id name', function(err, group) {
      if(err) return console.error(err);
      base.group = group;

      User.findOne({_id: project.creator}, '_id username', function(err, creator) {
        if(err) return cosole.error(err);
        base.creator = creator;
        res.json({ status: 1, project: base});
      });
    });
  });
};

// 更新
var update = function(req, res) {
  var _id = req._id;
  var updateProject = req.body;

  Project.findOneAndUpdate({ _id: _id }, updateProject, function(err, project) {
    if (err) return console.error(err);
    console.log(project)
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