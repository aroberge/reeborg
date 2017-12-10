/* Dialog used by the Interactive world editor to add objects to the world.
*/

require("./../rur.js");
require("./../world_api/objects.js");
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
            set_nb_object();
        },
        Cancel: function() {
            dialog_add_object.dialog("close");
        }
    },
    close: function() {
        add_object_form[0].reset();
    }
});

function set_nb_object () {
    "use strict";
    RUR.add_object(RUR.state.specific_object, RUR.state.x, RUR.state.y,
        {min: parseInt($("#input-add-number").val(), 10),
         max: parseInt($("#maximum-number").val(), 10),
         replace: true});
    RUR.vis_world.refresh_world_edited();
    dialog_add_object.dialog("close");
    return true;
}

add_object_form = dialog_add_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    set_nb_object();
});
