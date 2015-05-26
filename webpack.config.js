var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var materialUIPath = path.resolve(__dirname, 'node_modules', 'material-ui');
var buildPath = path.resolve(__dirname, 'public', 'build');

var config = {
  context: __dirname,
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    path.resolve(appPath, 'main.js')
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  resolve: {
    // ...other resolve settings ...
    alias: {
      "react": __dirname + '/node_modules/react',
      "react/addons": __dirname + '/node_modules/react/addons',
    }
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'react-hot!babel?optional[]=es7.decorators,optional[]=es7.objectRestSpread,optional[]=es7.classProperties',
      include: [materialUIPath, appPath]
    }, {
      test: /\.(less|css)$/,
      loader: 'style!css!less'
    }, {
      test: /\.woff$/,
      loader: 'url?limit=25000'
    }]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
