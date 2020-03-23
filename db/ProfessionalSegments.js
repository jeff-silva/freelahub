import Db from './Db';

export default class ProfessionalSegments extends Db
{
	fields() {
		return {
			id: '',
			title: '',
			parent: [],
		};
	}

	validate(data) {
		data = data||{};

		if (!data.title) {
			this.error('Título é obrigatório');
		}
	}
}