import { Spinner } from '../shared/spinner';
import useItemsLoader from '../../hooks/useItemsLoader';
import ItemStatus from '../details/item-status';
import Tags from '../details/tags';
import ProposalImage from '../details/proposal-image';
import Button from '../shared/button';
import { ArrowRightIcon } from '../shared/icons';
import useSdk from '../../hooks/useSdk';
import { Command, Modal } from '@pipedrive/custom-app-surfaces-sdk';
import ItemDetails from './item-details';
import useFormData from '../../hooks/useFormData';

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
								Reset
							</Button>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
