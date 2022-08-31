import { Command } from '@pipedrive/app-extensions-sdk';

import useItemsLoader from '../../hooks/useItemsLoader';
import useFormData from '../../hooks/useFormData';
import useSdk from '../../hooks/useSdk';

import Button from '../shared/button';
import Spinner from '../shared/spinner';
import ItemDetails from './item-details';
import ButtonLabel from '../shared/button-label';

export default function ItemsSettings() {
	const sdk = useSdk();
	const { makePostRequest } = useFormData();
	const { items, isLoading, fetchItems } = useItemsLoader();

	if (isLoading) {
		return (
			<div className="loading">
				<Spinner size="l"/>
			</div>
		);
	}

	const resetItem = async (id) => {
		const { confirmed } = await sdk.execute(Command.SHOW_CONFIRMATION, {
			title: 'Reset item',
			description: `You're about to change status to "Assembling".`
		});

		if (!confirmed) {
			return;
		}

		await makePostRequest(`/api/${id}/item`, {
			status: 'assembling',
			proposal: null,
		});

		await sdk.execute(Command.SHOW_SNACKBAR, {
			message: 'Item has been updated',
		});

		await fetchItems();
	}

	return (
		<div className="items">
			{items.map(({ id, title, price, status, delivery }) => (
				<div className="list-item" key={`list-item-${id}`}>
					<ItemDetails title={title} price={price} status={status} delivery={delivery}/>

					<div className="list-item-actions">
						{status !== 'assembling' && (
							<Button variant="negative" onClick={() => resetItem(id)}>
								<ButtonLabel>Reset</ButtonLabel>
							</Button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
