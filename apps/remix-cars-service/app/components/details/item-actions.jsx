import { Command } from '@pipedrive/app-extensions-sdk';

import Button from '../shared/button';
import ButtonLabel from '../shared/button-label';

import useSdk from '../../hooks/useSdk';
import useData from '../../hooks/useData';

export default function ItemActions({ selectedId, updateItem }) {
	const sdk = useSdk();
	const { item } = useData();

	const closeModal = async () => {
		await sdk.execute(Command.CLOSE_MODAL);
	}

	const selectProposal = async () => {
		if (item.status !== 'ready') {
			const { confirmed } = await sdk.execute(Command.SHOW_CONFIRMATION, {
				title: 'Send proposal',
				okText: 'Send',
				description: `Sending the proposal to the customer changes car status to “Ready for delivery”. Are you sure you want to proceed?`
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

		await closeModal();
	}

	return (
		<div className="item-actions">
			<Button onClick={closeModal}>
				<ButtonLabel>Close</ButtonLabel>
			</Button>
			<Button variant="primary" disabled={!selectedId} onClick={selectProposal}>
				<ButtonLabel>Send proposal</ButtonLabel>
			</Button>
		</div>
	);
}
