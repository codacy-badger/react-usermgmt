import React from 'react';
import './Footer.scss';

const Footer = () => (
	<footer className="footer">
		<p className="t-copyright">Copyright &copy; AnonCorp {new Date().getFullYear()}</p>
	</footer>
);

export default Footer;
