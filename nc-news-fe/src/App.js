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
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

import { UserProvider } from './UserContext';

import { getTopics } from './utils/request';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    // user: {
    //   username: 'tickle122',
    //   name: 'Tom Tickle',
    //   avatar_url:
    //     'https://vignette.wikia.nocookie.net/mrmen/images/e/e9/Mr_Grumpy_9a.PNG/revision/latest/top-crop/width/300/height/300?cb=20171020163928',
    // },
    // auth: false,
    topics: [],
  };
  render() {
    return (
      <UserProvider>
        <div className="App">
          <Header user={this.state.user} topics={this.state.topics} />
          <Nav topics={this.state.topics} />
          <Router className="main-content">
            <Errors default status="404" msg="Not found!" />
            <Topics path="/topics" topics={this.state.topics} />
            <Article path="/articles/:article_id" />
            <Login path="/login" userLogin={this.userLogin} />
            <Articles path="/articles" topics={this.state.topics} />
            <Articles path="/" topics={this.state.topics} />
            <PrivateRoute as={Users} path="/users" />
            <PrivateRoute as={User} path="/users/:username" />
            <Articles path="/topics/:slug" topics={this.state.topics} />
          </Router>
        </div>
      </UserProvider>
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
  userLogin = async (user) => {
    this.setState({ user: user.user, auth: true });
  };
}

export default App;
