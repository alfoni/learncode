import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Preview.css';

@Cerebral()
class Preview extends React.Component {
  render() {
    return (
      <iframe ref="preview" className={styles.preview}/>
    );
  }
}

export default Preview;
