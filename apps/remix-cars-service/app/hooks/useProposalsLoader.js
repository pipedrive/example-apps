import { useEffect, useState } from 'react';
import useData from './useData';

export default function useProposalsLoader() {
	const { proposals, setProposals } = useData();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);

			setProposals([
				{ id: 1, title: 'Proposal #1' },
				{ id: 2, title: 'Proposal #2' },
				{ id: 3, title: 'Proposal #3' },
				{ id: 4, title: 'Proposal #4' },
				{ id: 5, title: 'Proposal #5' },
				{ id: 6, title: 'Proposal #6' },
			]);
		}, 1000);
	}, []);

	return { proposals, setProposals, isLoading };
}
