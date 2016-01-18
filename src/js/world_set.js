/* In some ways, this is the counterpart of world_get.js
*/

require("./objects.js");
require("./exceptions.js");
require("./visible_world.js");
require("./recorder.js");

RUR.world_set = {};

var set_dimension_form;

RUR.world_set.add_object = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;
    if (RUR.objects.known_objects.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;
    RUR.ensure_key_exists(RUR.current_world, "objects");
    RUR.ensure_key_exists(RUR.current_world.objects, coords);

    if (nb === 0) {
        delete RUR.current_world.objects[coords][specific_object];
        if (Object.keys(RUR.current_world.objects[coords]).length === 0){
            delete RUR.current_world.objects[coords];
        }
        if (Object.keys(RUR.current_world.objects).length === 0){
            delete RUR.current_world.objects;
        }
    } else {
        RUR.current_world.objects[coords][specific_object] = nb;
    }
};

RUR.world_set.add_goal_object = function (specific_object, x, y, nb){
    "use strict";
    var coords;

    coords = x + "," + y;

    RUR.ensure_key_exists(RUR.current_world, "goal");
    RUR.ensure_key_exists(RUR.current_world.goal, "objects");
    RUR.ensure_key_exists(RUR.current_world.goal.objects, coords);
    if (nb === 0) {
        delete RUR.current_world.goal.objects[coords][specific_object];
        if (JSON.stringify(RUR.current_world.goal.objects[coords]) === '{}'){
            delete RUR.current_world.goal.objects[coords];
        }
        if (JSON.stringify(RUR.current_world.goal.objects) === '{}'){
            delete RUR.current_world.goal.objects;
        }
        if (JSON.stringify(RUR.current_world.goal) === '{}'){
            delete RUR.current_world.goal;
        }
    } else {
        RUR.current_world.goal.objects[coords][specific_object] = nb;
        RUR.vis_world.draw_goal();
    }
};

RUR.world_set.add_solid_object = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;

    coords = x + "," + y;
    RUR.ensure_key_exists(RUR.current_world, "solid_objects");
    RUR.ensure_key_exists(RUR.current_world.solid_objects, coords);

    try {
        tmp = parseInt(nb, 10);
        nb = tmp;
    } catch (e) {}

    if (nb === 0) {
        delete RUR.current_world.solid_objects[coords][specific_object];
        if (Object.keys(RUR.current_world.solid_objects[coords]).length === 0){
            delete RUR.current_world.solid_objects[coords];
        }
        if (Object.keys(RUR.current_world.solid_objects).length === 0){
            delete RUR.current_world.solid_objects;
        }
    } else {
        RUR.current_world.solid_objects[coords][specific_object] = nb;
    }
};

RUR.world_set.add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    if (RUR.MAX_NB_ROBOTS !== undefined &&
        RUR.MAX_NB_ROBOTS >= RUR.current_world.robots.length){
        throw new RUR.ReeborgError(RUR.translate("You cannot create another robot!"));
    }
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


RUR.world_set.remove_robots = function () {
    if (RUR.MAX_NB_ROBOTS !== undefined){
        throw new RUR.ReeborgError(RUR.translate("Cheater! You are not allowed to change the number of robots this way!"));
    } else {
        RUR.current_world.robots = [];
    }
};

RUR.world_set.remove_all = function () {
    RUR.current_world.robots = [];
    trim_world(0,0, RUR.COLS, RUR.ROWS);
};

function trim_world (min_x, min_y, max_x, max_y) {
    var x, y, coords;

    for (x = min_x+1; x <= max_x; x++) {
        for (y = 1; y <= max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    for (x = 1; x <= max_x; x++) {
        for (y = min_y+1; y <= max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    if (RUR.current_world.goal !== undefined) {
        if (RUR.current_world.goal.possible_positions !== undefined) {
            delete RUR.current_world.goal.possible_positions;
            delete RUR.current_world.goal.position;
            RUR.show_feedback("#Reeborg-shouts",
                                 RUR.translate("WARNING: deleted final positions choices while resizing world!"));
        }
    }
}

function remove_all_at_location (coords) {
    // trading efficiency for clarity
    if (RUR.current_world.tiles !== undefined) {
        if (RUR.current_world.tiles[coords] !== undefined){
            delete RUR.current_world.tiles[coords];
        }
    }
    if (RUR.current_world.solid_objects !== undefined) {
        if (RUR.current_world.solid_objects[coords] !== undefined){
            delete RUR.current_world.solid_objects[coords];
        }
    }
    if (RUR.current_world.objects !== undefined) {
        if (RUR.current_world.objects[coords] !== undefined){
            delete RUR.current_world.objects[coords];
        }
    }
    if (RUR.current_world.walls !== undefined) {
        if (RUR.current_world.walls[coords] !== undefined){
            delete RUR.current_world.walls[coords];
        }
    }
    if (RUR.current_world.goal !== undefined) {
        if (RUR.current_world.goal.objects !== undefined) {
            if (RUR.current_world.goal.objects[coords] !== undefined){
                delete RUR.current_world.goal.objects[coords];
            }
        }
    }
    if (RUR.current_world.goal !== undefined) {
        if (RUR.current_world.goal.walls !== undefined) {
            if (RUR.current_world.goal.walls[coords] !== undefined){
                delete RUR.current_world.goal.walls[coords];
            }
        }
    }
}

RUR.world_set.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    //modal: true,
    buttons: {
        OK: function () {
            set_dimension();
        },
        Cancel: function() {
            RUR.world_set.dialog_set_dimensions.dialog("close");
        }
    },
    close: function() {
        set_dimension_form[0].reset();
    }
});
function set_dimension () {
    "use strict";
    var max_x, max_y;
    max_x = parseInt($("#input-max-x").val(), 10);
    max_y = parseInt($("#input-max-y").val(), 10);
    RUR.current_world.small_tiles = $("#use-small-tiles").prop("checked");

    trim_world(max_x, max_y, RUR.COLS, RUR.ROWS);   // remove extra objects
    RUR.vis_world.compute_world_geometry(max_x, max_y);
    RUR.world_set.dialog_set_dimensions.dialog("close");
    return true;
}
set_dimension_form = RUR.world_set.dialog_set_dimensions.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_dimension();
});
