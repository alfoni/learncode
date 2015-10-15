import courseOpened from './signals/courseOpened.js';
import courseAppClicked from './signals/appClicked.js';
import openFolderClicked from './signals/openFolderClicked.js';
import addFileClicked from './signals/addFileClicked.js';
import addFileInputBlurred from './signals/addFileInputBlurred.js';
import codeChanged from './signals/codeChanged.js';
import showPreviewClicked from './signals/showPreviewClicked.js';
import showConsoleClicked from './signals/showConsoleClicked.js';
import folderFileClicked from './signals/folderFileClicked.js';
import addFileAborted from './signals/addFileAborted.js';
import editAssignmentClicked from './signals/editAssignmentClicked.js';
import assignmentCodeChanged from './signals/assignmentCodeChanged.js';
import AssignmentDescriptionChanged from './signals/AssignmentDescriptionChanged.js';
import addFileSubmitted from './signals/addFileSubmitted.js';
import openAssignmentClicked from './signals/openAssignmentClicked.js';
import recordClicked from './signals/recordClicked.js';
import stopClicked from './signals/stopClicked.js';
import playClicked from './signals/playClicked.js';
import saveShortcutPressed from './signals/saveShortcutPressed.js';
import saveCourseClicked from './signals/saveCourseClicked.js';
import uploadClicked from './signals/uploadClicked.js';
import uploadFinished from './signals/uploadFinished.js';
import uploadFailed from './signals/uploadFailed.js';

export default function(controller) {
  controller.signal('course.courseOpened', courseOpened);
  controller.signal('course.appClicked', courseAppClicked);
  controller.signal('course.openFolderClicked', openFolderClicked);
  controller.signal('course.addFileClicked', addFileClicked);
  controller.signal('course.addFileInputBlurred', addFileInputBlurred);
  controller.signal('course.codeChanged', codeChanged);
  controller.signal('course.showPreviewClicked', showPreviewClicked);
  controller.signal('course.showConsoleClicked', showConsoleClicked);
  controller.signal('course.folderFileClicked', folderFileClicked);
  controller.signal('course.addFileAborted', addFileAborted);
  controller.signal('course.editAssignmentClicked', editAssignmentClicked);
  controller.signal('course.assignmentCodeChanged', assignmentCodeChanged);
  controller.signal('course.assignmentDescriptionChanged', AssignmentDescriptionChanged);
  controller.signal('course.addFileSubmitted', addFileSubmitted);
  controller.signal('course.openAssignmentClicked', openAssignmentClicked);
  controller.signal('course.addFileSubmitted', addFileSubmitted);
  controller.signal('course.openAssignmentClicked', openAssignmentClicked);
  controller.signal('course.recordClicked', recordClicked);
  controller.signal('course.playClicked', playClicked);
  controller.signal('course.stopClicked', stopClicked);
  controller.signal('course.saveShortcutPressed', saveShortcutPressed);
  controller.signal('course.saveCourseClicked', saveCourseClicked);
  controller.signal('course.uploadClicked', uploadClicked);
  controller.signal('course.uploadFinished', uploadFinished);
  controller.signal('course.uploadFailed', uploadFailed);
}
