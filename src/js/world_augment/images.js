require("./../rur.js");
require("./../state.js");

var _ORDERED, _SYNC, _SYNC_VALUE;

exports.images_init = images_init = function () {
    _ORDERED = {};
    _SYNC = {};
    _SYNC_VALUE = {};
    RUR.ANIMATION_TIME = 120;
};

/* Important: we need to use a method from visible_world.js ONLY after
   the session is initialized; at that point, we know that visible_world.js
   has been loaded and we know it will be available even if we don't
   put it as a formal requirement.  If we were to put it as a requirement,
   we would end up with a circular requirement (e.g. objs.js require
   visible_world.js which require objs.js) with unpredictable consequences.
*/

//TODO: move RUR.INCREMENT_LOADED_FN here.


RUR.images_onload = function (image) {
    if (RUR.state.session_initialized) {
        image.onload = RUR.vis_world.refresh;
    } else {
        RUR._NB_IMAGES_TO_LOAD += 1;
        image.onload = RUR.INCREMENT_LOADED_FN;
    }
};

RUR.animate_images = function (obj) {
    for (i=0; i < obj.images.length; i++){
        obj["image"+i] = new Image();
        obj["image"+i].src = obj.images[i];
        RUR.images_onload(obj["image"+i]);
    }
    if (obj.selection_method === "sync") {
        obj.choose_image = function (coords) {
            return RUR._sync(obj, obj.images.length, coords);
        };
    } else if (obj.selection_method === "ordered") {
        obj.choose_image = function (coords) {
            return RUR._ordered(obj, obj.images.length, coords);
        };
    } else {
        obj.choose_image = function (coords) {
            return RUR._random(obj, obj.images.length);
        };
    }
};




RUR._random = function (obj, nb) {
    // each animated image is given a random value at all iteration
    var choice = Math.floor(Math.random() * nb);
    return obj["image" + choice];
};

RUR._ordered = function (obj, nb, coords) {
    // each animated image is given a random initial value but then goes in order

    if (_ORDERED[obj.name] === undefined) {
        _ORDERED[obj.name] = {};
        _ORDERED[obj.name][coords] = Math.floor(Math.random() * nb);
    } else if (Object.keys(_ORDERED[obj.name]).indexOf(coords) === -1) {
        _ORDERED[obj.name][coords] = Math.floor(Math.random() * nb);
    } else {
        _ORDERED[obj.name][coords] += 1;
        _ORDERED[obj.name][coords] %= nb;
    }
    return obj["image" + _ORDERED[obj.name][coords]];
};

RUR._sync = function (obj, nb, coords) {
    // every animated image of this type is kept in sync
    if (_SYNC[obj.name] === undefined) {
        _SYNC[obj.name] = [];
        _SYNC_VALUE[obj.name] = 1;
    } else if (_SYNC[obj.name].indexOf(coords) !== -1) {
        // see an same animated image present: we are starting a new sequence
        _SYNC[obj.name] = [];
        _SYNC_VALUE[obj.name] += 1;
        _SYNC_VALUE[obj.name] %= nb;
    }
    _SYNC[obj.name].push(coords);
    return obj["image" + _SYNC_VALUE[obj.name]];
};
