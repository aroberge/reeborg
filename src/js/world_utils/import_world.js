require("./../translator.js");
require("./../rur.js");
require("./../robot/robot.js");
require("./../drawing/visible_world.js");
require("./../programming_api/exceptions.js");
require("./../editors/create.js");
require("./create_empty_world.js");
require("./../world_api/animated_images.js");

var edit_robot_menu = require("./../ui/edit_robot_menu.js");

RUR.world_utils.import_world = function (json_string) {
    "use strict";
    var body;

    RUR.hide_end_dialogs();

    if (json_string === undefined || json_string === "undefined"){
        RUR.show_feedback("#Reeborg-failure",
            RUR.translate("Problem in RUR.world_utils.import_world: world not defined."));
        console.log("Problem: no argument passed to RUR.world_utils.import_world");
        RUR.CURRENT_WORLD = RUR.create_empty_world();
        return;
    }
    RUR.reset_animated_images();
    if (typeof json_string == "string"){
        try {
            RUR.CURRENT_WORLD = JSON.parse(json_string) || RUR.create_empty_world();
        } catch (e) {
            alert("Exception caught in import_world; see console for details.");
            console.warn("Exception caught in import_world.");
            console.log("First 80 characters of json_string = ", json_string.substring(0, 80));
            console.log("Error = ", e);
            RUR.CURRENT_WORLD = RUR.create_empty_world();
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

    convert_old_worlds();

    RUR.CURRENT_WORLD.small_tiles = RUR.CURRENT_WORLD.small_tiles || false;
    RUR.CURRENT_WORLD.rows = RUR.CURRENT_WORLD.rows || RUR.MAX_Y_DEFAULT;
    RUR.CURRENT_WORLD.cols = RUR.CURRENT_WORLD.cols || RUR.MAX_X_DEFAULT;
    RUR.set_world_size(RUR.CURRENT_WORLD.cols, RUR.CURRENT_WORLD.rows);

    RUR.update_editors(RUR.CURRENT_WORLD);

    if (RUR.state.editing_world) {
        edit_robot_menu.toggle();
    }
    RUR.WORLD_BEFORE_ONLOAD = RUR.clone_world();
    process_onload();
    RUR.world_get.world_info();
};

function show_onload_feedback (e, lang) {
    var lang_info;
    if (lang == "python") {
        if (window.translate_python === undefined) {
            return;
        }
        lang_info = RUR.translate("Invalid Python code in Onload editor");
    } else {
        lang_info = RUR.translate("Invalid Javascript code in Onload editor");
    }
    RUR.show_feedback("#Reeborg-failure", lang_info + "<br>" + e.message + "<br>" +
        RUR.translate("Problem with onload code.") + "<pre>" +
        RUR.CURRENT_WORLD.onload + "</pre>");
}

process_onload = function () {
    var src, ignore;

    RUR.reset_pre_run_defaults(); // TODO:rename this and perhaps move elsewhere?

    RUR.set_current_world(RUR.clone_world(RUR.WORLD_BEFORE_ONLOAD));
    if (RUR.CURRENT_WORLD.onload !== undefined && !RUR.state.editing_world) {
        /* editors content can be saved either as a string (old format)
           with embedded new lines characters or as an array of lines (new format)
        */
        if (typeof RUR.CURRENT_WORLD.onload == "string") {
            src = RUR.CURRENT_WORLD.onload;
        } else {
            src = RUR.CURRENT_WORLD.onload.join("\n");
        }
        RUR.state.evaluating_onload = true; // affects the way errors are treated
        if (src[0]=="#") {
            RUR.state.onload_programming_language = "python";
            try {
                onload_editor.setOption("mode", {name: "python", version: 3});
            } catch (e){}
            try {
               window.translate_python(src);
               if (RUR.__python_error) {
                    throw RUR.__python_error;
                }
            } catch (e) {
                show_onload_feedback(e, "python");
            }
        } else {
            RUR.state.onload_programming_language = "javascript";
            try {
                onload_editor.setOption("mode", "javascript");
            } catch (e){}
            try {
                ignore = eval(src);  // jshint ignore:line
            } catch (e) {
                show_onload_feedback(e, "javascript");
            }
        }

        RUR.state.evaluating_onload = false;
        // remove any frames created by onload
        RUR.frames = [];
        RUR.nb_frames = 0;
        RUR.current_frame_no = 0;
    }
    RUR.WORLD_AFTER_ONLOAD = RUR.clone_world();
    RUR.vis_world.draw_all();

};
RUR.world_utils.process_onload = process_onload;

function convert_old_worlds () {
    // TODO: convert goal.possible_positions to goal.possible_final_positions ?
    // TODO: convert start_positions to possible_initial_positions ?
    var i, index, coord, keys, obstacles;

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
        RUR.BACKGROUND_IMAGE.onload = RUR.onload_new_image;
    } else {
        RUR.BACKGROUND_IMAGE.src = '';
    }

}
