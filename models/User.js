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
  _id             : Number,
  qq              : String,
  phone           : String,
  email           : String,
  dormitory       : String,
  introduction    : String,
  birthday        : String,
  grade           : { type: Number, ref: 'Grade' },
  classe          : { type: Number, ref: 'Classe'},
  account         : { type: String, required: true },
  role            : { type: String, default: '00000001' },
  username        : { type: String, default: '未填写' },
  password        : { type: String, default: defaultPassword },
  createTime      : { type: String, default: Date.now() },
  jointime        : { type: String, default: Date.now() },
  currentTask     : [{ type: Number, ref: 'Task' }],
  historyTask     : [{ type: Number, ref: 'Task' }],
  currentGroup    : [{ type: Number, ref: 'Group' }],
  historyGroup    : [{ type: Number, ref: 'Group' }],
  currentModule   : [{ type: Number, ref: 'Module' }],
  historyModule   : [{ type: Number, ref: 'Module' }],
  currentProject  : [{ type: Number, ref: 'Project' }],
  historyProject  : [{ type: Number, ref: 'Project' }]
});


//
//== Model
var User = mongoose.model('User', userSchema);


//
//== 暴露
module.exports = User;
