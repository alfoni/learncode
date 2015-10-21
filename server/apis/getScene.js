import db from './../database.js';

export default function getScene(req, res) {
  db.findOne('courses', {
    id: req.params.id
  }, {
    _id: 0,
    [`scenes.${req.params.index}`]: 1,
    'scenes.files': 1,
    'scenes.currentFileIndex': 1,
    'scenes.name': 1,
    'scenes.recording': 1
  })
  .then((course) => {
    res.type('json');
    res.send(course.scenes[0]);
  })
  .catch(() => {
    console.log('Could not get scene');
  })
}
