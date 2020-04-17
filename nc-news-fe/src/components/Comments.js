import React, { Component } from 'react';
import { getComments } from '../utils/request';
import AddComments from './AddComment';
import Comment from './Comment';
import Errors from './Errors';

export default class Comments extends Component {
  state = {
    comments: [],
    limit: 3,
    loadingMore: true,
    max: 0,
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
      <div className="comments card">
        <h4>Comments</h4>
        <AddComments id={this.props.id} handleUpdate={this.handleUpdate} />
        {this.state.comments.map((comment) => {
          return (
            <Comment
              key={comment.comment_id}
              comment={comment}
              handleUpdate={this.handleUpdate}
            />
          );
        })}
        {this.state.loadingMore ? (
          <div className="loader">Loading...</div>
        ) : null}
      </div>
    );
  }
  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    await this.getComments(this.state.limit);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleUpdate = async (comments) => {
    await this.getComments(this.state.limit);
  };
  handleScroll = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.state.comments.length < this.state.max) {
        this.setState({ loadingMore: true });
        await this.getComments(this.state.limit + 3);
        this.setState((curVal) => {
          return { loadingMore: false, limit: curVal.limit + 3 };
        });
      }
    }
  };

  getComments = async (limit) => {
    try {
      const comments = await getComments(this.props.id, limit);
      this.setState({
        comments: comments.comments,
        max: comments.total_count,
        loadingMore: false,
      });
    } catch (error) {
      this.setState({ errors: error });
    }
  };
}