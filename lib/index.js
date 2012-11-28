var path = require('path');
var fs = require('fs');

var automodule = module.exports = function(options){
    options = (options)?options:{};
    var search_path = String(get(options, 'search', process.cwd()));
    var print = Boolean(get(options, 'print', false));
    var recursive = Number(get(options, 'recursive', 1));

    var modules = {};
    var all_files = get_files(search_path, recursive);
    var top_level = ~all_files.indexOf('lib') || ~all_files.indexOf('src');
    if(top_level){
	modules = get_require('lib', search_path, print);
    } else{
	all_files.forEach(function(file){	      
		var module = null;
		var abs = path.resolve(search_path, file);
		var ext = path.extname(file);
		var name = path.basename(abs, ext);
		var dirname = path.dirname(file);
		module = get_require(file, search_path, print);
		add_module(modules, file.replace(ext, '').split('/'), module);
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

var get_files = function(search_path, recurse_level){
    var files = [];
    if(recurse_level < 1){
	return files;
    }
    fs.readdirSync(search_path).forEach(function(file){
	    if(file[0] == '.'){
		return;
	    }
	    var abs_path = path.resolve(search_path, file);
	    var stats = fs.lstatSync(abs_path);
	    if(stats.isDirectory()){
		var new_files = get_files(abs_path, recurse_level-1);
		new_files.forEach(function(new_f){
			files.push(file + '/' + new_f);
		    });

		if(!new_files.length && fs.existsSync(path.resolve(abs_path, 'index.js'))){
		    files.push(file);
		}
	    } else{
		var ext = path.extname(file);
		if(ext == '.js' || ext == '.json'){
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

var add_module = function(obj, name_parts, module){
    if(name_parts.length <= 1){
	if(name_parts[0].toLowerCase() == 'index'){
	    for(var name in module){
		obj[name] = module[name]
	    }
	}else{
	    obj[name_parts[0]] = module;
	}
    }else{
	if(obj[name_parts[0]] == undefined){
	    obj[name_parts[0]] = {};
	}
	obj[name_parts[0]] = add_module(obj[name_parts[0]], name_parts.slice(1), module);
    }
    return obj;
};