import React from 'react';
import { Link } from '@reach/router';
import UserContext from '../UserContext';

class LoginBtn extends React.Component {
  static contextType = UserContext;
  render() {
    return (
      <Link className="btn btn-primary login-btn" to="/login">
        Login
      </Link>
    );
  }
}

export default LoginBtn;
