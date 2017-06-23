require("./../rur.js");
require("./../drawing/visible_world.js"); // for RUR.set_world_size

var msg = require("./../../lang/msg.js");
var set_dimension_form;


function trim_world (new_max_x, new_max_y, old_max_x, old_max_y) {
    var x, y, coords, world=RUR.get_current_world();
    // remove stuff from outside new boundaries

    for (x = new_max_x+1; x <= old_max_x; x++) {
        for (y = 1; y <= old_max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    for (x = 1; x <= old_max_x; x++) {
        for (y = new_max_y+1; y <= old_max_y; y++) {
            coords = x + "," + y;
            remove_all_at_location(coords);
        }
    }
    if (world.possible_initial_positions !== undefined) {
        delete world.possible_initial_positions;
    }
    if (world.goal !== undefined) {
        if (world.goal.possible_final_positions !== undefined) {
            delete world.goal.possible_final_positions;
        }
    }
}

function remove_all_at_location (coords) {
    var world = RUR.get_current_world();
    // trading efficiency for clarity
    if (world.tiles !== undefined) {
        if (world.tiles[coords] !== undefined){
            delete world.tiles[coords];
        }
    }
    if (world.bridge !== undefined) {
        if (world.bridge[coords] !== undefined){
            delete world.bridge[coords];
        }
    }
    if (world.decorative_objects !== undefined) {
        if (world.decorative_objects[coords] !== undefined){
            delete world.decorative_objects[coords];
        }
    }
    if (world.obstacles !== undefined) {
        if (world.obstacles[coords] !== undefined){
            delete world.obstacles[coords];
        }
    }
    if (world.pushables !== undefined) {
        if (world.pushables[coords] !== undefined){
            delete world.pushables[coords];
        }
    }
    if (world.walls !== undefined) {
        if (world.walls[coords] !== undefined){
            delete world.walls[coords];
        }
    }
    if (world.objects !== undefined) {
        if (world.objects[coords] !== undefined){
            delete world.objects[coords];
        }
    }
    if (world.goal !== undefined) {
        if (world.goal.walls !== undefined) {
            if (world.goal.walls[coords] !== undefined){
                delete world.goal.walls[coords];
            }
        }
        if (world.goal.objects !== undefined) {
            if (world.goal.objects[coords] !== undefined){
                delete world.goal.objects[coords];
            }
        }
    }
}

msg.record_id("dialog-set-dimensions");
msg.record_title("ui-dialog-title-dialog-set-dimensions", "Set the world's dimensions");
msg.record_id("set-dimensions-explain", "set-dimensions-explain");
msg.record_id("input-max-x-text", "Maximum x value:");
msg.record_id("input-max-y-text", "Maximum y value:");
msg.record_id("use-small-tiles-text", "Use small tiles");

RUR.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_dimension();
        },
        Cancel: function() {
            RUR.dialog_set_dimensions.dialog("close");
        }
    },
    close: function() {
        set_dimension_form[0].reset();
    }
});
function set_dimension () {
    "use strict";
    var max_x, max_y, world = RUR.get_current_world();
    max_x = parseInt($("#input-max-x").val(), 10);
    max_y = parseInt($("#input-max-y").val(), 10);
    world.small_tiles = $("#use-small-tiles").prop("checked");

    trim_world(max_x, max_y, RUR.MAX_X, RUR.MAX_Y);   // remove extra objects
    RUR.set_world_size(max_x, max_y);
    RUR.dialog_set_dimensions.dialog("close");
    return true;
}
set_dimension_form = RUR.dialog_set_dimensions.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_dimension();
});
