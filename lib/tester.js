var _ = require('lodash');
var tv4 = require('tv4');
var url = require('url');
var hash = require('json-hash');
var request = require('superagent');
var series = require('promise-series-node');
var validator = new (require('jsonschema').Validator);
var argv = require('minimist')(process.argv.slice(2));
var Schema = require('./schema');

module.exports = function Tester(options) {

    var _this = this;

    this.settings = _.defaultsDeep({}, options, {
        server: '',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate'
        },
        savePath: 'schemas/',
        record: argv.r || argv.record || false
    });

    /**
     *
     * @param type
     * @param endpoint
     * @param data
     * @returns {Promise}
     */
    this.test = function (type, endpoint, data) {

        data = data || {};

        var uri = url.resolve(_this.settings.server, endpoint || '');
        var name = _generateName(type, uri, data);
        var req = request(type, uri);
        var schema = new Schema(name);

        var uriobj = url.parse(uri);
        uriobj.query = data || {};
        var fulluri = url.format(uriobj);

        if (_this.settings.record) {
            console.log('Recording', type, fulluri, 'into', name);
        } else {
            console.log('Testing', type, fulluri, 'against', name);
            if (_.isEmpty(schema.get())) {
                console.log('   - Schema', name, 'is empty, unable to test');
                return;
            }
        }

        req.set(_this.settings.headers);

        if (data) {
            switch (type.toUpperCase()) {
                case 'GET':
                case 'HEAD':
                    req.query(data);
                    break;
                case 'PUT':
                case 'POST':
                    req.send(data);
                    break;
            }
        }

        return new Promise(function (resolve, reject) {
            req.end(function (err, res) {
                if (err) {
                    reject(err);
                } else {

                    if (!res.body) {
                        reject('no body', res);
                        return;
                    }

                    if (_this.settings.record) {
                        schema.generate(res.body);
                        console.log('   - Schema written out to', name);
                    } else {

                        res.body.results = [{foo: {}}];

                        var validation = validator.validate(res.body, schema.get());

                        if (!_.isEmpty(validation.errors)) {

                            _.forEach(validation.errors, function(error) {
                                console.log('   - Error:', error.stack);
                                console.log('   - Found:', _.get(validation, error.property))
                            });

                        }

                        var valid = tv4.validate(res.body, schema.get());

                        if (valid) {
                            console.log('   - Validation complete, looks good');
                        }

                        resolve(res);

                    }

                    resolve(res);
                }
            });
        });

    };

    /**
     * Run multiple tests in series (wait until one completes
     * before starting another).
     *
     * @param tests
     */
    this.runTests = function(tests) {

        var funcs = [];

        _.forEach(tests, function(params){

            var type = params[0];
            var endpoint = params[1];
            var data = params[2];

            funcs.push(function(){
                return _this.test(type, endpoint, data);
            });

        });

        series(funcs);

    };


    function _generateName(type, uri, data) {
        var uid = (new Buffer(hash.digest(data)).toString('base64')).substr(0,8);
        return _.kebabCase(type + ' ' + uri) + ((_.isEmpty(data)) ? '' : '-' + uid);
    }

    function _validate(json, schema) {

    }
};
