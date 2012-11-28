var automodule = require('../../');

var options = {
    search: __dirname + '/submodule',
    recursive: 3,
};

var submodule = automodule(options);
console.dir(submodule);