const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    code: './code.ts', // The entry point for your plugin code
  },

  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      { test: /\.css$/, use: ['style-loader', { loader: 'css-loader' }] },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      { test: /\.(png|jpg|gif|webp|svg)$/, loader: 'url-loader' },
    ]
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    fallback: {
      "https": false,
      "buffer": false,
      "stream": false,
      "zlib": false,
      "util": false,
      "path": false,
      "fs": false,
      "assert": false,
      "constants": false
    },
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // Compile into a folder called "dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'ui.html',
      filename: './ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
  ]
})