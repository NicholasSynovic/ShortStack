import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics"
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
const authentication = getAuth()
// const analytics = getAnalytics(app);

// Firebase Authentication

// Sign Up
if (document.body.contains(document.getElementById("signUp-form")))  {
    const signUpForm = document.getElementById("signUp-form")
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const displayName = signUpForm.displayName.value
        const email = signUpForm.email.value
        const password = signUpForm.password.value

        createUserWithEmailAndPassword(authentication, email, password)
            .then((credential) => {
                signUpForm.reset()
                location.href = "app/index.html"
            })
            .catch(err => {
                alert(err.message)
            })
    })
}

// Sign Out
if (document.body.contains(document.getElementById("logout-button"))) {
    const signOutButton = document.getElementById("logout-button")
    signOutButton.addEventListener("click", () => {
        signOut(authentication)
            .then(() => {
                location.href = "../index.html"
            })
            .catch(err => {
                alert(err.message)
            })
    })
}

// Sign in
if (document.body.contains(document.getElementById("signIn-form"))) {
    const signInForm = document.getElementById("signIn-form")
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const email = signInForm.email.value
        const password = signInForm.password.value

        signInWithEmailAndPassword(authentication, email, password)
            .then((credential) => {
                signInForm.reset()
                location.href = "app/index.html"
            })
            .catch(err => {
                alert(err.message)
            })
    })
}

onAuthStateChanged(authentication, (user) => {
    console.log(user)
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
