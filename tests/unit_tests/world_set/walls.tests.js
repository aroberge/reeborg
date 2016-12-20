 /** @function test_walls
 * @memberof UnitTest
 * @instance
*
* @desc The file listed below as the source contains unit tests for 
* {@link RUR#set_nb_object_at_position}.
*
*/

var tape = require('tape');
var mock = require('mock-require');


//var silencer =  require('silencer');
global.window = {};
global.RUR = {};
RUR.record_frame = function () {};
mock("../../../src/js/recorder/record_frame.js", {});

global.Image = function () {
    return {};
};
function test(info, fn) {
    tape("Wall.js: "+info, fn);
}


test('list walls', function (assert) {    
    require("../../../src/js/world_get/wall.js");
    RUR.CURRENT_WORLD = {};
    assert.deepEqual(RUR.get.list_walls_at_position(3, 3), [], "No walls present");
    assert.end();
});

test('Add and list walls', function (assert) {    
    require("../../../src/js/world_get/wall.js");
    require("../../../src/js/world_set/wall.js");
    RUR.CURRENT_WORLD = {};
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