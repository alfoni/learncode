import db from './../database.js';

export default function trackSession(req, res) {
  const signal = {
    timestamp: Date.now(),
    name: req.body.name,
    input: req.body.input
  };

  db.update('sessions', {
    id: req.params.id
  }, {
    $push: {
      signals: signal
    }
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not track signal', e);
  });
}
