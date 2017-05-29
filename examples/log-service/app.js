/* jshint esversion: 6, node: true */

'use strict';

var avro = require('avsc');
var protocol = require('./LogService.avdl');

module.exports = {
  logService: avro.Service.forProtocol(protocol)
};
