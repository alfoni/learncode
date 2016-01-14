import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './TechTree.css';
import icons from 'common/icons.css';

@Cerebral({
})
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      this.setState({
        canRender: true
      });
    });
  }
  renderCourse(course) { // options: name, finishedPercent, disabled
    return (
      <div className={course.disabled ? styles.courseDisabled : styles.course}>
        <div className={styles.verticalLineFront}></div>
        <div className={styles.verticalLineBack}></div>
        <div className={styles.courseBadge}>
          <span className={icons.thumbUp}></span>
        </div>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {course.name}
            <span className={styles.subTitle}> {course.finishedPercent ? '(' + course.finishedPercent + ')' : ''}</span>
          </div>
        </div>
      </div>
    );
  }
  renderTask(task) { // options: name, finishedPercent, disabled
    return (
      <div className={task.disabled ? styles.taskDisabled : styles.task}>
        <div className={styles.verticalLineFront}></div>
        <div className={styles.verticalLineBack}></div>
        <div className={styles.taskBadge}>
          <span className={icons.scene}></span>
        </div>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            {task.name}
            <span className={styles.subTitle}> {task.finishedPercent ? '(' + task.finishedPercent + ')' : ''}</span>
          </div>
        </div>
      </div>
    );
  }
  renderLine() {
    return (
      <div className={styles.lineWrapper}>
        <div className={styles.horizontalLine}></div>
      </div>
    );
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.level}>
            <div className={styles.stage}>
              {this.renderCourse({name: 'Landingsside intro', finishedPercent: 'Fullført'})}
            </div>
            <div className={styles.stage}>
              {this.renderTask({name: 'Stylesheet', finishedPercent: '25%'})}
              {this.renderTask({name: 'Overskrifter'})}
              {this.renderTask({name: 'CSS Element Selector', finishedPercent: '65%'})}
              {this.renderTask({name: 'Farge på tekst'})}
            </div>
            <div className={styles.stage}>
            {this.renderTask({name: 'Overskrifter'})}
            {this.renderTask({name: 'Overskrifter'})}
              {this.renderCourse({name: 'Landingsside 1', disabled: true})}
            </div>
            <div className={styles.stage}>
              {this.renderCourse({name: 'Landingsside 2', disabled: true})}
            </div>
          </div>
          <div className={styles.level}>
            <div className={styles.stage}></div>
            <div className={styles.stage}></div>
            <div className={styles.stage}>
              {this.renderTask({name: 'Bilde'})}
            </div>
            <div className={styles.stage}></div>
          </div>

        </div>
      );
    }

    return null;
  }
}

export default Home;
