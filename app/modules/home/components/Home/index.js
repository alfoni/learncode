import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';

let Video = null;
let SuccessMessage = null;
let icons = null;
// let styles = null;
import styles from './styles.css'; // TODO: Remove this;

@Cerebral({
  assignmentsSolved: ['user', 'assignmentsSolved']
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
      Video = require('../Video');
      SuccessMessage = require('../SuccessMessage');
      icons = require('common/icons.css');
      // styles = require('./Home.css');
      this.setState({
        canRender: true
      });
    });
  }
  renderButtons() {
    if (Object.keys(this.props.assignmentsSolved).length) {
      return (
        <div>
          <button className={styles.button} onClick={() => this.props.signals.home.continueCourseClicked()}>Fortsett</button>
          <button className={styles.button} onClick={() => this.props.signals.home.restartCourseClicked()}>Start på nytt</button>
        </div>
      );
    }

    return (
      <button className={styles.button} onClick={() => this.props.signals.home.formSubmitted()}>Start</button>
    );
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.logo}></div>
            <h1>Med kode kan du skape utrolige ting!</h1>
            <div className={styles.descText}>
              Vil du lære hvordan du lager et spill som kan spilles over hele verden?
              <br/>
              Eller hvordan du lager applikasjoner som hjelper andre mennesker?
              <br/>
              Vil du lage din egen hjemmeside?
            </div>
            <div className={styles.showYouHowText}>Med Kodeboksen viser vi deg hvordan!</div>
            {this.renderButtons()}
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Home;
