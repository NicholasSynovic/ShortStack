// Imports
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth"
import { getFirestore, collection, addDoc, getDocsFromServer, query, serverTimestamp, orderBy, Timestamp, onSnapshot, limit } from "firebase/firestore"
import { marked } from "marked"
import DOMPurify from "dompurify"

// Marked Configuration
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
        const hljs = require('highlight.js');
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});


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

async function pushMessage(message, reciever, profilePicURL) {
        addDoc(messagesCollectionReference, {
            "sender": currentUser.email,
            "reciever": reciever,
            "message": message,
            "profilePicURL": profilePicURL,
            "timestamp": serverTimestamp()
            }
        )
        .catch(err => {
            alert(err.message)
        })
}

function fetchMessages(snapshot, messageTable) {
    snapshot.docs.forEach((doc) => {
        const sendTo = inputform.sendto.value.toLowerCase()
        if ((doc.data().sender == currentUser.email & doc.data().reciever == sendTo) | (doc.data().sender == sendTo & doc.data().reciever == currentUser.email)) {
            try {
                let message = doc.data().message
                let sender = doc.data().sender
                let profilePicURL = doc.data().profilePicURL

                // Timestamp information
                let messageTimestamp = doc.data().timestamp
                let seconds = messageTimestamp["seconds"]
                let nanoseconds = messageTimestamp["nanoseconds"]
                let timestamp = new Timestamp(seconds, nanoseconds).toDate()
                let date = timestamp.toLocaleDateString()
                let time = timestamp.getHours() + ":" + timestamp.getMinutes()

                const template = document.createElement("template")
                template.innerHTML = `
                                    <div id=${sender == currentUser.email ? "sentMessage" : "recievedMessage"}>
                                        <img id="profile-icon" alt="" src=${sender == currentUser.email ? currentUser.photoURL : profilePicURL}>
                                        <div id=${sender == currentUser.email ? "sentText" : "recievedText"}>${DOMPurify.sanitize(marked.parse(message))}</div>
                                        <p id=${sender == currentUser.email ? "sentMetadata" : "recievedMetadata"}>${sender}</p>
                                        <p id=${sender == currentUser.email ? "sentMetadata" : "recievedMetadata"}>${date + " " + time}</p>
                                    </div>
                                `
                messageTable.insertBefore(template.content, messageTable.firstChild)
                var xH = messageTable.scrollHeight;
                messageTable.scrollTo(0, xH);

            } catch (error) {
                console.log(error)
            }
        }
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
                    photoURL: "https://avatars.dicebear.com/api/bottts/" + Math.floor(Math.random() * 100).toString() + ".svg"
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
Code to run once page is open
-----------------------------
*/
if (currentLocation.includes("app/index.html")) {
    // Define page elements
    const displayNameGreeting = document.getElementById("displayName-greeting")
    const profileIcon = document.getElementById("profile-icon")
    const messageTable = document.getElementById("messages")

    // Set the current logged in user
    onAuthStateChanged(authentication, (user) => {
        currentUser = user
        displayNameGreeting.innerText = currentUser.displayName
        profileIcon.src = currentUser.photoURL
    })

    onSnapshot(query(messagesCollectionReference, orderBy("timestamp", "desc"), limit(50)), (snapshot) => {
        messageTable.innerHTML = ""
        fetchMessages(snapshot, messageTable)
    })

    // Get messages after form is submitted
    inputform.addEventListener("submit", (e) => {
        e.preventDefault()

        // let message = inputform.message.value.replace(/\r?\n/g, '<br>')
        let message = inputform.message.value
        let sendTo = inputform.sendto.value.toLowerCase()

        pushMessage(message, sendTo, currentUser.photoURL)
        inputform.message.value = ""
    })
}
