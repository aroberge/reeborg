require("./../rur.js");

/* The following is used in a few places, including in unit and
   functional tests. It is not documented with JSdoc as it should not
   be required for normal world creation; the recommended practice being
   to start with an existing world. */
RUR.create_empty_world = function (blank_canvas) {
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
RUR.set_current_world(RUR.create_empty_world());