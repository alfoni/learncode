import sandbox from './../sandbox';
import responseSync from './../responseSync';

export default function updateSandbox(req, res) {
  sandbox.update(req.body);
  res.type('json');
  res.send({});

  const id = req.query.id;

  if (typeof responseSync[id] === 'function') {
    responseSync[id]();
    delete responseSync[id];
  } else {
    responseSync[id] = true;
  }
}
