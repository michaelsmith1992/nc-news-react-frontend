import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header';
import Nav from './components/Nav';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Article from './components/Article';
import About from './components/About';
import Errors from './components/Errors';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    user: {
      username: 'grumpy19',
      name: 'Tom Tickle',
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/e/e9/Mr_Grumpy_9a.PNG/revision/latest/top-crop/width/300/height/300?cb=20171020163928',
    },
  };
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <Nav />
        <Router className="main-content">
          <Errors default status="404" msg="Not found!" />
          <Topics path="/topics" />
          <Article path="/articles/:article_id" />
          <Articles path="/articles" />
          <Articles path="/" />
          <About path="/about" />
          <Articles path="/topics/:slug" />
        </Router>
      </div>
    );
  }
  componentDidMount() {
    localStorage.setItem('username', 'grumpy19');
  }
}

export default App;
