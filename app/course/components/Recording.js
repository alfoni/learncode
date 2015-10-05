import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';
import ToolbarSeparator from './ToolbarSeparator';
import ToolbarTitle from './ToolbarTitle';
import ToolbarInput from './ToolbarInput';
import ToolbarButtonPopover from './ToolbarButtonPopover';
import DurationSlider from './DurationSlider';
import icons from 'common/icons.css';

@Cerebral()
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
          <ToolbarInput icon={icons.addFile} placeholder="Type filename..."/>
          <ToolbarSeparator/>
          <ToolbarButton icon={icons.showBrowser}/>
          <ToolbarButton icon={icons.assignment}/>
          <ToolbarSeparator/>
          <ToolbarButton icon={icons.school}/>
          <ToolbarButton icon={icons.checkbox}/>
          <ToolbarButton icon={icons.editAssignment}/>
        </Toolbar>
        <DurationSlider/>
        <h1>Recording</h1>
      </div>
    );
  }
}

export default Recording;
