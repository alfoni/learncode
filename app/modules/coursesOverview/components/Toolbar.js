import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import ToolbarButtonPopover from 'common/components/Toolbar/ToolbarButtonPopover.js';
import ToolbarTitle from 'common/components/Toolbar/ToolbarTitle.js';
import AddNewCourse from './Toolbar/AddNewCourse.js';
import styles from './Toolbar.css';
import icons from 'common/icons.css';

@Cerebral({
  showAddCourseOverview: ['coursesOverview', 'showAddCourseOverview']
})
class Toolbar extends React.Component {
  addCourseOverviewClicked(e) {
    e.stopPropagation();
    this.props.signals.coursesOverview.addCourseOverviewClicked();
  }
  render() {
    return (
      <div className={styles.background}>
        <ToolbarTitle title="Kurs"/>
        <ToolbarButtonPopover
          icon={icons.addFile}
          onClick={(e) => this.addCourseOverviewClicked(e)}
          show={this.props.showAddCourseOverview}>
          <AddNewCourse/>
        </ToolbarButtonPopover>
      </div>
    );
  }
}

export default Toolbar;
