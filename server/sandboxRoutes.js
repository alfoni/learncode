var path = require('path');
var getFileByPath = require('./sandbox/getFileByPath.js');
var fs = require('fs');

module.exports = function (router) {

  router.get('*', function (req, res) {
    
    var file = getFileByPath(global.sandbox.files, req.path);
    var type = null;
    var code = null;

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

    if (file.name === 'index.html') {
      code = file.code.replace('</head>', [ 
        '<script>', 
        fs.readFileSync(path.resolve(__dirname, '..', 'console.js')).toString(),
        '</script>\n</head>'
      ].join(''));

      if (global.sandbox.assignment) {
        console.log('Adding assignment!');
        code = code.replace('</head>', [ 
          '<script>', 
          fs.readFileSync(path.resolve(__dirname, '..', 'assignmentTestRunner.js'))
            .toString()
            .replace('%{CODE}%', global.sandbox.assignment.replace(/\'/g, '\\\''))
            .split('\n').join(''),
          '</script>\n</head>'
        ].join(''));

      }

    } else {
      code = file.code;
    }

    res.type(type);
    res.send(code);

  });

};