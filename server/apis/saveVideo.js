import db from './../database.js';

export default function saveVideo(req, res) {
  db.stream(req, 'test')
  .then(() => {
    res.send({});
  })
  .catch(() => {
    console.log('Could not save audio');
  });
}
