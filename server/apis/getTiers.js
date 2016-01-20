import db from './../database.js';

export default function getTiers(req, res) {
  db.find('tiers', {})
  .then((tiers) => {
    res.type('json');
    res.send(
      tiers.sort((a, b) => {
        return a.created - b.created;
      })
    );
  })
  .catch(() => {
    console.log('Could not get tiers');
  });
}
