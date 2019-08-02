import React from 'react';
import { Link } from 'react-router-dom';
import ContentContainer from '@shared/page-layout/content-container';
import SectionHeader from '@shared/page-layout/section-header';

const Missing = () => (
	<ContentContainer className="missing">
		<SectionHeader title="That's a 404" subtext="You must be lost..." />
		<p>
			<Link to="/">Click here</Link> to return to the main application.
		</p>
	</ContentContainer>
);

export default Missing;
