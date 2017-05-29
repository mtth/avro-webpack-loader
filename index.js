/* jshint esversion: 6, node: true */

'use strict';

var avro = require('avsc');

module.exports = function (source) {
  var protocol = avro.readProtocol(source);
  var module = 'module.exports = JSON.parse(' +
    JSON.stringify(protocol, null, 2) +
    ');';
  return module;
};
