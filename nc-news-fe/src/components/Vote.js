import React, { Component } from 'react';

export default class Vote extends Component {
  state = {
    vote: 0,
  };
  render() {
    return (
      <div className="voting">
        <button
          className="upvote vote btn btn btn-primary"
          disabled={this.state.vote > 0 ? true : false}
          onClick={() => this.handleClick(1)}
        >
          +
        </button>
        <button
          className="downvote vote btn btn-danger"
          disabled={this.state.vote < 0 ? true : false}
          onClick={() => this.handleClick(-1)}
        >
          -
        </button>
      </div>
    );
  }
  handleClick(number) {
    this.setState((curVal) => {
      return { vote: curVal.vote + number };
    });
    this.props.voteEvent(number);
  }
}
