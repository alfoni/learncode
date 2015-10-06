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
import styles from './Course.css';
import Console from './Console.js';

@Cerebral({
  isLoading: ['course', 'isLoading'],
  currentFileName: ['course', 'selectedFile', 'name']
})
class Recording extends React.Component {
  render() {
    return (
      <div className={styles.wrapper} onClick={() => this.props.signals.course.appClicked()}>
        <div className={this.props.isLoading ? styles.overlayVisible : styles.overlay}></div>
        <Toolbar/>
        <DurationSlider/>
        <Module>
          <ModuleToolbar title="CODE EDITOR">
            <ModuleFileName fileName={this.props.currentFileName}/>
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
      </div>
    );
  }
}

export default Recording;
