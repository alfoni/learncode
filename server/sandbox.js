import path from 'path';
import getFileByPath from './sandbox/getFileByPath.js';
// import fs from 'fs';

const responseTypes = {
  '.html': 'html',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

export default function sandbox(app) {
  app.get('*', function getSandboxFile(req, res) {
    const file = getFileByPath(global.sandbox.files, req.path);

    if (!file) {
      return res.sendStatus(404);
    }

    const code = file.code;
    const type = responseTypes[path.extname(file.name)];

    /* Console and Assignment input
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

    } */

    res.type(type);
    res.send(code);
  });
}
