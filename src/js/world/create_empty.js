require("./../rur.js");
require("./../constants.js");

exports.create_empty_world = create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.objects = {};
    world.small_tiles = false;
    world.rows = RUR.MAX_Y;
    world.cols = RUR.MAX_X;

    return world;
};
RUR.functional_tests.create_empty_world = create_empty_world;

RUR.CURRENT_WORLD = create_empty_world();
