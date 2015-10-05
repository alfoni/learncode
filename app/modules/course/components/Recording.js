import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './Toolbar.js';
import DurationSlider from './DurationSlider.js';
import Module from './Module.js';
import ModuleToolbar from './ModuleToolbar.js';
import ModuleFileName from './CodeEditor/ModuleFileName.js';
import ModuleAddressbar from './Preview/ModuleAddressbar.js';
import CodeEditor from './CodeEditor.js';
import Preview from './Preview.js';
import PlayButton from './PlayButton.js';
import RecordButton from './RecordButton.js';
import VideoFrame from './VideoFrame.js';
import styles from 'common/layout.css';
import Console from './Console.js';

@Cerebral()
class Recording extends React.Component {
  render() {
    return (
      <div className={styles.fullHeightContainer} onClick={() => this.props.signals.course.appClicked()}>
        <Toolbar/>
        <DurationSlider/>
        <Module>
          <ModuleToolbar title="CODE EDITOR">
            <ModuleFileName fileName="index.html"/>
          </ModuleToolbar>
          <CodeEditor/>
        </Module>
        <Module>
          <ModuleToolbar title="BROWSER">
            <ModuleAddressbar url="http://sandbox.learncode.com:3000"/>
          </ModuleToolbar>
          <Preview/>
          <Console show={false}/>
        </Module>
        <PlayButton/>
        <RecordButton/>
        <VideoFrame/>
        <h1>Recording</h1>
      </div>
    );
  }
}

export default Recording;
