const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require("path");
const jsonfile = require('jsonfile');
const jwt = require('jsonwebtoken');
const verify = require('./verify.js');

const React = require('react');
const ReactDOMServer = require('react-dom/server');
  const DOM = React.DOM;
    const head = DOM.head;
    const body = DOM.body;
    const main = DOM.main;
    const section = DOM.section;
    const div = DOM.div;
    const script = DOM.script;
    const link = DOM.link;
const browserify = require('browserify');
const babelify = require("babelify");
require('babel/register')({
    ignore: false
});

const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'0000',
  database:'brick'
//  connectionLimit:
});

app.set('view engine', 'jsx');
app.set('views', __dirname + '/pages');
app.engine('jsx', require('express-react-views').createEngine({ transformViews: false }));
app.set('secret', verify.secret);
var wallHistory = path.join(__dirname+'/data/wallHistory.json');
var topicHistory = path.join(__dirname+'/data/topicHistory.json');
var accountData = path.join(__dirname+'/data/accountData.json');

const process_LogIn =  {
  container: function(req, res){
    console.log('enter first time')
    var htmlHead = ReactDOMServer.renderToStaticMarkup(
      head(
        null,
        script({src: "https://unpkg.com/axios/dist/axios.min.js"})
      )
    );
    var htmlBody = ReactDOMServer.renderToStaticMarkup(
      body(
        null,
        main({id: 'app'}),
        script(
          {dangerouslySetInnerHTML:{__html:
            'let token = window.localStorage.token;'
            +"function statusCheck(){"
              +"let script = document.createElement('script');"
              +"script.setAttribute('src', '/bundle?token='+token);"
              +"document.getElementsByTagName('body')[0].appendChild(script);"
              +"}"
            +'statusCheck();'
          }}
        )
      )
    );
    console.log('res html')
    res.setHeader('Content-Type', 'text/html');
    res.end(htmlHead + htmlBody);
  },
  bundle: function(req, res){
    res.setHeader('content-type', 'application/javascript');
    console.log('start bundling login process');
    browserify({debug: true})
      .transform(babelify.configure({
        presets: ["react", "es2015"],
        plugins: ["transform-runtime", "transform-object-rest-spread"],
        compact: false
      }))
      .require("babel-polyfill")
      .require("./authorize.js", {entry: true})
      .bundle()
      .pipe(res);
  },
  log: function(req, res){
    console.log('recieve log request')
    jsonfile.readFile(accountData, function(err, data){
      if(err) {
        throw err;
      }else{
        let user = req.body.username;
        console.log(user)
        let userData = data.berlin;
        console.log(userData)
        if(userData){
          if(req.body.password = userData.password){
            console.log('start jwt sign')
            var token = jwt.sign(
              {
                account: user
              },
              app.get('secret'),
              {
                expiresIn: 60*2
              }
            );
            res.json({
              success: true,
              message: 'Enjoy your token',
              token: token
            })
          }else {
            res.json({ success: false, message: 'Authenticate failed. Wrong password'});
          }
        }
      }
    })
  }
  /*
  log: function(req, res){
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
              var token = jwt.sign({
                account: result.id,
              }, app.get('secret'), {
                expiresIn: 60*60*24
              });
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
  }*/
}
const server_Bundle = {
  brick: function(req, res){
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
  }
}
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
              script({src: '/bundle'})
            )
          );
          res.setHeader('Content-Type', 'text/html');
          res.end(htmlHead + htmlBody);
        }
      });
  }
};

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/actions'));
app.use(express.static(__dirname + '/app/auth'));
app.use(express.static(__dirname + '/app/pages'));
app.use(express.static(__dirname + '/authorize'));
app.use(express.static(__dirname + '/server'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Notice the position of this middleware!!
//It must be put "BEFORE" the codes it intends to protect!
app.use(function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token && token !== 'undefined') {
    console.log('it has a token');
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'})
      } else {
        req.decoded = decoded
        //user id = decoded.account
        next()
      }
    })
  } else {
    let path = req.path;
    if(path == "/bundle"){
      process_LogIn.bundle(req, res);
    }else if(path == "/log"){
      process_LogIn.log(req, res);
    }else{
      process_LogIn.container(req, res);
    }
  }
})

//read data after authentication
app.use(express.static(__dirname + '/data'));

//bundle those pages needed to be authorized
app.use('/bundle', function(req, res){
  console.log('bundle after log in')
  server_Bundle.brick(req, res);
});

app.get('/', function(req, res){
  console.log('get / after log in')
  server_Get.brick(req, res);
})

app.listen(3000);
console.log("Running at Port 3000~");
