import db from './../database.js';

export default function getVideo(req, res) {
  res.type('video/webm');
  db.readFile(`video_${req.params.id}_${req.params.index}`, req, res);
}
