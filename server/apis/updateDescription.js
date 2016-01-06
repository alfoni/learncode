import db from './../database.js';

export default function updateDescription(req, res) {
  db.update('descriptions', {
    tagName: req.params.tagName
  }, {
    $set: req.body
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not update description', e);
  });
}
