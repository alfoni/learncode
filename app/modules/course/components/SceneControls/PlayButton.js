import React from 'react';
import styles from './PlayButton.css';
import icons from 'common/icons.css';

function PlayButton(props) {
  let className = styles.wrapper;

  if (props.recorder.isRecording) {
    className = styles.recording;
  }

  if (props.recorder.isPlaying) {
    className = styles.playing;
  }

  return (
    <button
      className={className}
      onClick={() => props.recorder.isPlaying ? props.onStopClick() : props.onPlayClick()}
      disabled={props.isExecutingSignal}>
      <div className={props.recorder.isRecording || props.recorder.isPlaying ? icons.stop : icons.play}></div>
    </button>
  );
}

export default PlayButton;
