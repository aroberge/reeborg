require("./../rur.js");
require("./../translator.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function set_background
 * @memberof RUR
 * @instance
 *
 * @desc Uses a single image to fill the background. If the image is smaller
 * than the world, it is stretched to fill the entire world.
 * If it is larger than the world, it is cropped, with its bottom left corner
 * coinciding with the bottom left corner of the world.
 *
 * @param {string} url The url where the image is located.
 *
 */
RUR.set_background = function (url) {
    RUR.get_current_world().background_image = url;
    RUR.BACKGROUND_IMAGE.src = url;
    RUR.record_frame("RUR.set_background", url);

};

/** @function clear_background
 * @memberof RUR
 * @instance
 * @summary This function removes all existing background tiles
 *
 */

RUR.clear_background = function() {
    var world = RUR.get_current_world();
    world.tiles = {};
    RUR.record_frame("RUR.clear_background");
};


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
 */

RUR.fill_background = function(name) {
    var x, y, add, recording_state = RUR._recording_(false);
    if(RUR.KNOWN_THINGS.indexOf(RUR.translate_to_english(name)) === -1){
        add = RUR.add_colored_tile;
    } else {
        add = RUR.add_background_tile;
    }
    for (x = 1; x <= RUR.MAX_X; x++) {
        for (y = 1; y <= RUR.MAX_Y; y++) {
            add(name, x, y);
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
 * @param {string} name The name of a tile.
 * Any pre-existing tile or color at that location will be replaced by the new value.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 *
 */
RUR.add_background_tile = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"tiles", single:true, valid_names: RUR.KNOWN_THINGS};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_background_tile", args);
};

/** @function add_colored_tile
 * @memberof RUR
 * @instance
 * @summary This function sets a uniform color as background at a location.
 * Any pre-existing tile or color at that location will be replaced by the new value.
 *
 * @param {string} color A colour recognized by JS/HTML.
 * No check is performed to ensure that the value given is a valid color
 * recognized by JS/HTML (see example below), 
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 * @example
 *
 * // Show how to set a color
 * World("Alone")
 * RUR.add_colored_tile("blue", 1, 8)
 * RUR.add_colored_tile("#00ff00", 3, 8)
 * RUR.add_colored_tile("rgb(255, 0, 0)", 5, 8)
 * RUR.add_colored_tile("rgba(255, 0, 0, 0.1)", 7, 8)
 * RUR.add_colored_tile("hsl(24, 71%, 77%)", 9, 8)
 *
 */
RUR.add_colored_tile = function (color, x, y) {
    "use strict";
    var args;
    args = {name: color, x:x, y:y, type:"tiles", single:true};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_colored_tile", args);
};


/** @function add_background_path
 * @memberof RUR
 * @instance
 * @summary This function sets a named tile as background for a path
 *
 * @param {string} name The name of a tile **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    tile name is not recognized, it is assumed to be a colour. If a new tile
 *    is set at that location, it replaces the pre-existing one.
 *
 * @param {array} path A Javascript Array (or Python list) whose items are
 * arrays of the form [x, y].
 *
 */

RUR.add_background_path = function(name, path) {
    var i, x, y, add, recording_state = RUR._recording_(false);
    if(RUR.KNOWN_THINGS.indexOf(RUR.translate_to_english(name)) === -1){
        add = RUR.add_colored_tile;
    } else {
        add = RUR.add_background_tile;
    }
    for (i=0; i<path.length; i++){
        x = path[i][0];
        y = path[i][1];
        add(name, x, y);
    }
    RUR._recording_(recording_state);
    RUR.record_frame("RUR.add_background_path", {name:name, path: path});
};


/** @function remove_background_tile
 * @memberof RUR
 * @instance
 * @summary This function removes a background tile (or a colored tile) at a location.
 *
 * @param {string} name Name of the tile or colored tile
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no background tile to remove
 *        at that location
 */
RUR.remove_background_tile = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
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
 */

RUR.get_background_tile = function (x, y) {
    "use strict";
    var tiles, args = {x:x, y:y, type:"tiles"};
    tiles = RUR._get_artefacts(args);
    if (tiles === null) {
        return null;
    } else {
        return RUR.translate(tiles[0]);
    }
};


/** @function is_background_tile
 * @memberof RUR
 * @instance
 *
 * @summary Use to find out if there is a tile (including color) with that
 * name at a given location.
 *
 * @param {string} name The name of the tile; it could be a color.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @returns `true/True` if there is such a named tile at that location,
 * `false/False` otherwise.
 *
 *
 * @example {@lang python}
 * # A very different solution ...
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
    var tile;
    tile = RUR.get_background_tile(x, y); // returns translated name
    if (tile === null) {
        return false;
    } else if (tile == name){
        return true;
    } else {
        return false;
    }
};


