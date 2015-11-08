import React from 'react';
import ToolbarButton from './ToolbarButton.js';
import styles from './ToolbarButtonPopover.css';

/* Accepts two arguments: title OR icon */
function ToolbarButtonPopover(props) {
  const renderBox = () => {
    return (
      <div className={styles.arrowBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.contentBox}>
          {props.children}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <ToolbarButton icon={props.icon} title={props.title} onClick={props.onClick} tooltip={props.tooltip}/>
      {props.show ? renderBox() : null}
    </div>
  );
}

export default ToolbarButtonPopover;
