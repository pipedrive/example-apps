import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext({
	item: {},
	setItem: {},
	proposals: [],
	setProposals: () => {},
	items: [],
	setItems: () => {}
});

const DataContextProvider = ({ children }) => {
	const [items, setItems] = useState([]);
	const [proposals, setProposals] = useState([]);
	const [item, setItem] = useState({});

	return (
		<DataContext.Provider value={{
			proposals,
			setProposals,
			item,
			setItem,
			items,
			setItems,
		}}>
			{children}
		</DataContext.Provider>
	);
};

DataContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { DataContext, DataContextProvider };
