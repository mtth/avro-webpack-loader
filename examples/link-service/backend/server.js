/* jshint esversion: 6, node: true */

'use strict';

const avro = require('avsc');
const assert = require('assert');
const http = require('http');
const verdon = require('verdon');

// In-memory alias cache.
const ALIAS_CACHE = new Map();

/** Custom logical type used to encode native Date objects as longs. */
class DateType extends avro.types.LogicalType {
  _fromValue(val) { return new Date(val); }
  _toValue(date) { return date instanceof Date ? +date : undefined; }
}

// Start the server, etc.
avro.assembleProtocol(
    '../LinkService.avdl',
    {typeRefs: {date: {type: 'long', logicalType: 'timestamp-millis'}}},
    function (err, protocol) {
      assert.ifError(err);

      const linkServer = avro.Service.forProtocol(
          protocol, {logicalTypes: {'timestamp-millis': DateType}})
        .createServer()
        .onCreateAlias(function (name, url, cb) {
            if (ALIAS_CACHE.has(name)) {
              cb(new Error(`alias with name ${name} already exists`));
            } else {
              const alias = {creationTime: new Date(), name, url};
              ALIAS_CACHE.set(name, alias);
              cb(null, alias);
            }
          })
        .onGetAlias(function (name, cb) {
            cb(null, ALIAS_CACHE.get(name) || null);
          });

      const proxy = verdon.createProxy().bindServer(linkServer);

      http.createServer()
        .on('upgrade', proxy.webSocketHandler())
        .listen(8080);
    });
