require("./../exceptions.js");
require("./../utils/key_exist.js");
require("./../objects.js");
require("./../translator.js");

/** @function add_object_at_position
 * @memberof RUR
 * @instance
 * @summary This function sets a specified quantity of a given object
 * at a certain location.
 * By "object" we mean a type of object that can be taken or put down by Reeborg.
 *
 * @desc Cette fonction spécifie la quantité d'un certain type d'objet qui doit être
 * mis à un endroit donné.
 * Par "objet", on entend ici un objet qui peut être transporté ou déposé par Reeborg.
 *
 * @param {string} specific_object The name of the object type ; e.g. "token" <br>
 *                        _Le nom du type de l'objet; par exemple, "jeton"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *           <br> _Nombre d'objets à cet endroit;
 *           une valeur de zéro est utilisée pour supprimer les objets._
 *
 */
RUR.add_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords, cw;
    if (RUR.objects.known_objects.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;
    cw = RUR.current_world;
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
};
