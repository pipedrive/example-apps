import { useEffect, useState } from 'react';
import useData from './useData';

export default function useItemsLoader() {
	const { items, setItems } = useData();
	const [isLoading, setIsLoading] = useState(true);

	const fetchItems = async () => {
		setIsLoading(true);

		const res = await fetch("/api/items");
		const { data } = await res.json();

		setItems(data);
		setIsLoading(false);
	}

	useEffect(() => {
		fetchItems().catch(console.error);
	}, []);

	return { items, setItems, fetchItems, isLoading };
}
