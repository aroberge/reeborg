var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');

function test(test_name, fn) {
    tape_test("obstacle.js: ", test_name, fn);
}
function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

test('adding known object', function (assert) {
    require("../../../src/js/world_api/obstacles.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_obstacle('a', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.obstacles['2,3'], ["a"], "obstacle ok");
    assert.end();
});

test('adding and removing known obstacle', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_api/obstacles.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_obstacle('a', 2, 3);
    RUR.remove_obstacle('a', 2, 3);
    assert.ok(identical(RUR.CURRENT_WORLD, RUR.create_empty_world()), "no obstacle left");
    assert.end();
});

test('adding two and removing one known obstacle', function (assert) {
    require("../../../src/js/world_api/obstacles.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_obstacle('b', 2, 3);
    RUR.add_obstacle('a', 2, 3);
    RUR.remove_obstacle('b', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.obstacles['2,3'], ['a'], "obstacle ok");
    assert.end();
});

test('is/add/remove obstacle', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['thing'];    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.obstacles === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_obstacle("thing", 2, 3)===false, "start with no obstacle.");
    RUR.add_obstacle("thing", 2, 3);
    // Was our first test checking the right key?
    assert.ok(RUR.CURRENT_WORLD.obstacles !== undefined, "confirm that key is now present.");
    assert.ok(RUR.is_obstacle("thing", 2, 3)===true, "confirm add_obstacle worked.");
    RUR.remove_obstacle("thing", 2, 3);
    assert.ok(RUR.is_obstacle("thing", 2, 3)===false, "confirm remove_obstacle worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('attempting to add twice the same obstacle', function (assert) {
    require("../../../src/js/world_api/obstacles.js");
    assert.plan(3);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_obstacle('a', 2, 3);
    try {
        RUR.add_obstacle('a', 2, 3);
    } catch(e) {
        assert.equal(e.message, "There is already such an obstacle here: a", "error message");
        assert.equal(e.reeborg_failure, "There is already such an obstacle here: a", "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('attempting to add twice the same obstacle in Onload', function (assert) {
    require("../../../src/js/world_api/obstacles.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.state.evaluating_onload = true;
    RUR.add_obstacle('a', 2, 3);
    RUR.add_obstacle('a', 2, 3);
    assert.ok(RUR.is_obstacle("a", 2, 3), "Confirm obstacle present.");
    RUR.state.evaluating_onload = false;
    assert.end();
});