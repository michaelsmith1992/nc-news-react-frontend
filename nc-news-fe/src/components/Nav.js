import React from 'react';
import Topics from './Topics';
import { Link } from '@reach/router';

const Nav = ({ topics }) => {
  return (
    <>
      <div className="logo-cont">
        <img id="nc-logo" src="/logo.png" alt="northcoders-logo" />
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
          <Topics type="nav" topics={topics} />
          <li className="nav-link">
            <Link to="/users" className="link">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Nav;
