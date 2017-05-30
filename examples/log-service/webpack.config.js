/* jshint esversion: 6, node: true */

'use strict';

var path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.avdl$/,
        use: {
          loader: '../../',
          options: {
            typeRefs: {date: {type: 'long', logicalType: 'timestamp-ms'}}
          }
        }
      }
    ]
  },
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
