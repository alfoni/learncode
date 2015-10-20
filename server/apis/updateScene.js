import db from './../database.js';

export default function updateCourse(req, res) {
  db.update('courses', {
    id: req.params.id
  }, {
    $set: Object.keys(req.body).reduce((update, key) => {
      update[`scenes.${req.params.index}.${key}`] = req.body[key];

      return update;
    }, {})
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not add recording', e);
  });
}
