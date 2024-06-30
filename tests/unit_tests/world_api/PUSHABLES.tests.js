var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');

function test(test_name, fn) {
    tape_test("pushable.js: ", test_name, fn);
}
function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

test('adding known object', function (assert) {
    require("../../../src/js/world_api/pushables.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    global.RUR.add_pushable('a', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.pushables['2,3'], ["a"], "pushable ok");
    assert.end();
});

test('adding and removing known solid object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_api/pushables.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_pushable('a', 2, 3);
    RUR.remove_pushable('a', 2, 3);
    assert.ok(identical(RUR.CURRENT_WORLD, RUR.create_empty_world()), "no pushable left");
    assert.end();
});

test('trying to add a second pushable', function (assert) {
    require("../../../src/js/world_api/pushables.js");
    assert.plan(3);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_pushable('b', 2, 3);
    try {
        RUR.add_pushable('a', 2, 3, {number:4});
    } catch (e) {
        assert.equal(e.message, "There can be at most one pushable object at a given location.");
        assert.equal(e.reeborg_failure, "There can be at most one pushable object at a given location.", "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('is/add/remove pushable', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['thing'];    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.pushables === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_pushable("thing", 2, 3)===false, "start with no pushable.");
    RUR.add_pushable("thing", 2, 3);
    // Was our first test checking the right key?
    assert.ok(RUR.CURRENT_WORLD.pushables !== undefined, "confirm that key is now present.");
    assert.ok(RUR.is_pushable("thing", 2, 3)===true, "confirm add_pushable worked.");
    RUR.remove_pushable("thing", 2, 3);
    assert.ok(RUR.is_pushable("thing", 2, 3)===false, "confirm remove_pushable worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

