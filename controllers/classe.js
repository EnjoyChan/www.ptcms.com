//
//== 班级


//
//== 引入模型
var Classe      = require('../models/Classe');


//
//== 引入控制器
var builder = require('./builder');


//
//== 方法

// 添加
var add = function(req, res) {
  var name      = req.body.name || '',
      alias     = req.body.alias || '',
      isOpen    = req.body.isopen || false,
      query     = { name: name },
      newclasse = {};

  var tmp = function(seq) {
    Classe.findOne(query, function(err, classe) {
      if (err) return console.error(err);
      if (classe) return res.json({ status: 0, msg: '班级名称重复', classe: classe });
      newclasse = new Classe({
        _id: seq,
        name: name,
        alias: alias,
        isOpen: isOpen
      });
      newclasse.save(function(err, classe) {
        if (err) return console.error(err);
        res.json({ status: 3, data: { classe: classe } });
      });
    });
  };

  builder.getNextSequence('classes', tmp);

};

// 所有
var all = function(req, res) {
  Classe.find(function(err, classes) {
    if (err) return console.error(err);
    res.json({ status: 1, data: { classes: classes } });
  });
};

// 删除
var del = function(req, res) {
  var _id = req._id,
      query = {};
  if (!_id) return res.json({ status: 0, msg: '发生错误' });
  query._id = _id;
  Classe.findOneAndRemove(query, function(err, classe) {
    if (err) return console.error(err);
    res.json({ status: 1, msg: '删除成功', data: { classe: classe } });
  });
};

// 更新
var update = function(req, res) {
  var query = {}, update = {};

  query._id = req._id;
  update.name = req.body.name;
  update.alias = req.body.alias;
  update.isOpen = req.body.isopen;

  Classe.findOneAndUpdate(query, update, function(err, classe) {
    if (err) return console.error(err);
    res.json({ status: 1, msg: '更新成功', data: { classe: classe } });
  });
};

var one = function(req, res) {
  res.json({
    status: 1,
    data: {
      method: 'get'
    }
  });
};

module.exports = {
  add: add,
  all: all,
  del: del,
  update: update,
  one: one
};