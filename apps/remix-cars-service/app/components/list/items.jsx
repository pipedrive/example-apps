import { Command, Modal } from '@pipedrive/custom-app-surfaces-sdk';

import { ArrowRightIcon } from '../shared/icons';
import Spinner from '../shared/spinner';
import Button from '../shared/button';
import useItemsLoader from '../../hooks/useItemsLoader';
import useSdk from '../../hooks/useSdk';

import ItemDetails from './item-details';

export default function Items() {
	const sdk = useSdk();
	const { items, isLoading } = useItemsLoader();

	if (isLoading) {
		return (
			<div className="loading">
				<Spinner size="l"/>
			</div>
		);
	}

	const showDetails = async (id) => {
		await sdk.execute(Command.OPEN_MODAL, {
			type: Modal.CUSTOM_SURFACE,
			action_id: 'Details',
			data: {
				id,
			}
		});
	}

	return (
		<div className="items">
			{items.map(({ id, title, price, status, delivery }) => (
				<div className="list-item" key={`list-item-${id}`}>
					<ItemDetails title={title} price={price} status={status} delivery={delivery}/>

					<div className="list-item-actions">
						<Button variant="ghost-alternative" onClick={() => showDetails(id)}>
							<ArrowRightIcon/>
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
