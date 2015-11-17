import db from './../database.js';

export default function getSessions(req, res) {
  db.find('sessions')
  .then((sessions) => {
    res.type('json');
    res.send(sessions);
  })
  .catch(() => {
    console.log('Could not get sessions');
  });
}
