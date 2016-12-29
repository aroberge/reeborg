require("./../programming_api/exceptions.js");
require("./../utils/key_exist.js");
require("./../translator.js");
require("./../utils/supplant.js");
require("./../world_utils/get_world.js");

/** @function toggle_obstacle_at_position
 * @memberof RUR
 * @instance
 * @summary This function adds or removes a given solid object (like a fence)
 * at a certain location.
 *
 * @desc Cette fonction ajoute ou enlève un objet solide (comme une clôture) à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "fence_right" <br>
 *                        _Le nom [anglais] du type de l'objet; par exemple, "fence_right"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.toggle_obstacle_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    if (RUR.KNOWN_TILES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.get_world();
    RUR.utils.ensure_key_for_obj_exists(cw, "obstacles");
    RUR.utils.ensure_key_for_obj_exists(cw.obstacles, coords);

    if (cw.obstacles[coords][specific_object]) {
        delete cw.obstacles[coords][specific_object];
        if (Object.keys(cw.obstacles[coords]).length === 0) {
            delete cw.obstacles[coords];
            if (Object.keys(cw.obstacles).length === 0) {
                delete cw.obstacles;
            }
        }
    } else {
        cw.obstacles[coords][specific_object] = true;
    }
};

/** @function add_obstacle_at_position
 * @memberof RUR
 * @instance
 * @summary This function adds a given solid object (like a fence)
 * at a certain location.
 *
 * @desc Cette fonction ajoute un objet solide (comme une clôture) à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "fence_right" <br>
 *                        _Le nom [anglais] du type de l'objet; par exemple, "fence_right"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.add_obstacle_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    if (RUR.KNOWN_TILES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.get_world();
    RUR.utils.ensure_key_for_obj_exists(cw, "obstacles");
    RUR.utils.ensure_key_for_obj_exists(cw.obstacles, coords);

    if (cw.obstacles[coords][specific_object]) {
        RUR.output.print_html("<h2>Warning</h2><p>" +
            specific_object +
            " is already present at the requested location.</p>");
    } else {
        cw.obstacles[coords][specific_object] = true;
    }
};

/** @function remove_obstacle_at_position
 * @memberof RUR
 * @instance
 * @summary This function removes a given solid object (like a fence)
 * at a certain location.
 *
 * @desc Cette fonction enlève un objet solide (comme une clôture) à un endroit donné.
 *
 * @param {string} specific_object The name of the object type ; e.g. "fence_right" <br>
 *                        _Le nom [anglais] du type de l'objet; par exemple, "fence_right"._
 * @param {integer} x - Position of the object
 *                    <br> _position de l'objet_
 * @param {integer} y - Position of the object
 *                    <br> _position de l'objet_
 */

RUR.remove_obstacle_at_position = function (specific_object, x, y){
    "use strict";
    var coords, cw;
    if (RUR.KNOWN_TILES.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant(
                                                 {obj: specific_object}));
    }
    coords = x + "," + y;
    cw = RUR.get_world();
    RUR.utils.ensure_key_for_obj_exists(cw, "obstacles");
    RUR.utils.ensure_key_for_obj_exists(cw.obstacles, coords);

    if (cw.obstacles[coords][specific_object]) {
        delete cw.obstacles[coords][specific_object];
        if (Object.keys(cw.obstacles[coords]).length === 0) {
            delete cw.obstacles[coords];
            if (Object.keys(cw.obstacles).length === 0) {
                delete cw.obstacles;
            }
        }
    } else {
        RUR.output.print_html("<h2>Warning</h2><p>" +
            specific_object +
            " is <b>not</b> present at the requested location.</p>");
        cw.obstacles[coords][specific_object] = true;
    }
};
