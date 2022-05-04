import { useState } from 'react';

import Spinner from '../shared/spinner';
import useProposalsLoader from '../../hooks/useProposalsLoader';

import Proposal from './proposal';
import ItemActions from './item-actions';

export default function Proposals({ item, onItemUpdate }) {
	const { proposals, isLoading } = useProposalsLoader();

	const [selectedId, setSelectedId] = useState(null);

	const toggleItem = (itemId) => {
		if (itemId === selectedId) {
			setSelectedId(null);
		} else {
			setSelectedId(itemId);
		}
	}

	if (isLoading) {
		return (
			<div className="loading">
				<Spinner size="l"/>
			</div>
		);
	}

	if (item.proposal) {
		return null;
	}

	return (
		<>
			<div className="proposals">
				{proposals.map(({ id, title }) =>
					<Proposal
						key={`proposal-${id}`}
						title={title}
						isSelected={id === selectedId}
						onClick={() => toggleItem(id)}
					/>
				)}
			</div>
			<ItemActions updateItem={onItemUpdate} selectedId={selectedId}/>
		</>
	);
}
