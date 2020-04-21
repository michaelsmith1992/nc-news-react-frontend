import React from 'react';

const UserContext = React.createContext();

class UserProvider extends React.Component {
  // Context state
  state = {
    user: {},
    auth: false,
    token: null,
  };

  // Method to update state
  setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user.user));
    localStorage.setItem('auth', true);
    localStorage.setItem('token', user.token);

    this.setState(() => ({
      user: user.user,
      auth: true,
      token: user.token,
    }));
  };

  logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    this.setState(() => ({
      user: {},
      auth: false,
      token: null,
    }));
  };

  render() {
    const { children } = this.props;
    const { setUser, logoutUser } = this;

    return (
      <UserContext.Provider
        value={{
          user: this.state,
          setUser,
          logoutUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }

  componentDidMount() {
    if (localStorage.getItem('auth')) {
      this.setState((prevState) => ({
        user: JSON.parse(localStorage.getItem('user')),
        auth: localStorage.getItem('auth'),
        token: localStorage.getItem('token'),
      }));
    }
  }
}

export default UserContext;
export { UserProvider };

export const UserConsumer = UserContext.Consumer;
