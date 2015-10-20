import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

let Video = null;
let SuccessMessage = null;
let icons = null;
let styles = null;

@Cerebral({
  hasRegistered: ['home', 'hasRegistered'],
  showSigningupLoader: ['home', 'showSigningupLoader']
})
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      canRender: false
    };
  }
  componentDidMount() {
    require.ensure([], (require) => {
      Video = require('./components/Video.js');
      SuccessMessage = require('./components/SuccessMessage.js');
      icons = require('common/icons.css');
      styles = require('./Home.css');
      this.setState({
        canRender: true
      });
    });
  }
  formSubmitted(e) {
    e.preventDefault();

    this.props.signals.home.formSubmitted({
      email: e.target.email.value
    });
  }
  render() {
    if (this.state.canRender) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.topWrapper}>
            <div className={styles.darkBackground}></div>
            <div className={styles.container}>
              <div className={styles.logo}></div>
              <div className={styles.column1}>
                <h1>Med kode kan du skape</h1>
                <h1 className={styles.subTitle}>utrolige ting!</h1>
                <div className={styles.descText}>
                  <p>Vil du lære hvordan du lager et spill som kan spilles over hele verden?
                  Eller hvordan lager applikasjoner som hjelper andre mennesker? Vil du lage din egen hjemmeside?</p>
                  <p><b>Med Kodeboksen viser vi deg hvordan!</b></p>
                </div>
              </div>
              <div className={styles.column2}>
                <Video url="https://www.youtube.com/embed/Oeti69mgf2g"/>
              </div>
            </div>
          </div>
          <div className={styles.bottomWrapper}>
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
                Din e-post sendes ikke videre og vil kun motta e-poster knyttet til lanseringen av Kodeboksen.
              </div>
              <p className={styles.information}>
                <strong>Kodeboksen</strong> er en tjeneste under utvikling. Ved å melde din interesse vil vi gi deg beskjed når kan logge inn og lære
                kode på en helt ny og interaktiv måte. Du vil også få muligheten til å delta på Kodeboksen sine kurs i <strong>Trondheim</strong> og
                <strong> Oslo</strong>.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Home;
