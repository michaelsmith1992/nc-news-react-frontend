import React, { Component } from 'react';
import { Link } from '@reach/router';
import moment from 'moment';

class ArticleList extends Component {
  render() {
    const { articles } = this.props;
    return (
      <>
        <div className="articles-table">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Preview</th>
                <th>Topic</th>
                <th>Author</th>
                <th>Date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody className="table-hover">
              {articles.map((article) => {
                const url = `../../articles/${article.article_id}`;
                return (
                  <tr key={article.article_id}>
                    <td>{article.title}</td>
                    <td>{article.body.slice(0, 29)}...</td>
                    <td>{article.topic}</td>
                    <td>{article.author}</td>
                    <td>{moment(article.created_at).format('DD/MM/YYYY')}</td>
                    <td>
                      <Link to={url}>»</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="articles-table-mob">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Topic</th>
                <th>Date</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody className="table-hover">
              {articles.map((article) => {
                const url = `../../articles/${article.article_id}`;
                return (
                  <tr key={article.article_id}>
                    <td>{article.title}</td>
                    <td>{article.topic}</td>
                    <td>{moment(article.created_at).format('DD/MM/YYYY')}</td>
                    <td>
                      <Link to={url}>»</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default ArticleList;
