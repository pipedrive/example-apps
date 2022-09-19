import { json, redirect } from '@remix-run/node';

import CarsService from '../../../services/cars';

export async function loader({ request, params }) {
	const cars = new CarsService({ request });

	await cars.fillDefaults();

	const data = await cars.getItem(params.id);

	return json({
		success: true,
		data,
	});
}

export const action = async ({ request, params }) => {
	const cars = new CarsService({ request });

	await cars.fillDefaults();

	switch (request.method) {
		case "POST": {
			await cars.updateItem(params.id);

			const data = await cars.getItem(params.id);

			return json({
				success: true,
				data,
			});
		}
	}
};
