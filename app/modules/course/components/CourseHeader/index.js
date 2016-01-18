import React from 'react';
import styles from './styles.css';
import icons from 'common/icons.css';
import ToolbarButton from 'common/components/Toolbar/ToolbarButton';

const renderScenes = (scenes, activeSceneIndex) => {
  return scenes.map((scene, index) => {
    return (
      <div key={index} className={index === activeSceneIndex ? styles.activeScene : styles.scene}>
        {index + 1}. {scene.name}
      </div>
    );
  });
};

function CourseHeader(props) {
  console.log(props);
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrapper}>
        <div className={`${styles.icon} ${icons.school}`}></div>
      </div>
      <div className={styles.courseWrapper}>
        <div className={styles.title}>{props.title}</div>
          <ToolbarButton
            title={(props.currentScene.index + 1) + '. ' + props.currentScene.name}
            onClick={(e) => props.sceneNameClicked(e)}
            active={props.showScenesList}/>
          {
            props.showScenesList ?
              <div className={styles.scenesList}>{renderScenes(props.scenes, props.currentScene.index)}</div>
            :
              null
          }
      </div>
    </div>
  );
}

export default CourseHeader;
