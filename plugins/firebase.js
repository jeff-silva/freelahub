import Vue from 'vue';
import firebase from 'firebase';

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: process.env.firebase_apiKey,
		authDomain: process.env.firebase_authDomain,
		databaseURL: process.env.firebase_databaseURL,
		projectId: process.env.firebase_projectId,
		storageBucket: process.env.firebase_storageBucket,
		messagingSenderId: process.env.firebase_messagingSenderId,
		appId: process.env.firebase_appId,
		measurementId: process.env.firebase_measurementId,
	});
}

Vue.prototype.$firebase = firebase;

Vue.prototype.$firebaseDb = function(ref, data) {
	return firebase.database().ref(ref);
};

Vue.prototype.$firebaseDbSave = function(ref, data) {
	return new Promise(function(resolve, reject) {
		ref = firebase.database().ref(ref);
		data = typeof data=='object'? data: {};
		
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
};

export default firebase;
