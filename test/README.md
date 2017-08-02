# End-2-End Testing (E2E)

To run the end-2-end (e2e) tests against the application, we use [Protractor](http://www.protractortest.org/#/). The e2e test are located in the `/test/scenarios` directory.

## API Calls
API call should be mocked for consistent results. Use [httpBackend](https://docs.angularjs.org/api/ngMockE2E/service/$httpBackend) to mock the calls. The files themselves should be placed in the `/test/mocks/` directory.



## Starting the Web Server

First, we need the application to be running via the web-server with mocked api calls.

```
npm start:test
```

The application should now be available at http://localhost:4001/index.html.

## Testing with Protractor

Start the Protractor test runner, using the e2e configuration:

```
npm run test:e2e
```

## Test Campaign IDs

- `1000020` Functioning search campaign
- `1000040` Campaign to simulate failures when fetching from publisher
