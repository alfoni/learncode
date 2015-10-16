import React from 'react';

import styles from './Video.css';

function Video(props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.videoFrame}>
        <iframe width="100%"
                height="100%"
                src={props.url}
                frameBorder="0"
                allowFullScreen></iframe>
      </div>
      <div className={styles.videoFrameShadowLeft}></div>
      <div className={styles.videoFrameShadowRight}></div>
    </div>
  );
}

export default Video;
