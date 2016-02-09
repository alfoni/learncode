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
    res.status(401);
    res.send({});
  }
};
