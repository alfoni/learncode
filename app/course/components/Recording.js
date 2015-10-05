import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './Toolbar';
import ToolbarButton from './Toolbar/ToolbarButton';
import ToolbarSeparator from './Toolbar/ToolbarSeparator';
import ToolbarTitle from './Toolbar/ToolbarTitle';
import ToolbarInput from './Toolbar/ToolbarInput';
import ToolbarButtonPopover from './Toolbar/ToolbarButtonPopover';
import DurationSlider from './DurationSlider';
import Module from './Module';
import ModuleToolbar from './ModuleToolbar';
import ModuleFileName from './CodeEditor/ModuleFileName';
import ModuleAddressbar from './Preview/ModuleAddressbar';
import CodeEditor from './CodeEditor.js';
import Preview from './Preview.js';
import PlayButton from './PlayButton';
import RecordButton from './RecordButton';
import icons from 'common/icons.css';
import VideoFrame from './VideoFrame';
import Preview from './Preview';
import styles from 'common/layout.css';

@Cerebral({
  showAddFileInput: ['course', 'showAddFileInput'],
  showFilesPopover: ['course', 'showFilesPopover']
})
class Recording extends React.Component {
  render() {
    return (
      <div className={styles.fullHeightContainer}>
        <Toolbar>
          <ToolbarButton icon={icons.menu}/>
          <ToolbarSeparator/>
          <ToolbarTitle title="Heisann!"/>
          <ToolbarButton icon={icons.save}/>
          <ToolbarSeparator/>
          <ToolbarButtonPopover onClick={this.props.signals.folderClicked} show={this.props.showFilesPopover} icon={icons.folder}>
            <div style={{width: '100%', height: 40}}></div>
          </ToolbarButtonPopover>
          <ToolbarButton icon={icons.addFile} onClick={this.props.signals.addFileClicked}/>
          {
            this.props.showAddFileInput ?
              <ToolbarInput onBlur={this.props.signals.addFileInputBlurred} placeholder="Type filename..."/>
            :
              null
          }
          <ToolbarSeparator/>
          <ToolbarButton icon={icons.showBrowser}/>
          <ToolbarButton icon={icons.assignment}/>
          <ToolbarSeparator/>
          <ToolbarButton icon={icons.school}/>
          <ToolbarButton icon={icons.checkbox}/>
          <ToolbarButton icon={icons.editAssignment}/>
        </Toolbar>
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
