require("./../storage.js");
require("jquery");
require("jquery-ui");
var clone_world = require("./../world/clone_world.js").clone_world;

exports.dialog_save_world_in_browser = dialog = $("#dialog-save-world").dialog({
    autoOpen: false,
    height: 400,
    width: 500,
    modal: true,
    buttons: {
        OK: function () {
            save_world();
        },
        Cancel: function() {
            dialog.dialog("close");
        }
    }
});

dialog.find("form").on("submit", function( event ) {
    event.preventDefault();
    save_world();
});

save_world = function () {
    RUR.storage._save_world($("#world-name").val().trim());
    RUR._SAVED_WORLD = clone_world();
    dialog.dialog("close");
    $('#delete-world').show();
};
