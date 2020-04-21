import React from 'react';
import UserContext from '../UserContext';

class LogoutBtn extends React.Component {
  static contextType = UserContext;

  render() {
    return (
      <div className={this.props.styling} onClick={this.logoutClick}>
        Logout
      </div>
    );
  }

  logoutClick = () => {
    this.context.logoutUser();
  };
}

export default LogoutBtn;
