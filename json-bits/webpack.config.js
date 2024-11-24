const path = require('path');

module.exports = {
  entry: './src/index.js',  // Adjust as necessary
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  mode: 'development',  // Or 'production' depending on your environment
};
