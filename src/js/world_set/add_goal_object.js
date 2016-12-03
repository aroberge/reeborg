require("./../exceptions.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");
require("./../translator.js");

/** @function add_goal_object_at_position
* @memberof RUR
* @instance
* @summary This function sets a specified quantity of a given object
* as a goal at a certain location.
* By "object" we mean a type of object that can be taken or put down by Reeborg.
*
* @desc Cette fonction spécifie la quantité d'un certain type d'objet qui doit être
* mis comme but à un endroit donné.
* Par "objet", on entend ici un objet qui peut être transporté ou déposé par Reeborg.
*
* @param {string} specific_object The name of the object type ; e.g. "token" <br>
*                        _Le nom du type de l'objet; par exemple, "jeton"._
* @param {integer} x - Position of the object
*                    <br> _position de l'objet_
* @param {integer} y - Position of the object
*                    <br> _position de l'objet_
* @param {integer} nb - Number of desired objects at that location;
*           a value of zero is used to remove any such goal set.
*           <br> _Nombre d'objets désiré à cet endroit;
*  une valeur de zéro est utilisée pour supprimer un but semblable pré-existant._
*
*/
RUR.add_goal_object_at_position = function (specific_object, x, y, nb){
    "use strict";
    var coords;
    specific_object = RUR.translate_to_english(specific_object);
    if (RUR.KNOWN_OBJECTS.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "goal");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal, "objects");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal.objects, coords);
    if (nb === 0) {
        try {
            delete RUR.CURRENT_WORLD.goal.objects[coords][specific_object];
        } catch (e) {}

        if (Object.keys(RUR.CURRENT_WORLD.goal.objects[coords]).length === 0){
            delete RUR.CURRENT_WORLD.goal.objects[coords];
            if (Object.keys(RUR.CURRENT_WORLD.goal.objects).length === 0){
                delete RUR.CURRENT_WORLD.goal.objects;
                if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0){
                    delete RUR.CURRENT_WORLD.goal;
                }
            }
        }
    } else {
        RUR.CURRENT_WORLD.goal.objects[coords][specific_object] = nb;
    }
    try {
        RUR.record_frame("debug", "add_goal_object_at_position");
    } catch (e) {}
};
