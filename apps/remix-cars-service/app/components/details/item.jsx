import { CalendarIcon, DealIcon, PersonIcon } from '../shared/icons';

import ItemStatus from './item-status';
import ItemProposal from './item-proposal';
import Tags from './tags';

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
			<div className='row'>
				<div className="label">
					<DealIcon/>
				</div>

				<div className="main">
					<h2 className="cui5-text">
						{item.title}
					</h2>

					<Tags items={['New', item.price]}/>

					<ItemStatus status={item.status}/>
				</div>
			</div>

			<div className='row'>
				<div className="label">
					<CalendarIcon/>
				</div>

				<div className="main">
					<div className="label">
						<span className="font-size--s">Delivery: {item.price}</span>
					</div>
				</div>
			</div>

			<div className='row'>
				<div className="label">
					<PersonIcon/>
				</div>

				<div className="main">
					<div className="label">
						<span className="person">{item.person}</span>
					</div>
				</div>
			</div>

			{isReadyForDelivery && <ItemProposal proposal={item.proposal} onEdit={handleReset}/>}
		</>
	);
}
