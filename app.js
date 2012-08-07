
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  express['static'](__dirname + '/public'); //app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/image', routes.image);

app.post('/image', routes.image);

app.get('/audio', routes.audio);

app.post('/audio', routes.audio);

app.listen(process.env.C9_PORT, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
