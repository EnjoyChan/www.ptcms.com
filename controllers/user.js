//
//== 用户


//
//== 引入
var User = require('../models/User');
var Group = require('../models/Group');
var Project = require('../models/Project');
var Feedback = require('../models/Feedback');
var roleMenus = require('../config/role.json');
var _ = require('lodash');
var async = require('async');

//
//== 引入控制器
var builder = require('./builder');
var crypto = require('crypto');


// 用户是否在线
var isOnline = function(req, res) {
  var account = req.cookies['_account'];

  if (account) {
    return true;
  } else {
    return false;
  }
};


// 用户信息
var getAllInfo = function(req, res) {
  var _id = req._id,
      query = { _id: _id },
      roleNumber = 0,
      menus = {},
      role = {},
      base = {};

  User.findOne(query, function(err, user) {
    if (err) return console.error(err);

    roleNumber = parseInt(user.role, 2);
    menus = roleMenus[roleNumber].menus;

    base.id = user._id;
    base.account = user.account;
    base.username = user.username;
    base.birthday = user.birthday;
    base.status = user.status;
    base.phone = user.phone;
    base.introduction = user.introduction;
    base.jointime = user.jointime;
    base.currentGroup = {};
    base.historyGroup = {};
    base.resume  = user.resume;
    base.role = {
      number: user.role,
      name: roleMenus[roleNumber].name
    }
    Group.find({_id: {$in: user.currentGroup}}, '_id name',function(err, groups){
      base.currentGroup = groups;

      Group.find({_id: {$in: user.historyGroup}}, '_id name',function(err, hgroups){
        base.historyGroup = hgroups;

        Project.find({_id: {$in: user.projects}}, '_id name',function(err, projects){
          base.projects = projects;

          Feedback.find({_id: {$in: user.feedbacks}}, function(err, feedbacks){
            base.feedbacks = feedbacks;
            res.json({ status: 1, data: { user: base, menus: menus } });
          });
        });
      });
    });
  });
};

// 所有
var all = function(req, res) {
  var query = req.query || {};
  User.find(query, function(err, users) {
    if (err) return console.error(err);
    res.json({ status: 1, data: { users: users } });
  });
};

// 添加
var add = function(req, res) {
  var account = req.body.account,
      password = req.body.password || '123',
      birthday = req.body.birthday || '',
      phone = req.body.phone || '',
      currentGroup = req.body.currentGroup || [],
      role = req.body.role || '11',
      username = req.body.username || '佚名',
      newUser = {},
      query = { account: account };

  var hash = crypto.createHash('md5');
  password = hash.update(password).digest('base64');

  var tmp = function(seq) {
    User.findOne(query, function(err, doc) {
      if (err) return console.error(err);
      if (doc) return res.json({ status: 0, msg: '登录账号已存在' });
      newUser = new User({
        _id: seq,
        account: account,
        password: password,
        currentGroup: currentGroup,
        role: role,
        username: username,
        birthday: birthday,
        phone: phone
      });

      if(role == '10') {
        async.map(currentGroup, function(group_id, cb){
          Group.findOne({_id: group_id }, function(err, doc) {
            var currentStaffs = doc.currentStaffs;
            currentStaffs.push(seq);
            Group.update({_id: doc._id},{currentStaffs: currentStaffs},function(err, doc){
              cb();
            });
          })
        }, function(err, results){
          newUser.save(function(err, doc) {
            if (err) return console.error(err);
            res.json({ status: 1, msg:'添加成功', data: { user: doc } });
          });
        });
        
      }else if(role == '01') {
        Group.update({_id: currentGroup[0]},{currentLeader: seq},function(err, doc){
          if (err) return console.error(err);

          newUser.save(function(err, doc) {
            if (err) return console.error(err);
            res.json({ status: 1, msg:'添加成功', data: { user: doc } });
          });
        });
      }else {
        newUser.save(function(err, doc) {
          if (err) return console.error(err);
          res.json({ status: 1, msg:'添加成功', data: { user: doc } });
        });
      }

    });
  };

  builder.getNextSequence('users', tmp);
};

// 删除
var del = function(req, res) {
  res.json({ status: 1, method: 'del' });
};

// 更新
var update = function(req, res) {
  var _id = req._id,
      updateUser = req.body;
  User.findOneAndUpdate({ _id: _id }, updateUser, function(err, user) {
    if (err) return console.error(err);
    res.json({ status: 1, msg: '更新成功!' });
  });
};

// 获得特定角色的人群
var getRole = function(req, res) {
  var query = {role: req.role},
      base = {};

  User.find(query, '_id username role', function(err,users){
    if(err) {
      console.error(err);
      res.json({ status: 0})
    }else {
      res.json({ status: 1, users: users});
    }
  });
};

var getProject = function(req,res) {
  var groups = req.query.groups || [];
  async.map(groups, function(group_id, cb) {
    Group.findOne({_id: group_id}, 'projects', function(err, group) {
      if(group) {
        async.map(group.projects, function(project_id, cb1) {
          Project.findOne({_id: project_id}, '_id name status', function(err, project) {
            cb1(err,project);
          })
        }, function(err, results) {
          cb(err, results);
        });
      }else {
        cb([]);
      }
    });
  }, function(err, results) {
     if(err) return res.json({ status: 0, msg: '访问出错'});
      res.json({ status: 1, data: results});
  });
};

module.exports = {
  isOnline: isOnline,
  getAllInfo: getAllInfo,
  getRole: getRole,
  all: all,
  add: add,
  del: del,
  update: update,
  getProject: getProject
};