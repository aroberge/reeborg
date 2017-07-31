require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");
require("./../utils/supplant.js");


/** @function add_pushable
 * @memberof RUR
 * @instance
 * @summary This function adds a named pushable at a location; there can only
 * be one pushable object at a given location.
 *
 * @param {string} name The name of a the "thing" representing the pushable.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y
 * @param {boolean} [options.goal] Indicate if this is to be set as a goal
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 * @throws Will throw an error if there is already a pushable object at that location,
 * unless this is done from code in the Onload editor in which case the
 * new pushable object replaces the old one and a message is written to the browser's
 * console.
 */
RUR.add_pushable = function (name, x, y, options) {
    "use strict";
    var args;
    name = RUR.translate_to_english(name);
    args = {name: name, x:x, y:y, type:"pushables", single:true, valid_names: RUR.KNOWN_THINGS};
    if (RUR.get_pushable(x, y)) {
        if (RUR.state.evaluating_onload) {
            console.log(name + " is replacing " + RUR.translate(RUR.get_pushable(x, y)) + " as a bridge.");
        } else {
            throw new RUR.ReeborgError(RUR.translate("There can be at most one pushable object at a given location."));
        }
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
 * @param {string} name The name of a the "thing" used as a pushable.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {boolean} [options.goal] Indicate if this is to be set as a goal
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if there is no such named pushable at that location.
 * @throws Will throw an error if `name` is not a known thing.
 *
 */
RUR.remove_pushable = function (name, x, y, options) {
    "use strict";
    var args, english_name;
    english_name = RUR.translate_to_english(name);
    args= {x:x, y:y, type:"pushables", name:english_name, valid_names: RUR.KNOWN_THINGS};
    if (options && options.goal) {
        args.goal = options.goal;
    }
    if (RUR.get_pushable(x, y, options) == name) {
        RUR._remove_artefact(args);
    } else {
        throw new RUR.ReeborgError("No pushable named <code>" + name + "</code> to remove here.");
    }
    RUR.record_frame("RUR.remove_pushable", args);
};


/** @function get_pushable
 * @memberof RUR
 * @instance
 * @summary This function returns the name of a pushable found at that location;
 *          If nothing is found at that location,`null` is returned
 *          (which is converted to `None` in Python programs.)
 *
 * @returns {string} The name of the pushable at that location, or `null`.
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @param {boolean} [options.goal] Indicate if this was set as a goal
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
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
        return RUR.translate(tiles[0]);
    }
};


/** @function is_pushable
 * @memberof RUR
 * @instance
 * @summary This function returns `true/True` if such a named pushable
 * (possibly a goal) is at that location, `false/False` otherwise.
 *
 * @param {integer} x  Position: `1 <= x <= max_x`
 * @param {integer} y  Position: `1 <= y <= max_y`
 * @returns {string} The name of the pushable at that location, or `null`.
 * @param {boolean} [options.goal] Indicate if we want a pushable goal
 *
 * @throws Will throw an error if `(x, y)` is not a valid location.
 * @throws Will throw an error if `name` is not a known thing.
 *
 */

RUR.is_pushable = function (name, x, y, options) {
    "use strict";
    if (RUR.KNOWN_THINGS.indexOf(RUR.translate_to_english(name)) == -1) {
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: name}))
    }
    return name == RUR.get_pushable(x, y, options);
};


// This function is kept private as it should not need to be used when
// creating worlds.
RUR._push_pushable = function (name, from_x, from_y, to_x, to_y) {
    recording_state = RUR.state.do_not_record;
    RUR.state.do_not_record = true;
    RUR.remove_pushable(name, from_x, from_y);
    RUR.add_pushable(name, to_x, to_y);
    RUR.state.do_not_record = recording_state;
};