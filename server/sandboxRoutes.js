var path = require('path');
var getFileByPath = require('./sandbox/getFileByPath.js');

module.exports = function (router) {

  router.get('*', function (req, res) {
    
    console.log('req.path', req.path);
    var file = getFileByPath(global.sandbox, req.path);
    var type = null;

    console.log('file', file);
    if (!file) {
      return res.sendStatus(404);
    }

    switch (path.extname(file.name)) {
      case '.html':
        type = 'html';
        break;
      case '.js':
        type = 'text/javascript';
        break;
      case '.css':
        type = 'text/css';
        break;
    }

    console.log('type', type);

    res.type(type);
    res.send(file.code);

  });

};