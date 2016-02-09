import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Module from 'modules/course/components/Module';
import ToolbarButton from 'common/components/ToolbarButton';
import Toolbar from 'common/components/Toolbar';
import CodeEditor from 'modules/course/components/CodeEditor';
import Preview from 'modules/course/components/Preview';
import icons from 'common/icons.css';
import styles from 'modules/course/components/Scene/styles.css';
import isAdminMode from 'modules/course/computed/isAdminMode';
import Descriptions from '../Descriptions';

@Cerebral({
  isLoading: ['course', 'isLoading'],
  recorder: ['recorder'],
  courseName: ['course', 'name'],
  courseId: ['course', 'id'],
  tierCourses: ['course', 'tierCourses'],
  isAdminMode: isAdminMode,
  showScenesList: ['course', 'showScenesList'],
  scenesList: ['course', 'scenesList']
})
class Scene extends React.Component {
  assignmentDescriptionChanged(e) {
    this.props.signals.course.assignmentDescriptionChanged.sync({
      description: e.target.value
    });
  }
  render() {
    return (
      <div className={styles.modules}>
        <Module className={this.props.isAdminMode ? styles.controlsAndAssignmentsAdmin : styles.controlsAndAssignments} show>
          <Toolbar>
            <ToolbarButton icon={icons.chevronLeft} title="Kursoversikt" onClick={() => this.props.signals.techTree.toggled()}/>
          </Toolbar>
          <Descriptions/>
        </Module>
        <Module className={styles.code} show>
          <CodeEditor sandboxMode/>
          <Preview show={this.props.showPreview}/>
        </Module>
      </div>
    );
  }
}

export default Scene;
