import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Preview.css';

@Cerebral({
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
    this.props.signals.course[event.data.signal]({message: event.data.message});
  }
  render() {
    return (
      <iframe ref="preview" className={this.props.show ? styles.preview : styles.hidden} src="about:blank"/>
    );
  }
}

export default Preview;
