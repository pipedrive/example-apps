import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SurfaceSDK from '@pipedrive/custom-app-surfaces-sdk';

const SdkContext = createContext({ sdk: null });

const SdkContextProvider = ({ id, children }) => {
	const [sdk, setSdk] = useState(null);

	useEffect(async () => {
		const sdk = new SurfaceSDK({ identifier: id })

		await sdk.initialize();

		setSdk(sdk);
	}, [id]);

	return (
		<SdkContext.Provider value={sdk}>
			{children}
		</SdkContext.Provider>
	);
};

SdkContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { SdkContext, SdkContextProvider };
