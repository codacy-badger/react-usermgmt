import React from 'react';
import NavBar from './nav-bar';
import './Header.scss';

const Header = () => (
	<header className="header">
		<h1 className="page-title">AnonCorp User Management</h1>
		<NavBar />
	</header>
);

export default Header;
