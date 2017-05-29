/* jshint esversion: 6, node: true */

'use strict';

const avro = require('avsc');
const fs = require('fs');
const path = require('path');

// TODO: Import hook.
// TODO: Options.

/** Registering loading function for assembling IDLs. */
function createImportHook(loader) {
  var imports = {};
  return function (fpath, kind, cb) {
    fpath = path.resolve(fpath);
    loader.addDependency(fpath);
    if (imports[fpath]) {
      // Already imported, return nothing to avoid duplicating attributes.
      process.nextTick(cb);
      return;
    }
    imports[fpath] = true;
    fs.readFile(fpath, {encoding: 'utf8'}, cb);
  };
}


module.exports = function () {
  const done = this.async();
  const opts = {importHook: createImportHook(this)};
  avro.assembleProtocol(this.resourcePath, opts, function (err, protocol) {
    if (err) {
      done(err);
      return;
    }
    done(null, `module.exports = JSON.parse(${JSON.stringify(protocol)});`);
  });
};
