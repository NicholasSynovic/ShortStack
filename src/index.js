import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
// import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAWLtpyFyzKHGliA5I57DzIEJDdPxna9M8",
    authDomain: "shortstack-messaging.firebaseapp.com",
    projectId: "shortstack-messaging",
    storageBucket: "shortstack-messaging.appspot.com",
    messagingSenderId: "763774487413",
    appId: "1:763774487413:web:ac1cdc075ede980c99213c",
    measurementId: "G-YSCM3NLK9Q"
}

// Initialize Firebase Components
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authentication = getAuth()

// Firebase Authentication

// Sign Up
const signUpForm = document.getElementById("signUp-form")
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = signUpForm.email.value
    const password = signUpForm.password.value

    createUserWithEmailAndPassword(authentication, email, password)
        .then((credential) => {
            signUpForm.reset()
            location.href = "app/index.html"
            // console.log("user created", credential.user)
        })
        .catch(err => {
            alert(err.message)
        })
    authetnicationForm.reset()
})

// Sign in
const signInForm = document.getElementById("signIn-form")
signInForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = signInForm.email.value
    const password = signInForm.password.value

    createUserWithEmailAndPassword(authentication, email, password)
        .then((credential) => {
            signInForm.reset()
            location.href = "app/index.html"
            // console.log("user created", credential.user)
        })
        .catch(err => {
            alert(err.message)
        })
    authetnicationForm.reset()
})

// const firestore = getFirestore()
// const collectionReference = collection(firestore, "books")

// Print out all objects in the collection REQUIRES REFRESH TO VIEW NEW DATA
// getDocs(collectionReference).then((snapshot) => {
//     let books = []
//     snapshot.docs.forEach((doc) => {
//         books.push({...doc.data(), id: doc.id})
//     })
//     console.log(books)
// })
//     .catch(err => {
//         console.log(err.message)
// })

// // Print out all objects in the collection IN REAL TIME
// onSnapshot(collectionReference, (snapshot) => {
//     let books = []
//     snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books)
// })

// // Add book to FireStore Books collection
// const addBookForm = document.getElementById("addData")
// addBookForm.addEventListener("submit", (e) => {
//     e.preventDefault()

//     addDoc(collectionReference, {
//         title: addBookForm.title.value,
//         author: addBookForm.author.value,
//     }).then(() => {
//         addBookForm.reset()
//     })
// })

// // Delete book from FireStore Books collection
// const deleteBookForm = document.getElementById("deleteData")
// deleteBookForm.addEventListener("submit", (e) => {
//     e.preventDefault()

//     const documentReference = doc(firestore, "books", deleteBookForm.id.value)

//     deleteDoc(documentReference).then(() => {
//         deleteBookForm.reset()
//     })
// })
