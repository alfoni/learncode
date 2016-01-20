import uuid from 'node-uuid';
import db from './../database.js';

export default function createTier(req, res) {
  const tier = {
    id: uuid.v4(),
    created: Date.now(),
    name: req.body.name,
    courseDependencyList: []
  };

  db.insert('tiers', tier)
    .then(() => {
      res.type('json');
      res.send({tier: tier});
    })
    .catch((e) => {
      console.log('Could not create tier', e);
    });
}
