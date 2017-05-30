/* jshint esversion: 6, node: true */

'use strict';

const {Service} = require('@avro/services');
const websocket = require('websocket-stream');
const protocol = require('../LinkService.avdl');

const linkClient = Service.forProtocol(protocol).createClient();
linkClient.createChannel(websocket('ws://localhost:8080'));

module.exports = {linkClient};
