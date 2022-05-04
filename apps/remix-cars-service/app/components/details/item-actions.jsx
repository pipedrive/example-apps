import { Command } from '@pipedrive/custom-app-surfaces-sdk';

import Button from '../shared/button';
import ButtonLabel from '../shared/button-label';

import useSdk from '../../hooks/useSdk';
import useData from '../../hooks/useData';

export default function ItemActions({ selectedId, updateItem }) {
	const sdk = useSdk();
	const { proposals, item } = useData();

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

		await updateItem({
			...item,
			status: 'ready',
			proposal: selectedId,
		});

		await sdk.execute(Command.SHOW_SNACKBAR, {
			message: 'Item has been updated',
		});
	}

	return (
		<div className='item-actions'>
			<Button>
				<ButtonLabel>New proposal</ButtonLabel>
			</Button>
			<Button variant="primary" disabled={!selectedId} onClick={selectProposal}>
				<ButtonLabel>Select proposal</ButtonLabel>
			</Button>
		</div>
	);
}
