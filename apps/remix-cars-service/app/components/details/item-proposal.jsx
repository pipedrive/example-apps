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
			<div className='font-size--s'>
				<div className="label">
					Proposal:&nbsp;<strong>{data.title}</strong>
					&nbsp;
					<Button size="s" variant="ghost-alternative" onClick={onEdit}>
						<PencilIcon/>
					</Button>
				</div>
			</div>
		)
	)
}
