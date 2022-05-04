import { userPrefs } from "~/cookies";

class CarsService {
	constructor({ request }) {
		this.request = request;
		this.cars = new Map();

		this.cars.set('qwe', {
			id: 'qwe',
			title: 'Molksvagen 2022',
			price: 'USD 2000.00',
			status: 'assembling',
			delivery: '31 Aug 2022, 9:00pm',
			person: 'John Smith',
			proposal: null,
		});

		this.cars.set('rty', {
			id: 'rty',
			title: 'Audium 2021',
			price: 'USD 2500.00',
			status: 'ready',
			delivery: '22 May 2021, 3:00pm',
			person: 'May Doe',
			proposal: null,
		});
	}

	async getSettings() {
		const cookieHeader = this.request.headers.get('Cookie');
		const cookie = (await userPrefs.parse(cookieHeader)) || {};

		return cookie.data ? JSON.parse(cookie.data) : [];
	}

	async serialize() {
		const cookieHeader = this.request.headers.get('Cookie');
		const cookie = (await userPrefs.parse(cookieHeader)) || {};

		const data = [];

		this.cars.forEach((car) => {
			data.push({
				id: car.id,
				status: car.status,
				proposal: car.proposal,
			})
		})

		cookie.data = JSON.stringify(data);

		return await userPrefs.serialize(cookie);
	}

	async getItem(id) {
		const item = this.cars.get(id);
		const settings = await this.getSettings();
		const userPref = settings.find(({ id }) => id === item.id);

		if (!userPref) {
			return item;
		}

		console.log({ userPref });


		return {
			...item,
			status: userPref.status,
			proposal: userPref.proposal,
		};
	}

	async getAll() {
		const settings = await this.getSettings();

		const data = [];

		this.cars.forEach(car => {
			const userPref = settings.find((item) => item.id === car.id);
			const item = { ...car };

			if (userPref) {
				item.status = userPref.status;
				item.proposal = userPref.proposal;
			}

			data.push(item);
		})

		return data;
	}

	async updateItem(id) {
		const formData = await this.request.formData();

		const item = await this.getItem(id);

		this.cars.set(id, {
			...item,
			status: formData.get('status'),
			proposal: formData.get('proposal'),
		});

		console.log({ id, formData, cars: this.cars });
	}

	resetItem(id) {
		const item = this.getItem(id);

		this.cars.set(id, {
			...item,
			status: 'assembling',
			proposal: null,
		});
	}
}

export default CarsService;
