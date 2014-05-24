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
  beginTime       : { type: String,  default: Date.now() },
  createTime      : { type: String,  default: Date.now() },
  isFinish        : { type: Boolean, default: false },
  creator         : { type: Number,  ref: 'User' },
  currentModules  : [{ type: Number, ref: 'Module' }],
  historyModules  : [{ type: Number, ref: 'Module' }],
  currentLeaders  : [{ type: Number, ref: 'User' }],
  historyLeaders  : [{ type: Number, ref: 'User' }]
});


//
//== Model
var Project = mongoose.model('Project', projectSchema);


//
//== 暴露
module.exports = Project;
