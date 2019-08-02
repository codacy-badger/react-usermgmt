import React, { lazy, Suspense } from 'react';
import LoadingIndicator from '@shared/loading-indicator';

const dynamicImport = ImportComponent => {
	const C = lazy(ImportComponent);

	const DynamicImport = props => (
		<Suspense fallback={<LoadingIndicator />}>
			<C {...props} />
		</Suspense>
	);

	const displayName = ImportComponent.displayName || ImportComponent.name || 'Component';
	DynamicImport.displayName = `dynamicImport(${displayName})`;

	return DynamicImport;
};

export default dynamicImport;
