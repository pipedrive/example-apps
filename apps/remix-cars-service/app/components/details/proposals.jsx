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
			<div className="cui5-separator cui5-separator--type-line">
				<div className="cui5-separator__label"/>
			</div>

			<h3 className="cui5-spacing cui5-spacing--top-s">Proposal templates</h3>

			<div className="proposals">
				{proposals.map(({ id, title, color }) =>
					<Proposal
						key={`proposal-${id}`}
						title={title}
						color={color}
						isSelected={id === selectedId}
						onClick={() => toggleItem(id)}
					/>
				)}
			</div>
			<ItemActions updateItem={onItemUpdate} selectedId={selectedId}/>
		</>
	);
}
