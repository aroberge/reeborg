require("./../file_io/file_io.js");
require("./../storage/storage.js");

var record_id = require("./../../lang/msg.js").record_id;
record_id("select-world");

$("#select-world").change(function() {
    if (RUR.state.creating_menu){
        return;
    }
    if ($(this).val() !== null) {
        RUR.load_world_file($(this).val());
    }
    try {
        localStorage.setItem("world", $(this).find(':selected').text());
    } catch (e) {}
});
