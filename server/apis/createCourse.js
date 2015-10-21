import uuid from 'node-uuid';
import db from './../database.js';

const defaultIndex = `<!DOCTYPE html>
<html>
  <head>
  </head>
  <meta charset="utf-8"/>
  <body>

  </body>
</html>`;

export default function createCourse(req, res) {
  const course = {
    id: uuid.v4(),
    name: req.body.course.courseName,
    authorId: '123',
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
