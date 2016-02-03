import db from './../database.js';

export default function getCoursesInTier(req, res) {
  db.findOne('tiers', {
    id: req.params.id
  })
  .then((tier) => {
    const coursesIds = tier.courseDependencyList.map((courseDependency) => {
      return courseDependency.courseId;
    });
    db.find('courses', {
      id: {
        $in: coursesIds
      }
    })
    .then((courses) => {
      res.type('json');
      res.send(courses);
    })
    .catch((e) => {
      console.log('Could not get courses in tier:');
      console.log(e);
    });
  })
  .catch((e) => {
    console.log('Could not get tier:');
    console.log(e);
  });
}
