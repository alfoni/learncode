import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import styles from './Log.css';

@Cerebral({
  users: ['log', 'users']
})
class Log extends React.Component {
  constructor() {
    super();
  }
  renderUserLogs(logs) {
    return logs.map((log, index) => {
      return (
        <div className={styles.logWrapper} key={index}>
          <span className={styles.logMessage}>{log.message}</span>
          <span className={styles.logTimestamp}>{log.timestamp}</span>
        </div>
      );
    });
  }
  renderUsers() {
    return this.props.users.map((user, index) => {
      return (
        <div key={index}>
          <div className={styles.username}>{user.id}</div>
          {this.renderUserLogs(user.log)}
        </div>
      );
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Brukerlogger</h1>
        {this.renderUsers()}
      </div>
    );
  }
}

export default Log;
