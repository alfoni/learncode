import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';
import ToolbarSeparator from './ToolbarSeparator';
import ToolbarTitle from './ToolbarTitle';
import ToolbarInput from './ToolbarInput';
import ToolbarButtonPopover from './ToolbarButtonPopover';
import DurationSlider from './DurationSlider';
import Module from './Module';
import ModuleToolbar from './ModuleToolbar';
import ModuleFileName from './ModuleFileName';
import ModuleAddressbar from './ModuleAddressbar';
import icons from 'common/icons.css';

@Cerebral({
  showAddFileInput: ['showAddFileInput']
})
class Recording extends React.Component {
  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarButton icon={icons.menu}/>
          <ToolbarSeparator/>
          <ToolbarTitle title="Heisann!"/>
          <ToolbarButton icon={icons.save}/>
          <ToolbarSeparator/>
          <ToolbarButtonPopover icon={icons.folder}>
            <div style={{width: '100%', height: 40}}></div>
          </ToolbarButtonPopover>
          <ToolbarButton/>
          {
            this.props.showAddFileInput ? 
              <ToolbarInput icon={icons.addFile} placeholder="Type filename..."/>
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
        </Module>
        <Module>
          <ModuleToolbar title="BROWSER">
            <ModuleAddressbar url="http://sandbox.learncode.com:3000"/>
          </ModuleToolbar>
        </Module>
        <h1>Recording</h1>
      </div>
    );
  }
}

export default Recording;
