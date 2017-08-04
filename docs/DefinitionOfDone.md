# Definition of Done
*...things to do before you make a PR*

## In general
 - Prefer small frequent PRs to large less frequent PRs
 - Name the PR [<JIRA Ticket Number>] Name (ex. [RS-642] Start send logs to service)
 - When you pull to your local branches always do a rebase
 - Prefer Test Driven Development (TDD) and write unit tests first
 - Fixing a bug?  Write a failing unit test first!

## Done

| Step                 | Command            | Notes |
| -------------------- | ------------------ | ----- |
| Lint                 | npm run lint       | Set up lints to run in your editor or on a command line as you type in your code. |
| Write unit tests     |                    | Write positive and negative tests for all external functions. See [Karma Website](https://karma-runner.github.io/1.0/index.html) and [AngularJs Unit Testing](https://docs.angularjs.org/guide/unit-testing).  *Any PR with javascript changes should have corresponding unit test changes* |
| Write code           |                    | Follow the [Todd Motto Styleguide](https://github.com/toddmotto/angular-styleguide#modular-architecture) |
| Internationalize     |                    | Remove hard-coded text from html, css and js and replace with references to lang-en.js files (access with translate directive) |
| Modular SASS         |                    | Each component should isolate its own styling in its own scss file.  Styles should be inside a top-level class matching the component name so they don't leak into the global name space. Use colors from our design palette named in style/variables |
| Responsive Design |  | Does the front end respond to changes in browser window size? |
| Feature Flags        |                    | Hide incomplete new features with feature flags until changes are accepted |
| Log Messages         |                    | Inject rlLogger and log all errors (fatal faults), warnings (non fatal bad things), info (major changes of state)
| Update Comments      |                    | Make sure any existing comments still make sense.  Adding a common component?  Add a jsdoc comment block to the top explaining how to use it (@usage) including a description of all of the inputs
| Run Karma Tests      | npm run test:unit  | All karma tests should pass, no skipped tests
| Run Protractor Tests | npm run test:e2e   | All protractor tests should pass |
| Run with Mocks       | npm run start:test | Make sure mocks are present and functionality works when running with mocks |
| Run with dev server  | npm start          | If practical, run on localhost while running gateways and server on localhost as well to ensure it all still runs |
| Pull and Rebase from Master | git pull --rebase,  or your favorite git tool | Pull and rebase from the current master branch (See [Git Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)) then make sure it still lints, passes tests, builds and runs before you make your PR |
