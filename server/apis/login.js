import registration from './../emailTemplates/registration';
import confirmation from './../emailTemplates/confirmation';
import db from './../database.js';
import email from './../email.js';
import sessionCache from '../sessionCache';

export default function registerSignup(req, res) {
  const id = req.body.email;
  const password = req.body.password;

  db.findOne('users', {
    id: id
  })
    .then((user) => {
      if (!user) {
        throw new Error('NONE_EXISTING_USER');
      }

      if (user.password !== password) {
        throw new Error('WRONG_PASSWORD');
      }
    })
    .then(() => {
      sessionCache.set(id);

      db.insert('logs', {
        id: id,
        date: Date.now(),
        type: 'LOGGED_IN'
      });
    })
    .then(() => {
      res.cookie('kodeboksen', id, {
        maxAge: 86400 * 1000 * 7,
        domain: process.env.NODE_ENV === 'production' ? '.kodeboksen.no' : '.kodeboksen.dev',
        httpOnly: true
      });
      res.send({
        id: id,
        isAdmin: req.body.email === 'post@kodeboksen.no'
      });
    })
    .catch((e) => {
      console.log('Could not handle user', e);
      res.status(500);
      res.send(e.message);
    });
}
