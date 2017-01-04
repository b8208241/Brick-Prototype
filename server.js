const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require("path");
const jsonfile = require('jsonfile');
const jwt = require('jsonwebtoken');
const createStore = require('redux').createStore;
const match = require('react-router').match;
//const RouterContext = require('react-router').RouterContext

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
//Important!! babel/register is here for the whole code after it!
//It include babel-polyfill automatically for this file use,
//and transit every ES6 technique in this file to ES5
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

const reducer = require('./app/reducer.js');
const Routes = require('./app/pages/Routes.jsx');
const Brick_server = require('./app/Brick_server.jsx');
const verify = require('./verify.js');
var wallHistory = path.join(__dirname+'/data/wallHistory.json');
var topicHistory = path.join(__dirname+'/data/topicHistory.json');
var accountData = path.join(__dirname+'/data/accountData.json');

const container = {
  check_Token: function(req, res, path){
    var htmlHead = ReactDOMServer.renderToStaticMarkup(
      head(
        null,
        script({src: "https://unpkg.com/axios/dist/axios.min.js"}),
        script({src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js", type: "text/javascript"})
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
              //+"let script_Resource = document.createElement('script');"
              +"let script_render = document.createElement('script');"
              +"let script_Bundle = document.createElement('script');"

              //+"script_Resource.setAttribute('src', '/resource"+path+"?token='+token);"
              //+"document.getElementsByTagName('body')[0].appendChild(script_Resource);"
              +"script_render.setAttribute('src', '/render"+path+"?token='+token);"
              +"document.getElementsByTagName('body')[0].appendChild(script_render);"
              +"script_Bundle.setAttribute('src', '/bundle"+path+"?token='+token);"
              +"document.getElementsByTagName('body')[0].appendChild(script_Bundle);"
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
  require_Resource: function(req, res){
    res.sendFile(__dirname+'/resource.js')
  }
}
const process_LogIn =  {
  bundle: function(req, res){
    res.setHeader('content-type', 'application/javascript');
    console.log('start bundling login process');
    browserify({debug: true})
      .transform(babelify.configure({
        presets: ["react", "es2015", "stage-2"],
        //plugins: ["transform-runtime", "transform-object-rest-spread"],
        compact: false
      }))
      //.require("babel-polyfill")
      .require("./authorize.js", {entry: true})
      .bundle()
      .pipe(res);
  },
  /*log: function(req, res){
    console.log('recieve log request')
    jsonfile.readFile(accountData, function(err, data){
      if(err) {
        throw err;
      }else{
        let user = req.body.username;
        let userData = data.berlin;
        if(userData){
          if(req.body.password = userData.password){
            console.log('start jwt sign')
            var token = jwt.sign(
              {
                account: user
              },
              app.get('secret'),
              {
                expiresIn: 60*60*10
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
  }*/
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
              var token = jwt.sign(
                {
                  account: result.user
                },
                app.get('secret'),
                {
                  expiresIn: 60*60*12
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
  }
}
const server_Main = {
  server_Render: function(req, res){
    mysqlPool.getConnection(function(err, connection){
      if (err) {
         connection.release();
         res.json({"code" : 100, "status" : "Error in connection database"});
         return;
      };
      connection.query('SELECT*FROM `` WHERE `user` == req.decoded.account',
        function(err, result){
          if(err) throw err;
          if(!result){
            res.json({ success: false, message: 'Authenticate failed. User not found'});
          }else if(result){
            let userName =
            let preloadedState =
            // Create a new Redux store instance
            let store = createStore(reducer, preloadedState);
            let initialState = store.getState();
            console.log('store create')
            // Consider both redux & router, render to string
            match({routes: Routes, location: req.originalUrl}, (err, redirect, matchProps) => {
                if (err) {
                  // there was an error somewhere during route matching
                  res.status(500).send(err.message)
                } else if (redirect) {
                  //if there are any need for redirection from client side
                } else if (matchProps) {
                  console.log('routes match to props')
                  // if we got props then we matched a route
                  let appHtml = ReactDOMServer.renderToString(React.createFactory(Brick_server)({
                    store: store,
                    matchProps: matchProps
                  }));
                  res.setHeader('content-type', 'application/javascript');
                  res.send(server_Main.renderToApp(appHtml, initialState))
                } else {
                  // no errors, no redirect, we just didn't match anything
                  console.log('404 Not Found')
                  res.status(404).send('Not Found')
                }
            })
          }
        }
      )
    })
    /*jsonfile.readFile(topicHistory, function(err, data){
      if(err) throw err;
      let userName = req.decoded.account;
      let preloadedState = data[userName];
      // Create a new Redux store instance
      let store = createStore(reducer, preloadedState);
      let initialState = store.getState();
      console.log('store create')
      // Consider both redux & router, render to string
      match({routes: Routes, location: req.originalUrl}, (err, redirect, matchProps) => {
          if (err) {
            // there was an error somewhere during route matching
            res.status(500).send(err.message)
          } else if (redirect) {
            //if there are any need for redirection from client side
          } else if (matchProps) {
            console.log('routes match to props')
            // if we got props then we matched a route
            let appHtml = ReactDOMServer.renderToString(React.createFactory(Brick_server)({
              store: store,
              matchProps: matchProps
            }));
            console.log(appHtml)
            res.setHeader('content-type', 'application/javascript');
            res.send(server_Main.renderToApp(appHtml, initialState))
          } else {
            // no errors, no redirect, we just didn't match anything
            console.log('404 Not Found')
            res.status(404).send('Not Found')
          }
      })
    })*/
  },
  renderToApp: function(html, initialState){
    console.log('renderToApp')
    window.__PRELOADED_STATE__ = JSON.stringify(initialState);
    document.getElementById("app").innerHTML = html;
  },
  bundle: function(req, res){
    res.setHeader('content-type', 'application/javascript');

    browserify({debug: true})
      .transform(babelify.configure({
        presets: ["react", "es2015", "stage-2"],
        //plugins: ["transform-runtime", "transform-object-rest-spread"],
        compact: false
      }))
      //.require("babel-polyfill")
      .require("./app.js", {entry: true})
      .bundle()
      .pipe(res);
  }
}

app.set('view engine', 'jsx');
app.set('views', __dirname + '/app/pages');
app.engine('jsx', require('express-react-views').createEngine({ transformViews: false }));
app.set('secret', verify.secret);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/authorize'));
app.use(express.static(__dirname + '/no-Protect/colorbox-master'));
//Notice the position of this middleware!!
//It must be put "BEFORE" the codes it intends to protect!
app.use(function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token && token !== 'undefined') {
    console.log('it has a token');
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.', err: err})
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    let path = req.path;
    switch (path) {
      case "/bundle/":
        process_LogIn.bundle(req, res);
        break;
      case "/log":
        process_LogIn.log(req, res);
        break;
      case "/resource/":
        container.require_Resource(req, res);
        break;
      case "/render/":
        res.end(console.log('No Token!! please Log In first.'))
        break;
      default:
        console.log('enter first time')
        container.check_Token(req, res, path);
    }
  }
})

//read data after authentication
app.use(express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/actions'));
app.use(express.static(__dirname + '/app/pages'));
app.use(express.static(__dirname + '/app/js'));
app.use(express.static(__dirname + '/app/css'));

//attach required resource to the html
app.use('/resource/', function(req, res){
  console.log('require resource')
  container.require_Resource(req, res);
})

//bundle those pages needed to be authorized
app.use('/bundle/', function(req, res){
  console.log('bundle after log in')
  server_Main.bundle(req, res);
});

app.use('/render/', function(req, res){
  console.log('render Main on server')
  server_Main.server_Render(req, res);
})

app.post('/data', function(req, res){
  console.log('requesting data')
  let user = req.decoded.account;
  jsonfile.readFile(topicHistory, function(err, data){
    console.log(data);
    res.json(data);
  })
})

app.listen(3000);
console.log("Running at Port 3000~");
