const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./support/paths.js');
const flags = require('./support/development.flags.json');

let config = require('./support/default.config.js');

config.entry = {
  app: [
    `${paths.source}/vendor/vendor.js`,
    `${paths.test}/mocks/mocks.module.js`
  ]
};

config.module.rules.push({
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
});

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
    }
  ]),
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify('test'),
    FEATURE_FLAGS: JSON.stringify(flags),
    LANGUAGES: JSON.stringify(['en']),
    LOG_LEVEL: JSON.stringify('info'),
    LOGGING_URL: JSON.stringify(''),
    GATEWAY_URL: JSON.stringify('')
  })
];

config.devServer = {
  contentBase: `${paths.dist}`,
  port: 4001
};

module.exports = config;
