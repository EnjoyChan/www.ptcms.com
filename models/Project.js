//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var projectSchema = new Schema({
  _id             : Number,
  description     : String,
  endTime         : String,
  name            : { type: String,  required: true },
  beginTime       : String,
  createTime      : { type: String,  default: Date.now() },
  status          : { type: String,  default: '待分配' },//待分配、已分配、启动、暂停、完成
  creator         : { type: Number,  ref: 'User' },
  group           : { type: Number,  ref: 'Group'},
  feedbacks       : [{ type: Number,  ref: 'Feedback'}]
});


//
//== Model
var Project = mongoose.model('Project', projectSchema);


//
//== 暴露
module.exports = Project;
