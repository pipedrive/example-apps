import { useEffect, useState } from 'react';
import useData from './useData';

export default function useProposalsLoader() {
	const { proposals, setProposals } = useData();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);

			setProposals([
				{ id: '1', title: 'Car purchase - new customer', color: '#FFAB00' },
				{ id: '2', title: 'Car purchase - existing customer', color: '#721EA9' },
				{ id: '3', title: 'Car lease - all customers', color: '#317AE2' },
				{ id: '4', title: 'Car lease - new customers', color: '#FB8A80' },
				{ id: '5', title: 'Car rental - new enterprise customers', color: '#656E7A' },
				{ id: '6', title: 'Car rental - current enterprise customers', color: '#61C786' },
			]);
		}, 1000);
	}, []);

	return { proposals, setProposals, isLoading };
}
