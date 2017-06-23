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
require("../../../src/js/world_api/bridges.js");
require("../../../src/js/world_api/decorative_objects.js");
require("../../../src/js/world_api/obstacles.js");
require("../../../src/js/world_api/pushables.js");
require("../../../src/js/world_api/walls.js");
require("../../../src/js/world_api/objects.js");

function clone (world) {
    return JSON.parse(JSON.stringify(world));
}

test('background_tile', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.tiles === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_background_tile("thing", 2, 3)===false, "start with no bacground tile.");
    RUR.add_background_tile("thing", 2, 3);
    // Was our first test checking the right key?
    assert.ok(RUR.CURRENT_WORLD.tiles !== undefined, "confirm that key is now present.");
    assert.ok(RUR.is_background_tile("thing", 2, 3)===true, "confirm add_background_tile worked.");
    RUR.remove_background_tile("thing", 2, 3);
    assert.ok(RUR.is_background_tile("thing", 2, 3)===false, "confirm remove_background_tile worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('bridge', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {thing:true};
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

test('decorative_object', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.CURRENT_WORLD.decorative_objects === undefined, "confirm that key is not present initially.");
    assert.ok(RUR.is_decorative_object("thing", 2, 3)===false, "start with no decorative_object.");
    RUR.add_decorative_object("thing", 2, 3);
    // Was our first test checking the right key?
    assert.ok(RUR.CURRENT_WORLD.decorative_objects !== undefined, "confirm that key has been created.");
    assert.ok(RUR.is_decorative_object("thing", 2, 3)===true, "confirm add_decorative_object worked.");
    RUR.remove_decorative_object("thing", 2, 3);
    assert.ok(RUR.is_decorative_object("thing", 2, 3)===false, "confirm remove_decorative_object worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('objects', function (assert) {
    var original_world;
    assert.plan(5);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
    assert.deepEqual(RUR.CURRENT_WORLD.objects, {}, "confirm that key is initially present.");
    assert.ok(RUR.is_object("thing", 2, 3)===false, "start with no object.");
    RUR.add_object("thing", 2, 3);
    assert.ok(RUR.is_object("thing", 2, 3)===true, "confirm add_object worked.");
    RUR.remove_object("thing", 2, 3);
    assert.ok(RUR.is_object("thing", 2, 3)===false, "confirm remove_object worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});


test('obstacles', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
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

test('pushables', function (assert) {
    var original_world;
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    RUR.THINGS = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
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

test('walls', function (assert) {
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

test('goal objects', function (assert) {
    var original_world, options={goal:true};
    assert.plan(6);
    RUR.CURRENT_WORLD = RUR.create_empty_world();
    assert.ok(RUR.CURRENT_WORLD.goal === undefined, "confirm that goal key is not present initially.");
    RUR.THINGS = {thing:true};
    original_world = clone(RUR.CURRENT_WORLD);
    assert.ok(RUR.is_object("thing", 2, 3, options)===false, "start with no goal object.");
    RUR.add_object("thing", 2, 3, options);
    assert.ok(RUR.CURRENT_WORLD.goal !== undefined, "confirm that goal key is now present.");
    assert.ok(RUR.is_object("thing", 2, 3, options)===true, "confirm add_object for goal worked.");
    RUR.remove_object("thing", 2, 3, options);
    assert.ok(RUR.is_object("thing", 2, 3, options)===false, "confirm remove_object for goal worked.");
    assert.deepEqual(RUR.CURRENT_WORLD, original_world, "confirm that we returned to original state.");
    assert.end();
});

test('goal walls', function (assert) {
    var original_world, goal=true;
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