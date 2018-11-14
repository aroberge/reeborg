/* This file contains methods used to create animated images by creating
   the appropriate selection sequence from a list of images.
 */

require("./../rur.js");

RUR.animate_images = function (obj) {
    var i;
    for (i=0; i < obj.images.length; i++){
        obj["image"+i] = new Image();
        obj["image"+i].src = obj.images[i];
        obj["image"+i].onload = RUR.onload_new_image;
    }
    if (obj.selection_method === "sync") {
        obj.choose_image = function (id) {
            return _sync(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "ordered") {
        obj.choose_image = function (id) {
            return _ordered(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "cycle stay") {
        obj.choose_image = function (id) {
            return _cycle_stay(obj, obj.images.length, id);
        };
    } else if (obj.selection_method === "cycle remove") {
        obj.choose_image = function (id) {
            return _cycle_remove(obj, obj.images.length, id);
        };
    } else {
        obj.choose_image = function (id) {
            return _random(obj, obj.images.length);
        };
    }
};


function _random (obj, nb) {
    // each animated image is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return obj["image" + choice];
}

function _ordered (obj, nb, id) {
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
}

function _cycle_stay (obj, nb, id) {
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
}

function _cycle_remove (obj, nb, id) {
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
}

function _sync (obj, nb, id) {
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
}
