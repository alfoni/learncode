import path from 'path';
import sandbox from './../sandbox';
import fs from 'fs';
import responseSync from './../responseSync';

const responseTypes = {
  '.html': 'html',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

export default function getSandboxFile(req, res) {
  const assignment = sandbox.getAssignment();
  const file = sandbox.getFile(req.path.replace('/sandbox/sandbox', ''));

  if (!file) {
    return res.sendStatus(404);
  }

  let code = file.code;
  const type = responseTypes[path.extname(file.name)];

  /* Console and Assignment input
  if (file.name === 'index.html') {
    code = file.code.replace('</head>', [
      '<script>',
      fs.readFileSync(path.resolve(__dirname, '..', 'console.js')).toString(),
      '</script>\n</head>'
    ].join(''));
  }
*/

  if (file.name === 'index.html') {
    const insertScript = ['<script>',
    fs.readFileSync(path.resolve(__dirname, '../..', 'assignmentTestRunner.js'))
      .toString()
      .replace('%{CODE}%', assignment.code.replace(/\'/g, '\\\''))
      .split('\n').join(''),
    '</script>'].join('');
    const headTagExists = code.indexOf('<head>') >= 0;

    if (assignment && assignment.code) {
      if (headTagExists) {
        code = code.replace('</head>', [
          insertScript,
          '\n</head>'
        ].join(''));
      } else {
        code = code.replace('<html>', [
          '<html>',
          '\n<head>',
          insertScript,
          '\n</head>'
        ].join(''));
      }
    }

    const id = req.query.id;

    if (!responseSync[id]) {
      responseSync[id] = function response() {
        res.type(type);
        res.send(code);
      };

      return;
    } else {
      delete responseSync[id];
    }
  }

  res.type(type);
  res.send(code);
}
