require("./../exceptions.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");
require("./../translator.js");

/** @function set_nb_object_at_position
 * @memberof RUR
 * @instance
 * @desc This function sets a specified quantity of a given object
 * at a certain location.
 * By "object" we mean a type of object that can be taken or put down by Reeborg.
 *
 *
 * @param {string} specific_object The name of the object type ; e.g. "token" 
 * @param {integer} x - Position of the object
 * @param {integer} y - Position of the object
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *
 *  @see {@link module:tests/world_set/test_set_objects} for unit tests
 */

RUR.set_nb_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords, cw;
    specific_object = RUR.translate_to_english(specific_object);
    if (RUR.KNOWN_OBJECTS.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;
    RUR._ensure_key_exists(cw, "objects");
    RUR._ensure_key_exists(cw.objects, coords);
    if (nb !== 0) {
        cw.objects[coords][specific_object] = nb;
    } else {
        try {
            delete cw.objects[coords][specific_object];
        } catch (e) {}
        if (Object.keys(cw.objects[coords]).length === 0){
            delete cw.objects[coords];
        }
    }
    RUR.record_frame("debug", "set_nb_object_at_position");
};

/** @function add_object_at_position
 * @memberof RUR
 * @instance
 *
 *
 * @deprecated Use {@link RUR#set_nb_object_at_position} instead
 */
RUR.add_object_at_position = RUR.set_nb_object_at_position;
