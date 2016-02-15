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
    }, {
      name: 1,
      id: 1,
      type: 1,
      description: 1,
      skillLevel: 1,
      'scenes.recording.duration': 1,
      _id: 0
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
