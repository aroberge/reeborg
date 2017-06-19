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
 * @param {object} robot Determine if robot or robot body.
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
        obj_type = RUR.translate_to_english(obj_type);
        if (RUR.TILES[obj_type] !== undefined && RUR.TILES[obj_type].protections !== undefined) {
            protections = protections.concat(RUR.TILES[obj_type].protections);
        }
    }

    return protections;
};

/** @function is_fatal_position
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @returns The message to show.
 */
RUR.is_fatal_position = function (x, y, robot){
    "use strict";
    // protections is from objects carried by the robot
    var protections, tile, tiles;

    protections = RUR.get_protections(robot);
    /* Both obstacles and background tiles can be fatal;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    // tile is a name; it could be a colour, which is never fatal.
    if (tile && RUR.TILES[tile] !== undefined) {
        tiles.push(tile);
    }

    // both existing bridges and objects carried can offer protection
    // against some types of otherwise fatal obstacles

    protections = protections.concat(RUR.get_bridge_protections(x, y));
    for (tile of tiles) {
        if (RUR.get_property(tile, "fatal")) {
            if (protections.indexOf(RUR.TILES[tile].fatal) === -1) {
                if (RUR.TILES[tile].message) {
                    return RUR.TILES[tile].message;
                } else {
                    return "Fatal tile needs message defined";
                }
            }
        }
    }
    return false;
};


/** @function is_detectable
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @returns The message to show.
 */
RUR.is_detectable = function (x, y){
    "use strict";
    var detectable, tile, tiles;

    /* Both obstacles and background tiles can be detectable;
       we combine both in a single array here */

    tiles = RUR.get_obstacles(x, y);
    if (!tiles) {
        tiles = [];
    }
    tile = RUR.get_background_tile(x, y);
    if (tile && RUR.TILES[tile] !== undefined) {
        tiles.push(tile);
    }
    for (tile of tiles) {
        if (RUR.get_property(tile, "detectable")) {
            return true;
        }
    }
    return false;
};

/** @function is_fatal_thing
 * @memberof RUR
 * @instance
 *
 * @desc This needs to be documented
 *
 * @returns The message to show.
 */
RUR.is_fatal_thing = function (name){
    name = RUR.translate_to_english(name);
    if (RUR.get_property(name, 'fatal')) {
        return true;
    }
    return false;
}