import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore"

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

// Print out all objects in the collection
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

// Add book to FireStore Books collection
const addBookForm = document.getElementById("addData")
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    addDoc(collectionReference, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    }).then(() => {
        addBookForm.reset()
    })
})

// Delete book from FireStore Books collection
const deleteBookForm = document.getElementById("deleteData")
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const documentReference = doc(firestore, "books", deleteBookForm.id.value)

    deleteDoc(documentReference).then(() => {
        deleteBookForm.reset()
    })
})
