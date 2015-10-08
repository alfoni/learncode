import sandbox from './../sandbox.js';

export default function updateSandbox(req, res) {
  sandbox.update(req.body);
  res.type('json');
  res.send({});
}
