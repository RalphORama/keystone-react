const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const publicPath = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 600,
    ignored: [
      'server.js',
      'index.js',
    ],
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__react_webpack_hmr',
    path.resolve(__dirname, './client/index.jsx'),
  ],
  output: {
    path: publicPath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.m?jsx?$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
      },
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.(ttf|eot|svg|png|ttf|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }],
    },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './client/public'),
      to: publicPath,
      ignore: ['.gitkeep'],
    }]),
  ],
  parallelism: 4,
};
