/* In some ways, this is the counterpart of world_get.js
*/

require("./objects.js");
require("./exceptions.js");
require("./visible_world.js");
require("./recorder.js");

RUR.world_set = {};

var set_dimension_form;




RUR.world_set.add_solid_object = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;

    coords = x + "," + y;
    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "solid_objects");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.solid_objects, coords);

    try {
        tmp = parseInt(nb, 10);
        nb = tmp;
    } catch (e) {}

    if (nb === 0) {
        delete RUR.CURRENT_WORLD.solid_objects[coords][specific_object];
        if (Object.keys(RUR.CURRENT_WORLD.solid_objects[coords]).length === 0){
            delete RUR.CURRENT_WORLD.solid_objects[coords];
        }
        if (Object.keys(RUR.CURRENT_WORLD.solid_objects).length === 0){
            delete RUR.CURRENT_WORLD.solid_objects;
        }
    } else {
        RUR.CURRENT_WORLD.solid_objects[coords][specific_object] = nb;
    }
};



RUR.world_set.remove_all = function () {
    RUR.CURRENT_WORLD.robots = [];
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
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.possible_positions !== undefined) {
            delete RUR.CURRENT_WORLD.goal.possible_positions;
            delete RUR.CURRENT_WORLD.goal.position;
            RUR.show_feedback("#Reeborg-shouts",
                                 RUR.translate("WARNING: deleted final positions choices while resizing world!"));
        }
    }
}

function remove_all_at_location (coords) {
    // trading efficiency for clarity
    if (RUR.CURRENT_WORLD.tiles !== undefined) {
        if (RUR.CURRENT_WORLD.tiles[coords] !== undefined){
            delete RUR.CURRENT_WORLD.tiles[coords];
        }
    }
    if (RUR.CURRENT_WORLD.solid_objects !== undefined) {
        if (RUR.CURRENT_WORLD.solid_objects[coords] !== undefined){
            delete RUR.CURRENT_WORLD.solid_objects[coords];
        }
    }
    if (RUR.CURRENT_WORLD.objects !== undefined) {
        if (RUR.CURRENT_WORLD.objects[coords] !== undefined){
            delete RUR.CURRENT_WORLD.objects[coords];
        }
    }
    if (RUR.CURRENT_WORLD.walls !== undefined) {
        if (RUR.CURRENT_WORLD.walls[coords] !== undefined){
            delete RUR.CURRENT_WORLD.walls[coords];
        }
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.objects !== undefined) {
            if (RUR.CURRENT_WORLD.goal.objects[coords] !== undefined){
                delete RUR.CURRENT_WORLD.goal.objects[coords];
            }
        }
    }
    if (RUR.CURRENT_WORLD.goal !== undefined) {
        if (RUR.CURRENT_WORLD.goal.walls !== undefined) {
            if (RUR.CURRENT_WORLD.goal.walls[coords] !== undefined){
                delete RUR.CURRENT_WORLD.goal.walls[coords];
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
    RUR.CURRENT_WORLD.small_tiles = $("#use-small-tiles").prop("checked");

    trim_world(max_x, max_y, RUR.COLS, RUR.ROWS);   // remove extra objects
    RUR.vis_world.compute_world_geometry(max_x, max_y);
    RUR.world_set.dialog_set_dimensions.dialog("close");
    return true;
}
set_dimension_form = RUR.world_set.dialog_set_dimensions.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_dimension();
});
