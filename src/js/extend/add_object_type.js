require("./../rur.js");
require("./../init/images_onload.js");


/** @function add_object_type
 * @memberof RUR
 * @instance
 * @summary This function makes it possible to add new objects. If the name
 *    of an existing object is specified again, it is replaced by a new one
 *    which may have completely different characteristics.
 *
 * @desc Cette fonction permet l'ajout de nouveaux tuiles.  Si le nom d'une
 *   tuile existante est spécifiée, elle est remplacée par la nouvelle qui pourrait
 *   avoir des caractéristiques complètement différentes.
 *   N.B. les noms de tuiles par défaut sont
 *   des noms anglais (par exemple "grass" plutôt que "gazon").
 *
 * @param {Object} object A Javascript object (similar to a Python dict) that
 *                      describes the properties of the obj. <br>
 *                      _Un objet javascript (similaire à un dict en Python)
 *                      qui décrit les propriétés de la tuile._
 *
 * @param {string} obj.name  The unique name to be given to the obj. <br>
 *                            _Le nom unique donné à la tuile_
 *
 * @param {string} [obj.public_name] If various objects are meant to represent
 *                                    the same type of object (e.g. different shades of "grass")
 *                                    this attribute can be used to specify that single name.
 *
 * @param {string} [obj.url] If a single image is used, this indicated the source.
 *                            **Either obj.url or obj.images must be specified.**
 *
 * @param {string[]} [obj.images] If multiple images are used (for animated objects),
 *                               this array (list) contains the various URLs.
 *                            **Either obj.url or obj.images must be specified.**
 *
 * @param {string} [obj.selection_method = "random"]  For animated objects; choose one of
 *                           "sync", "ordered" or "random"
 *
 * @param {boolean} [obj.fatal] Program ends if Reeborg steps on such a object set to "true".
 *
 * @param {boolean} [obj.detectable] If `obj.fatal == obj.detectable == True`, Reeborg can
 *                                    detect with `front_is_clear()` and `right_is_clear()`.
 *
 * @param {boolean} [obj.solid] If sets to "true", prevents a box from sliding onto this obj.
 *
 * @param {boolean} [obj.slippery] If sets to "true", Reeborg will keep going to next object if
 *                                  it attempts to move on this obj.
 *
 * @example
 * // This first example shows how to set various objects;
 * // the mode will be set to Python and the highlighting
 * // will be turned off
 * World("/worlds/examples/object1.json", "Example 1")
 *
 * // A second example shows how one can change objects behaviour.
 * // A possible usage of this would be to have Reeborg wear crampons
 * // so that it does not slip on the ice.
 * World("/worlds/examples/object2.json", "Example 2")
 */
RUR.OBJECTS = {};

RUR.add_object_type = function (new_obj) {
    "use strict";
    var i, key, keys, name, obj;
    name = new_obj.name;
    if (RUR.KNOWN_OBJECTS.indexOf(new_obj.name) != -1) {
        console.log("Warning: object name " + name + " already exists");
    } else {
        RUR.KNOWN_OBJECTS.push(name);
    }
    RUR.OBJECTS[name] = {};
    // copy all properties
    keys = Object.keys(new_obj);
    obj = RUR.OBJECTS[name];
    for(i=0; i < keys.length; i++){
        key = keys[i];
        obj[key] = new_obj[key];
    }
    // Object image: either a single image or a list for animation.
    if (obj.url) {
        obj.image = new Image();
        obj.image.src = obj.url;
        RUR.images_onload(obj.image);
    } else if (obj.images) {
        for (i=0; i < obj.images.length; i++){
            obj["image"+i] = new Image();
            obj["image"+i].src = obj.images[i];
            RUR.images_onload(obj["image"+i]);
        }
        if (obj.selection_method === "sync") {
            obj.choose_image = function (coords) {
                return _sync(obj, obj.images.length, coords);
            };
        } else if (obj.selection_method === "ordered") {
            obj.choose_image = function (coords) {
                return _ordered(obj, obj.images.length, coords);
            };
        } else {
            obj.choose_image = function (coords) {
                return _random(obj, obj.images.length);
            };
        }
    } else {
        alert("Fatal error: need either obj.url or a list: obj.images");
    }

    // Object goal (not required for decorative objects): either
    // a single url or a list for animated images.
    if (obj.url_goal) {
        obj.image_goal = new Image();
        obj.image_goal.src = obj.url_goal;
        RUR.images_onload(obj.image_goal);
    } else if (obj.images_goal) {
        for (i=0; i < obj.images_goal.length; i++){
            obj["image_goal"+i] = new Image();
            obj["image_goal"+i].src = obj.images_goal[i];
            RUR.images_onload(obj["image_goal"+i]);
        }
        if (obj.selection_method_goal === "sync") {
            obj.choose_image = function (coords) {
                return _sync(obj, obj.images_goal.length, coords);
            };
        } else if (obj.selection_method_goal === "ordered") {
            obj.choose_image = function (coords) {
                return _ordered(obj, obj.images_goal.length, coords);
            };
        } else {
            obj.choose_image = function (coords) {
                return _random(obj, obj.images_goal.length);
            };
        }
    }
};

_random = function (obj, nb) {
    // each object is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return obj["image" + choice];
};
_ordered = function (obj, nb, coords) {
    // each object is given a random initial value but then goes in order

    if (RUR._ORDERED_OBJECTS[obj.name] === undefined) {
        RUR._ORDERED_OBJECTS[obj.name] = {};
        RUR._ORDERED_OBJECTS[obj.name][coords] = Math.floor(Math.random() * nb);
    } else if (Object.keys(RUR._ORDERED_OBJECTS[obj.name]).indexOf(coords) === -1) {
        RUR._ORDERED_OBJECTS[obj.name][coords] = Math.floor(Math.random() * nb);
    } else {
        RUR._ORDERED_OBJECTS[obj.name][coords] += 1;
        RUR._ORDERED_OBJECTS[obj.name][coords] %= nb;
    }
    return obj["image" + RUR._ORDERED_OBJECTS[obj.name][coords]];
};
_sync = function (obj, nb, coords) {
    // every object of this type is kept in sync
    if (RUR._SYNC_OBJECTS[obj.name] === undefined) {
        RUR._SYNC_OBJECTS[obj.name] = [];
        RUR._SYNC_OBJECTS_VALUE[obj.name] = 1;
    } else if (RUR._SYNC_OBJECTS[obj.name].indexOf(coords) !== -1) {
        // see a same object present: we are starting a new sequence
        RUR._SYNC_OBJECTS[obj.name] = [];
        RUR._SYNC_OBJECTS_VALUE[obj.name] += 1;
        RUR._SYNC_OBJECTS_VALUE[obj.name] %= nb;
    }
    RUR._SYNC_OBJECTS[obj.name].push(coords);
    return obj["image" + RUR._SYNC_OBJECTS_VALUE[obj.name]];
};


// supporting worlds created previously.
// TODO  see if this is still needed when Vincent Maille's book is published.
//
RUR.add_new_object_type = function (name, url, url_goal) {
    RUR.add_object_type({"name": name, "url": url, "url_goal":url_goal});
};
