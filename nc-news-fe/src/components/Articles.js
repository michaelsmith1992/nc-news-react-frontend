import React, { Component } from 'react';
import { getArticles } from '../utils/request';
import ArticleList from './ArticleList';
import Sort from './Sort';
import AddArticle from './AddArticle';
import Errors from './Errors';

export default class Articles extends Component {
  state = {
    articles: [],
    topic: null,
    order: undefined,
    sort_by: undefined,
    limit: 10,
    loading: true,
    loadingMore: false,
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
    if (this.state.loading) {
      return <div className="loader">Loading...</div>;
    }
    return (
      <div>
        <div className="row">
          <div className="col-md"></div>
          <h2 className="col-md">Articles</h2>
          <div className="col-md">
            <AddArticle
              topic={this.props.slug}
              handleUpdate={this.handleUpdate}
            />
          </div>
        </div>

        {this.props.slug ? <h4>Topic: {this.props.slug}</h4> : null}
        <Sort sort={this.sortArticles} />
        <ArticleList articles={this.state.articles} />
        {this.state.loadingMore ? (
          <div className="loader">Loading...</div>
        ) : null}
      </div>
    );
  }
  async componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    const articles = await this.fetchArticles(
      this.props.slug,
      this.state.sort_by,
      this.state.order,
      this.state.limit
    );
    this.setState({
      articles: articles.articles,
      max: articles.total_count,
      loading: false,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.slug !== prevProps.slug) {
      const articles = await this.fetchArticles(
        this.props.slug,
        this.state.sort_by,
        this.state.order,
        this.state.limit
      );
      this.setState({ articles: articles.articles });
    }
  }
  sortArticles = async (sort_by, order) => {
    const articles = await this.fetchArticles(
      this.props.slug,
      sort_by,
      order,
      this.state.limit
    );
    this.setState({
      articles: articles.articles,
      sort_by,
      order,
    });
  };
  handleScroll = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (this.state.articles.length < this.state.max) {
        this.setState({ loadingMore: true });
        const articles = await this.fetchArticles(
          this.props.slug,
          this.props.sort_by,
          this.props.order,
          this.state.limit + 10
        );
        this.setState((curVal) => {
          return {
            articles: articles.articles,
            limit: curVal.limit + 10,
            loadingMore: false,
          };
        });
      }
    }
  };
  handleUpdate = async () => {
    const articles = await this.fetchArticles(
      this.props.slug,
      this.props.sort_by,
      this.props.order,
      this.state.limit
    );
    this.setState({ articles: articles.articles });
  };
  fetchArticles = async (slug, sort_by, order, limit) => {
    try {
      return await getArticles(slug, sort_by, order, limit);
    } catch (error) {
      this.setState({ errors: error });
    }
  };
}
