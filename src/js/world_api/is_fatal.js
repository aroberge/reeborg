require("./../rur.js");
require("./background_tile.js");
require("./bridges.js");
require("./obstacles.js");

/** @function get_protections
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @param {object} robot_body  robot body object
 *
 * @returns an array of protections
 */
RUR.get_protections = function (robot) {
    "use strict";
    var objects_carried, obj_type, protections;

    objects_carried = RUR.control.carries_object(robot);
    if (!objects_carried || !Object.keys(objects_carried)) {
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
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {object} robot_body  robot body object
 *
 * @desc This needs to be documented
 *
 * @returns The message to show if it is a fatal position, otherwise `false`.
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
            // Here, and below, we call RUR._get_property instead of
            // RUR.get_property since this uses the internal english names;
            // RUR.get_property assumes an untranslated argument.
            if (RUR._get_property(obs, "fatal")) {
                if (protections.indexOf(RUR._get_property(obs, "fatal")) === -1) {
                    if (RUR.THINGS[obs].message) {
                        return RUR.THINGS[obs].message;
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
    if (tile && RUR.THINGS[tile] !== undefined) {
        if (RUR._get_property(tile, "fatal")) {
            if (protections.indexOf(RUR._get_property(tile, "fatal")) === -1) {
                if (RUR.THINGS[tile].message) {
                    return RUR.THINGS[tile].message;
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
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @desc This needs to be documented
 *
 * @returns `true` if this position is detectable by the robot, `false` otherwise
 */
RUR.is_detectable_position = function (x, y){
    "use strict";
    var detectable, tile, tiles;

    /* Both obstacles and background tiles can be detectable;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    if (tile && RUR.THINGS[tile] !== undefined) {
        tiles.push(tile);
    }
    for (tile of tiles) {
        if (RUR._get_property(tile, "detectable")) {
            return true;
        }
    }
    return false;
};
