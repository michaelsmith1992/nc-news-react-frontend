import React, { Component } from 'react';
import { deleteComments } from '../utils/request';
import Errors from './Errors';

export default class CommentsDeleter extends Component {
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
      <button className="btn btn-danger" onClick={this.handleClick}>
        Delete Comment
      </button>
    );
  }
  handleClick = async () => {
    try {
      await deleteComments(this.props.id);
      this.props.handleDelete(this.props.id);
    } catch (error) {
      this.setState({ errors: error });
    }
  };
}
