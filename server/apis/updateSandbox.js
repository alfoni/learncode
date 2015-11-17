import sandbox from './../sandbox';
import responseSync from './../responseSync';

export default function updateSandbox(req, res) {
  sandbox.update(req.body);
  setTimeout(() => {
    res.type('json');
    res.send({});
  }, 1500);

  const id = req.query.id;

  if (typeof responseSync[id] === 'function') {
    responseSync[id]();
    delete responseSync[id];
  } else {
    responseSync[id] = true;
  }
}
