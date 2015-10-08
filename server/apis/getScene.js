export default function getScene(req, res) {
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
      },
      {
        name: 'test.html',
        code: [
          '<!DOCTYPE html>',
          '<html>',
          '  <head>',
          '    <meta charset="UTF-8"/>',
          '  </head>',
          '  <body>',
          '    <h1>Test</h1>',
          '  </body>',
          '</html>'
        ].join('\n')
      }]
    });
  }, 50);
}
