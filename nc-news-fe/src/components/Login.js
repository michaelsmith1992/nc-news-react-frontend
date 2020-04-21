import React, { Component } from 'react';
import { login } from '../utils/request';
import UserContext from '../UserContext';
import { navigate } from '@reach/router';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    validationError: false,
  };
  static contextType = UserContext;

  render() {
    if (this.context.user.auth) {
      navigate('/');
    }
    return (
      <div className="login-form main-content">
        <form>
          <h2 className="text-center">Log in</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              required="required"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required="required"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.handleSubmit}
            >
              Log in
            </button>
            {this.state.validationError ? (
              <div className="alert alert-danger">
                Username or password is invalid!
              </div>
            ) : null}
          </div>
        </form>
        <div className="alert alert-warning">
          Example User <br></br> User: grumpy19 <br></br> Password: test123
        </div>
      </div>
    );
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (this.state.username === '' || this.state.password === '') {
        this.setState({ validationError: true });
      } else {
        console.log(this.state.username, this.state.password);
        const data = await login(this.state.username, this.state.password);
        console.log(data);
        this.context.setUser(data);
        this.setState({ validationError: false });
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      this.setState({ validationError: true });
    }
  };
}
