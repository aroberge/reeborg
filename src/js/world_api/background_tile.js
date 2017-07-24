require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");


/** @function fill_background
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background for the entire world
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 * @todo add examples
 * @todo deal with translation
 */

RUR.fill_background = function(name) {
    var recording_state = RUR._recording_(false);
    for (x = 1; x <= RUR.MAX_X; x++) {
        for (y = 1; y <= RUR.MAX_Y; y++) {
            RUR.add_background_tile(name, x, y);
        }
    }
    RUR._recording_(recording_state);
    RUR.record_frame("RUR.fill_background", name);
};


/** @function add_background_tile
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background at a location.
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 * @todo add examples
 * @todo deal with translation
 *
 * @example
 *
 * // Show how to set a color
 * World("Alone")
 * RUR.add_background_tile("blue", 1, 8)
 * RUR.add_background_tile("#00ff00", 3, 8)
 * RUR.add_background_tile("rgb(255, 0, 0)", 5, 8)
 * RUR.add_background_tile("rgba(255, 0, 0, 0.1)", 7, 8)
 * RUR.add_background_tile("hsl(24, 71%, 77%)", 9, 8)
 *
 *
 */
RUR.add_background_tile = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"tiles", single:true};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_background_tile", args);
};


/** @function remove_background_tile
 * @memberof RUR
 * @instance
 * @summary This function removes a background tile at a location.
 *
 * @param {string} name Name of the tile
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_background_tile = function (name, x, y) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"tiles", name:name};
    try {
        RUR._remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new RUR.ReeborgError("No tile to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_background_tile", args);
};


/** @function get_background_tile
 * @memberof RUR
 * @instance
 * @summary This function gets the tile name found at given location. Note that
 *    this could be an HTML colour.  If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *  **Important** `RUR.get_background_tile` uses the singular form, instead
 * of the plural (i.e. `tile` instead of `tiles`) since there only one tile
 * can be found at a given location.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @returns {string} The name of the tile found at that location or `null/None`.
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 * @todo add proper examples
 * @todo deal with translation
 *
 */

RUR.get_background_tile = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"tiles"};
    tiles = RUR._get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return tiles[0];
    }
};


/** @function is_background_tile
 * @memberof RUR
 * @instance
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @todo add examples
 * @todo deal with translation
 * @todo write summary
 *
 * @example {@lang python}
 * no_highlight()
 * World("worlds/examples/simple_path.json", "simple_path")
 * while not at_goal():
 *     x, y = position_in_front()
 *     if RUR.is_background_tile("gravel", x, y):
 *         move()
 *     else:
 *         turn_left()
 */


RUR.is_background_tile = function (name, x, y) {
    "use strict";
    var tile, args = {x:x, y:y, type:"tiles"};
    tile = RUR.get_background_tile(x, y);
    if (tile === null) {
        return false;
    } else if (tile == name){
        return true;
    } else {
        return false;
    }
};


