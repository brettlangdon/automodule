var fs = require('fs');

var automodule = module.exports = function(options){
    options = (options)?options:{};
    var search_path = String(get(options, 'search', process.cwd()));
    var print = Boolean(get(options, 'print', false));

    var modules = {};
    var all_files = get_files(search_path);
    var top_level = ~all_files.indexOf('lib') || ~all_files.indexOf('src');
    if(top_level){
	modules = get_require('lib', search_path, print);
    } else{
	all_files.forEach(function(file){
		if(~file.indexOf('.js')){
		    var len = file.length;
		    var name = file.substring(0, len - 3);
		    if(name.toLowerCase() != 'index'){
			modules[name] = get_require(file, search_path, print);
		    }
		} else{
		    modules[file] = get_require(file, search_path, print);
		}
	    });
    }
    if(print){
	return compile(modules);
    } else{
	return modules;
    }
};

var compile = function(modules){
    var out = 'return module.exports = ';
    if(typeof(modules) == 'string'){
	return out += modules + ';';
    }
    
    out += '{';
    for(var name in modules){
	out += name + ':' + modules[name] + ',';
    }
    out += '};';
    return out;
};

var get_require = function(file, search_path, print){
    if(print){
	return 'require("./' + file + '")';
    } else{
	return require(search_path + '/' + file);
    }
};

var get_files = function(search_path){
    var files = [];
    fs.readdirSync(search_path).forEach(function(file){
	    if(file[0] == '.'){
		return;
	    }
	    var stats = fs.lstatSync(search_path + '/' + file);
	    if(stats.isDirectory()){
		files.push(file);
	    } else{
		var len = file.length;
		var end = file.substring(len -3, len);
		if(end == '.js'){
		    files.push(file);
		}
	    }
	});
    return files;
};

var get = function(obj, key, def){
    if(obj[key] == null || obj[key] == undefined){
	return def;
    } else{
	return obj[key];
    }
};