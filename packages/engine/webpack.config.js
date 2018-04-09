const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'engine.js',
    publicPath: '/dist/',
    libraryTarget: 'amd',
    library: 'engine',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ],
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
};