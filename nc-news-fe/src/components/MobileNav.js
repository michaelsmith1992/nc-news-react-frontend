import React from 'react';
import Topics from './Topics';
import { Link } from '@reach/router';

const MobileNav = () => {
  return (
    <>
      <nav className="nav-bar-mob">
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

export default MobileNav;
