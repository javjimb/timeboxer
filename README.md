# Timeboxing App

A simple app to practice the [Timeboxing](https://en.wikipedia.org/wiki/Timeboxing) technique.

## Requirements

-   A local instance of MongoDB

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

-   Clone this repository
-   Rename client/.env.example to client/.env and modify settings for your development environment
-   Rename server/development/.env.example to server/development/.env and modify settings for your development environment
-   Install the required dependencies:

```
npm install --prefix ./server
npm install --prefix ./client
```

-   Start the server and the client:

```
cd server
npm run dev
```

## Running the tests

To run backend tests:

```
cd server
npm run test
```

## Documentation

To generate the documentation for the API:

```
npm install -g apidoc
cd server
npm run docs
```

The documentation can be viewed at

```
http://[yourAPIdomain]/apidoc
```

## Built With

-   [Node](https://nodejs.org) - Backend
-   [React](https://reactjs.org) - Frontend
-   [Material-UI](https://material-ui.com) - Design
-   [MongoDB](https://www.mongodb.com) - Database

## Authors

-   **Javier Jimenez Blasco** - _Backend/Frontend_
-   **Julia Heller** - _Frontend_
