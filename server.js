/* eslint no-console: 0 */

import express from 'express';
import webpack from 'webpack';
import subdomain from 'subdomain';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import appController from './server/appController.js';
import sandboxController from './server/sandboxController.js';
import db from './server/database.js';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(cookieParser('some secret'));
app.use(compression());
app.use(subdomain({
  base: isDeveloping ? 'learncode.com' : 'kodeboksen.no',
  prefix: 'sandbox'
}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(express.static(__dirname + '/public'));

sandboxController(app);
appController(app);

if (isDeveloping) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

db.connect();

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
