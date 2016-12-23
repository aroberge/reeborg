
require("./../world_set/world_set.js");
require("./../drawing/visible_world.js");
require("./../world_set/give_object_to_robot.js");
require("./../rur.js");
var msg = require("./../../lang/msg.js");

msg.record_id("give-number-of-objects", "Number of objects:");
msg.record_id("unlimited-text", "Unlimited:");
msg.record_id("give-object-explain", "GIVE OBJECT EXPLAIN");
msg.record_id("input-give-number");
msg.record_id("unlimited-number");
msg.record_id("dialog-give-object");
msg.record_title("ui-dialog-title-dialog-give-object", "Give object to robot");

exports.dialog_give_object = dialog_give_object = $("#dialog-give-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            give_object();
        },
        Cancel: function() {
            dialog_give_object.dialog("close");
        }
    },
    close: function() {
        give_object_form[0].reset();
    }
});
give_object = function () {
    "use strict";
    var query, give_number_result, unlimited_number_result;
    give_number_result = parseInt($("#input-give-number").val(), 10);
    unlimited_number_result = $("#unlimited-number").prop("checked");
    if (unlimited_number_result){
        query = Infinity;
    } else {
        query = give_number_result;
    }
    RUR.give_object_to_robot(RUR.state.specific_object, query);
    RUR.vis_world.refresh_world_edited();
    dialog_give_object.dialog("close");
    return true;
};
give_object_form = dialog_give_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    give_object();
});
