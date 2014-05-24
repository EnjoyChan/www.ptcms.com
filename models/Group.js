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
  beginTime       : { type: String,  default: Date.now() },
  createTime      : { type: String,  default: Date.now() },
  isOpen          : { type: Boolean, default: false },
  currentLeader   : { type: Number,  ref: 'User' },
  historyLeaders  : [{ type: Number, ref: 'User' }],
  currentStaffs   : [{ type: Number, ref: 'User' }],
  hostoryStaffs   : [{ type: Number, ref: 'User' }]
});


//
//== Model
var Group = mongoose.model('Group', groupSchema);


//
//== 暴露
module.exports = Group;
