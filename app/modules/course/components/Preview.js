import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Preview.css';

@Cerebral({
  url: ['course', 'previewUrl']
})
class Preview extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.refs.preview.src = this.props.url;
    }
  }
  render() {
    return (
      <iframe ref="preview" className={styles.preview} src="about:blank"/>
    );
  }
}

export default Preview;
