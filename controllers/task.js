//
//== 任务


//
//== 引入
var User = require('../models/User');
var Project  = require('../models/Project');
var Task  = require('../models/Task');
var Feedback  = require('../models/Feedback');
var async = require('async');

//
//== 引入控制器
var builder = require('./builder');


//
//== 方法

// 添加
var add = function(req, res) {
  var query = req.body;
  var newTask = new Task(query);

  var tmp = function(seq) {
    newTask._id = seq;

    async.waterfall([function(cb) {
      newTask.save(function(err, task) {
        cb(null,task);
      });
    }, function(task, cb) {
      async.waterfall([function(cb1) {
        builder.getNextSequence('feedbacks', function(feedbackID1) {
          var description1 = task.schedule;
          var newFeedback1 = new Feedback({description: description1, _id: feedbackID1});
          if(task.project) {
            builder.getNextSequence('feedbacks', function(feedbackID2) {
              var description2 = '项目分配一个子任务：' + task.schedule;
              var newFeedback2 = new Feedback({description: description2, _id: feedbackID2});
              newFeedback1.save(function(err, feedback) {
                newFeedback2.save(function(err, feedback) {
                  cb1(null, {id1: feedbackID1, id2: feedbackID2});
                });
              })
            });
          }else {
            newFeedback1.save(function(err, feedback) {
              cb1(null, {id1: feedbackID1});
            });
          }
        });
      },function(result, cb1) {
        User.findOne({_id: task.action}, function(err, user){
          var feedbacks1 = user.feedbacks || [];
          var tasks = user.tasks || [];
          feedbacks1.push(result.id1);
          tasks.push(task._id);
          if(result.id2) {
            Project.findOne({_id: task.project}, function(err, project){
              var feedbacks2 = project.feedbacks || {};
              feedbacks2.push(result.id2);
              cb1(null, {feedbacks1: feedbacks1, tasks: tasks, feedbacks2: feedbacks2});
            });
          }else {
            cb1(null, {feedbacks1: feedbacks1, tasks: tasks});
          }
        });
      },function(result, cb1){
        User.update({_id: task.action}, {feedbacks: result.feedbacks1, tasks: result.tasks}, function(err, doc){
          if(result.feedbacks2) {
            Project.update({_id: task.project}, {feedbacks: result.feedbacks2}, function(err, doc){
              cb1(null, 'done');
            });
          }else {
            cb1(null, 'done');
          }
        });
      }], function(err, result) {
        cb(null, task);
      });
    }],function(err, result) {
      if(err) return console.log(err);
      res.json({ status: 1, msg: '添加成功！', data: { task: result } });
    });    
  };
  builder.getNextSequence('projects', tmp);
};

// 所有
var all = function(req, res) {
  var query = req.query || {};
  async.waterfall([function(cb){
    Task.find(query).sort({'_id': -1}).exec(function(err, docs) {
      if (err) return console.error(error);
      cb(null, docs);
    });
  }, function(docs, cb){
    async.parallel([function(cb1) {
      async.mapSeries(docs, function(doc, cb2) {
        User.findOne({_id: doc.action}, 'username', function(err, action){
          var actionName = action ? action.username : '';
          cb2(err, {actionName: actionName});
        });
      }, function(err, actionNames) {
        cb1(null, actionNames);
      });
    }, function(cb1) {
      async.mapSeries(docs, function(doc, cb2) {
        User.findOne({_id: doc.creator}, 'username', function(err, creator){
          var creatorName = creator ? creator.username : '';
          cb2(err, {creatorName: creatorName});
        });
      }, function(err, creatorNames) {
        cb1(null, creatorNames);
      });
    }], function(err, results) {
      cb(null, docs, results)
    });
  }], function(err, docs, results) {
    if(err) return console.log(err);
    res.json({ status: 1, data: {tasks: docs, actionNames: results[0], creatorNames: results[1]} });
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

  Task.findOne(query, function(err, task) {
    if(err) return console.error(err);
    base.schedule = task.schedule;
    base.createTime = task.createTime;
    base.endTime = task.endTime;
    base.beginTime = task.beginTime;
    base.status = task.status;

    Project.findOne({_id: task.project}, '_id name', function(err, project) {
      if(err) return console.error(err);
      base.project = project;

      User.findOne({_id: task.action}, '_id username', function(err, action) {
        if(err) return cosole.error(err);
        base.action = action;
        res.json({ status: 1, task: base});
      });
    });
  });
};

// 更新
var update = function(req, res) {
  var _id = req._id;
  var updateTask = req.body;

  Task.findOneAndUpdate({ _id: _id }, updateTask, function(err, task) {
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