// CONFIG
var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3000;
var publicPath = path.resolve(__dirname, 'public');
var buildPath = path.resolve(__dirname, 'dist');

// SERVER
var express = require('express');
var subdomain = require('express-subdomain');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
var app = express();

// ROUTES
var appRoutes = require('./server/appRoutes.js');
var sandboxRoutes = require('./server/sandboxRoutes.js');
var sandboxRouter = express.Router();

app.use(subdomain('sandbox', sandboxRouter));
app.use(express.static(publicPath));
app.use(bodyParser.json());
sandboxRoutes(sandboxRouter);
appRoutes(app);

// BUILD
if (isProduction) {

  app.use('/build', express.static(buildPath));

} else {

  // Runs the build
  var bundle = require('./server/bundle.js');
  bundle();
  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });

  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });

}

app.listen(port, function() {
  console.log('Server running on port ' + port);
});
