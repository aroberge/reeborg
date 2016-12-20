require("./../rur.js");

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
    world.rows = RUR.MAX_Y_DEFAULT;
    world.cols = RUR.MAX_X_DEFAULT;

    return world;
};
window.FUNC_TESTS.create_empty_world = create_empty_world;

RUR.CURRENT_WORLD = create_empty_world();
