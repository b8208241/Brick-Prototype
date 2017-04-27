const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require("path");
const jsonfile = require('jsonfile');
const jwt = require('jsonwebtoken');
const createStore = require('redux').createStore;
const match = require('react-router').match;
const update = require('immutability-helper');
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
    const meta = DOM.meta;
    const link = DOM.link;

const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:'qwer',
  database:'wallscape'
//  connectionLimit:
});

//Important!! babel/register is here for the whole code after it!
//'babel/register' is only for babel version under 6.0.0
//Babel 5.0.0 include babel-polyfill so we don't need to include it seperately,
//but also some redundent plugin would not be used
//and ignore node_modules/ by default.
require('babel/register');
const browserify = require('browserify');
const babelify = require("babelify");

const Login = require('./authorize/Login.jsx');
  const loginFlow = require('./authorize/login.js');
const Brick_server = require('./app/Brick_server.jsx');
  const reducer = require('./app/reducer.js');
  const Routes = require('./app/pages/Routes.jsx');
const verify = require('./verify.js');
var database_forServer = path.join(__dirname+'/data/database_forServer.json');
var topicHistory = path.join(__dirname+'/data/topicHistory.json');
var accountData = path.join(__dirname+'/data/accountData.json');

const container = {
  plain: function(req, res, location){
    var htmlHead = ReactDOMServer.renderToStaticMarkup(
      head(
        null,
        script({src: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js", type: "text/javascript"}),
        script({src: "https://unpkg.com/axios/dist/axios.min.js"}),
        meta({charSet: "utf-8"})
      )
    );
    var htmlBody = ReactDOMServer.renderToStaticMarkup(
      body(
        null,
        main({id: 'app'}),
        script(
          {dangerouslySetInnerHTML:{__html:
            'let token = window.localStorage.token;'
            +"function serverCheck(){"
              //+"let script_Resource = document.createElement('script');"
              +"let script_render = document.createElement('script');"
              +"let script_Bundle = document.createElement('script');"
              +"let script_Resource = document.createElement('script');"

              //+"script_Resource.setAttribute('src', '/resource"+path+"?token='+token);"
              //+"document.getElementsByTagName('body')[0].appendChild(script_Resource);"
              +"script_render.innerHTML = 'function serverRender(){ axios.get(`/render?token='+token+'&location="+location+"`).then(function(res){if(res.data.appHtml){window.__PRELOADED_STATE__ = res.data.initialState;document.getElementById(`app`).innerHTML = res.data.appHtml;}else if(res.data.authorizeHtml){document.getElementById(`app`).innerHTML = res.data.authorizeHtml;}});};serverRender();';"
              +"document.getElementsByTagName('body')[0].appendChild(script_render);"
              +"script_Bundle.setAttribute('src', '/bundle?token='+token+'&location="+location+"');"
              +"document.getElementsByTagName('body')[0].appendChild(script_Bundle);"
              +"script_Resource.setAttribute('src', '/resource?location="+location+"');"
              +"document.getElementsByTagName('body')[0].appendChild(script_Resource);"
            +"}"
            +'serverCheck();'
          }}
        )
      )
    );
    console.log('res plain html')
    res.setHeader('Content-Type', 'text/html');
    res.end(htmlHead + htmlBody);
  }
}
const process_LogIn =  {
  server_Render: function(req, res){
    let authorizeHtml = ReactDOMServer.renderToString(React.createFactory(Login)({
      loginFlow: loginFlow
    }));
    res.setHeader('content-type', "text/html");
    res.json({authorizeHtml})
  },
  bundle: function(req, res){
    res.setHeader('content-type', 'application/javascript');
    console.log('start bundling login process');
    browserify({debug: true})
      .transform(babelify.configure({
        presets: [
          "react",
          "es2015",
          "stage-2"
        ],
        compact: false
      }))
      //.require("babel-polyfill")
      .require("./authorize.js", {entry: true})
      .bundle()
      .on("error", function (err) { console.log("Error: " + err.message); })
      .pipe(res);
  },
  log: function(req, res){
    console.log('recieve log request')
    jsonfile.readFile(accountData, function(err, data){
      if(err) {
		 throw err;
        res.json({err: err});
      }else{
        let user = req.body.username;
        let userData = data[user];
        if(userData){
          if(req.body.password = userData.password){
            console.log('start jwt sign')
            var token = jwt.sign(
              {
                userName: user
              },
              app.get('secret'),
              {
                expiresIn: 60*60*12
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
/*  log: function(req, res){
    mysqlPool.getConnection(function(err, connection){
      if (err) {
         res.json({"code" : 100, "status" : "Error in connection database"});
         return;
      };
      console.log('connection success during log')
      connection.query('SELECT*FROM `` WHERE `` == req.body.username',
        function(err, result){
          if(err) throw err;
          if(!result){
            res.json({ success: false, message: 'Authenticate failed. User not found'});
          }else if(result){
            console.log(result)
            if (result.password != req.body.password){
              res.json({ success: false, message: 'Authenticate failed. Wrong password'});
            }else {
              var token = jwt.sign(
                {
                  userName: result.
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
  }*/
}
const server_Main = {
  server_Render: function(req, res){
    /*mysqlPool.getConnection(function(err, connection){
      if (err) {
         res.json({"code" : 100, "status" : "Error in connection database"});
         return;
      };
      connection.query('SELECT*FROM `` WHERE `` == req.decoded.userName',
        function(err, result){
          if(err) throw err;
          if(!result){
            res.json({ success: false, message: 'Authenticate failed. User not found'});
          }else if(result){
            console.log(result)
            let preloadedState = result
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
                  // if we got props then we matched a route
                  let appHtml = ReactDOMServer.renderToString(React.createFactory(Brick_server)({
                    store: store,
                    matchProps: matchProps
                  }));
                  res.setHeader('content-type', 'application/javascript');
                  res.json({appHtml, initialState})
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
    */
    jsonfile.readFile(database_forServer, function(err, data){
      if(err) throw err;
      let userName = req.decoded.userName;
      let preloadedState = data[userName];
      // Create a new Redux store instance
      let store = createStore(reducer, preloadedState);
      let initialState = store.getState();
      console.log('store create by server_Render')
      // Consider both redux & router, render to string
      match({routes: Routes, location: req.query.location}, (err, redirect, matchProps) => {
          if (err) {
            // there was an error somewhere during route matching
            res.status(500).send(err.message)
          } else if (redirect) {
            //if there are any need for redirection from client side
          } else if (matchProps) {
            // if we got props then we matched a route
            let appHtml = ReactDOMServer.renderToString(React.createFactory(Brick_server)({
              store: store,
              matchProps: matchProps
            }));
            res.setHeader('content-type', 'application/javascript');
            res.json({appHtml, initialState})
          } else {
            // no errors, no redirect, we just didn't match anything
            console.log('404 Not Found')
            res.status(404).send('Not Found')
          }
      })
    })
  },
  bundle: function(req, res){
    res.setHeader('content-type', 'application/javascript');
    console.log('bundle for "/", in server_Main')
    browserify({debug: true})
      .transform(babelify.configure({
        presets: [
          "react",
          "es2015",
          "stage-2"
        ],
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
app.use(express.static(__dirname + '/resource/css/img'));

//attach resource controller by location
app.get('/resource', function(req, res){
  console.log('require resource controller')
  let location = req.query.location;
  switch (location) {
    case "/":
      res.sendFile(path.join(__dirname+"/resource/resource.js"));
      break;
    default:
      res.json({message: "path err", location: location});
  }
})

//attach required resource to the html
app.get('/resource/:filetype/:filename', function(req, res){
  let filetype = req.params.filetype;
  let filename = req.params.filename;
  if(filetype == "basic"){
    switch (filename) {
      default:
        res.json({filename: filename, message: "resource not Found!"});
    }
  }
  else if(filetype == 'js'){
    let options = {
      root: __dirname + '/resource/js/'
    };
    res.sendFile(filename, options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }else {
        console.log('Sent:', filename);
      }
    });
  }
  else if(filetype == 'css'){
    let options = {
      root: __dirname + '/resource/css/'
    };
    res.sendFile(filename, options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }else {
        console.log('Sent:', filename);
      }
    });
  }else if(filetype ==='img'){
    let options = {
      root: __dirname + '/resource/img/'
    };
    res.sendFile(filename, options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }else {
        console.log('Sent:', filename);
      }
    });
  }
})

//Notice the position of this middleware!!
//It must be put "BEFORE" the codes it intends to protect!
app.use(function (req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  let path = req.path;
  if (token && token !== 'undefined') {
    jwt.verify(token, app.get('secret'), function (err, decoded) {
      if (err) {
        console.log('it does have a token, but err after verify');
        switch (path) {
          case "/bundle":
            process_LogIn.bundle(req, res);
            break;
          case "/render":
            process_LogIn.server_Render(req, res);
            break;
          case "/log":
            process_LogIn.log(req, res);
            break;
          default:
            res.json({success: false, message: 'Failed to authenticate token.', err: err});
          }
      } else {
        console.log('it has a verified token');
        req.decoded = decoded
        next()
      }
    })
  } else {
    switch (path) {
      case "/bundle":
        process_LogIn.bundle(req, res);
        break;
      case "/render":
        process_LogIn.server_Render(req, res);
        break;
      case "/log":
        process_LogIn.log(req, res);
        break;
      default:
        container.plain(req, res, path);
    }
  }
})

//read data after authentication
app.use(express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/app/actions'));
app.use(express.static(__dirname + '/app/pages'));
app.use(express.static(__dirname + '/app/pages/components'))

//bundle those pages needed to be authorized
app.use('/bundle', function(req, res){
  console.log('asking for bundle')
  let location = req.query.location;
  switch (location) {
    case "/":
      server_Main.bundle(req, res);
      break;
    default:
      res.json({message: "path err", location: location});
  }
});

app.use('/render', function(req, res){
  console.log('render Main on server')
  let location = req.query.location;
  switch (location) {
    case "/":
      server_Main.server_Render(req, res);
      break;
    default:
      res.json({message: "path err", location: location});
  }
})


app.post('/post/:type/:username', function(req, res){
  switch (req.params.type) {
    case "newtopic":
    console.log('post NewTopic to the database')
    let userName = req.params.username;
    jsonfile.readFile(database_forServer, function(err, data){
      let updatedData = update(data, {
        [userName]: {
          "topicData": {
            $merge: req.body.pageObject,
            "activeTopicRow": {$push: [req.body.newRecord]}
          }
        }
      })

      jsonfile.writeFile(database_forServer, updatedData, function(err){
        if(err) throw err;
      })
      res.json(updatedData);
    })
      break;
    case "editedbrick":
      console.log('post EditedBrick to the database')
      jsonfile.readFile(database_forServer, function(err, data){
        let updatedData = update(data, {
          [req.params.username]: {
            "topicData": {
              [req.body.topicId]: {
                [req.body.row]: {
                  [req.body.index]: {$set: req.body.newRecord}
                },
                "hashTag": {$merge: req.body.newRecord.hashTagObj},
                "questions": {$merge: req.body.newRecord.questionMarkobj},
                "hyphens": {$merge: req.body.newRecord.hyphenObj}
              }
            }
          }
        })

        jsonfile.writeFile(database_forServer, updatedData, function(err){
          if(err) throw err;
        })
        res.json(updatedData);
      })
      break;
    case "log":
      console.log('post log to the database')
      jsonfile.readFile(database_forServer, function(err, data){
        let updatedData = update(data, {
          [req.params.username]: {
            "topicData": {
              [req.body.topicId]: {
                "log": {$unshift: [req.body.newRecord]}
              }
            }
          }
        })
        jsonfile.writeFile(database_forServer, updatedData, function(err){
          if(err) throw err;
        })
        res.json(req.params.type + ' successfully post');
      })
      break;
    default:
      res.json('no matched type')
  }
})

app.patch('/patch/:type/:username', function(req, res){
  if(req.params.type==='positionchange'){
    console.log('patch positionchange to the database')
    jsonfile.readFile(database_forServer, function(err, data){
      let updatedData = update(data, {
        [req.params.username]: {
          "topicData": {
            [req.body.topicId]: {
              $apply: function(obj){
                let originBrick = update(obj[req.body.originRow][req.body.originIndex], {
                  $merge: {"index": req.body.targetIndex, "row": req.body.targetRow}
                });
                let cellDefault = update(req.body.defaultCell, {
                  $merge: {"index": req.body.originIndex, "row": req.body.originRow}
                });
                const newObj = update(obj, {
                  [req.body.targetRow]: {
                    [req.body.targetIndex]: {$set: originBrick}
                  }
                });
                return update(newObj, {
                  [req.body.originRow]: {
                    [req.body.originIndex]: {$set: cellDefault}
                  }
                })
              }
            }
          }
        }
      })
      jsonfile.writeFile(database_forServer, updatedData, function(err){
        if(err) throw err;
      })
      res.json(req.params.type + ' successfully patch');
    })
  }
})

app.delete('/recycle/brick/:username', function(req, res){
  console.log('recycle brick from database')
  let userName = req.params.username;
  jsonfile.readFile(database_forServer, function(err, data){
    if(err) throw err;
    let updatedData = update(data, {
      [userName]: {
        "topicData": {
            [req.body.topicId]: {
              $apply: function(obj){
                let cellDefault = update(req.body.newRecord, {
                  $merge: {"index": req.body.index, "row": req.body.row}
                });
                return update(obj, {
                  [req.body.row]: {
                    [req.body.index]: {$set: cellDefault}
                  }
                })
              }
            }
        }
      }
    })

    jsonfile.writeFile(database_forServer, updatedData, function(err){
      if(err) throw err;
    })
    res.json(updatedData);
  })
})
app.listen(process.env.port || 3000);
console.log("Running at Port 3000~");
