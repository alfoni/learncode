var updateSandbox = require('./sandbox/updateSandbox');

module.exports = function (router) {
  
  router.get('/course', function (req, res) {
    
    res.type('json');

    // TEMP
    setTimeout(function () {
      res.send({
        id: '',
        authorId: '123',
        logs: [],
        files: [{
          name: 'index.html',
          code: [
            '<!DOCTYPE html>',
            '<html>',
            '  <head>',
            '    <meta charset="UTF-8"/>',
            '  </head>',
            '  <body>',
            '    ',
            '  </body>',
            '</html>'
          ].join('\n')
        }],
        currentFileIndex: 0,
        currentFileName: 'index.html',
        showFolder: false,
        showAddFileInput: false,
        newFileName: '',
        showBrowser: true,
        lastClick: null,
        assignment: {
          showEditor: false,
          showAssignment: false,
          code: '',
          description: '',
          result: false
        }
      });
    }, 1000);

  });

  router.post('/sandbox', function (req, res) {
    updateSandbox(req.body.sandbox, req.body.assignment);
    res.type('json');
    res.end();
  });

};