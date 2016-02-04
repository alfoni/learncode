import db from './../database.js';
import uuid from 'node-uuid';

const defaultIndex = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
  </head>
  <body>

  </body>
</html>`;

function getAllAssignments(courses) {
  return courses.map((course) => {
    return course.scenes;
  }).reduce((allScenes, scenes) => {
    return allScenes.concat(scenes);
  }).map((scene) => {
    return scene.assignments;
  }).reduce((allAssignments, assignments) => {
    return allAssignments.concat(assignments);
  });
}

export default function getSandboxCourse(req, res) {
  const sandboxCourse = {
    id: uuid.v4(),
    created: Date.now(),
    name: '',
    authorId: req.cookies.kodeboksen,
    scenes: [{
      name: '',
      currentFileIndex: 0,
      files: [{
        name: 'index.html',
        code: defaultIndex
      }],
      assignments: [{
        description: '',
        code: ''
      }]
    }]
  };

  db.findOne('tiers', {
    id: req.params.id
  })
  .then((tier) => {
    const courseIds = tier.courseDependencyList.map((dependencyCourse) => {
      return dependencyCourse.courseId;
    });
    db.find('courses', {
      id: {
        $in: courseIds
      }
    }, {
      'scenes.files': 0
    })
    .then((courses) => {
      sandboxCourse.tierCourses = courses;
      res.type('json');
      res.send(sandboxCourse);
    })
    .catch(() => {
      console.log('Could not get dependency course in tier');
    });
  })
  .catch(() => {
    console.log('Could not get sandbox course');
  });
}
