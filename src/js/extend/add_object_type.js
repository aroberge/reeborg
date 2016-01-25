
require("./../visible_world.js");
require("./../state.js");

/** @function add_new_object_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new objects. If the name
 *    of an existing object is specified again, the images for that object are
 *    replaced.  Two images must be provided: one for the object itself, and
 *    another when this object is specified as a goal. N.B. existing names
 *    are the English ones.
 *
 * @desc Cette fonction permet l'ajout de nouveaux objets.  Si le nom d'un
 *   objet existant est spécifié, les images pour cet objet seront remplacées
 *   par les nouvelles images fournies.  N.B. les noms d'objets par défaut sont
 *   des noms anglais (par exemple "token" plutôt que "jeton").
 *
 * @param {string} specific_object The name of the object type ; e.g. "mouse" <br>
 *                        _Le nom du type de l'objet; par exemple, "souris"._
 * @param {string} url - URL where the image can be found.
 *                    <br> _URL où l'image peut être trouvée_
 * @param {string} url_goal - URL where the image as a goal can be found.
 *                    <br> _URL où l'image comme but peut être trouvée_
 *
 */

RUR.add_new_object_type = function (name, url, url_goal) {
    var obj = RUR.objects;
    obj[name] = {};
    obj[name].image = new Image();
    obj[name].image_goal = new Image();
    obj[name].image.src = url;
    obj[name].image_goal.src = url_goal;
    if (RUR.state.ready) {
        obj[name].image.onload = RUR.vis_world.refresh;
        obj[name].image_goal.onload = RUR.vis_world.draw_goal;
    } else {
        obj[name].image.onload = increment_loaded;
        obj[name].image_goal.onload = increment_loaded;
    }
    if (RUR.KNOWN_OBJECTS.indexOf(name) === -1) {
        RUR.KNOWN_OBJECTS.push(name);
    }
    RUR._NB_IMAGES_TO_LOAD += 2;
};

increment_loaded = function () {
    RUR._NB_IMAGES_LOADED += 1;
};
// supporting worlds created previously.
RUR.add_object_image = RUR.add_new_object_type;
