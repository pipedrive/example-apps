
export default function Tags({ items }) {
	return (
		<div className="tags">
			{items.map((item, index) => (
				<span key={`tag-${item}`}>{item}</span>
			))}
		</div>
	)
}
