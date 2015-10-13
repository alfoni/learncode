export default function getCourse(req, res) {
  setTimeout(function respond() {
    res.send({
      id: req.params.id,
      authorId: '123',
      name: 'Course 1',
      scenes: [
        {
          name: 'Scene 1'
        },
        {
          name: 'Scene 2'
        },
        {
          name: 'Scene 3'
        }
      ]
    });
  }, 50);
}
