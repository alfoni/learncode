import uuid from 'node-uuid';
import db from './../database.js';

export default function createSession(req, res) {
  const session = {
    id: uuid.v4(),
    created: Date.now(),
    signals: []
  };

  db.insert('sessions', session)
    .then(() => {
      res.type('json');
      res.send({
        sessionId: session.id
      });
    })
    .catch((e) => {
      console.log('Could not create session', e);
    });
}
