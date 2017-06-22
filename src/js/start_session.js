
require("./rur.js");
/* Requiring the following just to get things started */
require("./listeners/add_listeners.js");
/* --- */

require("./programming_api/blockly.js");

require("./default_tiles/tiles.js");

require("./utils/parseuri.js");
require("./world_utils/import_world.js");
require("./storage/storage.js");

require("./permalink/permalink.js");
require("./editors/create.js");

// ensure that all world_api methods are defined, even though they
// might be already imported by the menu-driven world editor.
//
// TODO: Add functional test ensuring that each type is appropriately loaded
require("./world_api/background_tile.js");
require("./world_api/bridges.js");
require("./world_api/decorative_objects.js");
require("./world_api/objects.js");
require("./world_api/obstacles.js");
require("./world_api/pushables.js");
require("./world_api/robot.js");
require("./world_api/walls.js");



brython({debug:1, pythonpath:[RUR.BASE_URL + '/src/python']});
if (__BRYTHON__.__MAGIC__ != "3.2.7") {
    alert("Expecting Brython version 3.2.7 and got " + __BRYTHON__.__MAGIC__);
}

/* Once everything is loaded, we need to decide which UI to show.
   The priority is determined by:

   1. information encoded in the URL.
   2. any previously saved state.
   3. site defaults
*/
function start_session () {
    "use strict";
    var mode, url_query = parseUri(window.location.href);
    RUR.state.session_initialized = false;
    set_editor();
    set_library();
    get_red_green();
    // The world can include some content for the editor and/or the library, and/or the blocks
    RUR.permalink.set_language(url_query);
    mode = RUR.permalink.set_mode(url_query);
    if (mode === "blockly-py" || mode === "blockly-js") {
        restore_blockly();
    }
    set_world(url_query);
    RUR.state.session_initialized = true;
}
start_session();

function restore_blockly () {
    var xml, xml_text;
    xml_text = localStorage.getItem("blockly");
    if (xml_text) {
        xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(RUR.blockly.workspace, xml);
    }
}

function set_editor() {
    "use strict";
    if (localStorage.getItem("editor")){
        editor.setValue(localStorage.getItem("editor"));
    } else {
        editor.setValue(RUR.translate("move") + "()");
    }
}

function set_library() {
    if (localStorage.getItem("library")){
        library.setValue(localStorage.getItem("library"));
    }
}

function get_red_green () {
    var red, green;
    if (localStorage.getItem("userchoice_red") && localStorage.getItem("userchoice_green")){
        red = localStorage.getItem("userchoice_red");
        green = localStorage.getItem("userchoice_green");
        RUR.configure_red_green(red, green);
    }
}

function set_world(url_query) {
    var world, name;
    if (RUR.permalink.from_url(url_query)){
        return;
    }
    name = localStorage.getItem("world");
    if (name) {
        world = RUR.world_select.url_from_shortname(name);
        if (world) {
            RUR.world_select.set_url(world);
        } else {
            RUR.world_select.set_default();
        }
    } else {
        RUR.world_select.set_default();
    }
}
