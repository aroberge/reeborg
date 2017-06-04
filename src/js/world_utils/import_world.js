require("./../translator.js");
require("./../rur.js");
require("./../robot/robot.js");
require("./../drawing/visible_world.js");
require("./../programming_api/exceptions.js");
require("./../editors/create.js");
require("./create_empty_world.js");
require("./../world_api/animated_images.js");
require("./world_utils_namespace.js");
var edit_robot_menu = require("./../ui/edit_robot_menu.js");
var clone_world = require("./clone_world.js").clone_world;

RUR.world_utils.import_world = function (json_string) {
    "use strict";
    var body, editor_content, library_content, i, keys, more_keys, coord, index, obstacles;
    if (json_string === undefined){
        console.log("Problem: no argument passed to RUR.world_utils.import_world");
        return {};
    }
    RUR.animated_images_init();
    if (typeof json_string == "string"){
        try {
            RUR.CURRENT_WORLD = JSON.parse(json_string) || RUR.world_utils.create_empty_world();
        } catch (e) {
            alert("Exception caught in import_world; see console for details.");
            console.warn("Exception caught in import_world.");
            console.log("First 80 characters of json_string = ", json_string.substring(0, 80));
            console.log("Error = ", e);
            RUR.CURRENT_WORLD = RUR.world_utils.create_empty_world();
        }
    } else {  // already parsed into a Javascript Object
        RUR.CURRENT_WORLD = json_string;
    }

    if (RUR.CURRENT_WORLD.robots !== undefined) {
        if (RUR.CURRENT_WORLD.robots[0]) {
            RUR.robot.modernize(RUR.CURRENT_WORLD.robots[0]);
            body = RUR.CURRENT_WORLD.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body._orientation;
        } else {
            // protect against robots[0] == (undefined or null)
            RUR.CURRENT_WORLD.robots = [];
        }
    }

    //TODO: put the conversion into new function

    // Backward compatibility following change done on Jan 5, 2016
    // top_tiles has been renamed obstacles (and prior to that [or after?],
    // they were known as solid_objects); to ensure compatibility of
    // worlds created before, we change the old name
    // following http://stackoverflow.com/a/14592469/558799
    // thus ensuring that if a new world is created from an old one,
    // it will have the new syntax.
    if (RUR.CURRENT_WORLD.top_tiles !== undefined) {
        Object.defineProperty(RUR.CURRENT_WORLD, "obstacles",
            Object.getOwnPropertyDescriptor(RUR.CURRENT_WORLD, "top_tiles"));
        delete RUR.CURRENT_WORLD.top_tiles;
    } else if (RUR.CURRENT_WORLD.solid_objects !== undefined) {
        Object.defineProperty(RUR.CURRENT_WORLD, "obstacles",
            Object.getOwnPropertyDescriptor(RUR.CURRENT_WORLD, "solid_objects"));
        delete RUR.CURRENT_WORLD.solid_objects;
    }

    // Backward compatibility change done on December 29, 2016.
    // tiles were written as e.g. "water"; need to be written as ["water"]
    if (RUR.CURRENT_WORLD.tiles !== undefined) {
        keys = Object.keys(RUR.CURRENT_WORLD.tiles);
        for (i=0; i < keys.length; i++) {
            coord = keys[i];
            if (typeof RUR.CURRENT_WORLD.tiles[coord] == "string") {
                RUR.CURRENT_WORLD.tiles[coord] = [RUR.CURRENT_WORLD.tiles[coord]];
            } else {
                break;
            }
        }
    }
    // and obstacles were written in the form {fence:1} and need to be simply
    // ["fence"]
    if (RUR.CURRENT_WORLD.obstacles !== undefined) {
        keys = Object.keys(RUR.CURRENT_WORLD.obstacles);
        for (i=0; i < keys.length; i++) {
            coord = keys[i];
            if (Object.prototype.toString.call(RUR.CURRENT_WORLD.obstacles[coord]) == "[object Object]") {
                obstacles = Object.keys(RUR.CURRENT_WORLD.obstacles[coord]);
                // also convert from the old names to the new ones
                index = obstacles.indexOf("fence4");
                if (index !== -1) {
                    obstacles[index] = "fence_right";
                }
                index = obstacles.indexOf("fence5");
                if (index !== -1) {
                    obstacles[index] = "fence_left";
                }
                index = obstacles.indexOf("fence6");
                if (index !== -1) {
                    obstacles[index] = "fence_double";
                }
                index = obstacles.indexOf("fence7");
                if (index !== -1) {
                    obstacles[index] = "fence_vertical";
                }
                RUR.CURRENT_WORLD.obstacles[coord] = obstacles;
            } else {
                break;
            }
        }
    }


    // Backward compatibility change done on March 28, 2016, where
    // "pre_code" and "post_code" were simplified to "pre" and "post"
    // for consistency with other editor contents.
    if (RUR.CURRENT_WORLD.pre_code !== undefined) {
        RUR.CURRENT_WORLD.pre = RUR.CURRENT_WORLD.pre_code;
        delete RUR.CURRENT_WORLD.pre_code;
    }
    if (RUR.CURRENT_WORLD.post_code !== undefined) {
        RUR.CURRENT_WORLD.post = RUR.CURRENT_WORLD.post_code;
        delete RUR.CURRENT_WORLD.post_code;
    }

    if (RUR.CURRENT_WORLD.background_image !== undefined) {
        RUR.BACKGROUND_IMAGE.src = RUR.CURRENT_WORLD.background_image;
        RUR.BACKGROUND_IMAGE.onload = function () {
            RUR.vis_world.draw_all();
        };
    } else {
        RUR.BACKGROUND_IMAGE.src = '';
    }

    RUR.CURRENT_WORLD.small_tiles = RUR.CURRENT_WORLD.small_tiles || false;
    RUR.CURRENT_WORLD.rows = RUR.CURRENT_WORLD.rows || RUR.MAX_Y_DEFAULT;
    RUR.CURRENT_WORLD.cols = RUR.CURRENT_WORLD.cols || RUR.MAX_X_DEFAULT;
    RUR.vis_world.compute_world_geometry(RUR.CURRENT_WORLD.cols, RUR.CURRENT_WORLD.rows);

    RUR.update_editors(RUR.CURRENT_WORLD);

    if (RUR.state.editing_world) {
        edit_robot_menu.toggle();
    }

    if (RUR.CURRENT_WORLD.onload !== undefined) {
        eval_onload();
    }
    RUR._SAVED_WORLD = clone_world();

};

eval_onload = function () {
    RUR.state.evaluating_onload = true;
    try {
        eval(RUR.CURRENT_WORLD.onload);  // jshint ignore:line
    } catch (e) {
        RUR.show_feedback("#Reeborg-shouts",
            RUR.translate("Problem with onload code.") + "<br><pre>" +
            RUR.CURRENT_WORLD.onload + "</pre>");
        console.log("error in onload:", e);
    }
    RUR.state.evaluating_onload = false;
    RUR.vis_world.draw_all();
};

function convert_old_worlds () {
    // TODO: add code here
    // TODO: convert goal.possible_positions to goal.possible_final_positions
    // TODO: convert start_positions to possible_initial_positions
}
