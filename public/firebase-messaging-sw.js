// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {

	apiKey: "AIzaSyCeyooskb29r5BszIRMnVsnV1avcbZ8bnc",
	authDomain: "uplumber-194d5.firebaseapp.com",
	projectId: "uplumber-194d5",
	storageBucket: "uplumber-194d5.appspot.com",
	messagingSenderId: "69348745457",
	appId: "1:69348745457:web:8a3656a15c3128582f4950",
	measurementId: "G-LWF66SW3SW"
  
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
