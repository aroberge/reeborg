var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');

function test(test_name, fn) {
    tape_test("decorative_objects.js: ", test_name, fn);
}
function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

test('adding known object', function (assert) {
    require("../../../src/js/world_api/decorative_objects.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    global.RUR.add_decorative_object('a', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.decorative_objects['2,3'], ["a"], "decorative_objects ok");
    assert.end();
});

test('adding and removing known solid object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_api/decorative_objects.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_decorative_object('a', 2, 3);
    RUR.remove_decorative_object('a', 2, 3);
    assert.ok(identical(RUR.CURRENT_WORLD, RUR.create_empty_world()), "no decorative_objects left");
    assert.end();
});

test('adding two and removing one known solid objects', function (assert) {
    require("../../../src/js/world_api/decorative_objects.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_decorative_object('b', 2, 3);
    RUR.add_decorative_object('a', 2, 3);
    RUR.remove_decorative_object('b', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.decorative_objects['2,3'], ['a'], "decorative_objects ok");
    assert.end();
});

test('is/add/remove decorative_objects', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['thing'];    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.decorative_objects === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_decorative_object("thing", 2, 3)===false, "start with no decorative_objects.");
    RUR.add_decorative_object("thing", 2, 3);
    // Was our first test checking the right key?
    assert.ok(RUR.CURRENT_WORLD.decorative_objects !== undefined, "confirm that key is now present.");
    assert.ok(RUR.is_decorative_object("thing", 2, 3)===true, "confirm add_decorative_object worked.");
    RUR.remove_decorative_object("thing", 2, 3);
    assert.ok(RUR.is_decorative_object("thing", 2, 3)===false, "confirm remove_decorative_object worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});
