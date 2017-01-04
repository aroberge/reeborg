 /** @function test_is_add_remove
 * @memberof UnitTest
 * @instance
*
* @desc The file listed below is the source contains unit tests 
* for all the `is_thing`, `add_thing` and `remove_thing` methods.
*
*/

// setting global environment
var tape_test = require('./../test_globals.js').tape_test;
function test(test_name, fn) {
    tape_test("is/add/remove: ", test_name, fn);
}

// intercepting record_frame and other modules it requires
var mock = require('mock-require');
mock("../../../src/js/recorder/record_frame.js", {});
RUR.record_frame = function () {};

// main modules to test
require("../../../src/js/world_api/background_tile.js");
require("../../../src/js/world_api/bridge.js");
require("../../../src/js/world_api/obstacles.js");
require("../../../src/js/world_api/pushables.js");
require("../../../src/js/world_api/wall.js");

function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

test('background_tile', function (assert) {  
    var original_world;
    assert.plan(5);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.TILES = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.tiles === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_background_tile("thing", 2, 3)===false, "start with no bacground tile.");
    RUR.add_background_tile("thing", 2, 3);
    assert.ok(RUR.is_background_tile("thing", 2, 3)===true, "confirm add_background_tile worked.");
    RUR.remove_background_tile("thing", 2, 3);
    assert.ok(RUR.is_background_tile("thing", 2, 3)===false, "confirm remove_background_tile worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('bridge', function (assert) {  
    var original_world;
    assert.plan(5);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.TILES = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.bridge === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_bridge("thing", 2, 3)===false, "start with no bridge.");
    RUR.add_bridge("thing", 2, 3);
    assert.ok(RUR.is_bridge("thing", 2, 3)===true, "confirm add_bridge worked.");
    RUR.remove_bridge("thing", 2, 3);
    assert.ok(RUR.is_bridge("thing", 2, 3)===false, "confirm remove_bridge worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test_only('obstacles', function (assert) {  
    var original_world;
    assert.plan(5);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.TILES = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.obstacle === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_obstacle("thing", 2, 3)===false, "start with no obstacle.");
    RUR.add_obstacle("thing", 2, 3);
    assert.ok(RUR.is_obstacle("thing", 2, 3)===true, "confirm add_obstacle worked.");
    RUR.remove_obstacle("thing", 2, 3);
    assert.ok(RUR.is_obstacle("thing", 2, 3)===false, "confirm remove_obstacle worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('pushables', function (assert) {  
    var original_world;
    assert.plan(5);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    RUR.TILES = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.pushable === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_pushable("thing", 2, 3)===false, "start with no pushable.");
    RUR.add_pushable("thing", 2, 3);
    assert.ok(RUR.is_pushable("thing", 2, 3)===true, "confirm add_pushable worked.");
    RUR.remove_pushable("thing", 2, 3);
    assert.ok(RUR.is_pushable("thing", 2, 3)===false, "confirm remove_pushable worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('walls', function (assert) {  
    var original_world;
    assert.plan(5);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
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

test('goal walls', function (assert) {  
    var original_world, goal=true;
    assert.plan(5);  
    RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.goal === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_wall("east", 2, 3, goal)===false, "start with no walls.");
    RUR.add_wall("east", 2, 3, goal);
    assert.ok(RUR.is_wall("east", 2, 3, goal)===true, "confirm add_wall worked.");
    RUR.remove_wall("east", 2, 3, goal);
    assert.ok(RUR.is_wall("east", 2, 3, goal)===false, "confirm remove_wall worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});