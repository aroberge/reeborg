require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");


/** @function add_pushable
 * @memberof RUR
 * @instance
 * @summary This function adds a named pushable at a location.
 *
 * @param {string} name The name of a the thing representing the pushable.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
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
RUR.add_pushable = function (name, x, y, options) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"pushables", single:true, valid_names: RUR.KNOWN_THINGS};
    if (RUR.get_pushable(x, y, options)) {
        throw new RUR.ReeborgError("There can be at most one pushable object at a given location.");
    }
    if (options && options.goal) {
        args.goal = options.goal;
    }
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_pushable", args);
};


/** @function remove_pushable
 * @memberof RUR
 * @instance
 * @summary This function removes a pushable at a location.
 *
 * **Assumption**: only one pushable allowed at a given location.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
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
RUR.remove_pushable = function (name, x, y, options) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"pushables", name:name, valid_names: RUR.KNOWN_THINGS};
    if (options && options.goal) {
        args.goal = options.goal;
    }
    RUR._remove_artefact(args);
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
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
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
RUR.get_pushable = function (x, y, options) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"pushables"};
    if (options && options.goal) {
        args.goal = options.goal;
    }
    tiles = RUR._get_artefacts(args);
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
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
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

RUR.is_pushable = function (name, x, y, options) {
    "use strict";
    var tile, args = {x:x, y:y, type:"pushables"};
    if (options && options.goal) {
        args.goal = options.goal;
    }
    tile = RUR._get_artefacts(args);
    return tile == name;
};


RUR.push_pushable = function (name, from_x, from_y, to_x, to_y) {
    recording_state = RUR.state.do_not_record;
    RUR.state.do_not_record = true;
    RUR.remove_pushable(name, from_x, from_y);
    RUR.add_pushable(name, to_x, to_y);
    RUR.state.do_not_record = recording_state;
};