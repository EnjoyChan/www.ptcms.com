//
//== 模块定义
var express = require('express');
var action = require('../controllers');
var User = require('../models/User');
//
//== 定义路由
var router = express.Router();
//
//== 路由设置
// 对所有请求过滤，如果用户未登录则跳至login
router.use(function(req, res, next) {
  if (req.path === '/login') {
    next();
    return;
  }
  if (req.path === '/signup') {
    next();
    return;
  }
  if (!action.users.isOnline(req, res)) {
    res.redirect(301, '/login');
    return;
  } else {
    next();
  }
});
// 根目录
router.get('/', function(req, res) {
  res.redirect(301, '/index');
});
// 登录页
router.get('/login', action.goLogin);
// 注册页
router.get('/signup', action.goSignup);
// 注册
router.post('/signup', action.signup);
// 登录
router.post('/login', action.logIn.login);
// 首页
router.get('/index', action.goIndex);
// 登出
router.use('/logout', action.logout);
//============== 用户
router.param('users_id', function(req, res, next, id) {
  req._id = id;
  next();
});

router.post('/modifypassword/:users_id', action.logIn.modify);

router.route('/users/:users_id')
  .get(action.users.getAllInfo)
  .put(action.users.update)
  .delete(action.users.del);
// 查找所有
router.get('/users', action.users.all);
// 添加
router.post('/users', action.users.add);
// ============== 角色
router.param('role_num', function(req, res, next, role) {
  req.role = role;
  next();
});
// 获得特定职位的人
router.route('/roles/:role_num')
  .get(action.users.getRole);
// 小组项目
router.route('/groupprojects')
  .get(action.users.getProject);

//============== 小组
router.param('group_id', function(req, res, next, id) {
  req._id = id;
  next();
});
router.route('/groups/:group_id')
  .get(action.groups.one)
  .put(action.groups.update)
  .delete(action.groups.del);
// 查找所有
router.get('/groups', action.groups.all);
// 添加
router.post('/groups', action.groups.add);

router.param('resume_id', function(req, res, next, id) {
  req._id = id;
  next();
});
router.route('/resumes/:resume_id')
  .get(action.resumes.one)
  .put(action.resumes.update)
  .delete(action.resumes.del);
// 查找所有
router.get('/resumes', action.resumes.all);
// 添加
router.post('/resumes', action.resumes.add);
//============== 项目
router.param('projects_id', function(req, res, next, id) {
  req._id = id;
  next();
});
router.route('/projects/:projects_id')
  .get(action.projects.one)
  .put(action.projects.update)
  .delete(action.projects.del);
// 查找所有
router.get('/projects', action.projects.all);
// 添加
router.post('/projects', action.projects.add);
//============== 反馈
router.param('feedbacks_id', function(req, res, next, id) {
  req._id = id;
  next();
});
router.route('/feedbacks/:feedbacks_id')
  .get(action.feedbacks.one)
  .delete(action.feedbacks.del);
// 查找所有
router.get('/feedbacks', action.feedbacks.all);
// 添加
router.post('/feedbacks', action.feedbacks.add);
//============== 公告
router.param('broadcasts_id', function(req, res, next, id) {
  req._id = id;
  next();
});
router.route('/broadcasts/:broadcasts_id')
  .delete(action.broadcasts.del);
//============== 任务
router.param('task_id', function(req, res, next, id) {
  req._id = id;
  next();
});
router.route('/tasks/:task_id')
  .get(action.tasks.one)
  .put(action.tasks.update)
  .delete(action.tasks.del);
// 查找所有
router.get('/tasks', action.tasks.all);
// 添加
router.post('/tasks', action.tasks.add);
// 查找所有
router.get('/broadcasts', action.broadcasts.all);
// 添加
router.post('/broadcasts', action.broadcasts.add);
//
//== 暴露路由
module.exports = router;
