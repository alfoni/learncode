import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './DurationSlider.css';

@Cerebral({
  recorder: ['course', 'recorder']
}, {
  currentScene: ['currentScene']
})
class DurationSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: 0,
      interval: null,
      duration: 0
    };
  }
  componentWillMount() {
    const duration = this.props.currentScene.recording ? this.props.currentScene.recording.duration : 0;
    this.setState({
      duration: duration
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.recorder === prevProps.recorder) {
      return;
    }

    if (this.props.recorder.isPlaying) {
      this.startInterval();
    } else {
      this.stopInterval();
    }
  }
  startInterval() {
    this.setState({
      timer: this.props.currentScene.recording.currentTime,
      interval: setInterval(() => {
        if (this.props.recorder.isPlaying) {
          this.setState({timer: this.state.timer + 1000});
        }
      }, 1000)
    });
  }
  stopInterval() {
    clearInterval(this.state.interval);
    this.setState({
      interval: null
    });
  }
  handlerPosition() {
    let handlerPosition = 0;
    const duration = (this.state.duration / 1000).toFixed() - 1;
    const timer = (this.state.timer / 1000).toFixed();
    handlerPosition = timer / duration * 100;

    return handlerPosition + '%';
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.line}>
          <div className={styles.dot} style={{left: this.handlerPosition()}}></div>
        </div>
      </div>
    );
  }
}

export default DurationSlider;
