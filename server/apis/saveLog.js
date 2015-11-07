import db from './../database.js';

export default function saveUserLog(req, res) {
  db.insert('logs', {
    id: req.cookies.kodeboksen,
    date: Date.now(),
    type: req.body.type
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not save user log', e);
  });
}
