import React, { Component } from 'react';
import DeleteComments from './DeleteComments';
import Vote from './Vote';
import { patchCommentVotes } from '../utils/request';
import moment from 'moment';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: props.comment.votes,
    };
  }
  render() {
    const { comment, handleUpdate } = this.props;
    return (
      <div className="comment card">
        <div className="row">
          <p className="col-md">User: {comment.author}</p>
          <p className="col-md">
            {moment(comment.created_at).format('Do MMMM YYYY, h:mm:ss a')}
          </p>
        </div>
        <div className="row">
          <p className="col-8">{comment.body}</p>
          <div className="col">
            <p className="text-cen">Votes: {this.state.votes}</p>
          </div>
          <div className="col">
            <Vote voteEvent={this.voteEvent} />
          </div>
        </div>

        {localStorage.getItem('username') === comment.author ? (
          <div className="row mt-3">
            <div className="col-9"></div>
            <div className="col">
              <DeleteComments
                id={comment.comment_id}
                handleUpdate={handleUpdate}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
  voteEvent = (amount) => {
    this.setState((curVal) => {
      return {
        votes: curVal.votes + amount,
      };
    });
    patchCommentVotes(this.props.comment.comment_id, amount);
  };
}
