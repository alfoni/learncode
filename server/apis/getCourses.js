import db from './../database.js';

export default function getCourses(req, res) {
  db.find('courses', {})
  .then((courses) => {
    res.type('json');
    res.send(courses);
  })
  .catch(() => {
    console.log('Could not get courses');
  });
}
