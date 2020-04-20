import React from 'react';
import MobileNav from './MobileNav';
import { Link } from '@reach/router';

class Header extends React.Component {
  state = {
    mobNav: false,
  };
  render() {
    const { name, avatar_url, username } = this.props.user;
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
        <Link to={url} className="user-section">
          <img id="user-img" src={avatar_url} alt="user-image"></img>
          <div id="user-name">{name}</div>
        </Link>
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
