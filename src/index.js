// Imports
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics"
// import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore"

// Firebase config
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

// Helper functions
function signOutOfApp(page) {
    signOut(authentication)
        .then(() => {
            location.href = page
        })
        .catch(err => {
            alert(err.message)
        })
}

/*
Sign Up Button
--------------
Conditions:
* Only works on the top level pages
    - /index.html
    - /signIn.html

User Stories:
* If the sign up button is clicked, and the user is not logged in, show the sign up page
* If the sign up button is clicked, and the user is logged in, show the app home page
*/
if (document.body.contains(document.getElementById("signUp-button"))) {
    const signUpButton = document.getElementById("signUp-button")
    signUpButton.addEventListener("click", () => {
        if (authentication.currentUser != null) {
            location.href = "app/index.html"
        }
    })
}

/*
Sign In Button
--------------
Conditions:
* Only works on the top level pages
    - /index.html
    - /signUp.html

User Stories:
* If the sign in button is clicked, and the user is not logged in, show the sign in page
* If the sign in button is clicked, and the user is logged in, show the app home page
*/
if (document.body.contains(document.getElementById("signIn-button"))) {
    const signUpButton = document.getElementById("signIn-button")
    signUpButton.addEventListener("click", () => {
        if (authentication.currentUser != null) {
            location.href="app/index.html"
        }
    })
}

/*
Sign Up Form
------------
Conditions:
* Only works on /signUp.html

User Stories:
* User must enter a display name, email address, and password
* On submit, a new user is created in the Firebase Authentication if the email is not in use
* After the account is created, the user is logged on and sent to the app home screen
*/
if (document.body.contains(document.getElementById("signUp-form")))  {
    const signUpForm = document.getElementById("signUp-form")
    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const displayName = signUpForm.displayName.value
        const email = signUpForm.email.value
        const password = signUpForm.password.value

        createUserWithEmailAndPassword(authentication, email, password)
            .then(() => {
                updateProfile(authentication.currentUser, {
                    displayName: displayName,
                })
                    .then(() => {
                        signUpForm.reset()
                        location.href = "app/index.html"
                    })
                    .catch(err => {
                        alert(err.message)
                    })
            })
            .catch(err => {
                alert(err.message)
            })
    })
}

/*
Sign In Form
------------
Conditions:
* Only works on /signIn.html

User Stories:
* User must enter an email address and password
* On submit, credentials are checked against the Firebase Authentication to see if the account exists
* After the account is checked, the user is logged on and sent to the app home screen
*/
if (document.body.contains(document.getElementById("signIn-form"))) {
    const signInForm = document.getElementById("signIn-form")
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const email = signInForm.email.value
        const password = signInForm.password.value

        signInWithEmailAndPassword(authentication, email, password)
            .then(() => {
                signInForm.reset()
                location.href = "app/index.html"
            })
            .catch(err => {
                alert(err.message)
            })
    })
}

/*
Sign Out Button
---------------
Conditions:
* Only works on the app pages
    - app/*.html

User Stories:
* If the sign out button is clicked, and the user is logged in, sign the user out and then show the root home page
*/
if (document.body.contains(document.getElementById("logout-button"))) {
    const signOutButton = document.getElementById("logout-button")
    signOutButton.addEventListener("click", () => {
        signOutOfApp("../index.html")
    })
}

// Application Logic

/*
Custom Hello {User} Text
------------------------
*/

let currentLocation = window.location.href
if (currentLocation.includes("app/index.html")) {
    const displayNameGreeting = document.getElementById("displayName-greeting")
    onAuthStateChanged(authentication, (user) => {
        displayNameGreeting.innerText = "Hello, " + user.displayName
    })
}

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
