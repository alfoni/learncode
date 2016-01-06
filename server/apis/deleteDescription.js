import db from './../database.js';

export default function deleteDescription(req, res) {
  db.delete('descriptions', {
    tagName: req.params.tagName
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not delete description', e);
  });
}
