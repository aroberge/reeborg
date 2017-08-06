require("./../rur.js");
require("./../translator.js");
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
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is already such a named obstacle at that location,
 * unless this is done from code in the Onload editor in which case the
 * a message is written to the browser's console and the request is ignored.
 *
 */
RUR.add_obstacle = function (name, x, y) {
    "use strict";
    var args;
    if (RUR.is_obstacle(name, x, y)) {
        if (RUR.state.evaluating_onload) {
            console.log("Ignoring request to add obstacle " + name);
            return;
        } else {
            throw new RUR.ReeborgError(RUR.translate("There is already such an obstacle here: ") + name);
        }
    }
    args = {name: RUR.translate_to_english(name), x:x, y:y, type:"obstacles",
            valid_names: RUR.KNOWN_THINGS};
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
 * @throws Will throw an error if there is no obstacle to remove
 *        at that location
 *
 */
RUR.remove_obstacle = function (name, x, y) {
    "use strict";
    var args;
    if (!RUR.is_obstacle(name, x, y)) {
        if (RUR.state.evaluating_onload) {
            throw new RUR.ReeborgError(RUR.translate("There is no such an obstacle here: ") + name);
        }
    }
    args= {x:x, y:y, type:"obstacles", name:RUR.translate_to_english(name), valid_names: RUR.KNOWN_THINGS};
    RUR._remove_artefact(args);
    RUR.record_frame("RUR.remove_obstacle", args);
};


/** @function is_obstacle
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a named obstacle is present
 * at a given location, `false/False` otherwise
 *
 * @param {string} name The name of the obstacle
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_obstacle = function (name, x, y) {
    "use strict";
    var args={name:RUR.translate_to_english(name), x:x, y:y, type:"obstacles"};
    if (RUR._get_nb_artefact(args) > 0) {
        return true;
    } else {
        return false;
    }
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
 */

RUR.get_obstacles = function (x, y) {
    "use strict";
    var i, obstacles, result = [], args = {x:x, y:y, type:"obstacles"};
    obstacles = RUR._get_artefacts(args);
    if (obstacles === null) {
        return [];
    }
    for(i=0; i < obstacles.length; i++) {
        result.push(RUR.translate(obstacles[i]))
    }
    return result;
};

/** @function is_solid_obstacle
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a solid obstacle is present
 * at a given location, `false/False` otherwise
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_solid_obstacle = function (x, y) {
    "use strict";
    var obs, obstacles = RUR.get_obstacles(x, y);
    if (obstacles === null) {
        return false;
    }
    for (obs of obstacles) {
        if (RUR.THINGS[RUR.translate_to_english(obs)].solid) {
            return true;
        }
    }
    return false;
};
