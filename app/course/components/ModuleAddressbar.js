import React from 'react';
import styles from './ModuleAddressbar.css';

function ModuleAddressbar(props) {
  return (
    <div className={styles.addressbar}>{props.url}</div>
  );
}

export default ModuleAddressbar;
