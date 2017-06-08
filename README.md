# Media Facebook UI

JavaScript framework written for modular architecture. See [Angular Styleguide](https://github.com/toddmotto/angular-styleguide#modular-architecture) for more details.

## Requires

 - [Node.js](https://nodejs.org/en/ "node.js")
 - [Java Development Kit &#40;JDK&#41;](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

## Technologies Used

 - [Webpack 2.x](https://webpack.js.org/) - Module bundler
 - [Babel](https://babeljs.io/) - ES2015 compiler
 - [AngularJS](https://angularjs.org)
 - [Angular Translate](https://angular-translate.github.io/) - i18n library 
 - [UI Router](https://ui-router.github.io/ng1/) - Angular router
 - [Bootstrap](http://getbootstrap.com/) - Responsive HTML/CSS framework
 - [UI Bootstrap](https://angular-ui.github.io/bootstrap/) - Bootstrap components written in Angular
 - [Jasmine](https://jasmine.github.io/) - BDD test framework
 - [Karma](https://karma-runner.github.io/1.0/index.html) - Unit test runner
 - [Protractor](http://www.protractortest.org/#/) - End to end test runner

## Setup
```
$ npm install
```

## Commands

- `$ npm start` Start local server at http://localhost:4000
- `$ npm run build` Build /dist directory
- `$ npm run lint` Lint js and scss files
- `$ npm run start:test` Start local server with mocked gateway calls
- `$ npm run test:e2e` Run protractor tests
- `$ npm run test:unit` Run karma tests


## RL SSO Module
Located in `/src/app/common/rl-sso` this module will handle the authentication with ReachLocal services. It listens for 401 responses and will open an authentication modal when needed.

## Translations
See [Angular Translate](https://angular-translate.github.io/) for more information. Translation are configured and ran from `/src/app/root.module.js`
#### Additional Languages
Additional languages should be added to root module. Add the new language translation to the provider. *ie* `.translations('xx', xx)`.

This will also require the additional language objects be imported in the root modules as well. See `/src/app/lang-en.js` for an example of how to construct a translation object.
#### Language Select
`rl-language-select` component can be added to any view to switch between languages. It is recommended to place it in the sidebar or footer. The component will set a cookie to remember a users language preference.

## Unit Testing
Unit test are written in Jasmine and run by Karma. The test files (`*.spec.js`) should be placed in the same directory as the file it is intended to test.  

## [End to End Testing (e2e)](https://github.com/reachlocal/search-campaigns-client/blob/master/test/README.md)
E2e tests are also written in Jasmine but run by protractor. See the [e2e readme](https://github.com/reachlocal/search-campaigns-client/blob/master/test/README.md) for more details.

## File Structure

 - `dist/` - Production build files
 - `src/` - Source files
   - `app/` - Application files
     - `common/**/*` - Shared modules
     - `component/**/*` - Feature specific modules
     - `root.module.js` - Root module
   - `img/*.*` - Images assets
   - `styles/*.scss` - Global styles
   - `vendor/*.*` - Third party library imports
   - `index.html` - Application entry point
 - `test/` - End to end test scenarios and service mocks
   - `mocks/**.mocks.js` - Service mocks
     - `mocks.modules.js` - e2e root module
   -  `scenarios/**/*.js` - e2e test scenarios
     - `index.html` - Testing entry point
     - `protractor.conf.js`
 - `webpack/` - Webpack environmental configs
   - `paths.js` - Shared application file paths
   - `default.config.js` - Shared configs
   - `*.config.js` - Environment specific config
