import { useEffect, useState } from 'react';
import useData from './useData';
import useFormData from './useFormData';

export default function useItemDetailsLoader({ id }) {
	const { item, setItem } = useData();
	const { makePostRequest } = useFormData();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(async () => {
		setIsLoading(false);

		const response = await fetch(`/api/${id}/item`);
		const { data } = await response.json();

		setItem(data);
	}, []);

	const updateItem = async (payload) => {
		const data = await makePostRequest(`/api/${id}/item`, payload);

		setItem(data);
	}

	return { item, setItem, updateItem, isLoading };
}
