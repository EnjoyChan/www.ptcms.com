/*
为每个表格生成递增序列
*/
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

var setCurrentSequence = function(name, seq, callback) {
	var query = { _id: name},
			update = {'seq': seq},
			options = { new : true, upsert: true },
	    ret = Sequence.findOneAndUpdate(query, update, options);

	ret.exec(function(err, doc) {
		callback(err);
	});
}


//
//== 暴露
module.exports = {
  getNextSequence: getNextSequence,
  setCurrentSequence: setCurrentSequence
};