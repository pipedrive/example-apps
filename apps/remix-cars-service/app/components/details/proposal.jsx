import ProposalImage from './proposal-image';
import { DownloadIcon } from '../shared/icons';

export default function Proposal({ title, color, isSelected, onClick }) {
	const className = isSelected ? 'proposal-selected' : 'proposal';

	const download = (event) => {
		event.stopPropagation();
	}

	return (
		<div className={className} onClick={onClick}>
			<ProposalImage color={color}/>
			<div className="proposal-title">
				<span>{title}</span>
			</div>
			<span className="proposal-download" onClick={download}>
				<DownloadIcon/>
			</span>
		</div>
	);
}
