import { Spinner } from '../shared/spinner';
import useItemsLoader from '../../hooks/useItemsLoader';
import ItemStatus from '../details/item-status';
import Tags from '../details/tags';
import ProposalImage from '../details/proposal-image';
import Button from '../shared/button';
import { ArrowRightIcon } from '../shared/icons';
import useSdk from '../../hooks/useSdk';
import { Command, Modal } from '@pipedrive/custom-app-surfaces-sdk';

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

	const showDetails = async () => {
		const response = await sdk.execute(Command.OPEN_MODAL, {
			type: Modal.EMBEDDED_ACTION,
			action_id: 'Details',
			prefill: {
				hello: 'world',
			}
		});

		console.log({ response });
	}

	return (
		<div className="items">
			{items.map(({ id, title, price, status, delivery }) => (
				<div className="list-item" key={`list-item-${id}`}>
					<div className="list-item-logo">
						<ProposalImage/>
					</div>

					<div className="list-item-main">
						<h3 className="cui5-text list-item-title">{title}</h3>
						<div className="list-item-tags font-size--s"><Tags items={['New', price, delivery]}/></div>
						<ItemStatus status={status}/>
					</div>

					<div className="list-item-actions">
						<Button variant="ghost-alternative" onClick={showDetails}>
							<ArrowRightIcon/>
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
