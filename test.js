#!/usr/bin/env node

var Tester = require('./lib/tester');

var tester = new Tester({
    server: 'http://api.randomuser.me/',
    headers: {
        //'X-API-Key': '123'
    }
});

tester.runTests([
    ['GET', '/'],
    ['GET', '/', {results: 10}]
]);
