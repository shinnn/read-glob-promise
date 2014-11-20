/*!
 * read-glob-promise | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/read-glob-promise
*/

'use strict';

var ES6Promise = global.Promise || require('es6-promise').Promise;
var readGlob = require('read-glob');

module.exports = function readGlobPromise(globPattern, options) {
  var resolve;
  var reject;

  readGlob(globPattern, options, function(err, bufs) {
    if (err) {
      reject(err);
      return;
    }

    resolve(bufs);
  });

  return new ES6Promise(function(_resolve, _reject) {
    resolve = _resolve;
    reject = _reject;
  });
};
