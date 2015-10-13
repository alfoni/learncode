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
    <div className={className} onClick={() => props.recorder.isPlaying ? props.onStopClick() : props.onPlayClick()}>
      <div className={props.recorder.isRecording || props.recorder.isPlaying ? icons.stop : icons.play}></div>
    </div>
  );
}

export default PlayButton;
