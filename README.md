# Pundit

## Introduction
This is a project for Udacity's React Developer NanoDegree. It's a Reddit clone that allows users to:

  - Post content
  - Filter posts by category and sort them by different metrics
  - Comment on posts
  - Vote on posts and comments

Since I have an affinity for cheesy humor, its focus is on puns, dad jokes, and wordplay. :-)

## Concepts and Classes
Concepts explored in this project:

  - NodeJS, React, Redux, React Router
  - Bootstrap layout and design using [ReactStrap](https://reactstrap.github.io)
  - HTTP requests using the Fetch API
  - Synchronous and asyncronous action creators
  - Functional programming and reducers
  - Back end server using Express
  - Storing/querying data using MongoDB and Mongoose
  - Hosting on [Heroku](https://www.heroku.com)

## Getting Started
The project is hosted at [http://pundit.timabrahamsen.com](https://pundit.timabrahamsen.com).

To view/edit the source code:

  - Install [Yarn](https://yarnpkg.com/lang/en/docs/install)
  - Download/clone the repository and navigate to the root directory
  - check out the nologin branch:
  ```sh
  $ git checkout nologin
  ```
  - install dependencies:
  ```sh
  $ npm install
  ```
  - start the local server:
  ```sh
  $ yarn start
  ```
  The app will automatically open in a web browser at http://localhost:3000.
  
## Other Details
The [back end for this project](https://github.com/timmyneutron/Pundit-Back-End) is based off of [starter code supplied by the instructors at Udacity](https://github.com/udacity/reactnd-project-readable-starter). It maintains the original endpoints from the starter code, with modifications to integrate a MongoDB database.
