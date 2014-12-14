'use strict';

var readGlob = require('./');
var test = require('tape');
var xtend = require('xtend');

test('readGlobPromise()', function(t) {
  t.plan(11);

  t.equal(readGlob.name, 'readGlobPromise', 'should have a function name.');

  readGlob('.git{a,i}*e{,s}').then(function(bufs) {
    t.deepEqual(bufs, [
      new Buffer('* text=auto\n'),
      new Buffer('node_modules\ncoverage\n')
    ], 'should read files.');
  });

  var options = {
    nounique: true,
    noglobstar: true,
    encoding: 'hex'
  };

  var optionsClone = xtend(options);

  readGlob('.git{a,a}ttributes', options).then(function(contents) {
    t.deepEqual(contents, [
      new Buffer('* text=auto\n').toString('hex'),
      new Buffer('* text=auto\n').toString('hex')
    ], 'should support minimatch, glob and fs.readFile options.');
    t.deepEqual(
      options, optionsClone,
      'should not modify the original option object.'
    );
  });

  readGlob('__this_glob_pattern_will_not_match_anything__', null).then(function(bufs) {
    t.deepEqual(bufs, [], 'should be fulfilled with an empty array when it reads nothing.');
  });

  readGlob('/**/*', 'utf8').catch(function(err) {
    t.ok(err.code, 'should be rejected when globbing fails.');
  });

  readGlob('node_modules', {nodir: false}).catch(function(err) {
    t.equal(err.code, 'EISDIR', 'should be rejected when it fails to read the target.');
  });

  t.throws(
    readGlob.bind(null, '*', 1),
    /TypeError.*arg/,
    'should throw a type error when the second argument is not a string, object or function.'
  );

  t.throws(
    readGlob.bind(null, 'index.js', 'utf7'),
    /Error.*encoding/,
    'should throw an error when the encoding is unknown.'
  );

  t.throws(
    readGlob.bind(null, true, {}),
    /TypeError.*glob/,
    'should throw a type error when the first argument is not a string.'
  );

  t.throws(
    readGlob.bind(null),
    /TypeError.*glob/,
    'should throw a type error when it takes no arguments.'
  );
});
