import db from './../database.js';

export default function saveVideo(req, res) {
  db.writeFile(`video_${req.params.id}_${req.params.index}`, req)
  .then(() => {
    console.log('Done saving video');
    res.send({});
  })
  .catch((e) => {
    console.log('Could not save video', e);
  });
}
