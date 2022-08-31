import { CalendarIcon, DealIcon, PersonIcon } from '../shared/icons';

import ItemStatus from './item-status';
import ItemProposal from './item-proposal';
import Tags from './tags';
import ItemImage from '../list/item-image';

export default function Item({ item, setItem }) {
	const isReadyForDelivery = item.status === 'ready';

	const handleReset = () => {
		setItem({
			...item,
			proposal: null,
		});
	}

	return (
		<>
			<div className="row">
				<ItemImage size="l" />

				<div className="column">
					<h2 className="cui5-text">
						{item.title}
					</h2>


					<div className="label font-size--s">
						<span>Condition:{' '}</span>
						<span className="font-size--s"><strong>New</strong></span>
					</div>
					<div className="label font-size--s">
						<span>Price:{' '}</span>
						<span><strong>{item.price}</strong></span>
					</div>
					<div className="label font-size--s">
						<span>Status:{' '}</span>

						<ItemStatus status={item.status}/>
					</div>
					<div className="label font-size--s">
						<span>Delivery date: {item.delivery}{' '}</span>

						<CalendarIcon/>
					</div>
					<div className="label font-size--s">
						<span>Customer name:{' '}</span>
						<strong>{item.person}</strong>
					</div>

					{isReadyForDelivery && <ItemProposal proposal={item.proposal} onEdit={handleReset}/>}
				</div>
			</div>
		</>
	);
}
