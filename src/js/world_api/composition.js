require("./../rur.js");
require("./../utils/key_exist.js");
require("./../utils/validator.js");
require("./../recorder/record_frame.js");
require("./artefact.js");
require("./obstacles.js");
require("./background_tile.js");


RUR.transform_tile = function (name, x, y) {
    "use strict";
    var t, transf, transformations, recording_state;
    if (RUR.THINGS[name].transform === undefined) {
        return false;
    }
    transformations = RUR.THINGS[name].transform;
    for (t=0; t < transformations.length; t++) {
        transf = transformations[t];
        if (conditions_satisfied(transf.conditions, x, y)) {

            recording_state = RUR.state.do_not_record;
            RUR.state.do_not_record = true;

            do_transformations(transf.actions, x, y);

            RUR.state.do_not_record = recording_state;
            return;
        }
    }
};

function conditions_satisfied (conditions, x, y) {
    "use strict";
    var c, cond, fn, name;
    if (Object.prototype.toString.call(conditions) != "[object Array]" ||
        conditions.length === 0) {
        console.log("conditions = ", conditions);
        throw new RUR.ReeborgError("Invalid conditions when attempting an automatic object transformation.");
    }
    try {
        for (c=0; c < conditions.length; c++) {
            cond = conditions[c];
            fn = cond[0];
            name = cond[1];
            if (cond[2] == "not") {
                if (fn(name, x, y)) {
                    return false;
                }
            } else if (!fn(name, x, y)) {
                return false;
            }
        }
    return true;
} catch (e) {
    console.log("conditions = ", conditions);
    console.log(e);
    throw new RUR.ReeborgError("Invalid conditions when attempting an automatic object transformation.");
    }
}

function do_transformations (actions, x, y) {
    "use strict";
    var a, act, fn, name;
    if (Object.prototype.toString.call(actions) != "[object Array]" ||
        actions.length === 0) {
        console.log("actions = ", actions);
        throw new RUR.ReeborgError("Invalid actions when attempting an automatic object transformation.");
    }
    try {
        for (a=0; a < actions.length; a++) {
            act = actions[a];
            fn = act[0];
            name = act[1];
            fn(name, x, y);
        }
    } catch (e) {
        console.log("actions = ", actions);
        console.log(e);
        throw new RUR.ReeborgError("Invalid actions when attempting an automatic object transformation.");
    }
}
