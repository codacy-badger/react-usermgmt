import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import './ContentContainer.scss';

const propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string
};

const ContentContainer = ({ children, className }) => {
	const cls = clsx(className && className, 'content-container');
	return <div className={cls}>{children}</div>;
};

ContentContainer.propTypes = propTypes;

export default ContentContainer;
