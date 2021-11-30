import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, collection, getDocs } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAWLtpyFyzKHGliA5I57DzIEJDdPxna9M8",
    authDomain: "shortstack-messaging.firebaseapp.com",
    projectId: "shortstack-messaging",
    storageBucket: "shortstack-messaging.appspot.com",
    messagingSenderId: "763774487413",
    appId: "1:763774487413:web:ac1cdc075ede980c99213c",
    measurementId: "G-YSCM3NLK9Q"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initalize Firestore
const firestore = getFirestore()

// Reference collection in Firestore
const collectionReference = collection(firestore, "books")

getDocs(collectionReference).then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})
    .catch(err => {
        console.log(err.message)
})
