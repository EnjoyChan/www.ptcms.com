//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var feedbackSchema = new Schema({
  _id               : Number,
  description       : String,
  createTime        : { type: String,  default: Date.now() },
});


//
//== Model
var Feedback = mongoose.model('Feedback', feedbackSchema);


//
//== 暴露
module.exports = Feedback;
