require("./../rur.js");
require("./../translator.js");
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
 * No check is performed to ensure that the value given is valid; it the
 * name is not recognized, it is assumed to be a colour.  There can be more
 * than one type of decorative object at a given location.  If a decorative
 * object with name "A" is already at a given location and this function is called
 * to add another, a message is logged to the console and nothing further is
 * done.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */
RUR.add_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    if (RUR.is_decorative_object(name, x, y)) {
        console.log(name + " is already there as a decorative object.");
        return;
    }
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"decorative_objects"};
    RUR._add_artefact(args);
    RUR.record_frame("RUR.add_decorative_object", args);
};


/** @function remove_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function removes a decorative object at a location.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no such decorative object to remove
 *        at that location
 */
RUR.remove_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args= {x:x, y:y, type:"decorative_objects", name:name};
    try {
        RUR._remove_artefact(args);
    } catch (e) {
        if (e.message == "No artefact to remove") {
            throw new RUR.ReeborgError("No decorative object to remove here.");
        } else {
            throw e;
        }
    }
    RUR.record_frame("RUR.remove_decorative_object", args);
};


/** @function get_decorative_objects
 * @memberof RUR
 * @instance
 * @summary This function returns a list/array of the decorative objects found
 * at a given position. If nothing is found at that location,
 *  an empty array is returned.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @returns An array containing the name of the decorative objects found at that location
 *
 */

RUR.get_decorative_objects = function (x, y) {
    "use strict";
    var i, result, objects, args = {x:x, y:y, type:"decorative_objects"};
    objects = RUR._get_artefacts(args);
    if (objects == null) {
        return [];
    }
    result = [];
    for (i=0; i < objects.length; i++){
        result.push(RUR.translate(objects[i]));
    }
    return result;
};

/** @function is_decorative_object
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if a named decorative object
 * is found at that location, `false/False` otherwise.
 *
 * @param {string} name Name of the object
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 *
 */

RUR.is_decorative_object = function (name, x, y) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"decorative_objects"};
    return RUR._get_nb_artefact(args) == 1;
};

