import React, { FunctionComponent } from 'react';
import Logo from '../logo/logo';

export const Navbar: FunctionComponent = () => {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <Logo />
            </a>
          </div>
        </div>
      </nav>
      <style jsx>{`
        nav.navbar {
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
        }
        nav.navbar .container {
          padding-left: 1.5em;
          padding-right: 1.5em;
        }

        nav.navbar .navbar-item {
          padding-top: 1.75em;
          padding-bottom: 1.75em;
        }
      `}</style>
    </>
  );
};

export default Navbar;
