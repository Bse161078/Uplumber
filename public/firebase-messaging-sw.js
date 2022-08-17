// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: "AIzaSyAPDoekF3spw79qd_W8PCZUrGuYsoXVY60",
	authDomain: "uplumberpro.firebaseapp.com",
	projectId: "uplumberpro",
	storageBucket: "uplumberpro.appspot.com",
	messagingSenderId: "199907760127",
	appId: "1:199907760127:web:bae9245c753dd03751f9ca",
	measurementId: "G-RL5BNGG753"
};

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload)

	const notificationTitle = payload.notification.title
	const notificationOptions = {
		body: payload.notification.body,
	}

	self.registration.showNotification(notificationTitle, notificationOptions)
})
