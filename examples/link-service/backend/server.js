/* jshint esversion: 6, node: true */

'use strict';

const avro = require('avsc');
const assert = require('assert');
const http = require('http');
const verdon = require('verdon');

const urlCache = new Map(); // We'll use an in-memory map to store links.

avro.assembleProtocol('../LinkService.avdl', function (err, protocol) {
  assert.ifError(err);
  const linkServer = avro.Service.forProtocol(protocol).createServer()
    .onCreateAlias(function (alias, url, cb) {
      if (urlCache.has(alias)) {
        cb(new Error('alias already exists'));
      } else {
        urlCache.set(alias, url); // Add the mapping to the cache.
        cb();
      }
    })
    .onExpandAlias(function (alias, cb) {
      cb(null, urlCache.get(alias));
    });

  const proxy = verdon.createProxy().bindServer(linkServer);

  http.createServer()
    .on('upgrade', proxy.webSocketHandler())
    .listen(8080);
});
