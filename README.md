# read-glob-promise

[![Build Status](https://travis-ci.org/shinnn/read-glob-promise.svg?branch=master)](https://travis-ci.org/shinnn/read-glob-promise)
[![Build status](https://ci.appveyor.com/api/projects/status/09prv04d0ot3iitf?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/read-glob-promise)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/read-glob-promise.svg)](https://coveralls.io/r/shinnn/read-glob-promise)
[![Dependency Status](https://david-dm.org/shinnn/read-glob-promise.svg)](https://david-dm.org/shinnn/read-glob-promise)
[![devDependency Status](https://david-dm.org/shinnn/read-glob-promise/dev-status.svg)](https://david-dm.org/shinnn/read-glob-promise#info=devDependencies)

[Promise] version of [read-glob](http://nodejs.org/api/fs.html#fs_fs_readdir_path_callback):

> Search files with glob pattern and read them asynchronously

```javascript
var readGlob = require('read-glob-promise');

readGlob('*.txt')
.then(function(bufs) {
  bufs; //=> [<Buffer ... >, <Buffer ... >, ...]
})
.catch(function(err) {
  console.log(err.message);
});
```

## Installation

[![NPM version](https://badge.fury.io/js/read-glob-promise.svg)](https://www.npmjs.org/package/read-glob-promise)

[Use npm.](https://www.npmjs.org/doc/cli/npm-install.html)

```
npm install read-glob-promise
```

## API

```javascript
var readGlob = require('read-glob-promise');
```

### readGlob(*pattern* [, *options*])

*pattern*: `String` (glob pattern)  
*options*: `Object` or `String`  
Return: `Object` ([Promise])

When it finish reading files, it will be [*fulfilled*](http://promisesaplus.com/#point-26) with an `Array` of file contents as its first argument.

When it fails to read the files, it will be [*rejected*](http://promisesaplus.com/#point-30) with an error as its first argument.

```javascript
var readGlob = require('read-glob-promise');

// foo.txt: lorem
// bar.txt: ipsum
// baz.txt: dolor

readGlob('{foo,ba*}.txt', 'utf8')
.then(function(contents) {
  contents; //=> ['lorem', 'ipsum', 'dolor']
});

readGlob('{foo,bar.baz}.txt', {nobrace: true})
.then(function(contents) {
  contents; //=> []
});
```

#### options

The option object will be directly passed to [glob](https://github.com/isaacs/node-glob) and [fs.readFile], or the encoding string sets the encoding of [fs.readFile].

Additionally, [`ignoreDir` option](#optionsignoredir) is available and enabled by default.

##### options.ignoreDir

Type: `Boolean`  
Default: `true`

Excludes the directories from matched paths. It prevents `EISDIR` error when reading files.

`false` disables this safty and improves globbing performance a bit.

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

[fs.readFile]: http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback
[Promise]: http://promisesaplus.com/
