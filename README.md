<p align="center">
<img src="./app/assets/images/logo/short-logo.svg" alt="Truthy Logo">
</p>
<h1 align="center">
  Truthy CMS (ReactJS Starter)
</h1>

<p align="center"> This repository is frontend part of Truthy CMS written in ReactJS & Redux-Saga. For Backend API please visit https://github.com/gobeam/truthy. Ant design (https://ant.design/) is used as an UI library. This project includes User Management, Role Management, Permission Management, Email Module, Account Settings, OTP, RBAC support, Localization, and many more. Hope you like it.<br>
If you love it don't forget to share your experience. If you want to contribute to the Truthy CMS in any way like API, Frontend, Design, Logo you're more than welcome to do so. Our plan is to make this no. 1 CMS maintained by open-source community.

View Live <a href="http://157.245.148.131:3000">here</a>
 </p>

 <p align="center">
 <img alt="truthy-react-frontend package.json version" src="https://img.shields.io/github/package-json/v/gobeam/truthy-react-frontend">
<img alt="ruthy-react-frontend" src="https://img.shields.io/github/license/gobeam/truthy-react-frontend">
<img alt="Lines of code" src="https://img.shields.io/tokei/lines/github/gobeam/truthy-react-frontend">
<img src='https://www.codetriage.com/gobeam/truthy-react-frontend/badges/users.svg' alt='Open Source Helpers' />
</p>
<p align="center">
<a href="https://www.buymeacoffee.com/gobeam" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
</p>

<p align="center">
  <sub>Created by <a href="https://www.linkedin.com/in/roshan-ranabhat/">Roshan Ranabhat (gobeam)</a> and maintained with ❤️ by an amazing <a href="https://github.com/gobeam/truthy-contributors">team of awesome developers</a>.</sub>
</p>

<p align="center">
  <sub>Check Live code deployed here:
  Frontend: <a href="https://truthy-cms.herokuapp.com">Truthy CMS</a>
  Backend API Docs: <a href="https://truthy-backend.herokuapp.com/api-docs/">Swagger Docs</a>
  </sub>
</p>

<p align="center">
<img src="https://gobeam.github.io/truthy-contributors/truthy.gif" alt="Truthy CMS" >
</p>

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#Prerequisites)
- [Available Scripts](#available-scripts)
- [Setup](#setup)
- [File Structure](#file-structure)
- [Application Security](#application-security)
- [Contributing](#contributing)
- [Sponsors](#sponsors)
- [License](#license)
- [Acknowledgement](#acknowledgement)

---

## Getting Started

This project was created to help developers by bootstrapping basic modules that need to be present while creating a standard CMS. The main motto of this project was to save precious time while developing CMS and focus more on the core part. This project is trying to follow the best possible standard to make it optimized and production-ready. Hope you like it. If you love it don't forget to share your experience.

---

## Prerequisites

NodeJS
https://nodejs.org/en/

---

## Available Scripts

### npx truthy-react-cms project_name

This commands downloads the latest version of truthy-react-cms

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Hot reload is supported on the development environment page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn lint`

Lints all the files inside `./src` and shows the result without fixing.

### `yarn lint:js:fix`

Lints all the files inside `./src`.

---

## Setup

First, you need to clone the project
```bash
git clone https://github.com/gobeam/truthy-react-frontend.git
```

After cloning the project copy .env.sample and save it as .env
```bash
cp .env.sample .env
```

In the .env file, you have to provide the following fields
```env
#environment type (development, production)
NODE_ENV=development

#frontend application URI
REACT_APP_URI=http://localhost:3000

#Backend API URI (setup from: https://github.com/gobeam/truthy)
REACT_APP_API_BASE_URI=http://localhost:7777
```

If you want to run locally
```bash
yarn start
```

If you want to use **Docker** to deploy it on production or development stage
```bash
docker build -t truthy-frontend .
docker run truthy-frontend -p 3000:80
```

---

## File Structure

This project follows the following file structure:

```text
app
├── app                  
│   └── assets                              * Assets that are imported into your components(images, custom SVG, etc).
│   └── common                              * Common helpers function, hooks, translation messages, and layouts
│   └── component                           * Components of the projects that are not the main views.
│       └── ...
│   └── containers                          * Components that are connected to the redux-saga and receive updates.
│       └── <domain container>
│           └── index.js
│           └── action.js
│           └── constants.js
│           └── Loadable.js
│           └── messages.js
│           └── reducer.js
│           └── saga.js
│           └── selector.js
│   └── helpers                             * Common Helper functions.
│   └── hooks                               * Feature to use state and other React functionalities without writing class.
│   └── i18n                                * Translation files.
│   └── reducers                            * Pure function that takes an action and the previous state of the application and returns the 
│   └── routes                              * Routes list.
│   └── scss                                * Scss files for the project.
│   └── services                            * Common services file.
│   └── store                               * The Redux action types in action-type.js, reducers, selectors, and main store in the 
│   └── utils                               * Common utils.
│   └── app.js                              * Main app component.
│   └── global-style.js                     * Global styles.
├── build                                   * Build files when `yarn build` is run.
├── internals
│   └── scripts                             * Scripts.
│   └── webpack                             * Webpack configuration.  
├── server                                  * Node server to run the application. 
```

**Some important root files**

```text
.
├── .editorconfig                           * Coding styles (also by programming language).
├── .env                                    * Environment variables (env.production, env.local, env.uat, etc).
├── .eslintrc.json                          * ESLint configuration and rules.
├── .prettierrc                             * Formatting Prettier options.
├── Dockerfile                              * Docker file for prod environment.
├── Dockerfile.dev                          * Docker file for dev environment.
```

---

## Application Security

### Throttle

By default Throttle has been implemented on API endpoints in [Truthy Backend API](https://github.com/gobeam/truthy)

### Two Factor Authentication (2FA)

User Will have 2FA authentication option available to be turned on or off. For 2FA time-based one-time password is used. A time-based one-time password (TOTP) application automatically generates an authentication code that changes after a certain period of time. Applications like [Authenticator](https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en&gl=US), [1Password](https://support.1password.com/one-time-passwords/), [Authy](https://authy.com/guides/github/) etc. can be used to generate TOTP. When you enable 2FA, you will be sent a QR code in your email which should be scanned from above mentioned application and TOTP will be generated by those applications.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate. - see `CONTRIBUTING.md` for details.
**If you want to be featured in contributors list on our home page please add PR on https://github.com/gobeam/truthy-contributors to provide your details.**

---

## Sponsors
- [Ekbana Solutions Pvt. Ltd](https://ekbana.com/)

---

## License

Released under the MIT License - see `LICENSE.md` for details.

---

## Acknowledgement

- [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate)