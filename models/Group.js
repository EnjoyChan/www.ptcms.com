// 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var groupSchema = new Schema({
  number: {                 // 序号
    type: Number,
    required: true,
    unique: true
  },
  name: {                   // 名称
    type: String,
    required: true
  },
  createTime: {             // 创建时间
    type: Date,
    default: Date.now
  },
  currentNumber: {          // 当前成员
    type: [Number]
  },
  historNumber: {           // 历史成员
    type: [Number]
  },
  isOpen: {                 // 是否开启
    type: Boolean,
    default: false
  },
  leader: {                 // 小组长
    type: Number
  }
});


//
//== Model
var Group = mongoose.model('Group', groupSchema);


//
//== 暴露
module.exports = Group;
