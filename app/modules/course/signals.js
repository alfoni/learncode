import authenticate from 'common/factories/chains/authenticate';
import track from 'common/factories/chains/track';
import createSession from 'common/factories/chains/createSession';

import courseOpened from './signals/courseOpened';
import courseAppClicked from './signals/appClicked';
import openFolderClicked from './signals/openFolderClicked';
import addFileClicked from './signals/addFileClicked';
import addFileInputBlurred from './signals/addFileInputBlurred';
import codeChanged from './signals/codeChanged';
import showPreviewClicked from './signals/showPreviewClicked';
import showConsoleClicked from './signals/showConsoleClicked';
import folderFileClicked from './signals/folderFileClicked';
import addFileAborted from './signals/addFileAborted';
import editAssignmentClicked from './signals/editAssignmentClicked';
import assignmentCodeChanged from './signals/assignmentCodeChanged';
import assignmentDescriptionChanged from './signals/assignmentDescriptionChanged';
import addFileSubmitted from './signals/addFileSubmitted';
import openAssignmentClicked from './signals/openAssignmentClicked';
import recordClicked from './signals/recordClicked';
import stopClicked from './signals/stopClicked';
import playClicked from './signals/playClicked';
import saveSceneClicked from './signals/saveSceneClicked';
import configureScenesClicked from './signals/configureScenesClicked';
import addSceneSubmitted from './signals/addSceneSubmitted';
import sceneNameClicked from './signals/sceneNameClicked';
import listSceneNameClicked from './signals/listSceneNameClicked';
import uploadClicked from './signals/uploadClicked';
import uploadFinished from './signals/uploadFinished';
import uploadFailed from './signals/uploadFailed';
import removeFileClicked from './signals/removeFileClicked';
import newSceneNameChanged from './signals/newSceneNameChanged';
import sandboxTested from './signals/sandboxTested';
import runAssignmentClicked from './signals/runAssignmentClicked';
import addFileNameUpdated from './signals/addFileNameUpdated';
import pauseClicked from './signals/pauseClicked';
import mediaLoaded from './signals/mediaLoaded';
import videoStartedBuffering from './signals/videoStartedBuffering';
import videoFailed from './signals/videoFailed';
import codeCursorChanged from './signals/codeCursorChanged';
import seekChanged from './signals/seekChanged';
import buttonPopoverClicked from './signals/buttonPopoverClicked';
import sandboxClicked from './signals/sandboxClicked';

export default function(controller) {
  controller.signal('course.courseOpened', createSession('course.courseOpened', authenticate(courseOpened)));
  controller.signal('course.appClicked', track('course.appClicked', courseAppClicked));
  controller.signal('course.openFolderClicked', track('course.openFolderClicked', openFolderClicked));
  controller.signal('course.addFileClicked', track('course.addFileClicked', addFileClicked));
  controller.signal('course.addFileInputBlurred', track('course.addFileInputBlurred', addFileInputBlurred));
  controller.signal('course.codeChanged', track('course.codeChanged', codeChanged));
  controller.signal('course.showPreviewClicked', track('course.showPreviewClicked', showPreviewClicked));
  controller.signal('course.showConsoleClicked', track('course.showConsoleClicked', showConsoleClicked));
  controller.signal('course.folderFileClicked', track('course.folderFileClicked', folderFileClicked));
  controller.signal('course.addFileAborted', track('course.addFileAborted', addFileAborted));
  controller.signal('course.editAssignmentClicked', track('course.editAssignmentClicked', editAssignmentClicked));
  controller.signal('course.assignmentCodeChanged', track('course.assignmentCodeChanged', assignmentCodeChanged));
  controller.signal('course.assignmentDescriptionChanged', track('course.assignmentDescriptionChanged', assignmentDescriptionChanged));
  controller.signal('course.addFileSubmitted', track('course.addFileSubmitted', addFileSubmitted));
  controller.signal('course.openAssignmentClicked', track('course.openAssignmentClicked', openAssignmentClicked));
  controller.signal('course.addFileSubmitted', track('course.addFileSubmitted', addFileSubmitted));
  controller.signal('course.recordClicked', track('course.recordClicked', recordClicked));
  controller.signal('course.playClicked', track('course.playClicked', playClicked));
  controller.signal('course.stopClicked', track('course.stopClicked', stopClicked));
  controller.signal('course.saveShortcutPressed', track('course.saveShortcutPressed', saveSceneClicked));
  controller.signal('course.saveSceneClicked', track('course.saveSceneClicked', saveSceneClicked));
  controller.signal('course.configureScenesClicked', track('course.configureScenesClicked', configureScenesClicked));
  controller.signal('course.addSceneSubmitted', track('course.addSceneSubmitted', addSceneSubmitted));
  controller.signal('course.sceneNameClicked', track('course.sceneNameClicked', sceneNameClicked));
  controller.signal('course.listSceneNameClicked', track('course.listSceneNameClicked', listSceneNameClicked));
  controller.signal('course.uploadClicked', track('course.uploadClicked', uploadClicked));
  controller.signal('course.uploadFinished', track('course.uploadFinished', uploadFinished));
  controller.signal('course.uploadFailed', track('course.uploadFailed', uploadFailed));
  controller.signal('course.removeFileClicked', track('course.removeFileClicked', removeFileClicked));
  controller.signal('course.newSceneNameChanged', track('course.newSceneNameChanged', newSceneNameChanged));
  controller.signal('course.sandboxTested', track('course.sandboxTested', sandboxTested));
  controller.signal('course.runAssignmentClicked', track('course.runAssignmentClicked', runAssignmentClicked));
  controller.signal('course.addFileNameUpdated', track('course.addFileNameUpdated', addFileNameUpdated));
  controller.signal('course.pauseClicked', track('course.pauseClicked', pauseClicked));
  controller.signal('course.mediaLoaded', track('course.mediaLoaded', mediaLoaded));
  controller.signal('course.videoStartedBuffering', track('course.videoStartedBuffering', videoStartedBuffering));
  controller.signal('course.videoFailed', track('course.videoFailed', videoFailed));
  controller.signal('course.codeCursorChanged', track('course.codeCursorChanged', codeCursorChanged));
  controller.signal('course.seekChanged', track('course.seeked', seekChanged));
  controller.signal('course.buttonPopoverClicked', track('course.buttonPopoverClicked', buttonPopoverClicked));
  controller.signal('course.sandboxClicked', track('course.sandboxClicked', sandboxClicked));
}
