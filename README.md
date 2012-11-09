automodule
==========

Node.JS module to auto include your sub-modules or to generate static include scripts.

Automodule will automatically determine if you are within your projects top level directory
by search for `lib` or `src` directories, if so, the `lib` directory is all that is required.
Otherwise each directory and file (other than `index.js`) will be required and exposed.

## Installation
```bash
npm install -g automodule
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

```node
var automodule = require('automodule');
var options = {search:__dirname};

return module.exports = automodule(options);
```

### Options

* `search` - directory to look in for modules (String|default: `process.cwd())
* `print` - whether or not to include the modules or generate static string (Boolean|default: `false`)