# ShortStack

> A COMP 324 Final Project by Nicholas Synovic

## Table of Contents

- [ShortStack](#shortstack)
  - [Table of Contents](#table-of-contents)
  - [Project Source Code and Published Link](#project-source-code-and-published-link)
    - [GitHub Repository Link](#github-repository-link)
    - [GitHub Pages Link](#github-pages-link)
  - [List of Project Participants](#list-of-project-participants)
    - [Nicholas Synovic](#nicholas-synovic)
  - [Project Abstract](#project-abstract)
  - [Project Narrative](#project-narrative)
    - [What Was I Trying To Achieve?](#what-was-i-trying-to-achieve)
    - [Why Did I Want To Achieve These Goals?](#why-did-i-want-to-achieve-these-goals)
  - [Design Considerations](#design-considerations)
    - [Original Project ideas and Concepts](#original-project-ideas-and-concepts)
    - [Primary Goal of the Homepage](#primary-goal-of-the-homepage)
    - [Consistency Considerations](#consistency-considerations)
    - [Response to Midterm Feedback](#response-to-midterm-feedback)
    - [Interaction Patterns](#interaction-patterns)
  - [Design Specification](#design-specification)
  - [Testing and Iterative Design](#testing-and-iterative-design)
  - [Restrictions, Limitations, and Constraints](#restrictions-limitations-and-constraints)
  - [Conclusion](#conclusion)

## Project Source Code and Published Link

### GitHub Repository Link

- https://github.com/NicholasSynovic/shortstack

### GitHub Pages Link

- https://nicholassynovic.github.io/shortstack

## List of Project Participants

### Nicholas Synovic

Lead (and only) developer and designer of the application. Literally did every part of the assignment on his own.

## Project Abstract

[ShortStack](https://nicholassynovic.github.io/shortstack) is a simple chat application that allows users to have one-on-one chats with other users. Chats can contain only contain textual information, but users can send both Markdown and HTML code to be rendered in the chat window. This allows for hyperlinks, documents, images, video, audio, etc. to be shared without having to upload multimedia to a database.

The main draw of the application is the built in Markdown renderer, allowing for Markdown and  HTML content to be shared and rendered within the chat window. Furthermore, [ShortStack](https://nicholassynovic.github.io/shortstack) supports the cloud synchronization of messages (via a [Firebase Firestore](https://firebase.google.com/) collection), allowing users to view their messages on any browser. Since all messages are textual, Markdown and HTML content that is sent on one browser will be rendered on another in a similar and timely manner.

The application is designed and functions around the less-is-more ethos. The app only has the components and wiring necessary for it to run, both on the client and [Firebase](https://firebase.google.com/) side. It presents all of the availble client options to the user unobstructed by side or hidden menus. The singular [Firebase Firestore](https://firebase.google.com/) collection schema is as simple as possible too.

I chose to build a chat application to learn the following:

- [Firebase](https://firebase.google.com/)
- Markdown rendering in browser
- JavaScript templating
- [Progressive Web Applications (PWAs)](https://en.wikipedia.org/wiki/Progressive_web_application)
- [Pretty Good Privacy (PGP) encryption](https://en.wikipedia.org/wiki/Pretty_Good_Privacy)

While not all of what I learned is included within this application, due to iterative design all of these components were at once a part of [ShortStack](https://nicholassynovic.github.io/shortstack). Through this application, I learned more about the underlying web components and services that power today's top websites and applications.

## Project Narrative

### What Was I Trying To Achieve?

Following the midterm presentations, I wanted to build a chat application that allowed for users to share all sorts of content and media via text formatting with Markdown and HTML. I did not, however, want to store mulitmedia content in [Firebase](https://firebase.google.com/). Rather, I wanted to treat text as a first class and only citizen of my [Firebase Firestore](https://firebase.google.com/) collection.

I wanted to build [ShortStack](https://nicholassynovic.github.io/shortstack) as a fast, simple, and unbloated chat application for my users. I wanted as much of the application to be dynamically rendered based on the current view (reducing the size of the distributed HTML files), have all availible options for a view to be presented to the user without hiding them behind hamburger, obtrusive, or hidden menus (think the opposite of [Facebook](https://facebook.com/)), and to only present a view's completed features so as to avoid users from using broken or half-complete components.

I want [ShortStack](https://nicholassynovic.github.io/shortstack) to look as good as possible across as many devices as possible. I don't want complex CSS styling or animations as they can lead to bad user interfaces when trying to distribute across a number of devices unless properly tested for. Furthermore, I suffer from red-green colorblindness, so the less that I have to color elements, the better.

### Why Did I Want To Achieve These Goals?

I believe that modern chat applications, such as [Facebook](https://facebook.com/), have gotten so large that they are unusable. Whether it be implementing half-complete features, hiding user options, or taking substantial amounts of time to load on the client side, these applications are no longer user friendly unless you have been with the application since day one. I wanted to take the core component of these applications (chatting with others) and focus [ShortStack](https://nicholassynovic.github.io/shortstack) on accomplishing that singlular goal with an interface that is as simple as possible.

To do so, I reduced the scope of what a chat feature can or should do to just the bare minimum: send text content between users. This was both to accomplish my goals and to reduce the Firebase backend development that I would have to do to host multimedia content. However, I still wanted [ShortStack](https://nicholassynovic.github.io/shortstack) to support multimedia content. To do so, I implemented a Markdown renderer API called [marked](https://marked.js.org/). [`marked`](https://marked.js.org/) implements the [GitHub Flavored Markdown](https://github.github.com/gfm/), which also supports HTML rendering. Using this, users can send multimedia content between one another so long as it is packaged in HTML markup. They can also do text formatting via [GitHub Flavored Markdown](https://github.github.com/gfm/).

## Design Considerations

### Original Project ideas and Concepts

The original goal of this application was to build a chat application with some additional nuts and bolts. Particularly, I wanted to make the application a [PWA](https://en.wikipedia.org/wiki/Progressive_web_application) that implemented [PGP encryption](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) on all messages.

The reason to make the application a [PWA](https://en.wikipedia.org/wiki/Progressive_web_application) was to experiment with media queries as well as to learn how to build mobile applications that are distributed via websites rather than centralized sources such as the [Apple App Store](https://www.apple.com/app-store/) and the [Google Play Store](https://play.google.com/store). As a [PWA](https://en.wikipedia.org/wiki/Progressive_web_application), my application can be installed onto a users device via their browser. Furthermore, a [PWA](https://en.wikipedia.org/wiki/Progressive_web_application) would let this application would be able to cache messages offline and utilize the device notification API.

The reason why I wanted to implement [PGP encryption](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) was to both learn how to do it, as well as to offer a chat option to those focussed on protecting their digital privacy and security. My implementation would have stored the users public key in a[Firebase Firestore document](https://firebase.google.com/) associated to their account, but encrypt messages on the client side before sending the message into the [Firebase Firestore *messages* collection](https://firebase.google.com/) as a document. The private key would have to be inputted into the application everytime the user returned to it, but [Firebase Firestore](https://firebase.google.com/) wouldn't know the user's private key. This way, messages are encrypted before [Firebase Firestore](https://firebase.google.com/) even recieves them, preventing me (the applicaiton owner) or any bad actor from peering into someone's messages without knowing that individual's private key.

As this was a chat application, no premade datasets were to be used in the application. Rather, the dataset that would be used would be the user generated chats.

Example projects that I looked at were [Facebook](https://facebook.com), [Twitter](https://twitter.com), [Tumblr](https://tumblr.com/), [Android Messages](https://messages.google.com/), and [Proton Mail](https://protonmail.com/) (a PGP secured email client) for design and technical considerations.

### Primary Goal of the Homepage

The primary goal of the homepage of [ShortStack](https://nicholassynovic.github.io/shortstack) is to host the sign in and up buttons. The only content on the page is meant to direct users to the [GitHub repository](https://github.com/NicholasSynovic/shortstack) (via the ribbon that appears on all pages on the desktop version of the site), present the title, logo, and other metadata about the site.

The true homepage of [ShortStack](https://nicholassynovic.github.io/shortstack) is the chat interface. This is only accessible in a working state once the user logs in. This interface presents the chat window, an option to sign out, a clickable header that will take you back to the page described above, a button to send messages, and a textbox and textarea element. The textbox is to input the recipients email address, and the textarea is to input the message to send to the recipient.

### Consistency Considerations

I choose the following colors for my color scheme:

- #55a1ff (a light blue color)
- #ffc861 (a light green color)
- #ffab61 (a light red color)

These colors were selected because they were the colors of [ShortStack's](https://nicholassynovic.github.io/shortstack) icon provided by [bukeicon](https://www.flaticon.com/authors/bukeicon) from [flaticon](https://www.flaticon.com/).

I tried to avoid including any graphics in the views, with the exception being the chat view. There a robot icon can be found at the top of the screen which is unique to each user. This is meant to be a distinguishing icon that can be used to track who sent what message. This icon is generated using the [Dicebear Avatars API](https://avatars.dicebear.com/).

Each page is as simple as it can be in terms of functionality. There is nothing extra or unnescary on each page as part of the design ethos of this application was to keep it as simple as possible.

Each page follows the same width, height, content placement, and containerization of elements style guide. This is enforced via component specific CSS that is loaded into every page, as well as by keeping common elements as components that are loaded in after the HTML file is rendered. By utilizing components I can ensure that a component will look the same across multiple pages. Components are handled as HTML templates that are appended as children to the document.

### Response to Midterm Feedback

After the midterm presentation, I rescoped the project into something that I feel is more manageable. I removed the - [PWA](https://en.wikipedia.org/wiki/Progressive_web_application)
 functionality, and put the [PGP encryption](https://en.wikipedia.org/wiki/Pretty_Good_Privacy) of messages on the backburner. I then strongly focussed on creating as simple of a chat app as possible that included the following features:

- Authentication with [Firebase Authentication](https://firebase.google.com/)
- One-to-one messaging
- Unique user avatars with the [Dicebear Avatars API](https://avatars.dicebear.com/)
- Markdown and HTML rendering of messages with the [`marked`](https://marked.js.org/) API
- Cloud storage via [Firebase Firestore](https://firebase.google.com/)

With the project rescoped to include only whats listed above, I was able to create a project that is both easily extensible and can be used as a template to others as to what a chat application can be.

These changes reduced the technical debt that the site would take on as well as to allow me to iterate quickly through ideas and prototypes with little concern that I would have to redevelop the site. As someone who worked on this project alone, quick iteration was key to the success of [ShortStack](https://nicholassynovic.github.io/shortstack).

### Interaction Patterns

There are two types of interation that occur within my site:

1. Automated interaction

This is interaction that is done by the site at runtime. This includes:

- Rending components
- [Firebase Authentication](https://firebase.google.com/)
- [Firebase Firestore](https://firebase.google.com/) document storage and request calls
- Markdown and HTML of messages rendering

All of these interactions in this catagory benefit from the Deferred pattern. Specifically:

- Markdown and HTML message rendering doesn't occur until there is a message to render
- [Firebase](https://firebase.google.com/) calls are all asynchronus
- All components are rendered on the page after the HTML file has been rendered in the browser
- I utilized [webpack](https://webpack.js.org/) to bundle [npm](https://www.npmjs.com/) packages for this application and it loads the bundled bundle.js file after the page has been rendered

2. User interaction

This is interaction that the user does on the site. This includes:

- Clicking buttons
- Inputting text

These interactions are all handled by standard HTML elements including:

- `form`
- `button`
- `input`
- `textarea`

Regarding the input elements on the sign in and sign up pages: the user has to input an email and password to log into the application. To enforce that an email address is typed into the email `input` element and a password is typed into the password `input` element, I set the `type` of those `input` elements to *email* and *password* respectively. Also, both in my application and in the application's [Firebase Authentication](https://firebase.google.com/), a password of 6 charachters or more has to be inputted for it to be a valid password.

Should a user input a wrong value or encounter an error with the application (either on the client or [Firebase](https://firebase.google.com/) side of the application), an error report is shown to the user via a JavaScript alert element.

## Design Specification

## Testing and Iterative Design

## Restrictions, Limitations, and Constraints

## Conclusion
