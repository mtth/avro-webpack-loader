/* jshint esversion: 6, node: true */

'use strict';

const avro = require('avsc');
const protocol = require('../LinkService.avdl');
const websocket = require('websocket-stream');

const linkClient = avro.Service.forProtocol(protocol).createClient();

linkClient.createChannel(websocket('ws://localhost:8080'));

module.exports = {
  linkClient
};
