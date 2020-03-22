/* In this module, we make it possible for a user to define their
   own world menu selection. We also include some default world menus. */
require("./../rur.js");
require("./../translator.js");
require("./world_select.js");
require("./../storage/storage.js");

RUR.custom_world_select = {};

RUR.custom_world_select.make = function (contents) {  // aka RUR._MakeCustomMenu_
    "use strict";
    var i;

    RUR.state.creating_menu = true;
    RUR.world_selector.empty_menu();
    RUR.state.current_menu = RUR.state.world_url;
    for(i=0; i<contents.length; i++){
        RUR.world_selector.append_world( {url:contents[i][0],
                                        shortname:contents[i][1]});
    }
    load_user_worlds();
    localStorage.setItem("world_menu", RUR.state.current_menu);
    RUR.state.creating_menu = false;

    if (RUR.state.session_initialized) {
        RUR.world_selector.set_default();
    }
};

function load_user_worlds() {
    var key, name, i;

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            RUR.storage.append_world_name(name);
            $('#delete-world').show();
        }
    }
}

RUR.make_default_menu = function(language) {
    if (RUR.state.session_initialized) {
        RUR.state.world_url = undefined;
        RUR.state.world_name = undefined;
        RUR.state.current_menu = undefined;
    }

    switch (language) {
        case 'en':
        case 'fr-en':
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_EN;
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_EN);
            break;
        case 'ko-en':
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_KO;
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_KO);
            break;
        case 'fr':
        case 'en-fr':
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_FR);
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_FR;
            break;
        case 'cn':
        case 'en-cn':
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_CN);
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_CN;
            break;
        default:
            RUR.load_world_file(RUR.BASE_URL + RUR.DEFAULT_MENU_EN);
            RUR.initial_defaults.initial_menu = RUR.BASE_URL + RUR.DEFAULT_MENU_EN;
    }

};
