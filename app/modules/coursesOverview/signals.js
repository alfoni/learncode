import coursesOverviewOpened from './signals/coursesOverviewOpened.js';
import addCourseOverviewClicked from './signals/addCourseOverviewClicked.js';
import appClicked from './signals/appClicked.js';
import addCourseSubmitted from './signals/addCourseSubmitted.js';

export default function(controller) {
  controller.signal('coursesOverview.coursesOverviewOpened', coursesOverviewOpened);
  controller.signal('coursesOverview.addCourseOverviewClicked', addCourseOverviewClicked);
  controller.signal('coursesOverview.appClicked', appClicked);
  controller.signal('coursesOverview.addCourseSubmitted', addCourseSubmitted);
}
