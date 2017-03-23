var express = require('express');
var app = express();
//var ejs = require('ejs');
//app.engine('.html', ejs.__express);
//app.set('view engine', 'html');
//app.use(express.static('node_modules'));//静态资源目录
var bodyParser = require('body-parser');//中间件,post请求必须用到的
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
/*app.get('/', function (req, res) {
    res.send('success');
});*/
app.use('/resume', require('./router/resume'));
app.listen(3000, function () {
    console.log('server start success');
});