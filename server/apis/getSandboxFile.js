import path from 'path';
import sandbox from './../sandbox';
import fs from 'fs';
import responseSync from './../responseSync';

const responseTypes = {
  '.html': 'html',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

const assignmentTestRunner = fs.readFileSync(path.resolve(__dirname, '../..', 'assignmentTestRunner.js'));
const mouseClickScript = fs.readFileSync(path.resolve(__dirname, '../..', 'mouseClickScript.js'));

export default function getSandboxFile(req, res) {
  const id = req.query.id;
  const file = sandbox.getFile(req.path.replace('/subdomain/sandbox', ''));
  const type = responseTypes[path.extname(file.name)];

  const createIndexResponse = (code) => {
    const assignment = sandbox.getAssignment();

    const insertAssignmentScript = ['<script>',
    assignmentTestRunner
      .toString()
      .replace('%{CODE}%', assignment.code.replace(/\'/g, '\\\''))
      .split('\n').join(''),
    '</script>'].join('');

    const insertMouseClickScript = ['<script>',
      mouseClickScript
        .toString()
        .split('\n').join(''),
      '</script>'].join('');

    code = code.replace('</body>', [
      '<span></span>',
      insertMouseClickScript,
      '\n</body>'
    ].join(''));

    code = code.replace('</body>', [
      '<span></span>',
      insertAssignmentScript,
      '\n</body>'
    ].join(''));

    return code;
  };

  if (file.name === 'index.html' && !responseSync[id]) {
    responseSync[id] = function response() {
      const index = createIndexResponse(sandbox.getFile(req.path.replace('/subdomain/sandbox', '')).code);
      res.type(type);
      res.send(index);
      delete responseSync[id];
    };
  } else if (file.name === 'index.html') {
    const index = createIndexResponse(sandbox.getFile(req.path.replace('/subdomain/sandbox', '')).code);
    res.type(type);
    res.send(index);
    delete responseSync[id];
  } else {
    if (!file) {
      return res.sendStatus(404);
    }
    res.type(type);
    res.send(file.code);
  }
}
