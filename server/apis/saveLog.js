import db from './../database.js';

export default function saveUserLog(req, res) {
  db.insert('logs', {
    userId: req.cookies.kodeboksen,
    date: Date.now(),
    name: req.body.name,
    input: req.body.input
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not save user log', e);
  });
}
