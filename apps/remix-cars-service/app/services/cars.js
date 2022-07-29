import connection from '~/services/db';

const defaults = [
	{
		id: 'qwe',
		title: 'Molksvagen 2022',
		price: 'USD 2000.00',
		status: 'assembling',
		delivery: '31 Aug 2022, 9:00pm',
		person: 'John Smith',
		proposal: null,
	},
	{
		id: 'rty',
		title: 'Audium 2021',
		price: 'USD 2500.00',
		status: 'ready',
		delivery: '22 May 2021, 3:00pm',
		person: 'May Doe',
		proposal: null,
	},
];

class CarsService {
	constructor({ request }) {
		this.request = request;
		this.connection = connection;
	}

	async fillDefaults() {
		const tableExists = await this.connection.schema.hasTable('cars');

		if (tableExists) {
			return;
		}

		await this.connection.schema.createTable('cars', table => {
			table.text('id').primary();
			table.text('title');
			table.text('price');
			table.text('status');
			table.text('delivery');
			table.text('person');
			table.text('proposal');
		});

		for (const item of defaults) {
			await this.connection.table('cars').insert(item);
		}
	}

	async getItem(id) {
		return this.connection.table('cars')
			.select()
			.where({ id })
			.first();
	}

	async getAll() {
		return this.connection.table('cars').select();
	}

	async updateItem(id) {
		const item = await this.getItem(id);

		const formData = await this.request.formData();
		const proposal = formData.get('proposal');

		return this.connection.table('cars').update({
			...item,
			status: formData.get('status'),
			proposal: proposal === 'null' ? null : proposal,
		}).where({ id });
	}
}

export default CarsService;
