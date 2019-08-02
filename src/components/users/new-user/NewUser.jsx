import React from 'react';
import SectionHeader from '@shared/page-layout/section-header';
import ContentContainer from '@shared/page-layout/content-container';
import UserForm from '@shared/user-form';

const NewUser = () => (
	<ContentContainer className="new-user">
		<SectionHeader
			title="Create a User"
			subtext="Please fill out all form fields below."
		/>
		<UserForm />
	</ContentContainer>
);

export default NewUser;
