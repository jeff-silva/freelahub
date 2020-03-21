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
export default firebase;
