import uuid from 'node-uuid';
import db from './../database.js';

const defaultIndex = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body>

  </body>
</html>`;

export default function createCourse(req, res) {
  const course = {
    id: uuid.v4(),
    created: Date.now(),
    name: req.body.course.courseName,
    authorId: req.cookies.kodeboksen,
    scenes: [{
      name: req.body.course.sceneName,
      currentFileIndex: 0,
      files: [{
        name: 'index.html',
        code: defaultIndex
      }]
    }]
  };

  db.insert('courses', course)
    .then(() => {
      res.type('json');
      res.send({
        id: course.id
      });
    })
    .catch((e) => {
      console.log('Could not create course', e);
    });
}
