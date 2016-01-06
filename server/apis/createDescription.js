import db from './../database.js';

export default function createDescription(req, res) {
  db.insert('descriptions', {
    tagName: req.body.tagName,
    created: Date.now(),
    description: req.body.description,
    exampleType: req.body.exampleType,
    example: req.body.example
  })
  .then(() => {
    res.type('json');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not create description', e);
  });
}
