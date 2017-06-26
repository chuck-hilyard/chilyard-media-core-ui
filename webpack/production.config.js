const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths.js');

let config = require('./default.config.js');

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
    LANGUAGES: JSON.stringify(['en']),
    GATEWAY_URL: JSON.stringify('???')
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: true
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
];

module.exports = config;
