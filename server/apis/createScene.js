import db from './../database.js';

const defaultIndex = `<!DOCTYPE html>
<html>
  <meta charset="utf-8"/>
  <body>

  </body>
</html>
`;

export default function createScene(req, res) {
  const scene = Object.assign({
    files: [{
      name: 'index.html',
      code: defaultIndex
    }]
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
