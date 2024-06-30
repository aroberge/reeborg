var tape_test = require('./../test_globals.js').tape_test;
var silencer =  require('silencer');

function test(test_name, fn) {
    tape_test("background_tile.js: ", test_name, fn);
}
function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};


test('invalid position', function (assert) {
    require("../../../src/js/world_api/background_tile.js");
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(3);
    try {
        RUR.add_background_tile('a', 0, 0);
    } catch (e) {
        assert.equal(e.message, "(0, 0) is an invalid position.", "error message ok");
        assert.equal(e.reeborg_failure, "(0, 0) is an invalid position.", "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});


test('adding known tile', function (assert) {
    require("../../../src/js/world_api/background_tile.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    global.RUR.add_background_tile('a', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.tiles['2,3'], ["a"], "background_tiles ok");
    assert.end();
});

test('adding unknown tile', function (assert) {
    require("../../../src/js/world_api/background_tile.js");
    assert.plan(3);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = [];
    RUR.untranslated['red'] = true;
    try {
        global.RUR.add_background_tile('red', 2, 3);
    } catch (e) {
        assert.equal(e.message, "Invalid name: red", "error message ok");
        assert.equal(e.reeborg_failure, "Invalid name: red", "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('adding unknown color', function (assert) { // should not create any problems
    require("../../../src/js/world_api/background_tile.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = [];
    RUR.untranslated['red'] = true;
    global.RUR.add_colored_tile('red', 2, 3);
    assert.deepEqual(RUR.CURRENT_WORLD.tiles['2,3'], ["red"], "colored tile ok");
    assert.end();
});


test('adding and removing known solid object', function (assert) {
    var identical = require("../../../src/js/utils/identical.js").identical;
    require("../../../src/js/world_api/background_tile.js");
    assert.plan(1);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a'];
    RUR.untranslated['a'] = true;
    RUR.add_background_tile('a', 2, 3);
    RUR.remove_background_tile('a', 2, 3);
    assert.ok(identical(RUR.CURRENT_WORLD, RUR.create_empty_world()), "no background_tiles left");
    assert.end();
});

test('adding two and removing one tile', function (assert) {
    require("../../../src/js/world_api/background_tile.js");
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['a', 'b'];
    RUR.untranslated['a'] = true;
    RUR.untranslated['b'] = true;
    RUR.add_background_tile('b', 2, 3);
    RUR.add_background_tile('a', 2, 3); // a replaced by
    assert.ok(RUR.is_background_tile("a", 2, 3), "confirm replaced background tile worked.");
    assert.ok(RUR.is_background_tile("b", 2, 3)===false, "confirm replaced background tile worked.");
    assert.end();
});

test('is/add/remove background_tiles', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.KNOWN_THINGS = ['thing'];    original_world = clone(RUR.CURRENT_WORLD);
    RUR.untranslated['thing'] = true;
    assert.ok(RUR.CURRENT_WORLD.tiles === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_background_tile("thing", 2, 3)===false, "start with no background_tiles.");
    RUR.add_background_tile("thing", 2, 3);
    // Was our first test checking the right key?
    assert.ok(RUR.CURRENT_WORLD.tiles !== undefined, "confirm that key is now present.");
    assert.ok(RUR.is_background_tile("thing", 2, 3)===true, "confirm add_background_tile worked.");
    RUR.remove_background_tile("thing", 2, 3);
    assert.ok(RUR.is_background_tile("thing", 2, 3)===false, "confirm remove_background_tile worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});
