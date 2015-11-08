import React from 'react';
import styles from './RecordButton.css';
import icons from 'common/icons.css';

function RecordButton(props) {
  let className = styles.wrapper;

  if (props.recorder.isRecording) {
    className = styles.recording;
  }

  if (props.recorder.isPlaying) {
    className = styles.playing;
  }

  if (props.recorder.isUploading) {
    className = styles.uploading;
  }

  return (
    <button
      className={className}
      onClick={() => props.recorder.isRecording ? props.onStopClick() : props.onRecordClick()}
      disabled={props.disabled}>
      <div className={props.recorder.isRecording ? icons.stop : icons.mic}></div>
    </button>
  );
}

export default RecordButton;
