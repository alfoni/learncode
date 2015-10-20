import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

let Toolbar = null;
let styles = null;

@Cerebral({
  isLoading: ['courses', 'isLoading']
})
class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      Toolbar = require('./components/Toolbar.js');
      styles = require('./Courses.css');
      this.setState({
        canRender: true
      });
    });
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper} onClick={() => this.props.signals.courses.appClicked()}>
          <Toolbar/>
          <h1>Courses</h1>
        </div>
      );
    }
    
    return null;
  }
}

export default Courses;
