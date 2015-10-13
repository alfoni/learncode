export default function createScene(req, res) {
  setTimeout(function respond() {
    res.send({
      index: req.params.index,
      authorId: '123',
      name: req.body.name,
      showAddFileInput: false,
      showFolder: false,
      assignment: {
        description: '',
        code: [
          ''
        ].join('\n')
      },
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
      }]
    });
  }, 1000);
}
