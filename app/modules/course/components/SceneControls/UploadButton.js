import React from 'react';
import styles from './UploadButton.css';
import icons from 'common/icons.css';

function UploadButton(props) {
  let className = styles.wrapper;

  if (props.recorder.hasRecorded) {
    className = styles.upload;
  }

  if (props.recorder.isUploading) {
    className = styles.uploading;
  }

  return (
    <div className={className} onClick={() => props.onClick()}>
      <div className={props.recorder.isUploading ? icons.loading : icons.uploadFile}></div>
    </div>
  );
}

export default UploadButton;
