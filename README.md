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
I created 3 different folders to simulate 3 different environments, like a simple monolith. Each folder could be on its own repo, in a well formed mono repo or in a properly configured monolith.

### db
Contains a simple string array with the DB simulation. This is to simulate what was provided in the coding exercise.
I didn't add any indexes to the DB as the example didn't have any. It was easy to work without ids as I consume an array and explicitly use position based indexes, but in a real world DB we should consume the DB IDs.

### backend
Contains a simple implementation of the backend. In reality, this could have been a separate API or lambdas in cloud. It will read the `db.ts` and return it as a String with the whole information to be returned. The idea is that we use a `Match` interface that will include different data such as the name of the teams, their score and the current live status of the game.
The backend will read the db.ts as if it were the original DB and create a cached version of this db. It will then be passed to the FrontEnd and it will be updated using CRUD operations whenever its needed.

### frontend
What I wanted to do is to follow the guidelines and demonstrate a bit of expertise, while at the same time, try to accomplish this ASAP. I know I can build a whole project and infraestrcture in a week, but I think that it would be very interesting to build something simple as you require in the guidelines, but fast enough. I also used the color scheme from the sportradar website, but there's definitely improvements on the color pallette we could include in a figma design or similar.

The UI displays 2 tables using MaterialUI, representing live and ended matches. There will be some already ended and some already started. In order to demo the project, you will be able to add goals, start games and end games. You will be able to see matches going from one table to another.

This could be further improved adding dates for example, as currently I only track whether the match is live or not, but assumes that a match that is not live means that has already ended, but it could be that it hasn't started yet.

The front end will call the backend service implementation to simulate API calls. This could be enhaced adding Redux and using a fetch API.

### interfaces
As I'm doing somewhat of a monolith, I will create a interfaces folder to store shared interfaces between the backend and front end.


## Things to Improve
1. Add independency injection using classes and interfaces
2. Add fake db to tests
3. Add datetime to matches
4. Error handling - there's none as it's not an API but a quick implementation as per excersise requirement.