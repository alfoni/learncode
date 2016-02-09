import db from './../database.js';

const defaultIndex = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body>

  </body>
</html>`;

export default function getMainAssignment(req, res) {
  db.findOne('mainAssignments', {
    id: req.params.tierId + '-' + req.params.sessionId
  })
  .then((mainAssignment) => {
    console.log('id:' + req.params.tierId + '-' + req.params.sessionId);
    console.log(mainAssignment);
    res.type('json');
    res.send(mainAssignment || {
      files: [{
        code: defaultIndex,
        name: 'index.html'
      }],
      autorName: ''
    });
  })
  .catch(() => {
    console.log('Could not get main assignment');
  });
}
