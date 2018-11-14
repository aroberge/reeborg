require("./../rur.js");
require("./../translator.js");
require("./background_tile.js");
require("./bridges.js");
require("./obstacles.js");

/** @function get_protections
 * @memberof RUR
 * @instance
 *
 * @desc This return a list of protections carried by the robot
 * against named fatalities.
 *
 * @param {object} robot_body  robot body object
 *
 * @returns an array of protections;
 *
 */
RUR.get_protections = function (robot) {
    "use strict";
    var objects_carried, obj_type, protections;

    objects_carried = RUR.control.carries_object(robot);
    if (objects_carried == 0) {
        return [];
    }

    protections = [];
    for(obj_type of Object.keys(objects_carried)){
        if (RUR.THINGS[obj_type] !== undefined && RUR.THINGS[obj_type].protections !== undefined) {
            protections = protections.concat(RUR.THINGS[obj_type].protections);
        }
    }

    return protections;
};

/** @function is_fatal_position
 * @memberof RUR
 * @instance
 * @desc Indicates if the position would be fatal for the robot. A robot can
 * carry protections against fatalities
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {object} robot_body  robot body object
 *
 * @returns The message of the first `fatal` thing found
 * [for which the robot has no protection]; if no such thing is found,
 * `false/False` is returned.
 */
RUR.is_fatal_position = function (x, y, robot){
    "use strict";
    var protections, obs, obstacles, tile;
    // Objects carried can offer protection
    // against some types of otherwise fatal obstacles
    protections = RUR.get_protections(robot);
    obstacles = RUR.get_obstacles(x, y);
    if (obstacles) {
        for (obs of obstacles) {
            if (RUR.get_property(obs, "fatal")) {
                if (protections.indexOf(RUR.get_property(obs, "fatal")) === -1) {
                    if (RUR.THINGS[RUR.translate_to_english(obs)].message) {
                        return RUR.THINGS[RUR.translate_to_english(obs)].message;
                    } else {
                        return "Fatal obstacle needs message defined";
                    }
                }
            }
        }
    }
    // Both bridges and objects carried can offer protection
    // against some types of otherwise fatal background tiles; so let's
    // add any bridge protection
    protections = protections.concat(RUR.get_bridge_protections(x, y));
    tile = RUR.get_background_tile(x, y);
    // tile is a name; it could be a colour, which is never fatal.
    if (tile && RUR.THINGS[RUR.translate_to_english(tile)] !== undefined) {
        if (RUR.get_property(tile, "fatal")) {
            if (protections.indexOf(RUR.get_property(tile, "fatal")) === -1) {
                if (RUR.THINGS[RUR.translate_to_english(tile)].message) {
                    return RUR.THINGS[RUR.translate_to_english(tile)].message;
                } else {
                    return "Fatal tile needs message defined";
                }
            }
        }
    }
    // nothing fatal was found
    return false;
};


/** @function is_detectable_position
 * @memberof RUR
 * @instance
 * @desc For Reeborg to determine if a fatal "thing" is present (e.g., for
 * `front_is_clear()  to return `false/False`), the "thing" must have a
 * `detectable` attribute which evaluates to `true/True`.  This function returns
 * `true/True` if there is as least such a detectable "thing" at that position.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @returns `true` if this position is detectable by the robot, `false` otherwise
 */
RUR.is_detectable_position = function (x, y){
    "use strict";
    var tile, tiles;

    /* Both obstacles and background tiles can be detectable;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    // all tiles obtained so far are translated arguments
    if (tile && RUR.THINGS[RUR.translate_to_english(tile)] !== undefined) {
        tiles.push(tile);
    }
    for (tile of tiles) {
        // get_property, without a leading underscore, works for original language
        if (RUR.get_property(tile, "detectable")) {
            return true;
        }
    }
    return false;
};
