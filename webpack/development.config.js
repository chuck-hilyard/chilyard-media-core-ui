const cleanPlugin = require('clean-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const paths = require('./support/paths.js');
const flags = require('./support/development.flags.json');
const rules = require('./support/rules.js');


let config = require('./support/default.config.js');

config.devtool = 'source-map';

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
    FEATURE_FLAGS: JSON.stringify(flags),
    LANGUAGES: JSON.stringify(['en']),
    LOG_LEVEL: JSON.stringify('info'),
    LOGGING_URL: JSON.stringify(''),
    // NOTE: need to add CORS allow origin * to gateway to run locally
    GATEWAY_URL: JSON.stringify('http://localhost:8081/media-core-gateway')
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
