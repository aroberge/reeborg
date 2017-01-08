/* In some ways, this is the counterpart of world_get/world_get.js
*/
require("./../rur.js");
require("./../default_tiles/tiles.js");
require("./../programming_api/exceptions.js");
require("./../drawing/visible_world.js");
require("./../recorder/recorder.js"); // TODO: investigate if needed.
require("./../utils/key_exist.js");

var msg = require("./../../lang/msg.js");

RUR.world_set = {};

var set_dimension_form;


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
        if (RUR.CURRENT_WORLD.goal.possible_final_positions !== undefined) {
            delete RUR.CURRENT_WORLD.goal.possible_final_positions;
            delete RUR.CURRENT_WORLD.goal.position;
            RUR.show_feedback("#Reeborg-shouts",
                                 RUR.translate("WARNING: deleted final positions choices while resizing world!"));
        }
    }
}

// TODO: see if https://jsfiddle.net/6bwuq9wk/6/ might not
// be more appropriate, or use
// remove from all individual existing methods.

function remove_all_at_location (coords) {
    // trading efficiency for clarity
    if (RUR.CURRENT_WORLD.tiles !== undefined) {
        if (RUR.CURRENT_WORLD.tiles[coords] !== undefined){
            delete RUR.CURRENT_WORLD.tiles[coords];
        }
    }
    if (RUR.CURRENT_WORLD.obstacles !== undefined) {
        if (RUR.CURRENT_WORLD.obstacles[coords] !== undefined){
            delete RUR.CURRENT_WORLD.obstacles[coords];
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

msg.record_id("dialog-set-dimensions");
msg.record_title("ui-dialog-title-dialog-set-dimensions", "Set the world's dimensions");
msg.record_id("set-dimensions-explain", "set-dimensions-explain");
msg.record_id("input-max-x-text", "Maximum x value:");
msg.record_id("input-max-y-text", "Maximum y value:");
msg.record_id("use-small-tiles-text", "Use small tiles");

RUR.world_set.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
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

    trim_world(max_x, max_y, RUR.MAX_X, RUR.MAX_Y);   // remove extra objects
    RUR.vis_world.compute_world_geometry(max_x, max_y);
    RUR.world_set.dialog_set_dimensions.dialog("close");
    return true;
}
set_dimension_form = RUR.world_set.dialog_set_dimensions.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_dimension();
});
