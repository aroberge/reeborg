require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");

/** @function add_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function adds a decorative object at a specified location.
 *
 * @param {string} name The name of an object **or** a colour recognized by JS/HTML.
 *    No check is performed to ensure that the value given is valid; it the
 *    name is not recognized, it is assumed to be a colour.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
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
RUR.add_decorative_object = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"decorative_objects"};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_decorative_object", args);
};


/** @function remove_decorative_object
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
 *
 * @todo add test
 * @todo add examples
 * @todo deal with translation
 */
RUR.remove_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    args= {x:x, y:y, type:"decorative_objects", name:name};
    try {
        RUR._remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new ReeborgError("No tile to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_decorative_object", args);
};


/** @function get_decorative_objects
 * @memberof RUR
 * @instance
 * @summary This function gets the names of the decorative objects found
 * at a given position.
 * If nothing is found at that location,
 *    `null` is returned (which is converted to `None` in Python programs.)
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location..
 *
 * @todo add test
 * @todo add proper examples
 * @todo deal with translation
 * @example
 * // shows how to set various tiles;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/tile1.json", "Example 1")
 *
 */

RUR.get_decorative_objects = function (x, y) {
    "use strict";
    var args = {x:x, y:y, type:"decorative_objects"};
    return RUR._get_artefacts(args);
};

RUR.is_decorative_object = function (name, x, y) {
    "use strict";
    var args = {name: name, x:x, y:y, type:"decorative_objects"};
    return RUR._get_nb_artefact(args) == 1;
};

