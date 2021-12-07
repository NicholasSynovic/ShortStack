# ShortStack

## Notes About This Application

- This site can be viewed live at [nicholassynovic.github.io/shortstack/index.html](https://nicholassynovic.github.io/shortstack/index.html)
- This application was built by one person
- This site is built entirely on raw HTML, CSS, and JS

## Final Presentation Talking Points

### General Points

1. This site doesn't use any content management systems
2. This site is built entirely with my own HTML, CSS, and JS

- webpack was used to wrap npm modules up for deployment 

4. No CSS frameworks were used
5. No CSS preprocessors were used

- Google Fonts were used
- Icons from flaticon.com were used

6. No existing templating tools were used

- I built my own templating tool to handle different components of the application (written entirely in JS)

8. Data is hosted using Firebase
9. Implemented the markedJS and DOMPurify APIs for custom text processing
10. Implemented the Dicebear Avatars API for random custom avatars
11. No SQL code was used

### Design Decisions

1. Keep it small, keep it fast

- I hate large interfaces (EX: hamburger menus, Facebook in its entirety, hidden options), so I kept the interface as simple and as small as possible.
- I like browsers like lynx which keep CSS out of the way as much as possible, so I kept CSS styling as simple as possible.
- I hate working in massive HTML files, so I moved as much as possible into components which are loaded into the application on the fly.
- I like site manipulation with JS, so I tried to keep utilize JS to create components on the fly.
- I hate vanilla JS, so I kept it out of the way as much as possible.
- Etc.

2. Let Markdown style text

- Markdown is both small and beautiful IMO, so I want to let users style their text with it.

3. Have a robot do it for me

- This site is hosted on GitHub Pages and uses a GH action to build the site on commits.
- This site utilized webpack to bundle the necessary dependencies for the application. 

### Analysis of Work

I worked alone on this application throughout the semester. All of the work within this repository is my own.

I relied on the work of those within the CS community to teach me the necessary skills and tools to build this application.

### State of the web app concept and design

#### What is included

- Users can sign in with their email address.
- Users can login to existing accounts.
- Users can send direct messages to other users assuming that they know the other users email address.
- Users can send photos, links, videos, and other media to other users.
- User's feeds are automatically updated when they recieve a message.

#### What isn't included

- PGP encryption (got lost in the weeds)
- HTTP prefetch (not enough time)
- WebRTC (too much bloat)
- PWA (too difficult to test)
- CSS Media Queries (not enough time)

### Tech Stack

- Vanilla HTML, CSS, and JS
- [Firebase 9](https://firebase.google.com/)
- [webpack](https://webpack.js.org)
  - [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
  - [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/)
- [GitHub Actions](https://github.com/features/actions)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- [Dicebear Avatars API](https://avatars.dicebear.com/)
- [Spectral Font](https://fonts.google.com/specimen/Spectral#standard-styles) by *Production Type*
- [Karla Font](https://fonts.google.com/specimen/Karla) by *Jonny Pinhorn*
- [Marked](https://marked.js.org/)
- [DOMPurify](https://cure53.de/purify)

### Resources

- [Firebase 9 Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb) by *The Net Ninja*
- [Continuously Deploy Static Pages with Github Actions & gh-pages](https://javascript.plainenglish.io/continuously-deploy-static-pages-with-github-actions-gh-pages-207e4a009d1c) by *Parthipan Natkunam*
- [Reusable HTML Components – How to Reuse a Header and Footer on a Website](https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/) by *Kris Koishigawa*
- [I built a chat app in 7 minutes with React & Firebase](https://www.youtube.com/watch?v=zQyrwxMPm88) by *Fireship*

### Credits

- Icons made by [bukeicon](https://www.flaticon.com/authors/bukeicon) from [www.flaticon.com](https://www.flaticon.com/)
