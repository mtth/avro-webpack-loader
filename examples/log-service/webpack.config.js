/* jshint esversion: 6, node: true */

'use strict';

var path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.avdl$/,
        use: '../../'
      }
    ]
  },
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
