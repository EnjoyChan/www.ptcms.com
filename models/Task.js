//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var taskSchema = new Schema({
  _id               : Number,
  endTime           : String,
  schedule          : String,
  beginTime         : { type: String,  default: '' },
  createTime        : { type: String,  default: Date.now() },
  status            : { type: String,  default: '待定' },
  creator           : { type: Number,  ref: 'User' },
  action            : { type: Number,  ref: 'User' },
  feedbacks         : [{ type: Number, ref: 'Feedback' }],
  project           : { type: Number,  ref: 'Project'}
});


//
//== Model
var Task = mongoose.model('Task', taskSchema);


//
//== 暴露
module.exports = Task;
