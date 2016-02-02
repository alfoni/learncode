import db from './../database.js';

const defaultIndex = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body>

  </body>
</html>`;

export default function createScene(req, res) {
  const scene = Object.assign({
    files: [{
      name: 'index.html',
      code: defaultIndex
    }],
    assignments: []
  }, req.body);

  db.update('courses', {
    id: req.params.id
  }, {
    $push: {
      scenes: scene
    }
  })
  .then(() => {
    res.type('json');
    res.send(scene);
  })
  .catch((e) => {
    console.log('Could not create course', e);
  });
}
