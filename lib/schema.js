
var _ = require('lodash');
var Writer = require('./writer');
var generator = require('json-schema-generator');

module.exports = Schema;

function Schema(fname) {

    var cwd = process.cwd();
    var fpath = cwd + '/schemas/' + fname + '.js';

    var schema = new Writer(fpath);

    schema.generate = function(json) {
        schema.set(generator(json)).save();
    };

    return schema;

}
