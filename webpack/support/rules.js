let rules = {
  styleSourceMaps: {
    test: /\.(css|scss)$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'sass-loader',
        options: {
          precision: 8,
          sourceMap: true
        }
      }
    ]
  },
  lint: {
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
  }
};

module.exports = rules;
