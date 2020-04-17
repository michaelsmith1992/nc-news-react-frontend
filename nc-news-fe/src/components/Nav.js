import React from 'react';
import Topics from './Topics';
import { Link } from '@reach/router';

const Nav = () => {
  return (
    <>
      <div className="logo-cont">
        <img id="nc-logo" src="/logo.png" alt="logo" />
      </div>
      <nav className="nav-bar">
        <ul className="nav-links">
          <li className="nav-link">
            <Link to="/articles" className="link">
              Articles
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/topics" className="link">
              Topics
            </Link>
          </li>
          <Topics type="nav" />
          <li className="nav-link">
            <Link to="/about" className="link">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
