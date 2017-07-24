require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_obstacle
 * @memberof RUR
 * @instance
 * @summary This function sets a named "thing" as an obstacle at that location
 *
 * @param {string} name The name of a the "thing" representing the obstacle.
 *
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @todo add examples
 * @todo deal with translation
 *
 */
RUR.add_obstacle = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"obstacles", valid_names: RUR.KNOWN_THINGS};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_obstacle", args);
};


/** @function remove_obstacle
 * @memberof RUR
 * @instance
 * @summary This function removes an obstacle at a location.
 *
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 *
 * @todo add examples
 * @todo deal with translation
 *
 */
RUR.remove_obstacle = function (name, x, y) {
    "use strict";
    var args, obstacles;
    args= {x:x, y:y, type:"obstacles", name:name, valid_names: RUR.KNOWN_THINGS};
    RUR._remove_artefact(args);
    RUR.record_frame("RUR.remove_obstacle", args);
};


/** @function get_obstacles
 * @memberof RUR
 * @instance
 * @summary This function gets the obstacles at given location and return
 * their names in an array/list.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @return {list} A list of strings representing the name of the obstacles.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 * @todo add proper examples
 * @todo deal with translation
 *
 */

RUR.get_obstacles = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"obstacles"};
    tiles = RUR._get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles;
    }
};


RUR.is_obstacle = function (name, x, y) {
    "use strict";
    var args={name:name, x:x, y:y, type:"obstacles"};
    if (RUR._get_nb_artefact(args) > 0) {
        return true;
    } else {
        return false;
    }
};


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
