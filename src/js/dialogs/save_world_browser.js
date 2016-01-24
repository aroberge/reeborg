require("./../storage.js");
require("./../world.js");

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
    RUR.world.saved_world = RUR.world.clone_world();
    dialog.dialog("close");
    $('#delete-world').show();
};
