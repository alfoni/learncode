import coursesOpened from './signals/coursesOpened';
import newCourseClicked from './signals/newCourseClicked';
import appClicked from './signals/appClicked';
import newCourseSubmitted from './signals/newCourseSubmitted';
import newCourseUpdated from './signals/newCourseUpdated';
import showDescriptionsClicked from './signals/showDescriptionsClicked';
import onSaveDescriptionSubmit from './signals/onSaveDescriptionSubmit';
import descriptionUpdated from './signals/descriptionUpdated';
import tagNameClicked from './signals/tagNameClicked';
import newDescriptionUpdated from './signals/newDescriptionUpdated';
import deleteDescriptionClicked from './signals/deleteDescriptionClicked';
import radioButtonClicked from './signals/radioButtonClicked';

export default function(controller) {
  controller.signal('courses.coursesOpened', coursesOpened);
  controller.signal('courses.newCourseClicked', newCourseClicked);
  controller.signal('courses.appClicked', appClicked);
  controller.signal('courses.newCourseSubmitted', newCourseSubmitted);
  controller.signal('courses.newCourseUpdated', newCourseUpdated);
  controller.signal('courses.showDescriptionsClicked', showDescriptionsClicked);
  controller.signal('courses.onSaveDescriptionSubmit', onSaveDescriptionSubmit);
  controller.signal('courses.descriptionUpdated', descriptionUpdated);
  controller.signal('courses.tagNameClicked', tagNameClicked);
  controller.signal('courses.newDescriptionUpdated', newDescriptionUpdated);
  controller.signal('courses.deleteDescriptionClicked', deleteDescriptionClicked);
  controller.signal('courses.radioButtonClicked', radioButtonClicked);
}
