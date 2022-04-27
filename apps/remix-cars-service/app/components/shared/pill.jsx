export default function Pill({ children }) {
	return (
		<span className="cui5-badge cui5-badge--variant-warning">
			<span className="cui5-badge__label">
				{children}
			</span>
		</span>
	);
}
