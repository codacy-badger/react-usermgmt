# User Management
> Sample user management React app leveraging [Material UI](https://material-ui.com/).

[![CircleCI branch](https://img.shields.io/circleci/project/github/dzervoudakes/react-usermgmt/master.svg)](https://circleci.com/gh/dzervoudakes/react-usermgmt/tree/master)
[![Prettier badge](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

## Build Scripts

### Install Dependencies
```
npm install
```

### Start Local Server
```
npm start
```

### Run Linting
```
npm run lint
```

### Run Linting with Fix
```
npm run lint:fix
```

### Run Style Linting
```
npm run stylelint
```

### Run Style Linting with Fix
```
npm run stylelint:fix
```

### Run Unit Tests
```
npm test
```

### Run Unit Tests with Coverage Report
```
npm run test:coverage
```

### Run Unit Tests with Verbose Results
```
npm run test:verbose
```

### Build for Production
```
npm run build
```

### Build for Production with Bundle Analyzer Report
```
npm run build:report
```

### Remove All Build Directories
```
npm run clean
```

## Configuration
> This application makes use of `ESLint`, `Stylelint` and `EditorConfig`. Each of these features requires
> an extension be installed in order to work properly with IDEs and text editors such as VSCode.

## Server Environments
> The same Express server handles development and production content. To run the server locally
> with webpack dev middleware, run `npm start`. To run the production server with static
> build assets from 'dist', simply run `node server`.
