const paths = require('./paths.js');

let config = {
  entry: {
    app: `${paths.source}/app/root.module.js`,
    vendor: `${paths.source}/vendor/vendor.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'ng-annotate-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              precision: 8
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }
    ],
  },
  output: {
    path: `${paths.dist}/`,
    filename: 'js/[name].js',
  }
};

module.exports = config;
