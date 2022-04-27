import { Command } from '@pipedrive/custom-app-surfaces-sdk';

import Button from '../shared/button';
import useData from '../../hooks/useData';
import useSdk from '../../hooks/useSdk';

export default function ItemActions({ selectedId }) {
	const sdk = useSdk();
	const { item, setItem, proposals } = useData();

	const selectProposal = async () => {
		if (item.status !== 'ready') {
			const { confirmed } = await sdk.execute(Command.SHOW_CONFIRMATION, {
				title: 'Change status',
				description: `You're about to change status to "Ready to delivery".`
			});

			if (!confirmed) {
				return;
			}
		}

		setItem({
			...item,
			status: 'ready',
			proposal: proposals.find(({ id }) => selectedId === id),
		});

		await sdk.execute(Command.SHOW_SNACKBAR, {
			message: 'Proposal has been sent',
		});
	}

	return (
		<div className='item-actions'>
			<Button>
				<span>New proposal</span>
			</Button>
			<Button variant="primary" disabled={!selectedId} onClick={selectProposal}>
				<span>Send selected proposal</span>
			</Button>
		</div>
	);
}
