import Db from './Db';

export default class UserProfile extends Db
{
	fields() {
		return {
			id: '',
			userId: '',
			title: '',
			description: '',
			segments: [],
		};
	}

	validate(data) {
		data = data||{};

		if (!data.title) {
			this.error('Título é obrigatório');
		}
	}
}