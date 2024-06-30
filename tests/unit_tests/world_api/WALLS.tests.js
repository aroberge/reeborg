// setting global environment
var tape_test = require('./../test_globals.js').tape_test;
function test(test_name, fn) {
    tape_test("walls.js: ", test_name, fn);
}
function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

// intercepting record_frame
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

// main module to test
require("../../../src/js/world_api/walls.js");


/* testing exceptions =============================================*/

test('get_walls: invalid position', function (assert) {
    assert.plan(2);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    try {
        RUR.get_walls(0, 0);
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('is_wall: invalid position', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(2);
    try {
        RUR.is_wall("north", 1, 100);
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});


test('is_wall: invalid orientation', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(2);
    try {
        RUR.is_wall("n", 1, 2);
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('add_wall: invalid position', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(2);
    try {
        RUR.add_wall("north", 1, 100, true);  // test for goal wall
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('add_wall: invalid orientation', function (assert) {
    assert.plan(2);
    try {
        RUR.add_wall("n", 1, 2, true);
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('remove_wall: invalid position', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(2);
    try {
        RUR.remove_wall("north", 1, 100);
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('remove_wall: invalid orientation', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(2);
    try {
        RUR.remove_wall("n", 1, 2);
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('add_wall: twice at the same location', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(2);
    try {
        RUR.add_wall("north", 1, 2);
        RUR.add_wall("north", 1, 2);
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});

test('remove_wall: removing missing wall', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(2);
    try {
        RUR.remove_wall("north", 1, 2);
    } catch (e) {
        assert.ok(e.reeborg_failure, "reeborg_failure");
        assert.equal(e.name, "ReeborgError", "error name ok");
    }
    assert.end();
});


/*=========================================
 end of testing cases that raise exceptions
 ========================================== */

test('list empty walls', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.deepEqual(RUR.get_walls(3, 3), [], "No walls present");
    assert.end();
});


test('Add and list walls', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.plan(8);
    RUR.add_wall("east", 3, 3);
    assert.deepEqual(RUR.get_walls(3, 3), ["east"], "east wall");
    RUR.add_wall("west", 3, 3);
    assert.deepEqual(RUR.get_walls(3, 3), ["east", "west"], "two walls");
    RUR.add_wall("north", 3, 3);
    // walls are found by list_walls_at position in order as ["east", "north", "west", "south"]
    assert.deepEqual(RUR.get_walls(3, 3), ["east", "north", "west"], "three walls");
    RUR.add_wall("south", 3, 3);
    assert.deepEqual(RUR.get_walls(3, 3), ["east", "north", "west", "south"], "four walls");
    // looking from other positions
    assert.deepEqual(RUR.get_walls(4, 3), ["west"], "west wall");
    assert.deepEqual(RUR.get_walls(2, 3), ["east"], "east wall");
    assert.deepEqual(RUR.get_walls(3, 2), ["north"], "north wall");
    assert.deepEqual(RUR.get_walls(3, 4), ["south"], "south wall");
    assert.end();
});

test('Add and get wall at', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.add_wall("east", 3, 3);  // west of (4, 3)
    RUR.add_wall("north", 3, 3);  // south of (3, 4)
    assert.ok(RUR.is_wall("east", 3, 3), "east wall present");
    assert.ok(RUR.is_wall("north", 3, 3), "north wall present");
    assert.notOk(RUR.is_wall("south", 3, 3), "south wall not present");
    assert.notOk(RUR.is_wall("west", 3, 3), "west wall not present");
    //
    assert.ok(RUR.is_wall("west", 4, 3), "west wall present");
    assert.ok(RUR.is_wall("south", 3, 4), "south wall present");
    assert.end();
});


test('Add and list goal walls', function (assert) {
    var goal = {'goal': true};
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.add_wall("east", 3, 3, goal);
    assert.deepEqual(RUR.get_walls(3, 3, goal), ["east"], "east wall");
    RUR.add_wall("west", 3, 3, goal);
    assert.deepEqual(RUR.get_walls(3, 3, goal), ["east", "west"], "two walls");
    RUR.add_wall("north", 3, 3, goal);
    // walls are found by list_walls_at position in order as ["east", "north", "west", "south"]
    assert.deepEqual(RUR.get_walls(3, 3, goal), ["east", "north", "west"], "three walls");
    RUR.add_wall("south", 3, 3, goal);
    assert.deepEqual(RUR.get_walls(3, 3, goal), ["east", "north", "west", "south"], "four walls");
    // looking from other positions
    assert.deepEqual(RUR.get_walls(4, 3, goal), ["west"], "west wall");
    assert.deepEqual(RUR.get_walls(2, 3, goal), ["east"], "east wall");
    assert.deepEqual(RUR.get_walls(3, 2, goal), ["north"], "north wall");
    assert.deepEqual(RUR.get_walls(3, 4, goal), ["south"], "south wall");
    assert.end();
});

test('Add two walls, remove one and list walls', function (assert) {
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.add_wall("east", 3, 3);
    RUR.add_wall("west", 3, 3);
    RUR.remove_wall("east", 3, 3);
    assert.deepEqual(RUR.get_walls(3, 3), ["west"], "one wall remaining");
    assert.end();
});

test('is/add/remove walls', function (assert) {
    var original_world;
    assert.plan(5);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.walls !== undefined, "confirm that key is present initially.");
    assert.ok(RUR.is_wall("east", 2, 3)===false, "start with no walls.");
    RUR.add_wall("east", 2, 3);
    assert.ok(RUR.is_wall("east", 2, 3)===true, "confirm add_wall worked.");
    RUR.remove_wall("east", 2, 3);
    assert.ok(RUR.is_wall("east", 2, 3)===false, "confirm remove_wall worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('is/add/remove goal walls', function (assert) {
    var original_world, goal={'goal':true};
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.goal === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_wall("east", 2, 3, goal)===false, "start with no goal walls.");
    RUR.add_wall("east", 2, 3, goal);
    assert.ok(RUR.CURRENT_WORLD.goal !== undefined, "confirm that goal key is present.");
    assert.ok(RUR.is_wall("east", 2, 3, goal)===true, "confirm add_wall for goal worked.");
    RUR.remove_wall("east", 2, 3, goal);
    assert.ok(RUR.is_wall("east", 2, 3, goal)===false, "confirm remove_wall for goal worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});
