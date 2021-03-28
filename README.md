# React, Firebase and PHP based Gaming web app

<!-- Problem statement -->

Implemented authentication using firebase auth.
Used PHP powered API based backend server; MySQL for the database.
AJAX style front-end is created using ReactJS and other powerful libraries.

```
gamerse
├─ .eslintcache
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  └─ master
│  │     └─ remotes
│  │        └─ origin
│  │           └─ master
│  ├─ ORIG_HEAD
│  └─ refs
│     ├─ heads
│     │  └─ master
│     ├─ remotes
│     │  └─ origin
│     │     └─ master
│     └─ tags
├─ .gitignore
├─ config-overrides.js
├─ jsconfig.json
├─ package.json
├─ public
│  ├─ index.html
│  ├─ manifest.json
│  └─ robots.txt
├─ README.md
├─ scratch
├─ src
│  ├─ App.js
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ forgotPassword
│  │  │  │  ├─ Forgot.svg
│  │  │  │  └─ ForgotPassword.js
│  │  │  ├─ login
│  │  │  │  ├─ Login.js
│  │  │  │  └─ Login.svg
│  │  │  └─ register
│  │  │     ├─ Register.js
│  │  │     └─ Register.svg
│  │  ├─ main
│  │  │  ├─ friends
│  │  │  │  ├─ Chat.js
│  │  │  │  ├─ FriendListItem.js
│  │  │  │  ├─ Friends.jsx
│  │  │  │  ├─ Friends.scss
│  │  │  │  └─ PendingListItem.js
│  │  │  ├─ GlobalChat.js
│  │  │  ├─ Home.js
│  │  │  ├─ Home.scss
│  │  │  ├─ InGameChat.js
│  │  │  ├─ snakes
│  │  │  │  ├─ App.css
│  │  │  │  ├─ Food.js
│  │  │  │  ├─ Snake.js
│  │  │  │  ├─ SnakeGame.js
│  │  │  │  ├─ Snakes.js
│  │  │  │  └─ SnakesScore.js
│  │  │  ├─ tictactoe
│  │  │  │  ├─ AppProvider.js
│  │  │  │  ├─ common.js
│  │  │  │  ├─ grass4.png
│  │  │  │  ├─ Header.css
│  │  │  │  ├─ Header.js
│  │  │  │  ├─ Main.css
│  │  │  │  ├─ Main.js
│  │  │  │  ├─ TicTacToe.css
│  │  │  │  ├─ TicTacToe.js
│  │  │  │  ├─ TTTai.js
│  │  │  │  ├─ TTTbg.scss
│  │  │  │  ├─ TTTeasy.js
│  │  │  │  ├─ TTTfriend.js
│  │  │  │  ├─ TTThuman.js
│  │  │  │  └─ WaitingRoom.js
│  │  │  ├─ TicTacToeRouter.js
│  │  │  └─ welcome
│  │  │     ├─ Welcome.js
│  │  │     └─ Welcome.svg
│  │  └─ shared
│  │     ├─ Header.js
│  │     └─ Loading.js
│  ├─ config
│  │  ├─ firebaseConfig.js
│  │  └─ php.js
│  ├─ fonts
│  │  ├─ FiraCode-Bold.ttf
│  │  ├─ FiraCode-Light.ttf
│  │  ├─ FiraCode-Medium.ttf
│  │  ├─ FiraCode-Regular.ttf
│  │  ├─ FiraCode-SemiBold.ttf
│  │  ├─ FiraCode.css
│  │  ├─ Inter-Black.woff
│  │  ├─ Inter-Black.woff2
│  │  ├─ Inter-BlackItalic.woff
│  │  ├─ Inter-BlackItalic.woff2
│  │  ├─ Inter-Bold.woff
│  │  ├─ Inter-Bold.woff2
│  │  ├─ Inter-BoldItalic.woff
│  │  ├─ Inter-BoldItalic.woff2
│  │  ├─ Inter-ExtraBold.woff
│  │  ├─ Inter-ExtraBold.woff2
│  │  ├─ Inter-ExtraBoldItalic.woff
│  │  ├─ Inter-ExtraBoldItalic.woff2
│  │  ├─ Inter-ExtraLight.woff
│  │  ├─ Inter-ExtraLight.woff2
│  │  ├─ Inter-ExtraLightItalic.woff
│  │  ├─ Inter-ExtraLightItalic.woff2
│  │  ├─ Inter-italic.var.woff2
│  │  ├─ Inter-Italic.woff
│  │  ├─ Inter-Italic.woff2
│  │  ├─ Inter-Light.woff
│  │  ├─ Inter-Light.woff2
│  │  ├─ Inter-LightItalic.woff
│  │  ├─ Inter-LightItalic.woff2
│  │  ├─ Inter-Medium.woff
│  │  ├─ Inter-Medium.woff2
│  │  ├─ Inter-MediumItalic.woff
│  │  ├─ Inter-MediumItalic.woff2
│  │  ├─ Inter-Regular.woff
│  │  ├─ Inter-Regular.woff2
│  │  ├─ Inter-roman.var.woff2
│  │  ├─ Inter-SemiBold.woff
│  │  ├─ Inter-SemiBold.woff2
│  │  ├─ Inter-SemiBoldItalic.woff
│  │  ├─ Inter-SemiBoldItalic.woff2
│  │  ├─ Inter-Thin.woff
│  │  ├─ Inter-Thin.woff2
│  │  ├─ Inter-ThinItalic.woff
│  │  ├─ Inter-ThinItalic.woff2
│  │  ├─ Inter.css
│  │  └─ Inter.var.woff2
│  ├─ index.js
│  ├─ index.scss
│  ├─ redux
│  │  ├─ actionCreators
│  │  │  ├─ chat.js
│  │  │  └─ ttt.js
│  │  ├─ actions.js
│  │  ├─ reducers
│  │  │  ├─ chat.js
│  │  │  ├─ root.js
│  │  │  └─ ttt.js
│  │  └─ store.js
│  └─ Routes.js
├─ TODO
└─ yarn.lock

```
"# Front-end" 
