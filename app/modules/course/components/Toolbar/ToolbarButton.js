import React from 'react';
import style from './ToolbarButton.css';

function ToolbarButton(props) {
  return (
    <button className={style.button} onClick={props.onClick}>
      <div className={props.active ? style.activeIcon : style.icon}>
        <div className={props.icon}></div>
      </div>
    </button>
  );
}

export default ToolbarButton;
