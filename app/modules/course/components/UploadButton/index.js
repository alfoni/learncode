import React from 'react';
import styles from './styles.css';
import icons from 'common/icons.css';

function UploadButton(props) {
  const className = styles.wrapper;

  return (
    <button className={className} onClick={() => props.onClick()} disabled={props.disabled}>
      <div className={props.recorder.isUploading ? icons.loading : icons.uploadFile}></div>
    </button>
  );
}

export default UploadButton;
