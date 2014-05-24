//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var classeSchema = new Schema({
  _id             : Number,
  alias           : String,
  name            : { type: String,  required: true },
  createTime      : { type: String,  default: Date.now() },
  isOpen          : { type: Boolean, default: false }
});


//
//== Model
var Classe = mongoose.model('Classe', classeSchema);


//
//== 暴露
module.exports = Classe;
