/* Path utilities useful for world creators */

require("./../rur.js");
require("./../drawing/visible_world.js");

/** @function print_path
 * @memberof RUR
 * @instance
 * @summary This function prints the path followed by the default robot, where
 * the values ['x', 'y'] are used to draw the trace on the screen. Values are
 * only appended to the path when they change; thus, turns and other actions
 * performed at a given location are ignored.  The initial position is 
 * considered to be part of the path.
 *
 */

RUR.print_path = function () {
    "use strict";
    var history, path, world, x_init, y_init, robot;

    world = RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("Missing robot; cannot print path.");
    }
    robot = world.robots[0];
    history = robot._trace_history;

    if (robot.initial_position !== undefined) {
        x_init = robot.initial_position[0];
        y_init = robot.initial_position[1];        
    } else {
        console.warn("Initial_position not defined for robot in print_path; robot =", robot);
        x_init = robot.x;
        y_init = robot.y;
    }

    path = compute_path(x_init, y_init, history);
    RUR._write_ln(path);
};

function compute_path(x_init, y_init, history) {
    var x, y, prev_x, prev_y, path;

    prev_x = x_init;
    prev_y = y_init;
    path = [[prev_x, prev_y]];

    for (i=0; i < history.length; i++) {
        x = history[i]['grid_x'];
        y = history[i]['grid_y'];
        if (x != prev_x || y != prev_y) {
            path.push([x, y]);
            prev_x = x;
            prev_y = y;
        }
    }
    return path;
}

/** @function check_path
 * @memberof RUR
 * @instance
 * @summary This function compares the path followed by the default robot
 * with that which was desired.
 *
 * @param {list} desired_path A desired path, as printed by `RUR.print_path`.
 * 
 * @param {Object} [options] A Javascript object (similar to a Python dict).
 *
 * @param {string} [options.message] If the followed path was not the specified
 * one and `options.message` is specified, an exception will be raised and
 * `options.message` will be shown.
 *
 * @param {string} [options.show_path] If the followed path was not the specified
 * one and `options.show_path` evaluates to `true`, the `desired_path`
 * will be shown. If this is desired, we suggest to use the string `"true"` which
 * will be valid in both Python and Javascript.
 * If the correct path is followed, and you wish to show the `desired_path`, 
 * simply call `RUR.show_path()` explicitly.
 *
 * @param {string} [options.color] If the desired path is shown and `options.color`
 * is specified, it will be the color used to show the path.
 *
 * @returns {bool} True if the correct path was followed. If `options.message`
 * is not specified and the correct path was not followed, it will return false.
 *
 */

RUR.check_path = function (desired_path, options) {
    "use strict";
    var history, i, world, desired_x, desired_y, path_taken, x, y, robot;
    var success = true;

    world = RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("Missing robot; cannot check path.");
    }
    robot = world.robots[0];
    history = robot._trace_history;

    if (robot.initial_position !== undefined) {
        x = robot.initial_position[0];
        y = robot.initial_position[1];        
    } else {
        console.warn("Initial_position not defined for robot in check_path; robot =", robot);
        x = robot.x;
        y = robot.y;
    }

    path_taken = compute_path(x, y, history);

    if (desired_path.length > path_taken.length){
        console.log("desired longer than taken");
        success = false;
    } else if (desired_path.length < path_taken.length){
        console.log("desired shorter than taken");
        success = false;
    } else {
        for (i=0; i < path_taken.length; i++) {
            x = path_taken[i][0];
            y = path_taken[i][1];
            desired_x = desired_path[i][0];
            desired_y = desired_path[i][1];
            if (x != desired_x || y != desired_y) {
                console.log("difference at", x, y);
                success = false;
                break;
            }
        }
    }

    if (success) {
        return true;
    }

    console.log("desired_path", desired_path);
    console.log("path_taken", path_taken);

    if (options) {
        if (options.show_path) {
            if (options.color) {
                RUR.show_path(desired_path, options.color);
            } else {
                RUR.show_path(desired_path);
            }
        }
        if (options.message) {
            throw new RUR.ReeborgError(options.message);
        }
    }
    return false;
};


/** @function show_path
 * @memberof RUR
 * @instance
 * @summary This function draws a path which Reeborg should follow.
 * To stop drawing the path, call the function with no arguments.
 *
 * @param {list} path A path, as printed by RUR.print_path.
 * @param {string} [color] The color to be used to draw the path;
 * the default is `"lightsteelblue"`.
 *
 */
RUR.show_path = function (path, color) {
    var world = RUR.get_current_world();
    
    if (path === undefined) {
        world._CORRECT_PATH = [];
    } else {
        world._CORRECT_PATH = path;
    }

    if (color === undefined) {
        world._CORRECT_PATH_COLOR = "lightsteelblue";
    } else {
        world._CORRECT_PATH_COLOR = color;
    }
    RUR.record_frame("show_path");
};
