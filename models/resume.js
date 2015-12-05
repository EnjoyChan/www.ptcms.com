// 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var resumeSchema = new Schema({
  _id             : Number,
  name            : String,
  birthday        : String,
  school          : String,
  phone           : String,
  email           : String,
  experience      : String,
  honor           : String,
  introduction    : String,
  role            : String,
  createTime      : { type: String,  default: Date.now() },
  updateTime      : String,
  status          : { type: String, default: '未投递' },
  comment         : String,
  commentor       : String
});


//
//== Model
var Resume = mongoose.model('Resume', resumeSchema);


//
//== 暴露
module.exports = Resume;
