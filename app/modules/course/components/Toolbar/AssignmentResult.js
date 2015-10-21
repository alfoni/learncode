import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import style from './AssignmentResult.css';
import icons from 'common/icons.css';

@Cerebral({
}, {
  currentScene: ['currentScene']
})
class AssignmentResult extends React.Component {
  renderResult() {
    const result = this.props.currentScene.assignment.result;

    if (result === true) {
      return (
        <div>
          <span className={`${icons.thumbUp} ${style.successIcon}`}></span>
          <span className={style.successText}>
            Du klarte det! Godt jobbet!
          </span>
        </div>
      );
    }

    if (result === false || result === undefined) {
      return (
        <div>Assignment has not been run yet</div>
      );
    }

    return (
      <div>
        <span className={`${icons.thumbDown} ${style.errorIcon}`}></span>
        <span className={style.errorText}>
          {result}
        </span>
      </div>
    );
  }
  render() {
    return (
      <div className={style.wrapper}>
        <h3>Result</h3>
        {this.renderResult()}
      </div>
    );
  }
}

export default AssignmentResult;
