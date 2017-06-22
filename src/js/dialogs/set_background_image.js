require("./../drawing/visible_world.js");
var msg = require("./../../lang/msg.js");
var dialog;

msg.record_id("dialog-set-background-image");
msg.record_title("ui-dialog-title-dialog-set-background-image", "Background image");

exports.dialog_set_background_image = dialog = $("#dialog-set-background-image").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            set_background_image();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});
dialog.find("form").on("submit",
    function( event ) {
        event.preventDefault();
        set_background_image();
});
set_background_image = function () {
    var url = $("#image-url").val();
    if (!url) {
        url = '';
    }
    RUR.get_current_world().background_image = url;
    RUR.BACKGROUND_IMAGE.src = url;
    RUR.BACKGROUND_IMAGE.onload = RUR.vis_world.draw_all;
    dialog.dialog("close");
};
