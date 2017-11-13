/* In this module, we make it possible for a user to define their
   own world menu selection. We also include some default world menus. */
require("./../translator.js");
require("./world_select.js");
require("./../storage/storage.js");

RUR.custom_world_select = {};

RUR.custom_world_select.make = function (contents) {  // aka RUR._MakeCustomMenu_
    "use strict";
    var i, url;
    RUR.world_select.empty_menu();
    for(i=0; i<contents.length; i++){
        RUR.world_select.append_world( {url:contents[i][0],
                                        shortname:contents[i][1]});
    }
    load_user_worlds();
    if (RUR.state.session_initialized) {
        RUR.world_select.set_default();
    }
};

function load_user_worlds() {
    var key, name, i;
    RUR.state.creating_menu = true;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            RUR.storage.append_world_name(name);
            $('#delete-world').show();
        }
    }
    if (RUR.state.session_initialized) {
        RUR.state.creating_menu = false;
    }
}


RUR.make_default_menu = function(language) {
    RUR.state.creating_menu = true;
    switch (language) {
        case 'en':
        case 'fr-en':
        case 'ko-en':
            RUR.load_world_file("worlds/menus/default_menu_en.json");
            break;
        case 'fr':
        case 'en-fr':
            RUR.load_world_file("worlds/menus/default_menu_fr.json");
            break;
        default: 
            RUR.load_world_file("worlds/menus/default_menu_en.json");
    }
};
