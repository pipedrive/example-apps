export default function useFormData() {
	const makePostRequest = async (url, payload) => {
		const body = new URLSearchParams();

		Object.entries(payload).forEach(([key, value]) => {
			body.append(key, value);
		})

		const response = await fetch(url, {
			method: 'POST',
			body,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
		});
		const { data } = await response.json();

		return data;
	}

	return {
		makePostRequest,
	}
}
