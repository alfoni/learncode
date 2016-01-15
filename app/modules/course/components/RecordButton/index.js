import React from 'react';
import styles from './styles.css';
import icons from 'common/icons.css';

function RecordButton(props) {
  let className = styles.wrapper;

  if (props.recorder.isRecording) {
    className = styles.recording;
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
