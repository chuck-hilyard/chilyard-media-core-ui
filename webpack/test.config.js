const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths.js');

let config = require('./default.config.js');

config.entry = {
  app: [
    `${paths.source}/vendor/vendor.js`,
    `${paths.test}/mocks/mocks.module.js`
  ]
};

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
    LANGUAGES: JSON.stringify(['en']),
    GATEWAY_URL: JSON.stringify('')
  })
];

config.devServer = {
  contentBase: `${paths.dist}`,
  port: 4000
};

module.exports = config;
