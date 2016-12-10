var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require("path");
var jsonfile = require('jsonfile');

var React = require('react');
var ReactDOMServer = require('react-dom/server');
  var DOM = React.DOM;
    var head = DOM.head;
    var body = DOM.body;
    var main = DOM.main;
    var section = DOM.section;
    var div = DOM.div;
    var script = DOM.script;
    var link = DOM.link;
var browserify = require('browserify');
var babelify = require("babelify");
require('babel/register')({
    ignore: false
});

var mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'0000',
  database:'brick'
//  connectionLimit:
});
var jwt = require('jsonwebtoken');
var verify = require('./verify.js');

var wallHistory = path.join(__dirname+'/data/wallHistory.json');
var topicHistory = path.join(__dirname+'/data/topicHistory.json');

const server_Get =  {
  brick: function(req, res){
      jsonfile.readFile(topicHistory, function(err, data){
        if(err) {
          throw err;
        }else{
          var htmlHead = ReactDOMServer.renderToStaticMarkup(
            head(
              null,
              script({src: "https://unpkg.com/axios/dist/axios.min.js"}),
              script({src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"})
            )
          );
          var htmlBody = ReactDOMServer.renderToStaticMarkup(
            body(
              null,
              main({id: 'app'}),
              script({src: '/bundle.js'})
            )
          );
          res.setHeader('Content-Type', 'text/html');
          res.end(htmlHead + htmlBody);
        }
      });
  }
}
const server_Post = {
  login: function(req, res){
    mysqlPool.getConnection(function(err, connection){
    if (err) {
       connection.release();
       res.json({"code" : 100, "status" : "Error in connection database"});
       return;
    };
    connection.query('SELECT*FROM `member` WHERE `user` == req.body.username',
      function(err, result){
        if(err) throw err;
        if(!result){
          res.json({ success: false, message: 'Authenticate failed. User not found'});
        }else if(result){
          if (result.password != req.body.password){
            res.json({ success: false, message: 'Authenticate failed. Wrong password'});
          }else {
            var token = jwt.sign(result, app.get('secret'), {
              expiresIn: 60*60*24
            })
            res.json({
              success: true,
              message: 'Enjoy your token',
              token: token
            })
          }
        }
        connection.release();
      }
    )
    })
  }
}

app.set('view engine', 'jsx');
app.set('views', __dirname + '/pages');
app.set('secret', verify.secret);
app.engine('jsx', require('express-react-views').createEngine({ transformViews: false }));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/actions'));
app.use(express.static(__dirname + '/app/auth'));
app.use(express.static(__dirname + '/app/pages'));
app.use(express.static(__dirname + '/data'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/bundle.js', function(req, res){
  res.setHeader('content-type', 'application/javascript');

  browserify({debug: true})
    .transform(babelify.configure({
      presets: ["react", "es2015"],
      plugins: ["transform-runtime", "transform-object-rest-spread"],
      compact: false
    }))
    .require("babel-polyfill")
    .require("./app.js", {entry: true})
    .bundle()
    .pipe(res);
});

app.get('/', function(req, res){
  server_Get.brick(req, res);
})

app.post('/login', function(req, res){
  server_Post.login(req, res);
})

app.listen(3000);
console.log("Running at Port 3000~");
