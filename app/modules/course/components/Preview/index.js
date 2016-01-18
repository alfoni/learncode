import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Toolbar from '../Toolbar';
import styles from './styles.css';
import icons from 'common/icons.css';
import ToolbarButton from 'common/components/Toolbar/ToolbarButton.js';
import ToolbarButtonPopover from 'common/components/Toolbar/ToolbarButtonPopover.js';
import ConfigureScenes from '../ConfigureScenes';
import isAdminMode from '../../computed/isAdminMode';

@Cerebral({
  isRecording: ['recorder', 'isRecording'],
  url: ['course', 'previewUrl'],
  user: ['user'],
  isAdminMode: isAdminMode,
  showConfigureScenes: ['course', 'showConfigureScenes']
})
class Preview extends React.Component {
  componentDidMount() {
    this.refs.preview.src = this.props.url;
    window.addEventListener('message', (e) => this.onSandboxMessage(e));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.refs.preview.src = this.props.url;
    }
  }
  componentWillUnmount() {
    window.removeEventListener('message', this.onSandboxMessage);
  }
  onSandboxMessage(event) {
    this.props.signals.course[event.data.signal](event.data.payload);
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <Toolbar>
        {
          this.props.user.isAdmin ?
            <span className={styles.button}>
              <ToolbarButton
                active={!this.props.isAdminMode}
                icon={icons.user}
                onClick={this.props.signals.course.toggleForceUserClicked}/>
            </span>
          :
            null
        }
        {
          this.props.isAdminMode ?
            <span className={styles.button}>
              <ToolbarButtonPopover icon={icons.addCourse}
                                    onClick={(e) => this.props.signals.course.configureScenesClicked(e)}
                                    show={this.props.showConfigureScenes}>
                <ConfigureScenes/>
              </ToolbarButtonPopover>
            </span>
          :
            null
        }
        </Toolbar>
        <iframe id="previewIframe" ref="preview" className={styles.preview} src="about:blank"/>
      </div>
    );
  }
}

export default Preview;
