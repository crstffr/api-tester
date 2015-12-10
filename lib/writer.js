
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var mkdir = require('mkdirp');

module.exports = Writer;

function Writer(filepath) {

    var _this = this;
    var _data = {};

    this.read = function() {
        try {
            _data = require(filepath);
        } catch(e) {
            //console.log('> ------------------------------------------------');
            //console.log('> File for writing does not exist, will create it.');
            //console.log('> ------------------------------------------------');
        }
        return _this;
    };

    this.get = function(path, defaultVal) {
        return (path) ? _.get(_data, path, defaultVal) : _data;
    };

    this.set = function(key, val) {
        if (key && _.isUndefined(val)) {
            // set the whole data object in one go
            // if only one argument is passed.
            _data = key;
        } else {
            // otherwise set just a single key/val
            var temp = {};
            _.set(temp, key, val);
            _data = _.defaultsDeep(temp, _data);
        }
        return _this;
    };

    this.rm = function(key) {
        delete _data[key];
        return _this;
    };

    this.save = function () {
        _mkdir(_write);
    };

    function _mkdir(cb) {
        // check to see if dir exists already
        var dir = path.parse(filepath).dir;
        if (fs.lstatSync(dir).isDirectory()) {
            cb(); return;
        }

        // if not, create it and callback();
        mkdir(path.parse(filepath).dir, function (err) {
            if (err) { throw Error(err); }
            cb();
        });
    }

    function _write() {
        var str = 'module.exports = ' + JSON.stringify(_data, null, 4) + ';';
        fs.writeFileSync(filepath, str, {}, function(err){
            throw Error(err);
        });
    }

    _this.read();

}
