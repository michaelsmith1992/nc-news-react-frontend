import React, { Component } from 'react';
import { deleteArticles } from '../utils/request';
import { navigate } from '@reach/router';
import Errors from './Errors';

export default class ArticlesDeleter extends Component {
  state = {
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
    return (
      <button
        id="del-btn-art"
        className="btn btn-danger"
        onClick={this.handleClick}
      >
        Delete Article
      </button>
    );
  }
  handleClick = async () => {
    try {
      await deleteArticles(this.props.id);
      navigate('/articles');
    } catch (error) {
      this.setState({ errors: error });
    }
  };
}
