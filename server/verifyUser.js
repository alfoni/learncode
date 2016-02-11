import sessionCache from './sessionCache';
import db from './database';

export default (req, res, next) => {
  if (req.cookies.kodeboksen && sessionCache.get(req.cookies.kodeboksen)) {
    req.user = {
      id: req.cookies.kodeboksen
    };
    next();
  } else if (req.cookies.kodeboksen) {
    db.findOne('users', {
      id: req.cookies.kodeboksen
    })
    .then((user) => {
      if (!user) {
        res.status(401);
        res.send({});
      } else {
        req.user = {
          id: user.id
        };
        sessionCache.set(user.id);
        next();
      }
    })
    .catch(() => {
      res.status(401);
      res.send({});
    });
  } else {
    const id = req.body.email || req.cookies.kodeboksen || (String(Date.now()) + String((Math.round(Math.random() * 10000))));
    db.findOne('users', {
      id: id
    })
      .then((user) => {
        sessionCache.set(id);

        if (user) {
          return;
        }

        return Promise.all([
          db.insert('users', {
            id: id
          })
        ]);
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
          maxAge: 86400 * 1000 * 4,
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
    next();
  }
};
