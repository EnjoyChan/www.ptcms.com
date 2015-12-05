// 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var groupSchema = new Schema({
  _id             : Number,
  endTime         : String,
  description     : String,
  name            : { type: String,  required: true },
  createTime      : { type: String,  default: Date.now() },
  isOpen          : { type: String, default: 'true' },//废弃或存在
  currentLeader   : { type: Number,  ref: 'User' },
  historyLeaders  : [{ type: Number, ref: 'User' }],
  currentStaffs   : [{ type: Number, ref: 'User' }],
  hostoryStaffs   : [{ type: Number, ref: 'User' }],
  projects        : [{ type: Number, ref: 'Project' }]
});


//
//== Model
var Group = mongoose.model('Group', groupSchema);


//
//== 暴露
module.exports = Group;
