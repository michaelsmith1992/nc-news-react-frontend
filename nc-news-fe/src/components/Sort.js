import React, { Component } from 'react';

export default class Sort extends Component {
  state = {
    sort_by: 'created_at',
    order: 'desc',
  };
  render() {
    return (
      <form>
        <label className="sort">
          Sort By:
          <select
            className="form-control"
            onChange={this.sortingBy}
            value={this.state.sort_by}
          >
            <option value="title">Title</option>
            <option value="topic">Topic</option>
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="author">Author</option>
            <option value="comment_count">Comments</option>
          </select>
        </label>
        <label className="sort">
          Order By:
          <select
            className="form-control"
            onChange={this.sortingOrder}
            value={this.state.order}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </form>
    );
  }
  sortingBy = (event) => {
    this.setState({ sort_by: event.target.value }, () => {
      if (this.state.sort_by && this.state.order) {
        this.props.sort(this.state.sort_by, this.state.order);
      }
    });
  };
  sortingOrder = (event) => {
    event.preventDefault();
    this.setState({ order: event.target.value }, () => {
      if (this.state.sort_by && this.state.order) {
        this.props.sort(this.state.sort_by, this.state.order);
      }
    });
  };
}
