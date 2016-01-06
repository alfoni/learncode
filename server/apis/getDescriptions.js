import db from './../database.js';

export default function getDescriptions(req, res) {
  db.find('descriptions', {})
  .then((descriptions) => {
    res.type('json');
    res.send(descriptions);
  })
  .catch(() => {
    console.log('Could not get descriptions');
  });
}
