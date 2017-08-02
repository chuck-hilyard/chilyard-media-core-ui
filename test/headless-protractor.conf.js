let config = require('./protractor.conf.js').config;

config.capabilities.chromeOptions = {
  args: [
    '--headless'
  ]
};

exports.config = config;
