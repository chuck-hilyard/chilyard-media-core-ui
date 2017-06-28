const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths.js');

let config = require('./default.config.js');

config.devtool = 'source-map';

config.plugins = [
  new cleanPlugin([paths.dist], {
    root: paths.root
  }),
  new copyPlugin([{
      from: `${paths.source}/index.html`,
    },
    {
      from: `${paths.source}/img/**/*`,
      to: 'img/',
      flatten: true
    },
  ]),
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify('development'),
    LANGUAGES: JSON.stringify(['en']),
    // NOTE: need to add CORS allow origin * to gateway to run locally
    GATEWAY_URL: JSON.stringify('http://localhost:8081/media-social-gateway')
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
];

config.devServer = {
  contentBase: `${paths.dist}`,
  port: 4000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

module.exports = config;
