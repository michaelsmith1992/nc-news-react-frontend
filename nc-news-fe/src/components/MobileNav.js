import React from 'react';
import Topics from './Topics';
import { Link } from '@reach/router';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';

import UserContext from '../UserContext';

class MobileNav extends React.Component {
  static contextType = UserContext;
  render() {
    const { topics } = this.props;
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
            <Topics type="nav" topics={topics} />
            <li className="nav-link">
              <Link to="/users" className="link">
                Users
              </Link>
            </li>
            <li>
              {this.context.user.auth ? (
                <LogoutBtn styling="btn btn-danger" />
              ) : (
                <LoginBtn />
              )}
            </li>
            <li className="row-padding"></li>
          </ul>
        </nav>
      </>
    );
  }
}

export default MobileNav;
