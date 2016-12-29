require("./../programming_api/exceptions.js");
require("./../translator.js");
require("./../utils/key_exist.js");
require("./../utils/supplant.js");
require("./../world_utils/get_world.js");

/** @function toggle_decorative_object_at_position
 * @memberof RUR
 * @instance
 * @summary This function adds or remove a given decorative object
 * at a certain location.
 *
 * @desc Cette fonction ajoute ou enlève un objet décoratif à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "token" <br>
 *                        _Le nom (anglais) du type de l'objet; par exemple, "token"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.toggle_decorative_object_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    specific_object = RUR.translate_to_english(specific_object);
    if (RUR.KNOWN_TILES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.get_world();
    RUR.utils.ensure_key_for_obj_exists(cw, "decorative_objects");
    RUR.utils.ensure_key_for_obj_exists(cw.decorative_objects, coords);

    if (cw.decorative_objects[coords][specific_object]) {
        delete cw.decorative_objects[coords][specific_object];
        if (Object.keys(cw.decorative_objects[coords]).length === 0) {
            delete cw.decorative_objects[coords];
            if (Object.keys(cw.decorative_objects).length === 0) {
                delete cw.decorative_objects;
            }
        }
    } else {
        cw.decorative_objects[coords][specific_object] = true;
    }
};
