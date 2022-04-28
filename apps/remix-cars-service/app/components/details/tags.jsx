
export default function Tags({ items }) {
	return (
		<div className="tags">
			{items.map((item, index) => (
				<span key={`tag-${index}`}>{item}</span>
			))}
		</div>
	)
}
