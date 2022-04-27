export default function Badge({ variant, children }) {
	let variantClassName;

	switch (variant) {
		case 'warning':
			variantClassName = 'cui5-badge--variant-warning';
			break;
		case 'info':
			variantClassName = 'cui5-badge--variant-info';
			break;
		default:
			variantClassName = 'cui5-badge--variant-default';
			break;
	}

	return (
		<span className={`cui5-badge ${variantClassName}`}>
			<span className="cui5-badge__label">
				{children}
			</span>
		</span>
	);
}
