import db from './../database.js';

export default function getCourse(req, res) {
  db.findOne('courses', {
    id: req.params.id
  }, {
    'scenes.files': 0
  })
  .then((course) => {
    res.type('json');
    res.send(course);
  })
  .catch(() => {
    console.log('Could not get course');
  });
}
