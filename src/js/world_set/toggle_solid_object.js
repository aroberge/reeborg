require("./../exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");
require("./../utils/supplant.js");

/** @function toggle_solid_object_at_position
 * @memberof RUR
 * @instance
 * @summary This function adds or remove a given solid object (like a fence)
 * at a certain location.
 *
 * @desc Cette fonction ajoute ou enlève un objet solide (comme une clôture) à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "fence" <br>
 *                        _Le nom [anglais] du type de l'objet; par exemple, "fence"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.toggle_solid_object_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    if (RUR.KNOWN_SOLID_OBJECTS.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.CURRENT_WORLD;
    RUR._ensure_key_exists(cw, "solid_objects");
    RUR._ensure_key_exists(cw.solid_objects, coords);

    if (cw.solid_objects[coords][specific_object]) {
        delete cw.solid_objects[coords][specific_object];
        if (Object.keys(cw.solid_objects[coords]).length === 0) {
            delete cw.solid_objects[coords];
            if (Object.keys(cw.solid_objects).length === 0) {
                delete cw.solid_objects;
            }
        }
    } else {
        cw.solid_objects[coords][specific_object] = true;
    }
};
