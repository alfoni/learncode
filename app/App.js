import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';
import Recording from './course/components/Recording.js';
import Home from './home/components/Home.js';

const pages = {
  'home': Home,
  'recording': Recording
};

@Cerebral({
  page: ['course', 'currentPage']
})
class App extends React.Component {
  renderPage() {
    const Page = pages[this.props.page];

    return <Page/>;
  }
  render() {
    return (
      <div>
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
