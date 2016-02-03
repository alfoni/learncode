/* eslint no-console: 0 */

import express from 'express';
import webpack from 'webpack';
import https from 'https';
import fs from 'fs';
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
import email from './server/email.js';
import introductionPhase2 from './server/emailTemplates/introductionPhase2.js';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use((req, res, next) => {
  if (!isDeveloping && req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect('https://www.kodeboksen.no');

    return;
  }
  next();
});
app.use(cookieParser('some secret'));
app.use(compression());
app.use(subdomain({
  base: isDeveloping ? 'kodeboksen.dev' : 'kodeboksen.no',
  ignoreWWW: true
}));

const tester = [{
  email: 'mads.andre.moen@gmail.com',
  name: 'mads.andre.moen@gmail.com'
}, {
  email: 'haa.blad@gmail.com',
  name: 'haa.blad@gmail.com'
}, {
  email: 'charlotte_susanne@live.no',
  name: 'charlotte_susanne@live.no'
}, {
  email: 'martingutt@live.no',
  name: 'martingutt@live.no'
}, {
  email: 'alfoni@hotmail.com',
  name: 'alfoni@hotmail.com'
}, {
  email: 'alfonilinus@gmail.com',
  name: 'alfonilinus@gmail.com'
}, {
  email: 'ragne.helberg@gmail.com',
  name: 'ragne.helberg@gmail.com'
}, {
  email: 'christianalfoni@gmail.com',
  name: 'christianalfoni@gmail.com'
}, {
  email: 'hannesalfoni@gmail.com',
  name: 'hannesalfoni@gmail.com'
}, {
  email: 'tommy.ostgaard@gmail.com',
  name: 'tommy.ostgaard@gmail.com'
}];

const others = [{
  email: 'martin@nowhow.no',
  name: 'martin@nowhow.no'
}, {
  email: 'jo.erlandsen@gmail.com',
  name: 'jo.erlandsen@gmail.com'
}, {
  email: 'bergchri@gmail.com',
  name: 'bergchri@gmail.com'
}];

const monokkel = [{
  email: 'aleksander@monokkel.io',
  name: 'aleksander@monokkel.io'
}, {
  email: 'daniel@uppercase.no',
  name: 'daniel@uppercase.no'
}, {
  email: 'fn@uppercase.no',
  name: 'fn@uppercase.no'
}, {
  email: 'kaare.nilsen@arktekk.no',
  name: 'kaare.nilsen@arktekk.no'
}, {
  email: 'mats@monokkel.io',
  name: 'mats@monokkel.io'
}, {
  email: 'tarjei@monokkel.io',
  name: 'tarjei@monokkel.io'
}];

const ducky = [{
  email: 'johan.eilertsen@gmail.com',
  name: 'johan.eilertsen@gmail.com'
}, {
  email: 'bogdan.glogovac@gmail.com',
  name: 'bogdan.glogovac@gmail.com'
}, {
  email: 'emil.lysholm@gmail.com',
  name: 'emil.lysholm@gmail.com'
}, {
  email: 'mads@ducky.no',
  name: 'mads@ducky.no'
}, {
  email: 'sigurdga@sigurdga.no',
  name: 'sigurdga@sigurdga.no'
}, {
  email: 'silje.s.solberg@gmail.com',
  name: 'silje.s.solberg@gmail.com'
}];

/*email({
  html: introductionPhase2(),
  subject: 'Introduksjon av Kodeboksen',
  from_email: 'post@kodeboksen.no',
  from_name: 'Kodeboksen',
  to: [{ //tester.concat(others, monokkel, ducky)
    email: 'tommy.ostgaard@gmail.com',
    name: 'tommy.ostgaard@gmail.com'
  }]
});*/

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

  db.connect();

  https.createServer({
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
  }, app).listen(port, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s');
  });

} else {

  db.connect();

  app.listen(port, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s');
  });

}
