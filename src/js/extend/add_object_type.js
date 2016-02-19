require("./../rur.js");
require("./../state.js");

/* We do not have
       require("./../visible_world.js");
   since it is only needed when the session is initialized;
   this can help prevent a circular import without needing to create two
   functions: we can use RUR.add_new_object_type for adding "default" objects,
   as part of the initializing sequence, as it does not require visible_world.
   However, visible_world requires RUR.OBJECTS which is defined here for
   convenience.
 */

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
RUR.OBJECTS = {};

RUR.add_new_object_type = function (name, url, url_goal) {
    var obj = RUR.OBJECTS;
    obj[name] = {};
    obj[name].image = new Image();
    obj[name].image_goal = new Image();
    obj[name].image.src = url;
    obj[name].image_goal.src = url_goal;
    if (RUR.state.session_initialized) {
        obj[name].image.onload = RUR.vis_world.refresh;
        obj[name].image_goal.onload = RUR.vis_world.draw_goal;
    } else {
        obj[name].image.onload = RUR.INCREMENT_LOADED_FN;
        obj[name].image_goal.onload = RUR.INCREMENT_LOADED_FN;
    }
    if (RUR.KNOWN_OBJECTS.indexOf(name) === -1) {
        RUR.KNOWN_OBJECTS.push(name);
    }
    RUR._NB_IMAGES_TO_LOAD += 2;
};

// supporting worlds created previously.
// TODO  see if this is still needed when Vincent Maille's book is published.
RUR.add_object_image = RUR.add_new_object_type;
