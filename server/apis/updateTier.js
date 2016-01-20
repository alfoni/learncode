import db from './../database.js';

export default function updateTier(req, res) {
  db.update('tiers', {
    id: req.params.id
  }, {
    $set: Object.keys(req.body).reduce((update, key) => {
      if (key !== '_id') {
        update[key] = req.body[key];
      }

      return update;
    }, {})
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not update tier', e);
  });
}
