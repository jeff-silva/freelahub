import firebase from '~/plugins/firebase.js';

export default {
	state() {
		return {
			loading: false,
			error: false,
			user: false,
		};
	},


	getters: {
		user(state, getters) {
			return state.user;
		},
	},


	mutations: {
		loading(state, value) {
			state.loading = value;
		},

		error(state, value) {
			state.error = value;
		},

		user(state, value) {
			state.user = value;
		},
	},


	actions: {
		login({commit, state}, post) {
			return new Promise((resolve, reject) => {
				post = Object.assign({
					email: '',
					pass: '',
				}, post||{});

				commit('loading', true);
				commit('error', false);

				firebase.auth().signInWithEmailAndPassword(post.email, post.pass).then((user) => {
					user = user.user.providerData[0];
					commit('loading', false);
					commit('user', user);
				}).catch((err) => {
					commit('loading', false);
					commit('error', err.message);
				});
			});
		},

		update({commit, state}, post) {
			// 
		},

		logout({commit, state}) {
			commit('loading', true);
			firebase.auth().signOut()
				.then(() => {
					commit('loading', false);
					commit('user', false);
					localStorage.removeItem('auth-user');
				})
				.catch((err) => {
					commit('loading', false);
				});
		},

		register({commit, state}, post) {
			return new Promise((resolve, reject) => {
				post = Object.assign({
					email: '',
					pass: '',
				}, post||{});

				commit('loading', true);
				commit('error', false);

				firebase.auth().createUserWithEmailAndPassword(post.email, post.pass).then((user) => {
					user = user.user.providerData[0];
					commit('loading', false);
					commit('user', user);
				}).catch((err) => {
					commit('loading', false);
					commit('error', err.message);
				});
			});
		},

		password({commit, state}) {
			// 
		},

		check({commit, state}) {
			return new Promise((resolve, reject) => {
				commit('loading', true);
				firebase.auth().onAuthStateChanged((user) => {
					if (user) {
						user = user.providerData[0]||false;
						commit('user', user);
					}
					commit('loading', false);
					resolve(user);
				});
			});
		},
	},
}