import db from './../database.js';

export default function updateCourse(req, res) {
  db.update('courses', {
    id: req.params.id
  }, {
    $set: req.body
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not add recording', e);
  });
}
