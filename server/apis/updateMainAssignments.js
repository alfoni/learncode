import db from './../database.js';

export default function updateMainAssignments(req, res) {
  db.update('mainAssignments', {
    id: req.params.tierId + '-' + req.params.sessionId
  }, {
    $set: req.body
  }, {
    upsert: true
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not update main assignment', e);
  });
}
