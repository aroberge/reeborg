/* Dialog used by the Interactive world editor to add objects to the world.
*/

require("./../rur.js");
require("./../world_set/object.js");
require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");

msg.record_id("number-of-objects", "Number of objects:");
msg.record_id("maximum-text", "Maximum:");
msg.record_id("add-object-explain", "ADD OBJECT EXPLAIN");
msg.record_id("input-add-number");
msg.record_id("maximum-number");
msg.record_id("dialog-add-object");
msg.record_title("ui-dialog-title-dialog-add-object", "Add object in the world");

exports.dialog_add_object = dialog_add_object = $("#dialog-add-object").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            add_object();
        },
        Cancel: function() {
            dialog_add_object.dialog("close");
        }
    },
    close: function() {
        add_object_form[0].reset();
    }
});

function add_object () {
    "use strict";
    var query, input_add_number_result, input_maximum_result;
    input_add_number_result = parseInt($("#input-add-number").val(), 10);
    input_maximum_result = parseInt($("#maximum-number").val(), 10);
    if (input_maximum_result > input_add_number_result){
        query =  input_add_number_result + "-" + input_maximum_result;
    } else {
        query = input_add_number_result;
    }
    RUR.set_nb_object_at_position(RUR.state.specific_object, RUR.state.x, RUR.state.y, query);
    RUR.vis_world.refresh_world_edited();
    dialog_add_object.dialog("close");
    return true;
}

add_object_form = dialog_add_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    add_object();
});
