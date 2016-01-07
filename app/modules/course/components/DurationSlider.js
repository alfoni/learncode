import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './DurationSlider.css';
import currentScene from '../computed/currentScene';

@Cerebral({
  recorder: ['recorder'],
  assignmentPoints: ['course', 'assignmentPoints'],
  assignmentsSolved: ['user', 'assignmentsSolved'],
  currentScene: currentScene
}, {

})
class DurationSlider extends React.Component {
  static contextTypes = {
    controller: React.PropTypes.object
  }
  constructor() {
    super();
    this.state = {
      currentSeek: 0,
      interval: null
    };
  }
  componentWillUpdate(nextProps) {
    if (nextProps.recorder.currentSeek !== this.props.recorder.currentSeek) {
      this.setState({
        currentSeek: nextProps.recorder.currentSeek[0]
      });
    }
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
      currentSeek: time,
      interval: setInterval(() => {
        if (this.props.recorder.isPlaying) {
          this.setState({currentSeek: this.state.currentSeek + 1000});
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
    const currentSeek = (this.state.currentSeek / 1000).toFixed();
    handlerPosition = currentSeek / duration * 100;
    handlerPosition = handlerPosition > 100 ? 100 : handlerPosition;

    return handlerPosition;
  }
  getSeekByEvent(event) {
    return this.props.currentScene.duration / event.currentTarget.offsetWidth * (event.clientX - event.currentTarget.offsetLeft);
  }
  seek(seek) {
    if (this.props.currentScene.recording && !this.context.controller.store.isExecutingAsync()) {
      const pointsPassed = this.props.assignmentPoints.filter((point) => {
        return point < seek;
      });

      if (this.props.assignmentsSolved.length < pointsPassed.length) {
        return;
      }

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
          currentSeek: seek
        });
      }
    }
  }
  renderTime(time) {
    let min = Math.floor(time / 60000);
    min = min || 0;
    let sec = ((time % 60000) / 1000);
    sec = sec || 0;
    sec = sec.toFixed(0);
    sec = sec < 10 ? '0' + sec : sec;

    return min + ':' + sec;
  }
  render() {
    const lineWidth = (100 - this.handlerPosition()); // Reversing percent

    return (
      <div className={styles.wrapper}>
        <div className={styles.currentDuration}>{this.renderTime(this.state.currentSeek)}</div>
        <div className={styles.lineWrapper} onClick={(event) => this.seek(this.getSeekByEvent(event))}>
          <div className={styles.line}>
            <div className={styles.progressedLine} style={{right: lineWidth + '%'}}></div>
            {[0, ...this.props.assignmentPoints].map((point, index) => (
              <div
                className={this.props.assignmentsSolved.length >= index ? styles.activePoint : styles.point}
                style={{left: `${(100 / this.props.currentScene.duration) * point}%`}}
                onClick={(event) => {
                  event.stopPropagation();
                  this.seek(point + 100);
                }}
                key={index}>
                  {index + 1}
                </div>
            ))}
          </div>
        </div>
        <div className={styles.durationEnd}>{this.renderTime(this.props.currentScene.duration)}</div>
      </div>
    );
  }
}

export default DurationSlider;
