const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./support/paths.js');
const flags = require('./support/development.flags.json');
const rules = require('./support/rules.js');


let config = require('./support/default.config.js');

config.entry = {
  app: [
    `${paths.source}/vendor/vendor.js`,
    `${paths.test}/mocks/mocks.module.js`
  ]
};

config.module.rules.forEach((rule, index) => {
  if ('.css'.match(rule.test)) {
    config.module.rules[index] = rules.styleSourceMaps;
  }
});
config.module.rules.push(rules.lint);

config.plugins = [
  new cleanPlugin([paths.dist], {
    root: paths.root
  }),
  new copyPlugin([
    {
      from: `${paths.test}/index.html`,
    },
    {
      from: `${paths.source}/img/**/*`,
      to: 'img/',
      flatten: true
    },
    {
      from: `${paths.source}/**/*.template.html`,
      to: 'templates/',
      flatten: true
    }
  ]),
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify('test'),
    PLATFORM: JSON.stringify('USA'),
    FEATURE_FLAGS: JSON.stringify(flags),
    LANGUAGES: JSON.stringify(['en']),
    LOG_LEVEL: JSON.stringify('info'),
    LOGGING_URL: JSON.stringify(''),
    GATEWAY_URL: JSON.stringify(''),
    MEDIA_GATEWAY_URL: JSON.stringify(''),
    MADMIN_UI: JSON.stringify('http://localhost:4000')
  })
];

config.devServer = {
  contentBase: `${paths.dist}`,
  port: 4001
};

module.exports = config;
