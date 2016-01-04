import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Preview.css';

@Cerebral({
  isRecording: ['recorder', 'isRecording'],
  url: ['course', 'previewUrl']
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
      <iframe id="previewIframe" ref="preview" className={styles.preview} src="about:blank"/>
    );
  }
}

export default Preview;
