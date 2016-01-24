import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import icons from 'common/icons.css';
import elements from 'common/elements.css';

@Cerebral({
  tiers: ['techTree', 'tiers'],
  selectedTierIndex: ['techTree', 'selectedTierIndex'],
  showAddNewTierInput: ['techTree', 'showAddNewTierInput'],
  newTierName: ['techTree', 'newTierName'],
  courses: ['techTree', 'courses'],
  user: ['user']
})
class Tiers extends React.Component {
  constructor() {
    super();
  }
  getCourse(courseId) {
    return this.props.courses.find((course) => {
      return course.id === courseId;
    });
  }
  tierIsSolved(tier) {
    if (!tier.courseDependencyList.length) {
      return false;
    }

    return tier.courseDependencyList.every((course) => {
      if (!this.props.user.assignmentsSolved[course.courseId]) {
        return false;
      }

      return this.props.user.assignmentsSolved[course.courseId].length === this.getCourse(course.courseId).assignmentPoints.length + 1;
    });
  }
  tierIsActive(tier, index) {
    if (index === 0) {
      return true;
    }

    if (this.tierIsSolved(this.props.tiers[index - 1])) {
      return true;
    }
  }
  renderTiers() {
    return this.props.tiers.map((tier, index) => {
      return (
        <div
          key={tier.id}
          onClick={() => this.props.signals.techTree.tierClicked({index: index})}
          className={`
            ${this.props.selectedTierIndex === index ? styles.tierSelected : styles.tier}
            ${this.tierIsActive(tier, index) ? styles.tier : styles.tierDisabled}
            ${this.tierIsSolved(tier) ? styles.tierFinished : styles.tier}
        `}>
          <span className={`${icons.thumbDown} ${tier.disabled ? styles.icon : styles.hide}`}></span>
          {tier.name}
        </div>
      );
    });
  }
  onAddTierInputKeyDown = (e) => {
    const keyCode = e.keyCode;

    if (keyCode === 27) { // Escape
      this.props.signals.techTree.addTierAborted();
    }
  }
  onNewTierSubmit(e) {
    e.preventDefault();
    this.props.signals.techTree.newTierSubmitted();
  }
  renderAddNewTier() {
    if (!this.props.user.isAdmin) {
      return null;
    }

    if (this.props.showAddNewTierInput) {
      return (
        <form
          onSubmit={(e) => this.onNewTierSubmit(e)}
          className={`${styles.tier} ${styles.tierAddNew}`}>
          <input
            value={this.props.newTierName}
            className={`${styles.inputAddNewTier} ${elements.input}`}
            onBlur={this.props.signals.techTree.addTierAborted}
            onChange={(e) => this.props.signals.techTree.newTierNameUpdated({name: e.target.value})}
            onKeyDown={(e) => this.onAddTierInputKeyDown(e)}
            placeholder = "Navn..."
            autoFocus />
        </form>
      );
    }

    return (
      <div
        onClick={() => this.props.signals.techTree.addTierClicked()}
        className={`${styles.tier} ${styles.tierAddNew}`}>
        <span className={`${icons.addAssignment} ${styles.icon}`}></span>
        Legg til tier
      </div>
    );
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>Hei!</div>
        <div className={styles.subTitle}>Velkommen til kodeboksen.</div>
        <div className={styles.tiersWrapper}>
          {this.props.tiers ? this.renderTiers() : null}
          {this.renderAddNewTier()}
        </div>
      </div>
    );
  }
}

export default Tiers;
