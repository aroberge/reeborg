require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_obstacle
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a the tile representing the obstacle.
 *
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @todo Make sure we cover the case of two or more obstacles at a given location
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_obstacle = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"obstacles", valid_names:Object.keys(RUR.THINGS)};
    RUR.add_artefact(args);
    RUR.record_frame("RUR.add_obstacle", args);
};


/** @function remove_obstacle
 * @memberof RUR
 * @instance
 * @summary This function removes an obstacle at a location.
 *
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 *
 */
RUR.remove_obstacle = function (name, x, y) {
    "use strict";
    var args, obstacles;
    obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        throw new ReeborgError("No obstacles to remove here.");
    }
    args= {x:x, y:y, type:"obstacles", name:name, valid_names:Object.keys(RUR.THINGS)};
    RUR.remove_artefact(args);
    RUR.record_frame("RUR.remove_obstacle", args);
};


/** @function get_obstacles
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position of the tile.
 * @param {integer} y  Position of the tile.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @todo deal properly with cases of two or more obstacles
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_obstacles = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"obstacles"};
    tiles = RUR.get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles;
    }
};

// TODO: this may not be needed after more general functions written
// i.e. instead of looking for specific obstacle, look for
// obstacle with properties.
RUR.is_obstacle = function (name, x, y) {
    "use strict";
    var args={name:name, x:x, y:y, type:"obstacles"};
    if (RUR.get_nb_artefact(args) > 0) {
        return true;
    } else {
        return false;
    }
};

// TODO: include get_obstacle which would return all
// obstacles at a given location ... although is_obstacle_safe
// may cover this case appropriately.

RUR.get_solid_obstacle = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.THINGS[obs].solid) {
            return RUR.THINGS[obs]; //TODO: return array of obstacles
        }
    }
    return false;
};

RUR.get_fatal_obstacle = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.THINGS[obs].fatal) {
            return RUR.THINGS[obs]; //TODO: return array of obstacles
        }
    }
    return false;
};

RUR.get_fatal_detectable_obstacle = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.THINGS[obs].fatal && RUR.THINGS[obs].detectable) {
            return RUR.THINGS[obs]; //TODO: return array of obstacles
        }
    }
    return false;
};

// TODO: modify this to take into account bridges.
// safe obstacles only protect from fatal background tiles,
// but not from fatal obstacles
RUR.is_obstacle_safe = function (x, y) {
    "use strict";
    var obs, safe_found = false, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) { //TODO: change to make sure that all obstacles are included
        if (RUR.THINGS[obs].fatal) {
            return false;
        }
        if (RUR.THINGS[obs].safe) {
            safe_found = true;
        }
    }
    return safe_found;
};