# (Yet Another) Redux Starter Kit [![Dependency Status](https://david-dm.org/dmitru/redux-bootstrap-starter-kit.svg)](https://david-dm.org/dmitru/redux-bootstrap-starter-kit) [![Build Status](https://travis-ci.org/dmitru/redux-bootstrap-starter-kit.svg?branch=master)](https://travis-ci.org/dmitru/redux-bootstrap-starter-kit)
 

## What is it?

This is my try at creating a boilerplate project for React webapps. That said, **this boilerplate shouldn't probably be used in production - there are far better alternatives.** It's best to see it as my own educational adventure - I did learn a great deal about modern web tools while putting them all together in this project.

In it's essense, it's a front-end part of a **simple CRUD application for tracking personal incomes/expenses**.

Among other things, it showcases:

- authentication (mocked on backend)
- signing up form protected with [Recaptcha](https://www.google.com/recaptcha/intro/index.html)
- client-side routing with [react-router-redux](https://github.com/reactjs/react-router-redux)
- building with [webpack](https://webpack.github.io/) with hotreloading
- [CSS modules](http://glenmaddern.com/articles/css-modules) with [SASS](http://sass-lang.com/)
- ...and more!

The backend is a mock: most of AJAX API calls are emulated on client and no real data is saved on the server.   
 

## How to run it


Install dependencies:
``npm i`` 

then run the dev server with hot-reloading:
``npm dev``

Or build a production bundle:
``npm build``

and run the Express.js server to serve it, render templates and mock an API:
``npm start``

## Roadmap

- [ ] describe the project structure in this README

## Credits

The project was initially inspired by [this excellent tutorial](http://spapas.github.io/2016/03/02/react-redux-tutorial/).
