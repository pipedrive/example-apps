export default function Button({ variant, size, disabled, onClick, children }) {
	let variantClassName = 'cui5-button--variant-secondary';
	let sizeClassName;

	switch (variant) {
		case 'primary':
			variantClassName = 'cui5-button--variant-primary';
			break;
		case 'ghost':
			variantClassName = 'cui5-button--variant-ghost';
			break;
		case 'ghost-alternative':
			variantClassName = 'cui5-button--variant-ghost-alternative';
			break;
	}
	switch (size) {
		case 's':
			sizeClassName = 'cui5-button--size-s';
			break;
		case 'm':
		default:
			sizeClassName = 'cui5-button--size-m';
			break;
	}

	return (
		<button className={`cui5-button ${variantClassName} ${sizeClassName}`} disabled={Boolean(disabled)} onClick={onClick}>
			{children}
		</button>
	);
}
