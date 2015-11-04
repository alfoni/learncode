import db from './../database.js';

export default function saveUserLog(req, res) {
  db.update('users', {
    id: req.params.userId
  }, {
    $push: {
      log: req.body
    }
  }, {
    upsert: true
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not save user log', e);
  });
}
