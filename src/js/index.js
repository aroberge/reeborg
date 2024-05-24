/* require this module that will automatically modify a global object*/
require("./utils/cors.js");

/* Defines the global namespace and various basic functions */
require("./rur.js");

require("./file_io/file_io.js");
require("./storage/storage.js");
require("./permalink/permalink.js");


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

// TODO: refactor so that code from listeners not required here can be
// put with the calling module - when there is a single such module.
// 

require("./ui/add_listeners.js");

require("./listeners/memorize_world.js");
require("./listeners/onclick.js");

// the following are not required by any other module
require("./ui/keyboard_shortcuts.js");
require("./utils/maze.js");
require("./utils/search.js");
require("./utils/path_utils.js");
require("./world_api/decorative_objects.js");

brython({debug:1, pythonpath:[RUR.BASE_URL + '/src/python']});

function probably_invalid(value) {
    return value === undefined || value === null || value == "null" || value == "undefined";
}

RUR.state.session_initialized = false;

function start_session () {
    "use strict";
    var url;
    set_initial_state();
    set_editor();
    set_library();
    get_red_green();
    RUR.state.session_initialized = true;    
    url = RUR.world_selector.url_from_shortname(RUR.state.world_name);
    if (!url || url != RUR.state.world_url) { // world not included in menu, nor in selector
        RUR.world_selector.append_world({url: RUR.state.world_url,
                                         shortname: RUR.state.world_name});
    }
    RUR.world_selector.set_url(RUR.state.world_url);
    RUR.permalink.update_URI();
    $("#thought").hide();
}


function confirm_ready_to_start() {
    if (window.translate_python === undefined || !RUR.state.ui_ready) {
        console.log("Not quite ready to initialize session; will try again in 100ms.");
        window.setTimeout(confirm_ready_to_start, 100);
    } else {
        start_session();
    }
}

confirm_ready_to_start();


function set_initial_state() {
    /* This function sets the initial state which includes
        * The input method (python, py-repl, etc.)
        * The human language
        * The world menu to be used
        * The world to be initially displayed
            * its name
            * its url

       The priority is determined by:
           1. information encoded in the URL;
           2. any previously saved state;
           3. site defaults.
            
    */
    var url_query;

    url_query = RUR.permalink.parseUri(window.location.href);
    if (url_query.queryKey === undefined) {  // should be set but just in case...
        url_query.queryKey = {};
    }
    
    // Changing the input_method / programming mode does not affect anything else
    // so do first. Note that, if using Blockly, we will retrieve the last
    // state here. However, if a world (loaded below) has some Blockly
    // content, it will replace the restored content, as desired.
    set_initial_input_method(url_query);

    // Changing the human language will trigger a restart of the Python repl
    // if it is the mode selected, to ensure that the proper reeborg_xx module
    // is used; so it has to be done after the programming mode has been set.
    set_initial_language(url_query);

    // Next, we create the appropriate world menu, using the default if needed
    set_initial_menu(url_query);

    // A hand-written url may not include all required parts;
    // this does not matter for the previous three settings, but it
    // may matter if there is some inconsistency with the indicated url and name
    // parts. In this case, we have to make sure that we do not
    // retrieve the last saved values by mistake
    RUR.state.world_url = decodeURIComponent(url_query.queryKey.url);
    RUR.state.world_name = decodeURIComponent(url_query.queryKey.name);    

    // correct potentially faulty values
    if (probably_invalid(RUR.state.world_url)) {
        RUR.state.world_url = undefined;
    }
    if (probably_invalid(RUR.state.world_name)) {
        RUR.state.world_name = undefined;
    }

    if (RUR.state.world_url !== undefined) {
        if (RUR.state.world_name === undefined) {
            RUR.state.world_name = RUR.state.world_url;
        }
        try {
            RUR.load_world_file(RUR.state.world_url, RUR.state.world_name);
        } catch (e) {
            set_default_world();
        }
    } else if (RUR.state.world_name !== undefined) {
        RUR.state.world_url = RUR.world_selector.url_from_shortname(RUR.state.world_name);
        if (RUR.state.world_url === undefined) { // Name does not in the current menu
            set_default_world();
        }
    } else {
        set_default_world();
    }
}

