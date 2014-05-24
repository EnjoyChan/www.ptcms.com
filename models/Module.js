//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var moduleSchema = new Schema({
  _id             : Number,
  description     : String,
  endTime         : String,
  name            : { type: String,  required: true },
  beginTime       : { type: String,  default: Date.now() },
  createTime      : { type: String,  default: Date.now() },
  isFinish        : { type: Boolean, default: false },
  creator         : { type: Number,  ref: 'User' },
  currentTask     : [{ type: Number, ref: 'Task' }],
  historyTask     : [{ type: Number, ref: 'Task' }]
});


//
//== Model
var Module = mongoose.model('Module', moduleSchema);


//
//== 暴露
module.exports = Module;
