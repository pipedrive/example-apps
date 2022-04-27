import ProposalImage from './proposal-image';
import { DownloadIcon } from '../shared/icons';

export default function Proposal({ title, isSelected, onClick }) {
	const className = isSelected ? 'proposal-selected' : 'proposal';

	const download = (event) => {
		event.stopPropagation();
	}

	return (
		<div className={className} onClick={onClick}>
			<ProposalImage/>
			<div className="proposal-title">
				<span>{title}</span>
				<span className="proposal-download" onClick={download}>
					<DownloadIcon/>
				</span>
			</div>
		</div>
	);
}
