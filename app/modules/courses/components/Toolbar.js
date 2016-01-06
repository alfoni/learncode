import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import ToolbarButtonPopover from 'common/components/Toolbar/ToolbarButtonPopover';
import ToolbarTitle from 'common/components/Toolbar/ToolbarTitle';
import AddNewCourse from './Toolbar/AddNewCourse';
import Descriptions from './Toolbar/Descriptions';
import styles from './Toolbar.css';
import icons from 'common/icons.css';

@Cerebral({
  showNewCourse: ['courses', 'showNewCourse'],
  showDescriptions: ['courses', 'showDescriptions']
})
class Toolbar extends React.Component {
  render() {
    return (
      <div className={styles.background}>
        <ToolbarTitle title="Kurs"/>
        <ToolbarButtonPopover
          icon={icons.addFile}
          onClick={() => this.props.signals.courses.newCourseClicked()}
          show={this.props.showNewCourse}>
          <AddNewCourse/>
        </ToolbarButtonPopover>
        <ToolbarButtonPopover
          icon={icons.addAssignment}
          onClick={() => this.props.signals.courses.showDescriptionsClicked()}
          show={this.props.showDescriptions}>
          <Descriptions/>
        </ToolbarButtonPopover>
      </div>
    );
  }
}

export default Toolbar;
