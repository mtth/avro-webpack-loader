/* jshint esversion: 6, node: true */

'use strict';

const avro = require('avsc');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const path = require('path');


/** Registering loading function for assembling IDLs. */
function createImportHook(loader) {
  const imports = {};
  return function (fpath, kind, cb) {
    fpath = path.resolve(fpath);
    loader.addDependency(fpath);
    if (imports[fpath]) {
      process.nextTick(cb);
      return;
    }
    imports[fpath] = true;
    fs.readFile(fpath, {encoding: 'utf8'}, cb);
  };
}


module.exports = function () {
  const loaderOpts = loaderUtils.getOptions(this) || {};
  const done = this.async();
  const opts = {
    ackVoidMessages: !!loaderOpts.ackVoidMessages,
    delimitedCollections: !!loaderOpts.delimitedCollections,
    typeRefs: loaderOpts.typeRefs,
    importHook: createImportHook(this)
  };
  avro.assembleProtocol(this.resourcePath, opts, function (err, protocol) {
    if (err) {
      done(err);
      return;
    }
    done(null, `module.exports = ${JSON.stringify(protocol)};`);
  });
};
