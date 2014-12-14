/*!
 * read-glob-promise | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/read-glob-promise
*/
'use strict';

var readGlob = require('read-glob');
var wrapPromise = require('wrap-promise');

module.exports = function readGlobPromise(globPattern, options) {
  return wrapPromise(function(resolve, reject) {
    readGlob(globPattern, options, function(err, bufs) {
      if (err) {
        reject(err);
        return;
      }
      resolve(bufs);
    });
  });
};
