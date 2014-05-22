//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var gradeSchema = new Schema({
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
  isGraduation: {           // 是否毕业
    type: Boolean,
    default: false
  }
});


//
//== Model
var Grade = mongoose.model('Grade', gradeSchema);


//
//== 暴露
module.exports = Grade;
