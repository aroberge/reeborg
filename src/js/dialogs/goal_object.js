require("./../drawing/visible_world.js");
require("./../world_api/objects.js");
require("./../rur.js");

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
    var goal = true;
    if ( $("#all-objects").prop("checked") ){
        goal =  "all";
    }
    RUR.add_object(RUR.state.specific_object, RUR.state.x, RUR.state.y,
        {min: parseInt($("#input-goal-number").val(), 10),
         goal: goal, replace: true})
    RUR.vis_world.refresh_world_edited();
    dialog_goal_object.dialog("close");
    return true;
};
goal_objects_form = dialog_goal_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    goal_objects();
});
