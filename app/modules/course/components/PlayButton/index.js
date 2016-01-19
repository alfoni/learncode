import React from 'react';
import styles from './styles.css';
import icons from 'common/icons.css';

function PlayButton(props) {
  let className = styles.wrapper;

  if (props.recorder.isRecording) {
    className = styles.recording;
  }

  if (props.recorder.isPlaying) {
    className = styles.playing;
  }

  const isRecordingOrPlaying = props.recorder.isRecording || props.recorder.isPlaying;

  return (
    <button
      className={className}
      onClick={() => isRecordingOrPlaying ? props.onPauseClick() : props.onPlayClick()}
      disabled={props.disabled}>
      <div className={styles.iconWrapper}>
        <div className={isRecordingOrPlaying ? icons.pause : icons.play}></div>
      </div>
    </button>
  );
}

export default PlayButton;
