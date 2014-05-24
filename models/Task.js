//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var taskSchema = new Schema({
  _id               : Number,
  description       : String,
  endTime           : String,
  schedule:         : String,
  beginTime         : { type: String,  default: Date.now() },
  createTime        : { type: String,  default: Date.now() },
  isFinish          : { type: Boolean, default: false },
  creator           : { type: Number,  ref: 'User' },
  currentFeedbacks  : [{ type: Number, ref: 'Feedback' }],
  historyFeedbacks  : [{ type: Number, ref: 'Feedback' }]
});


//
//== Model
var Task = mongoose.model('Task', taskSchema);


//
//== 暴露
module.exports = Task;
