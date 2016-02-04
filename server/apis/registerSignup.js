import registration from './../emailTemplates/registration';
import confirmation from './../emailTemplates/confirmation';
import db from './../database.js';
import email from './../email.js';

export default function registerSignup(req, res) {
  var id = String(Date.now());
  db.findOne('users', {
    id: id
  })
    .then((user) => {
      if (user) {
        return;
      }
      /*
      return Promise.all([
        db.insert('users', {
          id: id
        }),
        email({
          html: registration(),
          subject: 'Registration confirmation',
          from_email: 'noreply@kodeboksen.no',
          from_name: 'Kodeboksen',
          to: [{
            email: req.body.email,
            name: req.body.email
          }]
        }),
        email({
          html: confirmation(req.body.email),
          subject: 'Registration confirmation',
          from_email: 'noreply@kodeboksen.no',
          from_name: 'Kodeboksen',
          to: [{
            email: 'christianalfoni@gmail.com',
            name: 'Christian Jørgensen'
          }, {
            email: 'tommy.ostgaard@gmail.com',
            name: 'Tommy Østgaard'
          }]
        })
      ]);
      */
    })
    .then(() => (
      db.insert('logs', {
        id: id,
        date: Date.now(),
        type: 'LOGGED_IN'
      })
    ))
    .then(() => {
      res.cookie('kodeboksen', id, {
        maxAge: 86400 * 1000,
        domain: process.env.NODE_ENV === 'production' ? '.kodeboksen.no' : '.kodeboksen.dev',
        httpOnly: true
      });
      res.send({
        id: id,
        isAdmin: req.body.email === 'christianalfoni@gmail.com'
      });
    })
    .catch((e) => {
      console.log('Could not handle user', e);
      res.status(500);
      res.send({});
    });
}
