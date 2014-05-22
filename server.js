//
//== 模块依赖

var express = require('express');
var router = require('./router');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan')


//
//== 连接mongo数据库
mongoose.connect('mongodb://localhost/ptcms');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connect to mongodb');
});


//
//== 创建app实例

var app = new express();


//
//== 配置app

// 端口号
app.set('port', process.env.PORT || 3000);

// 视图路径
app.set('views', path.join(__dirname, 'views'));

// View engine
app.engine('html', require('ejs').renderFile);


//
//== 中间件设置

// CSS和JS文件路径扩展
app.use(express.static(path.join(__dirname, '/public')));

// logger
app.use(logger());

// Cookie 解析器
app.use(cookieParser());

// 请求体解析器
app.use(bodyParser());

// 定义路由器
app.use(router);


var server = app.listen(3000, function() {
  console.log('app has started and listening on ports %d', server.address().port);
});
