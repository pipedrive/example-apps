import { CalendarIcon, DealIcon, PersonIcon } from '../shared/icons';
import ItemStatus from './item-status';
import ItemProposal from './item-proposal';
import useData from '../../hooks/useData';

export default function Item() {
	const { item, setItem } = useData();
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

					<div className="tags">
						<span>New</span>
						<span>{item.price}</span>
					</div>

					<ItemStatus status={item.status}/>
				</div>
			</div>

			<div className='row'>
				<div className="label">
					<CalendarIcon/>
				</div>

				<div className="main">
					<div className="label">
						<span className="date">Delivery: {item.price}</span>
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
