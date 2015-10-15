import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

import styles from './Home.css';

@Cerebral()
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
            <div className={styles.videoFrame}>
              <iframe className={styles.iFrame}
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/mNFt2lhN5pM"
                      frameBorder="0"
                      allowFullScreen></iframe>
            </div>
            <div className={styles.videoFrameShadowLeft}></div>
            <div className={styles.videoFrameShadowRight}></div>
          </div>
        </div>
        <div className={styles.lightBackground}>
          <div className={styles.formWrapper}>
            <input className={styles.input} placeholder="Din e-post"/>
            <button className={styles.button}>Hold meg oppdatert</button>
            <div className={styles.emailDesc}>
              E-posten sendes ikke videre og vil kun bli sendt e-poster knyttet til denne tjenesten.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
