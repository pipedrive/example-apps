import { DocumentIcon, PencilIcon } from '../shared/icons';
import Button from '../shared/button';

export default function ItemProposal({ proposal, onEdit }) {
	if (!proposal) {
		return null;
	}

	return (
		(
			<div className='row'>
				<div className="label">
					<DocumentIcon/>
				</div>

				<div className="main">
					<div className="label">
						{proposal.title}
					</div>
				</div>

				<div className="row-action">
					<Button size="s" onClick={onEdit}>
						<PencilIcon/>
					</Button>
				</div>
			</div>
		)
	)
}
