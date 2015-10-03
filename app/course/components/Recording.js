import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';
import ToolbarSeparator from './ToolbarSeparator';
import ToolbarTitle from './ToolbarTitle';
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
          <ToolbarButton icon={icons.folder}/>
          <ToolbarButton icon={icons.addFile}/>
          <ToolbarSeparator/>
          <ToolbarButton icon={icons.showBrowser}/>
          <ToolbarButton icon={icons.assignment}/>
          <ToolbarSeparator/>
          <ToolbarButton icon={icons.school}/>
          <ToolbarButton icon={icons.checkbox}/>
          <ToolbarButton icon={icons.editAssignment}/>
        </Toolbar>
        <h1>Recording</h1>
      </div>
    );
  }
}

export default Recording;
