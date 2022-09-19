import ItemStatus from '../details/item-status';
import Tags from '../details/tags';
import ItemImage from './item-image';

export default function ItemDetails({ title, status, price, delivery }) {
	return (
		<>
			<div className="list-item-logo">
				<ItemImage />
			</div>

			<div className="list-item-main">
				<h3 className="cui5-text list-item-title">{title}</h3>
				<div className="list-item-tags font-size--s"><Tags items={['New', price, delivery]}/></div>
				<ItemStatus status={status}/>
			</div>
		</>
	);
}
