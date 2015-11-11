import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './MouseCursor.css';

@Cerebral({
  isPlaying: ['course', 'recorder', 'isPlaying'],
  mousePosition: ['course', 'mousePosition']
})
class MouseCursor extends React.Component {
  constructor() {
    super();
    this.hasSwitched = false;
  }
  componentWillUpdate(nextProps) {
    this.hasSwitched = nextProps.isPlaying !== this.props.isPlaying;
  }
  render() {
    return (
      this.props.isPlaying && !this.hasSwitched ?
          <div
            key={this.props.mousePosition.x + '_' + this.props.mousePosition.y}
            className={styles.wrapper}
            style={{left: this.props.mousePosition.x, top: this.props.mousePosition.y}}>
          </div>
        :
          null
    );
  }
}

export default MouseCursor;
