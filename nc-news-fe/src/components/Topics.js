import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getTopics } from '../utils/request';
import Errors from './Errors';

export default class Topics extends Component {
  state = {
    topics: [],
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
    const { type } = this.props;
    if (type === 'nav') {
      const topics = [...this.state.topics].slice(0, 9);
      return (
        <>
          {topics.map((topic) => {
            const url = `../topics/${topic.slug}`;
            return (
              <li key={topic.slug} className="nav-links-topic">
                <Link to={url}>{topic.slug}</Link>
              </li>
            );
          })}
        </>
      );
    }
    if (this.state.loading) {
      return <div className="loader">Loading...</div>;
    }
    return (
      <div>
        <h2>Topics</h2>
        <table className="table table-striped topics-table">
          <thead className="thead-dark">
            <tr>
              <th>Topic</th>
              <th>Description</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {this.state.topics.map((topic) => {
              const url = `./${topic.slug}`;
              return (
                <tr key={topic.slug}>
                  <td>{topic.slug}</td>
                  <td>{topic.description}</td>
                  <td>
                    <Link to={url}>»</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  async componentDidMount() {
    try {
      const topics = await getTopics();
      this.setState({ topics: topics.topics, loading: false });
    } catch (error) {
      this.setState({ errors: error });
    }
  }
}
