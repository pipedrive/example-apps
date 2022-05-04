export default function Spinner({ size }) {
	let sizeClassName;

	switch (size) {
		case 'l':
			sizeClassName = 'cui5-spinner--size-l';
			break;
		case 'm':
		default:
			sizeClassName = 'cui5-spinner--size-m';
			break;
	}

	return (
		<div className={`cui5-spinner ${sizeClassName}`}>
			<div className="cui5-spinner__trail"></div>
		</div>
	);
};
