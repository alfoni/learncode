import db from './../database.js';

function setRemovedCourseIds(courses, newCoursesIds) {
  return courses.map((dependencyCourse) => {
    return dependencyCourse.courseId;
  }).filter((courseId) => {
    return newCoursesIds.indexOf(courseId) < 0;
  });
}

function setIsInTier(courseIds, value, callback) {
  console.log('Updating these courses:');
  console.log(courseIds);
  console.log('to have isIniter as: ' + value);
  db.update('courses', {
    id: {
      $in: courseIds
    }
  }, {
    $set: {
      isInTier: value
    }
  }, {
    multi: true
  })
  .then(() => {
    if (callback) {
      callback();
    }
  })
  .catch(() => {
    console.log('Could not set isInTier to ' + value + ' for course');
  });
}

function getUpdatedCourses(removedCourseIds, newCoursesIds, callback) {
  const updatedCoursesIds = removedCourseIds.concat(newCoursesIds);
  db.find('courses', {
    id: {
      $in: updatedCoursesIds
    }
  })
  .then((updatedCourses) => {
    if (callback) {
      callback(updatedCourses);
    }
  })
  .catch((e) => {
    console.log('Could not get updated courses', e);
  });
}

export default function updateTier(req, res) {
  const newCoursesIds = req.body.courseDependencyList.map((dependencyCourse) => {
    return dependencyCourse.courseId;
  });
  let removedCourseIds = [];

  db.findOne('tiers', {
    id: req.params.id
  })
  .then((tier) => {
    removedCourseIds = setRemovedCourseIds(tier.courseDependencyList, newCoursesIds);
    setIsInTier(removedCourseIds, false, () => {
      setIsInTier(newCoursesIds, true, () => {
        db.update('tiers', {
          id: req.params.id
        }, {
          $set: Object.keys(req.body).reduce((update, key) => {
            if (key !== '_id') {
              update[key] = req.body[key];
            }

            return update;
          }, {})
        })
        .then(() => {
          getUpdatedCourses(removedCourseIds, newCoursesIds, (updatedCourses) => {
            res.type('json');
            res.send(updatedCourses);
          });
        })
        .catch((e) => {
          console.log('Could not update tier', e);
        });
      });
    });
  })
  .catch(() => {
    console.log('Could not get tier');
  });
}
