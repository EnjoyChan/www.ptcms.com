//
//== 引入
var Sequence = require('../models/Sequence');


//
//== 定义变量
var getNextSequence = function(name, callback) {
  var query = { _id: name };
  var update = { $inc: { 'seq': 1 } };
  var options = { new: true, upsert: true };

  var ret = Sequence.findOneAndUpdate(query, update, options);

  ret.exec(function(err, doc) {
    callback(doc.seq);
  });

};


//
//== 暴露
module.exports = {
  getNextSequence: getNextSequence
};