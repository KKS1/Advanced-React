import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Nav from './Nav';

export default function Header({ children }) {
  return (
    <header>
      <div className="bar">
        <Link href="/">Sick fits</Link>
      </div>

      <div className="sub-bar">
        <p>Search</p>
      </div>

      <Nav />
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node,
};
