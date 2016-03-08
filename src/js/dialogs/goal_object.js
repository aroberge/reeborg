require("./../visible_world.js");
require("./../world_set/give_object_to_robot.js");
require("./../state.js");

var msg = require("./../../lang/msg.js");

msg.record_id("dialog-goal-object");
msg.record_title("ui-dialog-title-dialog-goal-object", "Set goal number for object");
msg.record_id("dialog-goal-object-explain", "dialog-goal-object-explain");
msg.record_id("input-goal-number-text", "Number of objects");
msg.record_id("all-objects-text", "All such objects");

exports.dialog_goal_object = dialog_goal_object = $("#dialog-goal-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            goal_objects();
        },
        Cancel: function() {
            dialog_goal_object.dialog("close");
        }
    },
    close: function() {
        goal_objects_form[0].reset();
    }
});
goal_objects = function () {
    "use strict";
    var query;
    input_goal_number_result = parseInt($("#input-goal-number").val(), 10);
    all_objects_result = $("#all-objects").prop("checked");
    if (all_objects_result){
        query =  "all";
    } else {
        query = input_goal_number_result;
    }
    RUR.add_goal_object_at_position(RUR.state.specific_object, RUR.state.x, RUR.state.y, query);
    RUR.vis_world.refresh_world_edited();
    dialog_goal_object.dialog("close");
    return true;
};
goal_objects_form = dialog_goal_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    goal_objects();
});
