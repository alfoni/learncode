import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import AddSceneInput from './ConfigureScenes/AddSceneInput.js';

import styles from './ConfigureScenes.css';

@Cerebral({

})
class ConfigureScenes extends React.Component {
  addSceneInputKeyDown(e) {
    const keyCode = e.keyCode;
    const sceneName = e.target.value;

    if (keyCode === 13) { // Enter
      this.props.signals.course.addSceneSubmitted({
        sceneName: sceneName
      });
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <AddSceneInput show={Boolean(true)}
                      onKeyDown={(e) => this.addSceneInputKeyDown(e)}
                      placeHolder="Type scenename..."/>
      </div>
    );
  }
}

export default ConfigureScenes;
