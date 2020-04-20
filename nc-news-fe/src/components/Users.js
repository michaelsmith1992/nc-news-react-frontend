import React from 'react';
import { Link } from '@reach/router';
import Errors from './Errors';
import { getAllUsers } from '../utils/request';

export default class About extends React.Component {
  state = {
    users: [],
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
    if (this.state.loading) {
      return <div className="loader">Loading...</div>;
    }
    return (
      <div>
        <h2>Users</h2>
        <table className="table table-striped topics-table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {this.state.users.map((user) => {
              const url = `./${user.username}`;
              return (
                <tr key={user.username}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>
                    <Link to={url} user={user}>
                      »
                    </Link>
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
      const { users } = await getAllUsers();
      this.setState({ users, loading: false });
    } catch (error) {
      this.setState({ errors: error });
    }
  }
}
