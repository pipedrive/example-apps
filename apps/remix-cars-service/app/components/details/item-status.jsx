import Badge from '../shared/badge';

export default function ItemStatus({ status }) {
	if (status === 'ready') {
		return (
			<Badge variant="info">
				Ready for delivery
			</Badge>
		);
	}

	return (
		<Badge variant="warning">
			Assembling
		</Badge>
	);
}
