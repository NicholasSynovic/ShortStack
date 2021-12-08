# ShortStack

> A COMP 324 Final Project by Nicholas Synovic

## Table of Contents

- [ShortStack](#shortstack)
  - [Table of Contents](#table-of-contents)
  - [GitHub URL](#github-url)
  - [List of Project Participants](#list-of-project-participants)
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

## GitHub URL

GitHub Repository Link

- https://github.com/NicholasSynovic/shortstack

GitHub Pages Link

- https://nicholassynovic.github.io/shortstack

## List of Project Participants

- Nicholas Synovic
  - Lead (and only) developer and designer of the application. Literally did every part of the assignment on his own.

## Project Abstract

ShortStack is a simple chat application that allows users to have one-on-one chats with other users. Chats can contain only contain textual information, but users can send both Markdown and HTML code to be rendered in the chat window. This allows for hyperlinks, documents, images, video, audio, etc. to be shared without having to upload this content to a central database.

The main draw of the application is the built in Markdown renderer, allowing for Markdown and  HTML content to be shared and rendered within the chat window. Furthermore, ShortStack supports the cloud synchronization of messages, allowing users to view their messages on any browser. Since all messages are textual, Markdown and HTML content that is sent on one browser will be rendered on another in a similar and timely manner.

The application is designed around the less is more approach. The app only has the components and wiring necessary for it to run, both on the client side and serverless side. It presents all of the availble client options to the user unobstructed by side or hidden menus as well. It also keeps the serverless components to their absolute minimum; this application uses a single Firestore collection as its datastore.

I chose to build a chat application to learn the following:

- Firebase
- Markdown rendering in browser
- PWAs
- PGP encryption

While not all of what I learned is included within this application, due to iterative design all of these components were at once a part of the application. Through this application, I learned more about the underlying web components and services that power today's top websites and applications.

## Project Narrative

### What Was I Trying To Achieve?

Following the midterm presentations, I wanted to build a chat application that allowed for users to share all sorts of content and media via text formatting with Markdown and HTML. I did not, however, want to store non-text/mulitmedia content on a serverless provider. Rather, I wanted to treat text as a first class and only citizen of the data storage component of the application.

I wanted to build a fast, simple, and unbloated chat application for my users. I wanted as much of the application to be dynamically rendered based on the current view (reducing the size of the distributed HTML files), have all availible options for a view to be presented to the user without hiding them behind hamburger, obtrusive, or hidden menus (think the opposite of Facebook), and to only present a view's completed features so as to avoid users from using broken or half-complete components.

I want this application to look as good as possible across as many devices as possible. I don't want complex CSS styling or animations as they can lead to bad user interfaces when trying to distribute across a number of devices unless properly tested for.

### Why Did I Want To Achieve These Goals?

I believe that modern chat applications, such as Facebook, have gotten so large that they are unusable. Whether it be implementing half-complete features, hiding user options, or taking substantial amounts of time to load on the client side, these applications are no longer user friendly unless you have been with the application since day one. I wanted to take the core component of these applications (chatting with others) and focus on building an application that does just that in as simple manner as I could.

To do so, I reduced the scope of what a chat feature can or should do to just the bare minimum: send text content between users. This was both to accomplish my goals and to reduce the serverless backend development that I would have to do to host multimedia content. However, I still wanted the application to support multimedia content. To do so, I implemented a Markdown renderer API called markedJS. markedJS implements the GitHub Markdown Flavor, which also supports HTML rendering. Using this, users can send multimedia content between one another so long as it is packaged in HTML markup. They can also do text formatting via the GitHub Markdown Flavor specification.

## Design Considerations

### Original Project ideas and Concepts

The original goal of this application was to build a chat application with some additional nuts and bolts. Particularly, I wanted to make the application a progressive web application (PWA) that implemented Pretty Good Privacy (PGP) encryption on all messages.

The reason to make the application a PWA was to experiment with media queries as well as to learn how to build mobile applications that are distributed via websites rather than centralized sources such as the Apple App Store and the Google Play Store. As a PWA this application would be able to cache messages offline and utilize the device notification API.

The reason why I wanted to implement PGP encryption was to both learn how to do it, as well as to offer a chat option to those focussed on protecting their digital privacy and security. My implementation would have stored the users public key in the cloud associated to their account, but encrypt messages on the client side before sending the message into the cloud. The private key would have to be inputted into the application everytime the user returned to it, but the cloud database wouldn't know the user's private key. This way, messages are encrypted before the server even recieves them, preventing me (the applicaiton owner) or any bad actor from peering into someone's messages without knowing that individual's private key.

As this was a chat application, no premade datasets were to be used in the application. Rather, the dataset that would be used would be the user generated chats.

Example projects that I looked at were Facebook Messenger, Twitter, Android Messages, and Proton Mail (a PGP secured email client) for design and technical considerations.

### Primary Goal of the Homepage

The primary goal of the homepage is to host the sign in and up buttons. The only content on the page is meant to direct users to the

### Consistency Considerations

### Response to Midterm Feedback

### Interaction Patterns

## Design Specification

## Testing and Iterative Design

## Restrictions, Limitations, and Constraints

## Conclusion
