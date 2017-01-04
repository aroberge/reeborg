/* This file contains methods used to create animated images by creating
   the appropriate selection sequence from a list of images.
 */

require("./../rur.js");

RUR.animated_images_init = function () {
    RUR._ORDERED = {};
    RUR._SYNC = {};
    RUR._SYNC_VALUE = {};
    RUR._CYCLE_STAY = {};
    RUR._CYCLE_REMOVE = {};
    RUR.ANIMATION_TIME = 120;
};

RUR._NB_IMAGES_TO_LOAD = 0;
RUR._NB_IMAGES_LOADED = 0;
RUR._incremented_loaded_images = function () {
    RUR._NB_IMAGES_LOADED += 1;
};

/* Important: we need to use a method from visible_world.js ONLY after
   the session is initialized; at that point, we know that visible_world.js
   has been loaded and we know it will be available even if we don't
   put it as a formal requirement.  If we were to put it as a requirement,
   we would end up with a circular requirement (e.g. animated_images.js require
   visible_world.js which require animated_images.js) with unpredictable consequences.
*/
RUR.images_onload = function (image) {
    if (RUR.vis_world !== undefined) {
        image.onload = RUR.vis_world.refresh;
    } else {
        RUR._NB_IMAGES_TO_LOAD += 1;
        image.onload = RUR._incremented_loaded_images;
    }
};

RUR.animate_images = function (obj) {
    for (i=0; i < obj.images.length; i++){
        obj["image"+i] = new Image();
        obj["image"+i].src = obj.images[i];
        RUR.images_onload(obj["image"+i]);
    }
    if (obj.selection_method === "sync") {
        obj.choose_image = function (id) {
            return RUR._sync(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "ordered") {
        obj.choose_image = function (id) {
            return RUR._ordered(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "cycle stay") {
        obj.choose_image = function (id) {
            return RUR._cycle_stay(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "cycle remove") {
        obj.choose_image = function (id) {
            return RUR._cycle_remove(obj, obj.images.length, id);
        };
    } else {
        obj.choose_image = function (id) {
            return RUR._random(obj, obj.images.length);
        };
    }
};


RUR._random = function (obj, nb) {
    // each animated image is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return obj["image" + choice];
};

RUR._ordered = function (obj, nb, id) {
    // each animated image is given a random initial value but then goes in order
    if (RUR._ORDERED[obj.name] === undefined) {
        RUR._ORDERED[obj.name] = {};
        RUR._ORDERED[obj.name][id] = Math.floor(Math.random() * nb);
    } else if (Object.keys(RUR._ORDERED[obj.name]).indexOf(id) === -1) {
        RUR._ORDERED[obj.name][id] = Math.floor(Math.random() * nb);
    } else {
        RUR._ORDERED[obj.name][id] += 1;
        RUR._ORDERED[obj.name][id] %= nb;
    }
    return obj["image" + RUR._ORDERED[obj.name][id]];
};

RUR._cycle_stay = function (obj, nb, id) {
    // each animated image starts with its first image,
    // cycles through all the values once, displaying the last
    // image as a permanent one.
    if (RUR._CYCLE_STAY[obj.name] === undefined) {
        RUR._CYCLE_STAY[obj.name] = {};
        RUR._CYCLE_STAY[obj.name][id] = 0;
    } else if (Object.keys(RUR._CYCLE_STAY[obj.name]).indexOf(id) === -1) {
        RUR._CYCLE_STAY[obj.name][id] = 0;
    } else {
        RUR._CYCLE_STAY[obj.name][id] += 1;
        RUR._CYCLE_STAY[obj.name][id] = Math.min(nb-1, RUR._CYCLE_STAY[obj.name][id]);
    }
    return obj["image" + RUR._CYCLE_STAY[obj.name][id]];
};

RUR._cycle_remove = function (obj, nb, id) {
    // each animated image starts with its first image,
    // cycles through all the values once, and, after displaying the last
    // image, returns a "flag" instructing the calling function
    // to remove the object
    if (RUR._CYCLE_REMOVE[obj.name] === undefined) {
        RUR._CYCLE_REMOVE[obj.name] = {};
        RUR._CYCLE_REMOVE[obj.name][id] = 0;
    } else if (Object.keys(RUR._CYCLE_REMOVE[obj.name]).indexOf(id) === -1) {
        RUR._CYCLE_REMOVE[obj.name][id] = 0;
    } else {
        RUR._CYCLE_REMOVE[obj.name][id] += 1;
    }
    if (RUR._CYCLE_REMOVE[obj.name][id] >= nb) {
        return RUR.END_CYCLE;
    }
    return obj["image" + RUR._CYCLE_REMOVE[obj.name][id]];
};

RUR._sync = function (obj, nb, id) {
    // every animated image of this type is kept in sync
    if (RUR._SYNC[obj.name] === undefined) {
        RUR._SYNC[obj.name] = [];
        RUR._SYNC_VALUE[obj.name] = 1;
    } else if (RUR._SYNC[obj.name].indexOf(id) !== -1) {
        // see an same animated image present: we are starting a new sequence
        RUR._SYNC[obj.name] = [];
        RUR._SYNC_VALUE[obj.name] += 1;
        RUR._SYNC_VALUE[obj.name] %= nb;
    }
    RUR._SYNC[obj.name].push(id);
    return obj["image" + RUR._SYNC_VALUE[obj.name]];
};
