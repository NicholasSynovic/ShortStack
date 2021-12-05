// Imports
import { async } from "@firebase/util"
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, getCurrentUser} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics"
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, getDocsFromServer, query, where } from "firebase/firestore"

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

// Initilize application components
let currentLocation = window.location.href
let currentUser = null

// Initialize Firebase Components
const app = initializeApp(firebaseConfig);
const authentication = getAuth()
const firestore = getFirestore()
const messagesCollectionReference = collection(firestore, "messages")

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

async function fetchMessages(q) {
    let messages = []
    getDocsFromServer(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id })
        })
    })
    return messages
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
                    photoURL: `https://avatars.dicebear.com/api/bottts/${Math.floor(Math.random * 42069)}.svg`
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
if (currentLocation.includes("app/index.html")) {
    const displayNameGreeting = document.getElementById("displayName-greeting")
    const profileIcon = document.getElementById("profile-icon")
    onAuthStateChanged(authentication, (user) => {
        currentUser = user
        displayNameGreeting.innerText = currentUser.displayName
        profileIcon.src = currentUser.photoURL
    })
}

if (currentLocation.includes("app/index.html")) {
    inputform.addEventListener("submit", (e) => {
        e.preventDefault()

        const sentMessagesQuery = query(messagesCollectionReference, where("sender", "==", currentUser.email))
        const recievedMessagesQuery = query(messagesCollectionReference, where("reciever", "==", currentUser.email))

        let sentMessages = fetchData(sentMessagesQuery)
        let recievedMessages = fetchData(recievedMessagesQuery)
    })
}

/*
Get All Documents That Were Sent by the Current User
----------------------------------------------------
*/
// if (currentLocation.includes("app/index.html")) {

// }



// Sending and recieving messages

// Print out all objects in the collection IN REAL TIME
// onSnapshot(messagesCollectionReference, (snapshot) => {
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
