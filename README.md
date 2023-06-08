# React Native Firebase Authentication template

## About

Based on a [tutorial](https://www.atomlab.dev/tutorials/email-authentication-react-native-firebase), but changes a few things:

* Auth components are split into individual react components
* Cypress end to end tests
* React Native router
* Typescript

The idea was to create a repository that can be forked and used to build projects that require a basic auth Firebase integration.

## How to use

* Fork this repository
* Enter Firebase project id in `.firebaserc`
* Enter details of the Firebase project into `config/firebase.js`
* Setup [local firebase environment](https://firebase.google.com/docs/emulator-suite/install_and_configure)
* **IMPORTANT** When using with a real project with a database, please make sure [to secure your firestore](https://firebase.google.com/docs/firestore/security/rules-structure).

## How to start

Start react native app

`npm start`

Start local firebase environment

`firebase emulators:start`

Start cypress tests

`npx cypress open`

## How to run tests

Tun run a bunch of tests via cli, use
`npx cypress run --spec "cypress/e2e/auth"`
