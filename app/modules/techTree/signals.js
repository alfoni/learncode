import techTreeOpened from './signals/techTreeOpened';
import onCourseClicked from './signals/onCourseClicked';
import onCourseDependencyClicked from './signals/onCourseDependencyClicked';

export default function(controller) {
  controller.signal('techTree.techTreeOpened', techTreeOpened);
  controller.signal('techTree.onCourseClicked', onCourseClicked);
  controller.signal('techTree.onCourseDependencyClicked', onCourseDependencyClicked);
}
