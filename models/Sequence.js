//
//== 引用 mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//
//== Schema
var sequenceSchema = new Schema({
  _id             : String,
  seq             : { type: Number, default: 0 }
});


//
//== Model
var Sequence = mongoose.model('Sequence', sequenceSchema);


//
//== 暴露
module.exports = Sequence;
