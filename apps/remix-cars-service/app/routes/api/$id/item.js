import { json, redirect } from '@remix-run/node';

import CarsService from '../../../services/cars';

export async function loader({ request, params }) {
	const cars = new CarsService({ request });

	const data = await cars.getItem(params.id);

	return json({
		success: true,
		data,
	});
}

export const action = async ({ request, params }) => {
	const cars = new CarsService({ request });

	switch (request.method) {
		case "POST": {
			await cars.updateItem(params.id);

			return redirect(`/api/${params.id}/item`, {
				headers: {
					"Set-Cookie": await cars.serialize(),
				},
			});
		}
	}
};
