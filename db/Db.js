import firebase from 'firebase';

export default class Db
{
	constructor() {
		// this.ref = this.constructor.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2').toLowerCase();
		this.ref = this.constructor.name;
		this.errors = [];
	}

	fields() {
		return {
			id: '',
		};
	}

	validate() {
		// 
	}

	error(err) {
		if (err) {
			this.errors.push(err);
		}

		return this.errors.length>0? this.errors: false;
	}

	save(data) {
		return new Promise((resolve, reject) => {
			data = typeof data=='object'? data: {};
			data = Object.assign(this.fields(), data);

			this.validate(data);
			if (this.error()) {
				return reject(this.error());
			}

			var _update = () => {
				firebase.firestore().collection(this.ref).doc(data.id).set(data).then((resp) => {
					resolve(data);
				})
			}

			if (! data.id) {
				return firebase.firestore().collection(this.ref).add(data).then((resp) => {
					data.id = resp.id;
					_update(data);
				});
			}

			_update(data);
		});
	}

	search(params) {
		return new Promise((resolve, reject) => {
			var ref = firebase.firestore().collection(this.ref);

			params = params||{};
			for(var i in params) {
				ref = ref.where(params[i][0], params[i][1], params[i][2]);
			}

			ref.get().then((snap) => {
				var items = {};
				snap.forEach((doc) => {
					items[doc.id] = doc.data();
				});
				resolve(items);
			});
		});
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			firebase.firestore().collection(this.ref).doc(id).delete().then((resp) => {
				resolve(id);
			});
		});
	}
}