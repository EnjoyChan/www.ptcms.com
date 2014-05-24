//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var gradeSchema = new Schema({
  _id             : Number,
  name            : { type: String,  required: true },
  createTime      : { type: String,  default: Date.now() },
  isGraduation    : { type: Boolean, default: false },
  classe          : [{ type: Number, ref: 'Classe' }]
});


//
//== Model
var Grade = mongoose.model('Grade', gradeSchema);


//
//== 暴露
module.exports = Grade;
