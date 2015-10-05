import React from 'react';
import ToolbarButton from './ToolbarButton';
import styles from './ToolbarButtonPopover.css';

function ToolbarButtonPopover(props) {
  return (
    <div className={styles.wrapper}>
      <ToolbarButton icon={props.icon} onClick={props.onClick}/>
      {
        props.show ?
          <div className={styles.arrowBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.contentBox}>
              {props.children}
            </div>
          </div>
        :
          null
      }
    </div>
  );
}

export default ToolbarButtonPopover;
