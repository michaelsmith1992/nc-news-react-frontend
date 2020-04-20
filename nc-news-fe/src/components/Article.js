import React, { Component } from 'react';
import { getArticle, patchVotes } from '../utils/request';
import Comments from './Comments';
import Vote from './Vote';
import ArticlesDeleter from './ArticlesDeleter';
import Errors from './Errors';
import moment from 'moment';

export default class Article extends Component {
  state = {
    article: {},
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
      <div>
        <h2>{this.state.article.title}</h2>
        <div className="container-fluid">
          <div className="row">
            <p className="col-md">Author: {this.state.article.author}</p>
            <p className="col-md">Topic: {this.state.article.topic}</p>
            <p className="col-md">
              Created:{' '}
              {moment(this.state.article.created_at).format(
                'Do MMMM YYYY, h:mm:ss a'
              )}
            </p>
          </div>
          <div className="row">
            <div className="col-md">
              <p>Votes: {this.state.article.votes}</p>
              <Vote voteEvent={this.voteEvent} />
            </div>
            <div className="col-md del-btn">
              {localStorage.getItem('username') ===
                this.state.article.author && (
                <ArticlesDeleter id={this.props.article_id} />
              )}
            </div>
          </div>
          <div className="row mt-4">
            <p>{this.state.article.body}</p>
          </div>
        </div>
        <Comments id={this.props.article_id} />
      </div>
    );
  }
  async componentDidMount() {
    try {
      const article = await getArticle(this.props.article_id);
      this.setState(article);
    } catch (error) {
      this.setState({ errors: error });
    }
  }
  voteEvent = (amount) => {
    const article = { ...this.state.article };
    article.votes += amount;
    this.setState({ article });
    patchVotes(this.props.article_id, amount);
  };
}
