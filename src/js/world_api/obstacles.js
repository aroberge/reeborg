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
 *
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_obstacle = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"obstacles"};
    RUR.utils.add_artefact(args);
    RUR.record_frame("RUR.add_obstacle", args);
};


/** @function remove_obstacle
 * @memberof RUR
 * @instance
 * @summary This function removes a background tile at a location.
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
 *
 */
RUR.remove_obstacle = function (name, x, y) {
    "use strict";
    var args, obstacles;
    obstacles = RUR.get_background_tile(x, y);
    if (obstacles === null) {
        throw new ReeborgError("No obstacles to remove here.");
    }
    args= {x:x, y:y, type:"obstacles", name:name};
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
