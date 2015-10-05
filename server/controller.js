export default function controller(app) {
  app.get('/API/courses/:id', function getCourse(req, res) {
    setTimeout(function respond() {
      res.send({
        id: req.params.id,
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
          ].join('\n'),
          currentFileIndex: 0
        }]
      });
    }, 2000);
  });
}
