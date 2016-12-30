require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./../utils/artefact.js");
require("./../world_utils/get_world.js");

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
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_obstacle = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"obstacles", valid_names:Object.keys(RUR.TILES)};
    RUR.utils.add_artefact(args);
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
    args= {x:x, y:y, type:"obstacles", name:name, valid_names:Object.keys(RUR.TILES)};
    RUR.utils.remove_artefact(args);
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
    tiles = RUR.utils.get_artefacts(args);
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
    if (RUR.utils.get_nb_artefact(args) > 0) {
        return true;
    } else {
        return false;
    }
};

RUR.is_obstacle_solid = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.TILES[obs].solid) {
            return true;
        }
    }
    return false;
};

RUR.is_obstacle_fatal = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.TILES[obs].fatal) {
            return true;
        }
    }
    return false;
};

// safe obstacles only protect from fatal background tiles,
// but not from fatal obstacles
RUR.is_obstacle_safe = function (x, y) {
    "use strict";
    var obs, safe_found = false, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.TILES[obs].fatal) {
            return false;
        }
        if (RUR.TILES[obs].safe) {
            safe_found = true;
        }        
    }
    return safe_found;
};