var test = require('tape');
var proxyquire = require('proxyquire');
var mock = require('mock-require');
RUR = {};

var dummy = function () {};

mock("./../objects.js", {});


test('RUR.add_object_at_position()', function (assert) {
    RUR.current_world = {};
    RUR.objects = {};
    RUR.objects.known_objects = ['a'];

    var proxy = proxyquire('../../src/js/world_set/add_object', {
      './../src/js/exceptions.js': dummy
    });
    RUR.add_object_at_position('a', 2, 3, 4);
    assert.end();
});
