# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project Structure
I created 3 different folders to simulate 3 different environments, like a simple and redundant monolith. Each folder could be on its own repo, in a well formed mono repo or in a properly configured monolith.

### db
Contains a simple string array with the DB simulation. This is to simulate what was provided in the coding exercise

### backend
Contains a simple implementation of the backend. In reality, this could have been a separate API or lambdas in cloud. It will read the `db.ts` and return it as a String with the whole information to be returned. The idea is that we use a `Match` interface that will include different data such as the name of the teams, their score and the current live status of the game.
The backend will read the db.ts as if it were the original DB and create a cached version of this db. It will then be passed to the FrontEnd and it will be updated using CRUD operations whenever its needed.

### frontend
The front end is a simple react dashboard using Material UI. It has a side menu to demonstrate use of Material UI. Visually, what will happen is that the matches will simulate time and goals overtime time, so if you leave the site running, you will see some matches getting updated.
Also, you will see Live matches on top of ended matches. This could be further improved adding dates for example, as currently I only track whether the match is live or not, but assumes that a match that is not live means that has already ended, but it could be that it hasn't started yet.
The front end will call the backend to simulate API calls

### interfaces
As I'm doing somewhat of a monolith, I will create a interfaces folder to store shared interfaces between the backend and front end.


## Things to Improve
1. Add independency injection using classes and interfaces
2. Add fake db to tests