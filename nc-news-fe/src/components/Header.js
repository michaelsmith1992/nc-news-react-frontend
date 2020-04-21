import React from 'react';
import MobileNav from './MobileNav';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';

import { Link } from '@reach/router';
import UserContext from '../UserContext';

class Header extends React.Component {
  state = {
    mobNav: false,
  };
  static contextType = UserContext;

  render() {
    const { user, auth } = this.context.user;
    const { name, avatar_url, username } = user;

    const url = `/users/${username}`;
    if (this.state.mobNav) {
      return (
        <div>
          <div className="closeNav">
            <button id="nav-toggle-nav" onClick={this.handleClick}>
              x
            </button>
          </div>
          <MobileNav topics={this.props.topics} />
        </div>
      );
    }
    return (
      <header>
        <div className="padding"></div>
        <h1 className="heading">Northcoders News</h1>
        {auth ? (
          <div className="dropdown">
            <div
              className="user-section dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img id="user-img" src={avatar_url} alt="user"></img>
              <div id="user-name">{name}</div>
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to={url}>
                Profile
              </Link>
              <LogoutBtn styling="dropdown-item" />
            </div>
          </div>
        ) : (
          <div className="padding desktop-login">
            <LoginBtn />
          </div>
        )}

        <div className="hamburger">
          <button id="nav-toggle" onClick={this.handleClick}>
            &#9776;
          </button>
        </div>
      </header>
    );
  }
  handleClick = () => {
    this.setState((curVal) => {
      return { mobNav: !curVal.mobNav };
    });
  };
}

export default Header;
