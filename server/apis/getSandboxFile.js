import path from 'path';
import sandbox from './../sandbox.js';
import fs from 'fs';

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

  const insertScript = ['<script>',
  fs.readFileSync(path.resolve(__dirname, '../..', 'assignmentTestRunner.js'))
    .toString()
    .replace('%{CODE}%', assignment.code.replace(/\'/g, '\\\''))
    .split('\n').join(''),
  '</script>'].join('');
  const headTagExists = code.indexOf('<head>') >= 0;

  if (file.name === 'index.html' && assignment && assignment.code) {
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

  res.type(type);
  setTimeout(() => {
    res.send(code);
  }, 200);
}
