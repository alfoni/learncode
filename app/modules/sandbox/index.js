import authenticate from 'common/factories/chains/authenticate';
import track from 'common/factories/chains/track';
import createSession from 'common/factories/chains/createSession';

import opened from './signals/opened';
import appClicked from 'modules/course/signals/appClicked';
import addFileClicked from 'modules/course/signals/addFileClicked';
import codeChanged from 'modules/course/signals/codeChanged';
import fileClicked from 'modules/course/signals/fileClicked';
import addFileAborted from 'modules/course/signals/addFileAborted';
import addFileSubmitted from 'modules/course/signals/addFileSubmitted';
import saveSceneClicked from 'modules/course/signals/saveSceneClicked';
import removeFileClicked from 'modules/course/signals/removeFileClicked';
import addFileNameUpdated from 'modules/course/signals/addFileNameUpdated';
import pauseClicked from 'modules/course/signals/pauseClicked';
import codeCursorChanged from 'modules/course/signals/codeCursorChanged';
import seekChanged from 'modules/course/signals/seekChanged';
import buttonPopoverClicked from 'modules/course/signals/buttonPopoverClicked';
import sandboxClicked from 'modules/course/signals/sandboxClicked';
import toggleForceUserClicked from 'modules/course/signals/toggleForceUserClicked';
import runAssignmentClicked from 'modules/course/signals/runAssignmentClicked';
import tagNameMouseOver from 'modules/course/signals/tagNameMouseOver';
import tagNameMouseOut from 'modules/course/signals/tagNameMouseOut';
import descriptionHovered from 'modules/course/signals/descriptionHovered';
import continueCourseClicked from 'modules/course/signals/continueCourseClicked';

export default () => {
  return (module) => {
    module.addState({
      id: null,
      name: 'Course 1',
      mousePosition: {
        x: 0,
        y: 0
      },
      isLoading: true,
      currentAssignmentStatus: {
        isLoading: false,
        result: null
      },
      showAssignmentStatus: false,
      assignmentsPositions: [],
      descriptions: [],
      isLoadingMedia: false,
      authorId: null,
      showPreview: true,
      showConsole: false,
      showEditAssignment: false,
      showAssignment: false,
      tooltip: {
        visible: null,
        timeout: null
      },
      showConfigureScenes: false,
      showScenesList: false,
      showFolder: false,
      showAddFileInput: false,
      currentSceneIndex: 0,
      currentAssignmentIndex: 0,
      sandboxSnapshot: null,
      newSceneName: '',
      newFileName: '',
      codeSelection: {
        anchor: {ch: 0, line: 0},
        head: {ch: 0, line: 0}
      },
      scenes: [],
      scenesList: [],
      tierCourses: []
    });

    module.addSignals({
      opened: createSession('sandbox.opened', authenticate(opened)),
      addFileClicked: track('course.addFileClicked', addFileClicked),
      fileClicked: track('course.fileClicked', fileClicked),
      addFileAborted: track('course.addFileAborted', addFileAborted),
      addFileSubmitted: track('course.addFileSubmitted', addFileSubmitted),
      saveShortcutPressed: track('course.saveShortcutPressed', saveSceneClicked),
      saveSceneClicked: track('course.saveSceneClicked', saveSceneClicked),
      removeFileClicked: track('course.removeFileClicked', removeFileClicked),
      pauseClicked: track('course.pauseClicked', pauseClicked),
      seekChanged: track('course.seeked', seekChanged),
      sandboxClicked: track('course.sandboxClicked', sandboxClicked),
      runAssignmentClicked: track('course.runAssignmentClicked', runAssignmentClicked),
      descriptionHovered: track('course.descriptionHovered', descriptionHovered),
      appClicked,
      codeChanged,
      addFileNameUpdated,
      codeCursorChanged,
      buttonPopoverClicked,
      toggleForceUserClicked,
      tagNameMouseOver,
      tagNameMouseOut,
      continueCourseClicked
    });
  };
};
