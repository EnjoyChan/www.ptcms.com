//
//== 班级


//
//== 引入
var Classe = require('../models/Classe');
var key = require('../modules/key');


//
//== 方法

// 添加
var add = function(req, res) {
  var name      = req.body.name || '',
      alias     = req.body.alias || '',
      isOpen    = req.body.isopen || false,
      query     = { name: name },
      newclasse = {};

  var tmp = function(key) {
    Classe.findOne(query, function(err, classe) {
      if (err) return console.error(err);
      if (classe) return res.json({ status: 0, msg: '班级名称重复', classe: classe });
      newclasse = new Classe({
        number: key,
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

  key.increase('classes', tmp);

};

// 所有
var all = function(req, res) {
  Classe.find(function(err, classes) {
    if (err) return console.error(err);
    res.json({
      status: 1,
      data: { classes: classes }
    });
  });
};

// 删除
var del = function(req, res) {
  var number = req.number,
      query = {};
  if (!number) return res.json({ status: 0, msg: '发生错误' });
  query.number = number;
  Classe.findOneAndRemove(query, function(err, classe) {
    if (err) return console.error(err);
    res.json({ status: 1, msg: '删除成功', data: { number: classe.number } });
  });
};

// 更新
var update = function(req, res) {
  var query = {}, update = {};

  query.number = req.number;
  update.name = req.body.name;
  update.alias = req.body.alias;
  update.isOpen = req.body.isopen;

  Classe.findOneAndUpdate(query, update, function(err, classe) {
    if (err) return console.error(err);
    res.json({ status: 1, msg: '更新成功', data: { classe: classe } });
  });
};

module.exports = {
  add: add,
  all: all,
  del: del,
  update: update
};