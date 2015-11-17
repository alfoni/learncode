import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './DurationSlider.css';

@Cerebral({
  recorder: ['recorder']
}, {
  currentScene: ['currentScene']
})
class DurationSlider extends React.Component {
  static contextTypes = {
    controller: React.PropTypes.object
  }
  constructor() {
    super();
    this.state = {
      timer: 0,
      interval: null
    };
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.recorder.isPlaying && this.props.recorder.isPlaying) {
      this.startInterval(this.props.recorder.currentSeek[0]);
    } else if (prevProps.recorder.isPlaying && !this.props.recorder.isPlaying) {
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
    const duration = ((this.props.currentScene.duration || 0) / 1000).toFixed() - 1;
    const timer = (this.state.timer / 1000).toFixed();
    handlerPosition = timer / duration * 100;
    handlerPosition = handlerPosition > 100 ? 100 : handlerPosition;

    return handlerPosition + '%';
  }
  seek(event) {
    if (this.props.currentScene.recording && !this.context.controller.store.isExecutingAsync()) {
      const seek = this.props.currentScene.duration / window.innerWidth * event.clientX;

      console.log('seek', seek / 1000);
      this.props.signals.course.seekChanged({
        seek: seek
      }, {
        isRecorded: true
      });
      clearInterval(this.state.interval);

      if (this.props.recorder.isPlaying) {
        this.startInterval(seek);
      } else {
        this.setState({
          timer: seek
        });
      }
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