function set_default_world() {
    var world_name, world_url, possible_url;
    world_name = localStorage.getItem("world_name");
    world_url = localStorage.getItem("world_url");
    possible_url = RUR.world_selector.url_from_shortname(world_name);
    if (!probably_invalid(possible_url) && 
        possible_url == world_url // ensure consistency
        ) {
        RUR.world_selector.set_url(world_url);
    } else {
        RUR.world_selector.set_default();  // first world of the collection
    }
}


function set_initial_input_method(url_query) {
    var last_mode;
    RUR.state.input_method = decodeURIComponent(url_query.queryKey.mode); 
    last_mode = localStorage.getItem("input_method");

    if (probably_invalid(RUR.state.input_method)) {
        if (!probably_invalid(last_mode)) {
            RUR.state.input_method = last_mode;
        } else {
            RUR.state.input_method = RUR.initial_defaults.input_method;
        }
    }
    document.getElementById("programming-mode").value = RUR.state.input_method;
    $("#programming-mode").change(); // triggers the require UI changes

    if (RUR.state.input_method === "blockly-py" || RUR.state.input_method === "blockly-js") {
        restore_blockly();
    }
}


function set_initial_language(url_query) {
    var last_lang;
    RUR.state.human_language = decodeURIComponent(url_query.queryKey.lang);
    last_lang = localStorage.getItem("human_language");

    if (probably_invalid(RUR.state.human_language)) {
        if (!probably_invalid(last_lang)) {
            RUR.state.human_language = last_lang;
        } else {
            RUR.state.human_language = RUR.initial_defaults.human_language;
        }
    }
    document.getElementById('human-language').value = RUR.state.human_language;
    $("#human-language").change(); // triggers the require UI changes
}


function set_initial_menu(url_query) {
    var last_menu;
    var last_lang;

    last_lang = localStorage.getItem("human_language");
    if (last_lang !== RUR.state.human_language) {
        RUR.state.current_menu = RUR.initial_defaults.initial_menu;
    } else {
        RUR.state.current_menu = decodeURIComponent(url_query.queryKey.menu);
        last_menu = localStorage.getItem("world_menu");

        if (probably_invalid(RUR.state.current_menu)) {
            if (!probably_invalid(last_menu)) {
                RUR.state.current_menu = last_menu;
            } else {
                RUR.state.current_menu = RUR.initial_defaults.initial_menu;
            }
        }
    }

    RUR.state.creating_menu = true;
    RUR.load_world_file(RUR.state.current_menu);
    if (RUR.file_io_status == "no link") {
        RUR.make_default_menu(RUR.state.human_language);
    }

    RUR.state.creating_menu = false;

}


function restore_blockly () {
    try {
        _restore_blockly();
    } catch (e) {
        console.log("Could not restore blockly; will try once more in 500 ms.");
        setTimeout(_restore_blockly, 500);
    }
}

function _restore_blockly () {
    var xml, xml_text;
    xml_text = localStorage.getItem("blockly");
    if (xml_text) {
        xml = Blockly.Xml.textToDom(xml_text);
        Blockly.Xml.domToWorkspace(xml, RUR.blockly.workspace);
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
    /* When objects need to be placed at a given location in the world,
       green is used to indicate numbers of objects properly position
       and red for numbers of objects incorrect.  Users can choose their
       own colour scheme and, if it was done before, their choices are
       retrieved from the browser's local storage. */
    var red, green;
    if (localStorage.getItem("userchoice_red") && localStorage.getItem("userchoice_green")){
        red = localStorage.getItem("userchoice_red");
        green = localStorage.getItem("userchoice_green");
        RUR.configure_red_green(red, green);
    }
}
