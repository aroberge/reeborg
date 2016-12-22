require("./../exceptions.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");
require("./../utils/ensure_integer.js");
require("./../translator.js");

/** @function set_nb_goal_object_at_position
* @memberof RUR
* @instance
* @desc This function sets a specified quantity of a given object
* as a goal at a certain location.
* By **object** we mean a type of object that can be taken or put down by Reeborg.
*
 * @param {string} specific_object The name of the object type ; e.g. `"token"` 
 * @param {integer} x - Position of the object; must be greater than zero
 * @param {integer} y - Position of the object; must be greater than zero
 * @param {integer} nb - Number of desired objects at that location;
 *           a value of zero can be used to remove a previously set goal.
 *
 * @throws Will throw an error is `specific_object` is not known.
 * @throws Will throw an error if `x` or `y` is not a positive integer.
 * @throws Will throw an error if `nb` is not a positive integer or zero.
 *
 * @todo Ensure that it throws an error if tile does not have an image.
 *
 * @example
 * // This example shows how to add or remove objects, or object goals
 * // Make sure to allow it to replace the content of the editor.
 * // Upon loading this world, the programming language will be set
 * // to Python.
 * World("/worlds/examples/set_nb_object.json", "Set nb")
 *
 * @see {@link UnitTest#test_set_nb_goal_object_at_position} for unit tests.
*
*/
RUR.set_nb_goal_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords, cw, my_name;
    specific_object = RUR.translate_to_english(specific_object);
    my_name = "RUR.set_nb_goal_object_at_position(specific_object, x, y, nb): ";
    if (RUR.KNOWN_TILES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }
    RUR._ensure_positive_integer(x, my_name+"x");
    RUR._ensure_positive_integer(y, my_name+"y");
    RUR._ensure_positive_integer_or_zero(nb, my_name+"nb");

    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;

    RUR.utils.ensure_key_exists(cw, "goal");
    RUR.utils.ensure_key_exists(cw.goal, "objects");
    RUR.utils.ensure_key_exists(cw.goal.objects, coords);
    if (nb === 0) {
        try {
            delete cw.goal.objects[coords][specific_object];
        } catch (e) {}

        if (Object.keys(cw.goal.objects[coords]).length === 0){
            delete cw.goal.objects[coords];
            if (Object.keys(cw.goal.objects).length === 0){
                delete cw.goal.objects;
                if (Object.keys(cw.goal).length === 0){
                    delete cw.goal;
                }
            }
        }
    } else {
        cw.goal.objects[coords][specific_object] = nb;
    }
    try {
        RUR.record_frame("debug", "set_nb_goal_object_at_position");
    } catch (e) {}
};

/** @function add_goal_object_at_position
 * @memberof RUR
 * @instance
 *
 *
 * @deprecated Use {@link RUR#set_nb_goal_object_at_position} instead.
 */
RUR.add_goal_object_at_position = RUR.set_nb_goal_object_at_position;