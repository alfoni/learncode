import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './DurationSlider.css';

@Cerebral({
  recorder: ['recorder']
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
      this.startInterval(this.props.currentScene.recording.currentTime);
    } else {
      this.stopInterval();
    }
  }
  startInterval(time) {
    this.setState({
      timer: time,
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
  seek(event) {
    if (this.props.currentScene.recording) {
      const seek = this.props.currentScene.recording.duration / window.innerWidth * event.clientX;
      this.props.signals.course.seeked({
        seek: seek
      }, {
        isRecorded: true
      });
      clearInterval(this.state.interval);
      this.startInterval(seek - 1000);
    }
  }
  render() {
    return (
      <div className={styles.wrapper} onClick={(event) => this.seek(event)}>
        <div className={styles.line}>
          <div className={styles.dot} style={{left: this.handlerPosition()}}></div>
        </div>
      </div>
    );
  }
}

export default DurationSlider;
