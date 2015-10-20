import db from './../database.js';

export default function addRecording(req, res) {
  db.update('courses', {
    id: req.params.id
  }, {
    $set: {
      [`scenes.${req.params.index}.recording`]: req.body.recording
    }
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not add recording', e);
  });
}
