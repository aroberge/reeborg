/* Once everything is loaded, we need to decide which UI to show.
   The priority is determined by:

   1. information encoded in the URL.
   2. any previously saved state.
   3. site defaults
*/

require("./listeners/add_listeners.js");
require("./utils/parseuri.js");
require("./world/import_world.js");
require("./storage.js");
require("./state.js");

function start_session () {
    "use strict";
    var mode, url_query = parseUri(window.location.href);
    RUR.state.session_initialized = false;
    set_language(url_query);
    mode = set_mode(url_query);
    if (mode === "blockly-py" || mode === "blockly-js") {
        restore_blockly();
    }
    set_editor();
    set_library();
    // The world can include some content for the editor and/or the library
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

function set_language (url_query) {
    "use strict";
    var lang;
    if (url_query.queryKey.lang !== undefined) {
        lang = url_query.queryKey.lang;
    } else if (localStorage.getItem("human_language")) {
        lang = localStorage.getItem("human_language");
    } else {
        lang = 'en';
    }

    document.getElementById('human-language').value = lang;
    $("#human-language").change();
}

function set_mode (url_query) {
    "use strict";
    var mode;
    if (url_query.queryKey.mode !== undefined) {
        mode = url_query.queryKey.mode;
    } else if (localStorage.getItem("programming-mode")) {
        mode = localStorage.getItem("programming-mode");
    } else {
        mode = 'python';
    }

    document.getElementById('programming-mode').value = mode;
    $("#programming-mode").change();
    return mode;
}

function set_editor() {
    if (localStorage.getItem("editor")){
        editor.setValue(localStorage.getItem("editor"));
    } else {
        editor.setValue(RUR.translate("move") + "()");
    }
}

function set_library() {
    if (localStorage.getItem("library")){
        library.setValue(localStorage.getItem("library"));
    } else {
        library.setValue(RUR.translate("# from library import *"));
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
