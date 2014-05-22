//
//== 模块依赖
var mongoose = require('mongoose');
var key = require('./modules/key');

var AutoKey = require('./models/AutoKey');
var Grade = require('./models/Grade');
var Group = require('./models/Group');
var User = require('./models/User');
var Classe = require('./modules/Classe');


//
//== 连接mongo数据库
mongoose.connect('mongodb://localhost/ptcms');


//
//== 定义变量
var collections = ['autokeys', 'grades', 'groups', 'users'],
    flag = false, len, tmp, i;


//
//== 删除所有collection
// var callback = function() {
//   mongoose.connection.collections.autokeys.drop(function() {
//     console.log('##Drop autokeys collections!\n');
//   });

//   mongoose.connection.collections.grades.drop(function() {
//     console.log('##Drop grades collections!\n');
//   });

//   mongoose.connection.collections.users.drop(function() {
//     console.log('##Drop users collections!\n');
//   });

//   mongoose.connection.collections.groups.drop(function() {
//     console.log('##Drop groups collections!\n');
//   });
// };


//
//== 生成autokeys collections
// var callback = function() {
//   mongoose.connection.collections.autokeys.drop(function() {
//     for (i = 0, len = collections.length; i < len; i += 1) {
//       tmp = collections[i];
//       var autoKey = new AutoKey({
//         name: tmp
//       });
//       autoKey.save();
//     }

//     console.log('Generate autokeys collections data!');
//   });
// };


//
//== 生成年级
// var callback = function() {
//   mongoose.connection.collections.grades.drop(function() {
//     new Grade({ number: 1, name: '2009届', isGraduation: true }).save();
//     new Grade({ number: 2, name: '2010届', isGraduation: false }).save();
//     new Grade({ number: 3, name: '2011届', isGraduation: false }).save();
//     new Grade({ number: 4, name: '2012届', isGraduation: false }).save();
//     new Grade({ number: 5, name: '2013届', isGraduation: false }).save();

//     key.set('grades', '6', function(doc) {
//       console.log(doc);
//     });
//   });
// };


//
//== 生成小组
// var callback = function() {
//   mongoose.connection.collections.groups.drop(function() {
//     new Group({ number: 1, name: '前端组',   isOpen: true,   leader: '' }).save();
//     new Group({ number: 2, name: '安卓组',   isOpen: false,  leader: '' }).save();
//     new Group({ number: 3, name: '后台组',   isOpen: true,   leader: '' }).save();
//     new Group({ number: 4, name: '动画组',   isOpen: false,  leader: '' }).save();
//     new Group({ number: 5, name: '编译器组', isOpen: true,   leader: '' }).save();

//     key.set('groups', '6', function(doc) {
//       console.log(doc);
//     });
//   });
// };


//
//== 生成管理员
var callback = function() {
  mongoose.connection.collections.users.drop(function() {
    var admin = new User({ number: 1, account: 'admin', username: '管理员', role: '01000100' });
    admin.save();

    key.set('users', '2', function(doc) {
      console.log(doc);
    });
  });
};


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', callback);
