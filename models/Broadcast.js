//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var broadcastSchema = new Schema({
  _id               : Number,
  description       : String,
  createTime        : { type: String,  default: Date.now() },
  creator           : { type: Number,  ref: 'User'}
});


//
//== Model
var Broadcast = mongoose.model('Broadcast', broadcastSchema);


//
//== 暴露
module.exports = Broadcast;
