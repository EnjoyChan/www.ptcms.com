//
//== 引入模块
var mongoose = require('mongoose');
var crypto = require('crypto');


//
//== 定义变量
var Schema = mongoose.Schema;
var hash = crypto.createHash('md5');
var defaultPassword = hash.update('123').digest('base64');


//
//== Schema
var userSchema = mongoose.Schema({
  number: {                       // 序号
    type: Number,
    required: true
  },
  account: {                      // 账号
    type: String,
    required: true
  },
  username: {                     // 姓名
    type: String,
    default: '未填写'
  },
  password: {                     // 密码
    type: String,
    default: defaultPassword
  },
  grade: {                        // 年级
    type: Number
  },
  role: {                         // 角色
    type: String,
    default: '00000001'
  },
  classe: {                       // 班级
    type: Number
  },
  dormitory: {                    // 宿舍
    type: String
  },
  phone: {                        // 电话
    type: String
  },
  email: {                        // 邮箱
    type: String
  },
  qq: {                           // QQ
    type: String
  },
  createTime: {                   // 创建时间
    type: String,
    default: Date.now()
  },
  jointime: {                     // 加入时间
    type: String,
    default: Date.now()
  },
  introduction: {                 // 自我介绍
    type: String
  },
  currentTask: [Number],          // 当前任务
  historyTask: [Number],          // 历史任务
  currentGroup: [Number],         // 当前小组
  historyGroup: [Number],         // 历史小组
  currentProject: [Number],       // 当前项目
  historyProject: [Number]        // 历史项目
});


//
//== Model
var User = mongoose.model('User', userSchema);


//
//== 暴露
module.exports = User;
