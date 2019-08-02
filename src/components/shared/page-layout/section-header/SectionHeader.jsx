import React from 'react';
import PropTypes from 'prop-types';
import './SectionHeader.scss';

const propTypes = {
	title: PropTypes.string.isRequired,
	subtext: PropTypes.string.isRequired
};

const SectionHeader = ({ title, subtext }) => (
	<div className="section-header">
		<h2>{title}</h2>
		<p className="t-heavy">{subtext}</p>
	</div>
);

SectionHeader.propTypes = propTypes;

export default SectionHeader;
