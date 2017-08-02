const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./support/paths.js');
const flags = require('./support/production.flags.json');

let config = require('./support/default.config.js');

config.plugins = [
  new cleanPlugin([paths.dist], {
    root: paths.root
  }),
  new copyPlugin([
    {
      from: `${paths.source}/index.html`,
    },
    {
      from: `${paths.source}/img/**/*`,
      to: 'img/',
      flatten: true
    },
  ]),
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify('production'),
    FEATURE_FLAGS: JSON.stringify(flags),
    LANGUAGES: JSON.stringify(['en']),
    GATEWAY_URL: JSON.stringify('BAMBOOMEDIACOREGATEWAY')
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
];

module.exports = config;
