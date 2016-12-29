require("./../programming_api/exceptions.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../translator.js");
require("./../recorder/record_frame.js");

require("./../world_utils/get_world.js");

/** @function set_nb_object_at_position
 * @memberof RUR
 * @instance
 * @desc This function sets a specified quantity of a given object
 * at a certain location.
 * By **object** we mean a type of object that can be taken or put down by Reeborg.
 *
 *
 * @param {string} specific_object The name of the object type ; e.g. `"token"` 
 * @param {integer} x - Position of the object; must be greater than zero
 * @param {integer} y - Position of the object; must be greater than zero
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *
 * @throws Will throw an error is `specific_object` is not known.
 * @throws Will throw an error if `x` or `y` is not a positive integer.
 * @throws Will throw an error if `nb` is not a positive integer or zero.
 *
 * @example
 * // This example shows how to add or remove objects, or object goals
 * // Make sure to allow it to replace the content of the editor.
 * // Upon loading this world, the programming language will be set
 * // to Python.
 * World("/worlds/examples/set_nb_object.json", "Set nb")
 *
 * @see {@link UnitTest#test_set_nb_object_at_position} for unit tests.
 */

RUR.set_nb_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords, cw, my_name;
    specific_object = RUR.translate_to_english(specific_object);
    my_name = "RUR.set_nb_object_at_position(specific_object, x, y, nb)";
    if (RUR.KNOWN_TILES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }
    if (!RUR.utils.is_valid_position(x, y)) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid position in {fn_name}").supplant({fn_name: my_name}));
    }
    if (!(RUR.utils.is_integer(nb) && nb>=0)) {
        throw new RUR.ReeborgError(
            RUR.translate("Invalid number of objects in {fn_name}").supplant({fn_name: my_name}));
    }

    coords = x + "," + y;
    cw = RUR.get_world();
    RUR.utils.ensure_key_for_obj_exists(cw, "objects");
    RUR.utils.ensure_key_for_obj_exists(cw.objects, coords);
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
 * @deprecated Use {@link RUR#set_nb_object_at_position} instead.
 */
RUR.add_object_at_position = RUR.set_nb_object_at_position;
