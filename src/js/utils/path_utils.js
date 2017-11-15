/* Path utilities useful for world creators */

require("./../rur.js");

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
    var history, i, path, world, prev_x, prev_y, x, y;

    world = RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("Missing robot; cannot print path.");
    }
    history = world.robots[0]._trace_history;
    prev_x = world.robots[0].initial_position[0];
    prev_y = world.robots[0].initial_position[1];
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
    RUR._write_ln(path);
};

/** @function check_path
 * @memberof RUR
 * @instance
 * @summary This function compares the path followed by the default robot
 * with that which was desired.
 *
 * @param {list} desired_path A desired path, as printed by RUR.print_path.
 *
 * @returns {bool} True if the correct path was followed.
 *
 */

RUR.check_path = function (desired_path) {
    "use strict";
    var history, i, world, desired_x, desired_y, path_taken, prev_x, prev_y, x, y;

    world = RUR.get_current_world();
    if (world.robots === undefined || world.robots.length === 0) {
        throw new RUR.ReeborgError("Missing robot; cannot print path.");
    }
    history = world.robots[0]._trace_history;
    prev_x = world.robots[0].initial_position[0];
    prev_y = world.robots[0].initial_position[1];
    path_taken = [[prev_x, prev_y]];
    for (i=0; i < history.length; i++) {
        x = history[i]['grid_x'];
        y = history[i]['grid_y'];
        if (x != prev_x || y != prev_y) {
            path_taken.push([x, y]);
            prev_x = x;
            prev_y = y;
        }
    }


    if (desired_path.length > path_taken.length){
        console.log("desired_path longer than path taken");
        return false;
    } else if (desired_path.length < path_taken.length){
        console.log("desired_path shorter than path taken");
        return false;
    }

    for (i=0; i < path_taken.length; i++) {
        x = path_taken[i][0];
        y = path_taken[i][1];
        desired_x = desired_path[i][0];
        desired_y = desired_path[i][1];
        if (x != desired_x || y != desired_y) {
            console.log("desired = (", desired_x, desired_y, 
                                    ") ; taken = (", x, y, ")");
            return false;
        }
    }

    return true;
};
