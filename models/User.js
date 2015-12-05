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
  account         : { type: String, required: true },
  password        : { type: String, default: defaultPassword },
  username        : { type: String, default: '佚名' },
  phone           : String,
  birthday        : String,
  role            : { type: String, default: '11' },  
  jointime        : { type: String, default: Date.now() },
  tasks           : [{ type: Number, ref: 'Task' }],
  currentGroup    : [{ type: Number, ref: 'Group' }],
  historyGroup    : [{ type: Number, ref: 'Group' }],
  projects        : [{ type: Number, ref: 'Project' }],
  status          : { type: String, default: 'true' },//false(离职)，true（在职）
  resume          : { type: Number, ref: 'Resume' },
  introduction    : String,
  feedbacks       : [{ type: Number, ref: 'Feedback' }]
});


//
//== Model
var User = mongoose.model('User', userSchema);


//
//== 暴露
module.exports = User;
