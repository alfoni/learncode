import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Video from './components/Video.js';
import SuccessMessage from './components/SuccessMessage.js';

import icons from 'common/icons.css';
import styles from './Home.css';

@Cerebral({
  hasRegistered: ['home', 'hasRegistered'],
  showSigningupLoader: ['home', 'showSigningupLoader']
})
class Home extends React.Component {
  formSubmitted(e) {
    e.preventDefault();

    this.props.signals.home.formSubmitted({
      email: e.target.email.value
    });
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.column1}>
            <h1>Vil du lære å programmere</h1>
            <h1 className={styles.subTitle}>på en ny måte?</h1>
            <div className={styles.descText}>
              <p>Er du lei av å se på en lærevideo og i etterkant måtte reprodusere koden som har blitt vist?</p>
              <p><b>Snart kan du ta kontroll over koden læreren presenterer!</b></p>
            </div>
          </div>
          <div className={styles.column2}>
            <Video url="https://www.youtube.com/embed/mNFt2lhN5pM"/>
          </div>
        </div>
        <div className={styles.lightBackground}>
          <div className={styles.container}>
            <SuccessMessage
              show={this.props.hasRegistered}
              icon={icons.thumbUp}
              message={'Takk for din interesse!'}/>
            <form onSubmit={(e) => this.formSubmitted(e)}
                  className={this.props.hasRegistered ? styles.formWrapperHidden : styles.formWrapper}>
              <input
                type="email"
                name="email"
                disabled={this.props.showSigningupLoader}
                className={this.props.showSigningupLoader ? styles.inputDisabled : styles.input}
                placeholder="Din e-post"/>
              <button
                className={this.props.showSigningupLoader ? styles.buttonDisabled : styles.button}
                disabled={this.props.showSigningupLoader}>
                { this.props.showSigningupLoader ?
                    <span className={icons.loading + ' ' + styles.loadingIcon}></span>
                  :
                    'Hold meg oppdatert'
                }
              </button>
            </form>
            <div className={styles.emailDesc}>
              Din e-post sendes ikke videre og vil kun motta e-poster knyttet til denne tjenesten.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
