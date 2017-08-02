exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './scenarios/**/*.js'
  ],
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
        args: ['--window-size=1280,1024']
    }
  },
  baseUrl: 'http://localhost:4001/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
