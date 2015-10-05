import React from 'react';
import styles from './PlayButton.css';
import icons from 'common/icons.css';

function PlayButton() {
  return (
    <div className={styles.wrapper}>
      <div className={icons.play}></div>
    </div>
  );
}

export default PlayButton;
