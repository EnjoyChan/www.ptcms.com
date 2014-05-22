//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var classeSchema = new Schema({
  number: {                 // 序号
    type: Number,
    required: true
  },
  name: {                   // 名称
    type: String,
    required: true
  },
  alias: {                  // 别名
    type: String,
  },
  createTime: {             // 创建时间
    type: String,
    default: Date.now()
  },
  currentNumber: {          // 当前成员
    type: [Number]
  },
  historyNumber: {          // 历史成员
    type: [Number]
  },
  isOpen: {                 // 是否开始
    type: Boolean,
    default: false
  }
});


//
//== Model
var Classe = mongoose.model('Classe', classeSchema);


//
//== 暴露
module.exports = Classe;
