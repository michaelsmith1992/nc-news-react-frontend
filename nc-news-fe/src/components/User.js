import React, { Component } from 'react';
import Errors from './Errors';
import { getUser } from '../utils/request';

export default class User extends Component {
  state = {
    user: {},
    loading: true,
    errors: null,
  };
  render() {
    if (this.state.errors)
      return (
        <Errors
          status={this.state.errors.response.status}
          msg={this.state.errors.response.data.msg}
        />
      );
    if (this.state.loading) {
      return <div className="loader">Loading...</div>;
    }
    return (
      <div>
        <h2>Profile</h2>
        <h4>Username: {this.state.user.name} </h4>
        <h4>Name: {this.state.user.username} </h4>
        <img
          className="user-img"
          src={this.state.user.avatar_url}
          alt="user-img"
        />
      </div>
    );
  }

  async componentDidMount() {
    try {
      const { user } = await getUser(this.props.username);
      this.setState({ user, loading: false });
    } catch (error) {
      this.setState({ errors: error });
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    console.log('test');

    if (this.props.username !== prevProps.username) {
      console.log('test');
      try {
        const { user } = await getUser(this.props.username);
        this.setState({ user, loading: false });
      } catch (error) {
        this.setState({ errors: error });
      }
    }
  }
}
