const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./support/paths.js');
const flags = require('./support/development.flags.json');

let config = require('./support/default.config.js');

config.devtool = 'source-map';

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
  new copyPlugin([{
      from: `${paths.source}/index.html`,
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
    ENVIRONMENT: JSON.stringify('development'),
    PLATFORM: JSON.stringify('USA'),
    FEATURE_FLAGS: JSON.stringify(flags),
    LANGUAGES: JSON.stringify(['en']),
    LOG_LEVEL: JSON.stringify('info'),
    LOGGING_URL: JSON.stringify(''),
    // NOTE: need to add CORS allow origin * to gateway to run locally
    GATEWAY_URL: JSON.stringify('http://localhost:8081/media-core-gateway'),
    MEDIA_GATEWAY_URL: JSON.stringify('https://mediagateway-gbl.qa.reachlocal.com'),
    //MADMIN_UI: JSON.stringify('http://localhost:4000')
    MADMIN_UI: JSON.stringify('https://cpiclient-usa.qa.reachlocal.com')
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  })
];

config.devServer = {
  contentBase: `${paths.dist}`,
  port: 4001,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

module.exports = config;
