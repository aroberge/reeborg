require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./../utils/artefact.js");
require("./../world_utils/get_world.js");
// require("./obstacles.js");
// require("./background_tile.js");

/** @function add_pushable
 * @memberof RUR
 * @instance
 * @summary This function adds a named pushable at a location.
 *
 * @param {string} name The name of a the tile representing the pushable.
 *
 * @param {string} name Name.
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is another pushable already at that location.
 *
 * @todo add test
 * @todo add better examples
 * @todo deal with translation
 * @todo **Important** Add goal for pushables
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */
RUR.add_pushable = function (name, x, y) {
    "use strict";
    var pushable, args = {name: name, x:x, y:y, type:"pushables", valid_names:Object.keys(RUR.TILES)};
    pushable = RUR.get_pushable(x, y);
    if (pushable !== null) {
        throw new ReeborgError("There can be at most one pushable object at a given location.");
    }
    RUR.utils.add_artefact(args);
    RUR.record_frame("RUR.add_pushable", args);
};


/** @function remove_pushable
 * @memberof RUR
 * @instance
 * @summary This function removes a pushable at a location.
 *
 * **Assumption**: only one pushable allowed at a given location.
 *
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no pushable
 *        
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 * 
 *
 */
RUR.remove_pushable = function (name, x, y) {
    "use strict";
    var args, pushable;
    pushable = RUR.get_pushable(x, y);
    if (pushable === null) {
        throw new ReeborgError("No pushable to remove here.");
    }
    args= {x:x, y:y, type:"pushables", name:name, valid_names:Object.keys(RUR.TILES)};
    RUR.utils.remove_artefact(args);
    RUR.record_frame("RUR.remove_pushable", args);
};


/** @function get_pushable
 * @memberof RUR
 * @instance
 * @summary This function returns the name of a pushable found at that location;
 *          For worlds designed "normally", such a list should contain only
 *          one item since pushables cannot be pushed onto other pushables.
 *          If nothing is found at that location,`null` is returned 
 *          (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 * @returns {string} The name of the pushable at that location, or `null`.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
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

RUR.get_pushable = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"pushables"};
    tiles = RUR.utils.get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles[0];
    }
};
/** @function is_pushable
 * @memberof RUR
 * @instance
 * @summary This function returns the name of a pushable found at that location;
 *          For worlds designed "normally", such a list should contain only
 *          one item since pushables cannot be pushed onto other pushables.
 *          If nothing is found at that location,`null` is returned 
 *          (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position.
 * @param {integer} y  Position.
 * @returns {string} The name of the pushable at that location, or `null`.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
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

RUR.is_pushable = function (name, x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"pushables"};
    tile = RUR.utils.get_artefacts(args);
    return tile == name;
};


RUR.push_pushable = function (name, from_x, from_y, to_x, to_y) {
    recording_state = RUR.state.do_not_record;
    RUR.state.do_not_record = true;
    RUR.remove_pushable(name, from_x, from_y);
    RUR.add_pushable(name, to_x, to_y);
    RUR.state.do_not_record = recording_state;
};