//
//== 模块依赖
var mongoose      = require('mongoose');

var Sequence      = require('./models/Sequence');
var Classe        = require('./models/Classe');
var Grade         = require('./models/Grade');
var Group         = require('./models/Group');
var User          = require('./models/User');


//
//== 引入控制器
var builder = require('./controllers/builder');


//
//== 连接mongo数据库
mongoose.connect('mongodb://localhost/ptcms');


//
//== 定义变量
var flag = false, len, tmp, i, db;

db = mongoose.connection;

var buildSequences = function() {
  new Sequence({ _id: 'users'     }).save();
  new Sequence({ _id: 'tasks'     }).save();
  new Sequence({ _id: 'grades'    }).save();
  new Sequence({ _id: 'groups'    }).save();
  new Sequence({ _id: 'modules'   }).save();
  new Sequence({ _id: 'classes'   }).save();
  new Sequence({ _id: 'projects'  }).save();
  new Sequence({ _id: 'feedbacks' }).save();
  console.log('###### 生成所有新的自动递增序列字段');
};

var buildAdmin = function() {
  builder.getNextSequence('users', function(seq) {
    var admin = new User({
      _id: seq,
      account: 'admin',
      username: '管理员',
      role: '01000000',
      introduction: '管理员具有最高权限'
    });
    admin.save(function() {
      console.log('###### 生成新的管理员: admin');
    });
  });
};

// Create Auto-Incrementing Sequence Field
// var callback = function() {
//   var Sequences = db.collections.sequences;
//   if (Sequences) {
//     Sequences.drop(function() {
//       console.log('###### 删除自动递增序列字段');
//       buildSequences();
//     });
//   } else {
//     buildSequencess();
//   };
// };

// var callback = function() {
//   builder.getNextSequence('classes', function(seq) {
//     console.log(seq);
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
// var callback = function() {
//   var conditions = { role: '01000000' };
//   User.find(conditions, function(err, users) {
//     if (users.length !== 0) {
//       User.remove(conditions, function() {
//         console.log('###### 删除所有管理员');
//         buildAdmin();
//       });
//       return;
//     }
//     buildAdmin();
//   });
// };


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', callback);
