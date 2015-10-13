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

  return (
    <div className={className} onClick={() => props.recorder.isRecording ? props.onStopClick() : props.onRecordClick()}>
      <div className={props.recorder.isRecording ? icons.stop : icons.mic}></div>
    </div>
  );
}

export default RecordButton;
