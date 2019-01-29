const express = require('express'),
      path    = require('path'),
      open    = require('open'),
      app     = express();

const rootPath = '/webroot';

// テンプレートエンジン
app.set('views', path.join(__dirname + rootPath) );
app.set('view engine', 'pug');

// 静的ファイル
app.use(express.static(__dirname + rootPath, { index: false }));

// Routing
app.get('/', (req, res)=> {
  res.render('index');
});

app.get('/:dir', (req, res)=> {
  console.log(req.params.dir);
  res.render(req.params.dir + '/index', {title: req.params.dir});
});

// Error
app.use((err, req, res, next)=> {
  console.log('>> ERROR >>', err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(3000, ()=> {
  /* TODO
  console.log( app.locals );
  const openFlg = process.env.NODE_SERVER? !!(process.env.NODE_SERVER - 0) : false;
  if( openFlg ) {
    //open("http" + (webserver.https? 's':'') + "://" + webserver.host + ":" + webserver.port" );
  }
  */
  console.log("Express Server\nopen: http://localhost:3000");
});
