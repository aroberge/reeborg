var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');

function test(test_name, fn) {
    tape_test("bridges.js: ", test_name, fn);
}
function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

// main module to test
require("../../../src/js/world_api/bridges.js");

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

test('is_add_remove', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['thing'];
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.bridge === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_bridge("thing", 2, 3)===false, "start with no bridge.");
    RUR.add_bridge("thing", 2, 3);
    // Was our first test checking the right key?
    assert.ok(RUR.CURRENT_WORLD.bridge !== undefined, "confirm that key is now present.");
    assert.ok(RUR.is_bridge("thing", 2, 3)===true, "confirm add_bridge worked.");
    RUR.remove_bridge("thing", 2, 3);
    assert.ok(RUR.is_bridge("thing", 2, 3)===false, "confirm remove_bridge worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});


test('replacing a bridge', function (assert) {
    require("../../../src/js/world_api/bridges.js");
    assert.plan(4);
    RUR.set_current_world(RUR.create_empty_world());
    RUR.KNOWN_THINGS = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_bridge('b', 2, 3);
    try {
        RUR.add_bridge('a', 2, 3);
    } catch (e) {
        assert.equal(e.message, "There is already a bridge here.", "error message");
        assert.equal(e.reeborg_failure, "There is already a bridge here.", "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    // however, no error should be raised if evaluating onload.
    RUR.state.evaluating_onload = true;
    RUR.add_bridge('a', 2, 3);
    assert.ok(RUR.is_bridge("a", 2, 3), "bridge was replaced.")
    RUR.state.evaluating_onload = false;
    assert.end();
});

test('adding unknown bridge', function (assert) {
    assert.plan(3);
    silencer.reset();
    silencer.disable('warn');
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = [];
    RUR.translation = {};
    RUR.untranslated['a bridge'] = false;
    try {
        RUR.add_bridge('a bridge', 2, 3);
    } catch (e) {
        assert.equal(e.message, "Invalid name: a bridge", "error message");
        assert.equal(e.reeborg_failure, "Invalid name: a bridge", "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('Attempting to remove missing bridge', function (assert) {
    assert.plan(3);
    silencer.reset();
    silencer.disable('warn');
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = [];
    RUR.translation = {};
    RUR.untranslated['a bridge'] = false;
    try {
        RUR.remove_bridge('a bridge', 2, 3, {number:4});
    } catch (e) {
        assert.equal(e.message, 'No bridge named <code>a bridge</code> to remove here.', "error message");
        assert.equal(e.reeborg_failure, 'No bridge named <code>a bridge</code> to remove here.', "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('Attempting to remove named bridge different from the one present', function (assert) {
    assert.plan(3);
    silencer.reset();
    silencer.disable('warn');
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['thing'];
    RUR.add_bridge("thing", 2, 3);
    RUR.KNOWN_THINGS = [];
    RUR.translation = {};
    try {
        RUR.remove_bridge('a bridge', 2, 3, {number:4});
    } catch (e) {
        assert.equal(e.message, 'No bridge named <code>a bridge</code> to remove here.', "error message");
        assert.equal(e.reeborg_failure, 'No bridge named <code>a bridge</code> to remove here.', "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});