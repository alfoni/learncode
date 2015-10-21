import db from './../database.js';

export default function saveAudio(req, res) {
  db.writeFile(`audio_${req.params.id}_${req.params.index}`, req)
  .then(() => {
    console.log('Done saving video');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not save audio', e);
  });
}
