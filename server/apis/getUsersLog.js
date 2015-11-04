import db from './../database.js';

export default function getUsersLog(req, res) {
  db.find('users', {})
  .then((users) => {
    res.type('json');
    res.send(users);
  })
  .catch(() => {
    console.log('Could not get courses');
  });
}
