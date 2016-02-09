import db from './../database.js';

const defaultIndex = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body>

  </body>
</html>`;

export default function updateMainAssignments(req, res) {

  const data = {
    files: req.body.files ? req.body.files : [{
      code: defaultIndex,
      name: 'index.html'
    }],
    authorName: req.body.authorName
  };

  db.update('mainAssignments', {
    userId: req.user.id
  }, {
    $set: data
  }, {
    upsert: true
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not update main assignment', e);
  });
}
