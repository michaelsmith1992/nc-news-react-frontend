import { navigate, Redirect } from '@reach/router';
import React from 'react';
import UserContext, { UserProvider } from '../UserContext';

class PrivateRoute extends React.Component {
  static contextType = UserContext;
  render() {
    if (!this.context.user.auth) {
      return <Redirect to="/login" noThrow />;
    } else {
      let { as: Comp, ...props } = this.props;
      return <Comp {...props} />;
    }
  }
}

export default PrivateRoute;
