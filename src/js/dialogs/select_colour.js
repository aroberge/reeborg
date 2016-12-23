require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");

msg.record_id("color-selection-text", "Colour:");
msg.record_id("colour-selection");
msg.record_id("dialog-select-colour");
msg.record_title("ui-dialog-title-dialog-select-colour", "Enter a colour");

exports.dialog_select_colour = dialog_select_colour = $("#dialog-select-colour").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            select_colour();
        },
        Cancel: function() {
            dialog_select_colour.dialog("close");
        }
    }
});

dialog_select_colour.find("form").on("submit", function( event ) {
    event.preventDefault();
    select_colour();
});

select_colour = function () {
    var colour = $("#colour-selection").val();
    if (!colour) {
        colour = false;
    }
    dialog_select_colour.dialog("close");
    RUR._CALLBACK_FN(colour);
    RUR.vis_world.draw_all();
};
