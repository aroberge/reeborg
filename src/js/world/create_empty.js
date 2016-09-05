require("./../constants.js");

create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.objects = {};
    // allow teacher to insert code to be run before and after the
    // code entered by the student
    world.small_tiles = false;
    world.rows = RUR.MAX_Y;
    world.cols = RUR.MAX_X;

    RUR.CURRENT_WORLD = world;
    return world;
};
RUR.create_empty_world = create_empty_world; // for automated tests.
RUR.CURRENT_WORLD = create_empty_world();
