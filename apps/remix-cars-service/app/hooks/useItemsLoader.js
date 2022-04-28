import { useEffect, useState } from 'react';
import useData from './useData';

export default function useItemsLoader() {
	const { items, setItems } = useData();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);

			setItems([
				{
					id: 'xyz',
					title: 'Molksvagen 2022',
					price: 'USD 2000.00',
					status: 'assembling',
					delivery: '31 Aug 2022, 9:00pm',
					person: 'John Smith',
					proposal: null,
				},
				{
					id: 'qwe',
					title: 'Audium 2021',
					price: 'USD 2500.00',
					status: 'ready',
					delivery: '22 May 2021, 3:00pm',
					person: 'May Doe',
					proposal: null,
				}
			]);
		}, 1000);
	}, []);

	return { items, setItems, isLoading };
}
