require("./../rur.js");
require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");
require("./../utils/validator.js");

/** @function give_object_to_robot
 * @memberof RUR
 * @instance
 * @summary Give a specified number of object to a robot (body). If the robot,
 *     is not specified, the default robot is used.
 *
 * @desc Donne un nombre d'objet à transporter par le robot (robot.body).
 *    Si le robot n'est pas spécifié, le robot par défaut est utilisé.
 *
 * @param {string} obj The name of the object type ; e.g. "token" <br>
 *                        _Le nom du type de l'objet; par exemple, "jeton"._
 * @param {integer} nb - Number of objects at that location;
 *           a value of zero is used to remove objects.
 *           <br> _Nombre d'objets à cet endroit;
 *           une valeur de zéro est utilisée pour supprimer les objets._
 * @param {robot.body} [robot] - Optional argument
 *                    <br> _argument optionnel_
 */

RUR.give_object_to_robot = function (obj, nb, robot) {
    var _nb, world=RUR.get_world(), translated_arg=RUR.translate_to_english(obj);

    if (RUR.KNOWN_THINGS.indexOf(translated_arg) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: obj}));
    }

    obj = translated_arg;
    if (robot === undefined){
        robot = world.robots[0];
    }
    RUR.utils.ensure_key_for_obj_exists(robot, "objects");

    _nb = RUR.utils.filterInt(nb);
    if (_nb >= 0) {
        if (_nb !== 0) {
            robot.objects[obj] = _nb;
        } else if (robot.objects[obj] !== undefined) {
            delete robot.objects[obj];
        }
    } else {
        RUR.show_feedback("#Reeborg-shouts", nb + RUR.translate(" is not a valid value!"));
    }
};
