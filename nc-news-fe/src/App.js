import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header';
import Nav from './components/Nav';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Article from './components/Article';
import Users from './components/Users';
import User from './components/User';
import Errors from './components/Errors';
import { getTopics } from './utils/request';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    user: {
      username: 'tickle122',
      name: 'Tom Tickle',
      avatar_url:
        'https://vignette.wikia.nocookie.net/mrmen/images/e/e9/Mr_Grumpy_9a.PNG/revision/latest/top-crop/width/300/height/300?cb=20171020163928',
    },
    topics: [],
  };
  render() {
    return (
      <div className="App">
        <Header user={this.state.user} topics={this.state.topics} />
        <Nav topics={this.state.topics} />
        <Router className="main-content">
          <Errors default status="404" msg="Not found!" />
          <Topics path="/topics" topics={this.state.topics} />
          <Article path="/articles/:article_id" />
          <Articles path="/articles" topics={this.state.topics} />
          <Articles path="/" topics={this.state.topics} />
          <Users path="/users" />
          <User path="/users/:username" />
          <Articles path="/topics/:slug" topics={this.state.topics} />
        </Router>
      </div>
    );
  }
  async componentDidMount() {
    try {
      localStorage.setItem('username', 'tickle122');
      const topics = await getTopics();
      this.setState({ topics: topics.topics, loading: false });
    } catch (error) {
      this.setState({ errors: error });
    }
  }
}

export default App;
