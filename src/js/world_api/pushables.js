require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./../utils/artefact.js");
require("./../world_utils/get_world.js");

/** @function add_pushable
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a the tile representing the pushable.
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
RUR.add_pushable = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"pushables", valid_names:Object.keys(RUR.TILES)};
    RUR.utils.add_artefact(args);
    RUR.record_frame("RUR.add_pushable", args);
};


/** @function remove_pushable
 * @memberof RUR
 * @instance
 * @summary This function removes an pushable at a location.
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
RUR.remove_pushable = function (name, x, y) {
    "use strict";
    var args, pushables;
    pushables = RUR.get_pushables(x, y);
    if (pushables === null) {
        throw new ReeborgError("No pushables to remove here.");
    }
    args= {x:x, y:y, type:"pushables", name:name, valid_names:Object.keys(RUR.TILES)};
    RUR.utils.remove_artefact(args);
    RUR.record_frame("RUR.remove_pushable", args);
};


/** @function get_pushables
 * @memberof RUR
 * @instance
 * @summary This function returns a list of pushables found at that location;
 *          For worlds designed "normally", such a list should contain only
 *          one item since pushables cannot be pushed onto other pushables.
 *          If nothing is found at that location,`null` is returned 
 *          (which is converted to `None` in Python programs.)
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

RUR.get_pushables = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"pushables"};
    tiles = RUR.utils.get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles;
    }
};


RUR.is_pushable = function (name, x, y) {
    "use strict";
    var args={name:name, x:x, y:y, type:"pushables"};
    if (RUR.utils.get_nb_artefact(args) === 1) {
        return true;
    } else {
        return false;
    }
};

RUR.transform_pushable = function(name, x, y) {
    "use strict";
    var args={name:name, x:x, y:y}, others, tile, self, recording_state, tile_name;
    if (RUR.TILES[name].transform === undefined){
        return;
    }
    self = RUR.TILES[name];
    others = RUR.get_obstacles(x, y);
    if (others !== null){
        for (tile in self.transform) {
            if (others.indexOf(tile) !== -1) {
                recording_state = RUR.state.do_not_record;
                RUR.state.do_not_record = true;
                RUR.remove_pushable(name, x, y);
                if (self.transform[tile] === null) {
                    RUR.state.do_not_record = recording_state;
                    RUR.record_frame("RUR.transform_pushable", args);
                    return;
                } else {
                    RUR.add_obstacle(self.transform[tile], x, y);
                    RUR.state.do_not_record = recording_state;
                    RUR.record_frame("RUR.transform_pushable", args);
                    return;
                }
            }
        }
    }
    tile_name = RUR.get_background_tile(x, y);
    if (tile_name === null) {
        return;
    }  

    for (tile in self.transform) {
        if (tile == tile_name) {
            recording_state = RUR.state.do_not_record;
            RUR.state.do_not_record = true;
            RUR.remove_pushable(name, x, y);
            if (self.transform[tile] === null) {
                RUR.state.do_not_record = recording_state;
                RUR.record_frame("RUR.transform_pushable", args);
                return;
            } else {
                RUR.add_obstacle(self.transform[tile], x, y);
                RUR.state.do_not_record = recording_state;
                RUR.record_frame("RUR.transform_pushable", args);
                return;
            }
        }
    }
};