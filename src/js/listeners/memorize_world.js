
require("./../rur.js");
require("./../storage/storage.js");
var record_id = require("./../../lang/msg.js").record_id;

record_id("memorize-world", "Save world in browser");

memorize_world = function () {
    var existing_names, i, key;

    existing_names = '';
    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            if (!existing_names) {
                existing_names = "Existing names: " + key.substring(11);
            } else {
                existing_names += "," + key.substring(11);
            }
        }
    }

    if (existing_names) {
        $("#existing-world-names").html(existing_names);
    }
    dialog.dialog("open");
};

$(document).ready(function() {
    var memorize_button = document.getElementById("memorize-world");
    memorize_button.addEventListener("click", memorize_world, false);
});

$(document).ready(function() {
    dialog = $("#dialog-save-world").dialog({
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
});


save_world = function () {
    RUR.set_current_world(RUR.update_world_from_editors(RUR.get_current_world()));
    RUR.storage._save_world($("#world-name").val().trim());
    dialog.dialog("close");
    $('#delete-world').show();
};
