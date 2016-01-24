var test = require('tape');
var mock = require('mock-require');
var silencer =  require('silencer');
mock("../../src/js/objects.js", {});

global.RUR = {};

test('adding known object', function (assert) {
    RUR.current_world = {};
    RUR.objects = {};
    RUR.KNOWN_SOLID_OBJECTS = ['a'];
    require("../../src/js/world_set/toggle_solid_object.js");
    global.RUR.toggle_solid_object_at_position('a', 2, 3, 4);
    assert.ok(RUR.current_world.solid_objects['2,3'].a, "solid objects ok");
    assert.end();
});

test('adding and removing known solid object', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;
    RUR.current_world = {};
    RUR.objects = {};
    RUR.KNOWN_SOLID_OBJECTS = ['a'];
    require("../../src/js/world_set/toggle_solid_object.js");
    RUR.toggle_solid_object_at_position('a', 2, 3);
    RUR.toggle_solid_object_at_position('a', 2, 3);
    assert.ok(identical(RUR.current_world, {}), "nb solid objects left");
    assert.end();
});

test('adding two and removing one known solid objects', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;
    RUR.current_world = {};
    RUR.objects = {};
    RUR.KNOWN_SOLID_OBJECTS = ['a', 'b'];
    require("../../src/js/world_set/toggle_solid_object.js");
    RUR.toggle_solid_object_at_position('b', 2, 3);
    RUR.toggle_solid_object_at_position('a', 2, 3);
    RUR.toggle_solid_object_at_position('b', 2, 3);
    assert.ok(RUR.current_world.solid_objects['2,3'].a, "solid objects ok");
    assert.end();
});


test('adding unknown solid object', function (assert) {
    silencer.reset();
    silencer.disable();
    RUR.objects = {};
    RUR.KNOWN_SOLID_OBJECTS = [];
    require("../../src/js/world_set/toggle_solid_object.js");
    try {
        RUR.toggle_solid_object_at_position('a', 2, 3, 4);
    } catch (e) {
        silencer.restore();
        assert.equal(e.message, "Unknown object", "error message");
        assert.equal(e.reeborg_shouts, "Unknown object", "reeborg_shouts");
        assert.equal(e.name, "ReeborgError", "error name ok");
        assert.ok(silencer.getOutput('log')[0][0].startsWith("Translation needed for"),
                  "Console log ok.");
        assert.end();
    }
});
