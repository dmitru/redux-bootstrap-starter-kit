var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const validate = require('webpack-validator')
const precss = require('precss')
const autoprefixer = require('autoprefixer')

const config = {
  devtool: 'eval',
  watchOptions: {
    aggregateTimeout: 100,
  },
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app', 'main.js'),
  ],
  output: {
    path: path.join(__dirname, 'server', 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'server', 'views', 'index.jade'),
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  eslint: {
    failOnWarning: false,
    failOnError: true,
  },
  module: {
    preLoaders: [
      // Javascript
      { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ },
    ],
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0', 'react-hmre'],
      },
    }, {
      test: /\.json?$/,
      loader: 'json',
    }, {
      test: /\.css$/,
      include: [path.join(__dirname, 'node_modules')],
      loader: 'style!css',
    }, {
      test: /\.css$/,
      include: [path.join(__dirname, 'app')],
      loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader',
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader?parser=postcss-scss',
    }, {
      test: /\.jade$/,
      loader: 'jade',
    }, {
      test: /\.md$/,
      loader: 'html!markdown',
    }],
  },
  postcss: function () {
    return [precss, autoprefixer]
  },
  stats: 'errors-only',
}

module.exports = validate(config)
