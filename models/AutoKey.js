//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var aotuKrySchema = new Schema({
  name: {                     // Collection 名称
    type: String,
    required: true
  },
  key: {                      // 当前可使用key
    type: Number,
    default: 1
  },
  createTime: {               // 创建时间
    type: String,
    default: Date.now()
  }
});


//
//== Model
var AutoKey = mongoose.model('AutoKey', aotuKrySchema);


//
//== 暴露
module.exports = AutoKey;
