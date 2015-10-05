import React from 'react';
import styles from './DurationSlider.css';

function DurationSlider() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <div className={styles.dot}></div>
      </div>
    </div>
  );
}

export default DurationSlider;
