//
//== 引入外部模块
var _ = require('lodash');


//
//== 引入AutoKey model
var AutoKey = require('../../models/AutoKey');


//
//== 方法

// 获取collections的递增键值，同时增1
var increase = function(name, callback) {
  var query = { name: name };
  var update = { $inc: { 'key': 1 } };
  var options = { new: false, upsert: true };

  AutoKey.findOne(query, function(err, doc) {
    if (err) return console.error(err);
    if (!doc) {
      var autoKey = new AutoKey({ name: name, key: 2 });
      autoKey.save(function(err, doc) {
        callback.call(null, doc.key - 1);
      });
    } else {
      AutoKey.findOneAndUpdate(query, update, options, function(err, doc) {
        console.dir(doc);
        if (err) return console.error(err);
        callback.call(null, doc.key);
      });
    }
  });
};

// 获取collections的递增键值
var current = function(name, callback) {
  AutoKey.findOne({ name: name }, function(err, doc) {
    if (err) return console.error(err);
    if (!doc) {
      var autoKey = new AutoKey({
        name: name
      });
      autoKey.save(function(doc) {
        callback.call(null, doc.key);
      });
    } else {
      callback.call(null, doc.key);
    }
  });
};

// 获取所有collections的递增键值
var all = function(callback) {
  var data = {},
      nameTmp,
      keyTmp;

  AutoKey.find({}, function(err, docs) {
    if (err) return console.error(err);
    data = _.reduce(docs, function(result, obj, index) {
      nameTmp = obj.name;
      keyTmp = obj.key;

      result[nameTmp] = keyTmp;
      return result;
    }, {})

    callback.call(null, data);
  });
};

// 设置指定collections的递增键值
var set = function(name, key, callback) {
  var query = { name: name };
  var update = {key: key};
  var options = { new: true, upsert: true };

  AutoKey.findOneAndUpdate(query, update, options, function(err, doc) {
    if (err) return console.error(err);
    callback.call(null, doc);
  });

};

//
//== 暴露
module.exports = {
  increase: increase,
  current: current,
  all: all,
  set: set
}
