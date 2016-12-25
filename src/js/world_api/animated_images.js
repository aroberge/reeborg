require("./../rur.js");

var _ORDERED, _SYNC, _SYNC_VALUE;

exports.images_init = images_init = function () {
    _ORDERED = {};
    _SYNC = {};
    _SYNC_VALUE = {};
    _CYCLE_STAY = {};
    _CYCLE_REMOVE = {};
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

    if (_ORDERED[obj.name] === undefined) {
        _ORDERED[obj.name] = {};
        _ORDERED[obj.name][id] = Math.floor(Math.random() * nb);
    } else if (Object.keys(_ORDERED[obj.name]).indexOf(id) === -1) {
        _ORDERED[obj.name][id] = Math.floor(Math.random() * nb);
    } else {
        _ORDERED[obj.name][id] += 1;
        _ORDERED[obj.name][id] %= nb;
    }
    return obj["image" + _ORDERED[obj.name][id]];
};

RUR._cycle_stay = function (obj, nb, id) {
    // each animated image starts with its first image,
    // cycles through all the values once, displaying the last
    // image as a permanent one.
    if (_CYCLE_STAY[obj.name] === undefined) {
        _CYCLE_STAY[obj.name] = {};
        _CYCLE_STAY[obj.name][id] = 0;
    } else if (Object.keys(_CYCLE_STAY[obj.name]).indexOf(id) === -1) {
        _CYCLE_STAY[obj.name][id] = 0;
    } else {
        _CYCLE_STAY[obj.name][id] += 1;
        _CYCLE_STAY[obj.name][id] = Math.min(nb-1, _CYCLE_STAY[obj.name][id]);
    }
    return obj["image" + _CYCLE_STAY[obj.name][id]];
};

RUR._cycle_remove = function (obj, nb, id) {
    // each animated image starts with its first image,
    // cycles through all the values once, and, after displaying the last
    // image, returns a "flag" instructing the calling function
    // to remove the object
    if (_CYCLE_REMOVE[obj.name] === undefined) {
        _CYCLE_REMOVE[obj.name] = {};
        _CYCLE_REMOVE[obj.name][id] = 0;
    } else if (Object.keys(_CYCLE_REMOVE[obj.name]).indexOf(id) === -1) {
        _CYCLE_REMOVE[obj.name][id] = 0;
    } else {
        _CYCLE_REMOVE[obj.name][id] += 1;
    }
    if (_CYCLE_REMOVE[obj.name][id] >= nb) {
        return RUR.END_CYCLE;
    }
    return obj["image" + _CYCLE_REMOVE[obj.name][id]];
};

RUR._sync = function (obj, nb, id) {
    // every animated image of this type is kept in sync
    if (_SYNC[obj.name] === undefined) {
        _SYNC[obj.name] = [];
        _SYNC_VALUE[obj.name] = 1;
    } else if (_SYNC[obj.name].indexOf(id) !== -1) {
        // see an same animated image present: we are starting a new sequence
        _SYNC[obj.name] = [];
        _SYNC_VALUE[obj.name] += 1;
        _SYNC_VALUE[obj.name] %= nb;
    }
    _SYNC[obj.name].push(id);
    return obj["image" + _SYNC_VALUE[obj.name]];
};
