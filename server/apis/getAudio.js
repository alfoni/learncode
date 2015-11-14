import db from './../database.js';

export default function getAudio(req, res) {
  res.type('audio/wav');
  db.readFile(`audio_${req.params.id}_${req.params.index}`, req, res);
}
