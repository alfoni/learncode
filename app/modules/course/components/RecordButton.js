import React from 'react';
import styles from './RecordButton.css';
import icons from 'common/icons.css';

function RecordButton() {
  return (
    <div className={styles.wrapper}>
      <div className={icons.mic}></div>
    </div>
  );
}

export default RecordButton;
