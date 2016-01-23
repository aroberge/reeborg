require("./../exceptions.js");
require("./../utils/key_exist.js");
require("./../objects.js");
require("./../translator.js");

/** @function toggle_decorative_object_at_position
 * @memberof RUR
 * @instance
 * @summary This function adds or remove a given decorative object
 * at a certain location.
 *
 * @desc Cette fonction ajoute ou enlève un objet décoratif à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "token" <br>
 *                        _Le nom du type de l'objet; par exemple, "jeton"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.toggle_decorative_object_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    if (RUR.objects.known_objects.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.current_world;
    RUR._ensure_key_exists(cw, "decorative_objects");
    RUR._ensure_key_exists(cw.decorative_objects, coords);

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
