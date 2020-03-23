import firebase from '~/plugins/firebase';

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

			var ref = firebase.database().ref(this.ref);
			
			if (data.id) {
				ref.child(data.id).set(data);
			}
			else {
				let newref = ref.push();
				data.id = newref.key;
				newref.set(data);
			}
			resolve(data);
		});
	}

	search() {
		firebase.database().ref(this.ref).once('value');
	}

	value(callback) {
		callback = typeof callback=='function'? callback: () => {};
		firebase.database().ref(this.ref).on('value', (snap) => {
			var ret={}, data = snap.val()||{};
			for(var i in data) {
				ret[i] = Object.assign(this.fields(), data[i]);
			}
			callback(ret);
		});
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			firebase.database().ref(`${this.ref}/${id}`).set(null);
			resolve(id);
		})
	}
}