import React from 'react';
import UserContext from '../UserContext';

class LogoutBtn extends React.Component {
  static contextType = UserContext;

  render() {
    return (
      <a className={this.props.style} onClick={this.logoutClick}>
        Logout
      </a>
    );
  }

  logoutClick = () => {
    this.context.logoutUser();
  };
}

export default LogoutBtn;
