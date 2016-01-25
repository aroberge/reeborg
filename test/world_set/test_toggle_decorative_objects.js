var test = require('tape');
var silencer =  require('silencer');

global.RUR = {};

test('adding known object', function (assert) {
    RUR.current_world = {};
    RUR.objects = {};
    RUR.KNOWN_OBJECTS = ['a'];
    require("../../src/js/world_set/toggle_decorative_object.js");
    global.RUR.toggle_decorative_object_at_position('a', 2, 3, 4);
    assert.ok(RUR.current_world.decorative_objects['2,3'].a, "decorative objects ok");
    assert.end();
});

test('adding and removing known decorative object', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;
    RUR.current_world = {};
    RUR.objects = {};
    RUR.KNOWN_OBJECTS = ['a'];
    require("../../src/js/world_set/toggle_decorative_object.js");
    RUR.toggle_decorative_object_at_position('a', 2, 3);
    RUR.toggle_decorative_object_at_position('a', 2, 3);
    assert.ok(identical(RUR.current_world, {}), "nb decorative objects left");
    assert.end();
});

test('adding two and removing one known decorative objects', function (assert) {
    var identical = require("../../src/js/utils/identical.js").identical;
    RUR.current_world = {};
    RUR.objects = {};
    RUR.KNOWN_OBJECTS = ['a', 'b'];
    require("../../src/js/world_set/toggle_decorative_object.js");
    RUR.toggle_decorative_object_at_position('b', 2, 3);
    RUR.toggle_decorative_object_at_position('a', 2, 3);
    RUR.toggle_decorative_object_at_position('b', 2, 3);
    assert.ok(RUR.current_world.decorative_objects['2,3'].a, "decorative objects ok");
    assert.end();
});


test('adding unknown decorative object', function (assert) {
    silencer.reset();
    silencer.disable();
    RUR.objects = {};
    RUR.KNOWN_OBJECTS = [];
    require("../../src/js/world_set/toggle_decorative_object.js");
    try {
        RUR.toggle_decorative_object_at_position('a', 2, 3, 4);
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
