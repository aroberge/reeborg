/* require this module that will automatically modify a global object*/
require("./utils/cors.js");

/* Defines the global namespace and various basic functions */
require("./rur.js");

/* The menu-driven world editor is not required by any other module,
   but it depends on many of them and will take care of loading them */

require("./gui_tools/world_editor.js");

/* We have various html elements which "wait and listen" for interactions
   which are defined in the following modules, most of which are otherwise
   not needed by other modules.
   We list all that appears in the ./listeners directory BUT comment out
   those that are required by other non-listeners module and would thus
   be automatically loaded.
   */

// TODO: refactor so that code fromlisteners not required here can be
// put with the calling module - when there is a single such module.
//require("./listeners/canvas.js");
//require("./listeners/editors_tabs.js");
require("./listeners/frame_slider.js");
require("./listeners/human_language.js");
require("./listeners/memorize_world.js");
require("./listeners/onclick.js");
//require("./listeners/pause.js");
//require("./listeners/programming_mode.js");
require("./listeners/reload.js");
require("./listeners/reverse_step.js");
require("./listeners/run.js");
require("./listeners/select_world_change.js");
require("./listeners/step.js");
require("./listeners/stop.js");
require("./listeners/toggle_highlight.js");
require("./listeners/toggle_watch.js");

// the following is not required by any other module
require("./world_api/decorative_objects.js");


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

// TODO: Use jsdoc and put on site.
// TODO: add turtle mode (see blockly for comparing with expected solution); ensure a blockly counterpart
// TODO: implement paint() and colour_here() in Blockly
