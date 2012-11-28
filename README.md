Automodule
==========

Node.JS module to auto include your sub-modules or to generate static include scripts.

Automodule will automatically determine if you are within your projects top level directory
by search for `lib` or `src` directories, if so, the `lib` directory is all that is required.
Otherwise each directory and file (other than `index.js`) will be required and exposed.

## Installation
```bash
[sudo] npm install [-g] automodule
```

## Usage
See `examples` directory.

### Generate Static File

To generate the static text for the module simple run `automodule` from the project directory.

```bash
$ cd ./project/directory
$ ls
one      three    two
$ automodule
return module.exports = {one:require("./one"),three:require("./three"),two:require("./two"),};
```

Or you can specify an output file.
```bash
$ cd ./project/directory
$ ls
one      three    two
$ automodule index.js
$ cat index.js
return module.exports = {one:require("./one"),three:require("./three"),two:require("./two"),};
```

### Use programmatically

You can also use `automodule` as a function within your scripts to include all submodules.

```javascript
var automodule = require('automodule');
var options = {search:__dirname};

return module.exports = automodule(options);
```

### Options

* `search` - directory to look in for modules (String|default: `process.cwd()`)
* `print` - whether or not to include the modules or generate static string (Boolean|default: `false`)
* `recursive` - how far deep to search for files, default is search directory only (Number|default: `1`)

## Bugs/Issues/Features

Please report any problems here on Github in the issues section and I will make sure to try and solve them.

## MIT License
The MIT License (MIT)
Copyright (c) 2012 Brett Langdon <brett@blangdon.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.