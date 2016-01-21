/* Dialog used by the Interactive world editor to add objects to the world.
*/

require("./../world_set.js");
require("./../visible_world.js");
require("./../state.js");

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
    var query;
    input_add_number_result = parseInt($("#input-add-number").val(), 10);
    input_maximum_result = parseInt($("#maximum-number").val(), 10);
    if (input_maximum_result > input_add_number_result){
        query =  input_add_number_result + "-" + input_maximum_result;
    } else {
        query = input_add_number_result;
    }
    RUR.add_object_at_position(RUR.state.specific_object, RUR.state.x, RUR.state.y, query);
    RUR.vis_world.refresh_world_edited();
    dialog_add_object.dialog("close");
    return true;
}

add_object_form = dialog_add_object.find("form").on("submit", function( event ) {
    event.preventDefault();
    add_object();
});
