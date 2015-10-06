import sandbox from './sandbox.js';

export default function appController(router) {
  router.get('/API/courses/:id', function getCourse(req, res) {
    setTimeout(function respond() {
      res.send({
        id: req.params.id,
        authorId: '123',
        name: 'Whatever kurs',
        scenes: [
          {
            name: 'Scene 1'
          },
          {
            name: 'Scene 2'
          },
          {
            name: 'Scene 3'
          }
        ]
      });
    }, 50);
  });

  router.get('/API/courses/:id/scenes/:index', function getCourse(req, res) {
    setTimeout(function respond() {
      res.send({
        index: req.params.index,
        authorId: '123',
        name: 'Scene 1',
        currentFileIndex: 0,
        showAddFileInput: false,
        showFolder: false,
        currentFileName: '',
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
        sandboxFiles: [
          {
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
          }
        ]
      });
    }, 50);
  });

  router.post('/API/sandbox', function updateSandbox(req, res) {
    sandbox.update(req.body);
    res.type('json');
    res.send({});
  });
}
