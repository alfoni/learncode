import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Preview.css';

@Cerebral({
  url: ['course', 'previewUrl']
})
class Preview extends React.Component {
  componentDidMount() {
    this.refs.preview.src = this.props.url;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.refs.preview.src = this.props.url;
    }
  }
  render() {
    return (
      <iframe ref="preview" className={this.props.show ? styles.preview : styles.hidden} src="about:blank"/>
    );
  }
}

export default Preview;
