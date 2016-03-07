
/* Requiring the following just to get things started */
require("./listeners/add_listeners.js");
require("./splash_screen.js");
/* --- */

require("./utils/parseuri.js");
require("./world/import_world.js");
require("./storage.js");
require("./state.js");
require("./permalink.js");
require("./create_editors.js");

//
brython({debug:1, pythonpath:['/src/python']});

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
    RUR.permalink.set_language(url_query);
    mode = RUR.permalink.set_mode(url_query);
    if (mode === "blockly-py" || mode === "blockly-js") {
        restore_blockly();
    }
    set_editor();
    set_library();
    // The world can include some content for the editor and/or the library
    set_world(url_query);  //TODO enable capturing blockly config in world.
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
        editor.setValue(RUR.translate("move()"));
    }
}

function set_library() {
    if (localStorage.getItem("library")){
        library.setValue(localStorage.getItem("library"));
    }
}

function set_world(url_query) {
    if (url_query.queryKey.world !== undefined) {
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        RUR.storage.save_world(RUR.translate("PERMALINK"));
    } else if (localStorage.getItem("world")) {
        try {
            RUR.world_select.set_url(
                RUR.world_select.url_from_shortname(
                    localStorage.getItem("world"))
                );
        } catch (e) {
            RUR.world_select.set_default();
        }
    }
}
