import React from 'react';

import styles from './styles.css';

function SuccessMessage(props) {
  return (
    <div className={props.show ? styles.successMessage : styles.successMessageHidden}>
      <span className={props.icon}></span> {props.message}
    </div>
  );
}

export default SuccessMessage;
