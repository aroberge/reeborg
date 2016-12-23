 /** @function test_walls
 * @memberof UnitTest
 * @instance
*
* @desc The file listed below as the source contains unit tests for 
* {@link RUR#set_nb_object_at_position}.
*
*/

var tape_test = require('./../test_globals.js').tape_test;
var mock = require('mock-require');

function test(test_name, fn) {
    tape_test("[get/set] wall.js: ", test_name, fn);
}

RUR.record_frame = function () {};
mock("../../../src/js/recorder/record_frame.js", {});


test('list empty walls', function (assert) {    
    require("../../../src/js/world_get/wall.js");
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3), [], "No walls present");
    assert.end();
});

test('Add and list walls', function (assert) {    
    require("../../../src/js/world_get/wall.js");
    require("../../../src/js/world_set/wall.js");
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.set.add_wall_at(3, 3, "east");
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3), ["east"], "east wall");
    RUR.set.add_wall_at(3, 3, "west");
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3), ["east", "west"], "two walls");
    RUR.set.add_wall_at(3, 3, "north");
    // walls are found by list_walls_at position in order as ["east", "north", "west", "south"]
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3), ["east", "north", "west"], "three walls");
    RUR.set.add_wall_at(3, 3, "south");
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3), ["east", "north", "west", "south"], "four walls");
    // looking from other positions
    assert.deepEqual(RUR.get.list_walls_at_position(4, 3), ["west"], "west wall");
    assert.deepEqual(RUR.get.list_walls_at_position(2, 3), ["east"], "east wall");
    assert.deepEqual(RUR.get.list_walls_at_position(3, 2), ["north"], "north wall");
    assert.deepEqual(RUR.get.list_walls_at_position(3, 4), ["south"], "south wall");
    assert.end();
});

test('Add and get wall at', function (assert) {    
    require("../../../src/js/world_get/wall.js");
    require("../../../src/js/world_set/wall.js");
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.set.add_wall_at(3, 3, "east");  // west of (4, 3)
    RUR.set.add_wall_at(3, 3, "north");  // south of (3, 4)
    assert.ok(RUR.get.is_wall_at(3, 3, "east"), "east wall present");
    assert.ok(RUR.get.is_wall_at(3, 3, "north"), "north wall present");
    assert.notOk(RUR.get.is_wall_at(3, 3, "south"), "south wall not present");
    assert.notOk(RUR.get.is_wall_at(3, 3, "west"), "west wall not present");
    //
    assert.ok(RUR.get.is_wall_at(4, 3, "west"), "east wall present");
    assert.ok(RUR.get.is_wall_at(3, 4, "south"), "south wall present");
    assert.end();
});


test('Add and list goal walls', function (assert) {    
    require("../../../src/js/world_get/wall.js");
    require("../../../src/js/world_set/wall.js");
    var goal = true;
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.set.add_wall_at(3, 3, "east", goal);
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3, goal), ["east"], "east wall");
    RUR.set.add_wall_at(3, 3, "west", goal);
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3, goal), ["east", "west"], "two walls");
    RUR.set.add_wall_at(3, 3, "north", goal);
    // walls are found by list_walls_at position in order as ["east", "north", "west", "south"]
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3, goal), ["east", "north", "west"], "three walls");
    RUR.set.add_wall_at(3, 3, "south", goal);
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3, goal), ["east", "north", "west", "south"], "four walls");
    // looking from other positions
    assert.deepEqual(RUR.get.list_walls_at_position(4, 3, goal), ["west"], "west wall");
    assert.deepEqual(RUR.get.list_walls_at_position(2, 3, goal), ["east"], "east wall");
    assert.deepEqual(RUR.get.list_walls_at_position(3, 2, goal), ["north"], "north wall");
    assert.deepEqual(RUR.get.list_walls_at_position(3, 4, goal), ["south"], "south wall");
    assert.end();
});