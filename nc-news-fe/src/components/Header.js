import React from 'react';
import MobileNav from './MobileNav';

class Header extends React.Component {
  state = {
    mobNav: false,
  };
  render() {
    const { username, name, avatar_url } = this.props.user;
    if (this.state.mobNav) {
      return (
        <div>
          <div>
            <a id="nav-toggle-nav" onClick={this.handleClick}>
              &#9776;
            </a>
          </div>
          <MobileNav />
        </div>
      );
    }
    return (
      <header>
        <div className="padding"></div>
        <h1 className="heading">Northcoders News</h1>
        <div className="user-section">
          <img id="user-img" src={avatar_url}></img>
          <div id="user-name">{name}</div>
        </div>
        <div className="hamburger">
          <a id="nav-toggle" onClick={this.handleClick}>
            &#9776;
          </a>
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
