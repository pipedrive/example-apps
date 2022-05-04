import { DocumentIcon, PencilIcon } from '../shared/icons';
import Button from '../shared/button';
import useProposalsLoader from '../../hooks/useProposalsLoader';

export default function ItemProposal({ proposal, onEdit }) {
	const { proposals } = useProposalsLoader();

	if (!proposal) {
		return null;
	}

	const data = proposals?.find(({ id }) => proposal === id);

	if (!data) {
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
						{data.title}
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
