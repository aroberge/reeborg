/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.custom_menu = {};
RUR.custom_menu.new_menu_added = false;

RUR.custom_menu.make = function (contents) {
    "use strict";
    var i;

    $("#select_world").html('');

    for(i=0; i<contents.length; i++){
        if (contents[i][0].indexOf('menu') != -1) {
            $('#select_world').append( $('<option class="select-menu"></option>').val(contents[i][0]).html(contents[i][1]));
        } else {
            $('#select_world').append( $('<option></option>').val(contents[i][0]).html(contents[i][1]));
        }
    }

    RUR.ui.load_user_worlds("initial");

    if (RUR.settings.initial_world) {  // loaded the very first time
        try {
            RUR.ui.select_world(RUR.settings.initial_world, true);
            RUR.settings.initial_world = null;
        } catch (e) {}
    } else {
        RUR.custom_menu.new_menu_added = true;  // will modify program execution
        editor.setValue(RUR.translate("move") + "()");
        $("#select_world").selectedIndex = 0;
        $("#select_world").change();
    }

};

MakeCustomMenu = RUR.custom_menu.make;

RUR.make_default_menu = function(language) {
    switch (language) {
        case 'en': RUR.make_default_menu_en();
                   break;
        case 'fr': RUR.make_default_menu_fr();
                   break;
        default: RUR.make_default_menu_en();
    }
}


RUR.make_default_menu_en = function () {
    "use strict";
    var contents, worlds = 'src/worlds/', docs = 'src/worlds/documentation/';
    var permalinks = 'src/worlds/permalinks/';

    contents = [
        [worlds + 'alone.json', 'Alone'],
        [worlds + 'empty.json', 'Empty'],
        [docs + 'simple_demo1', 'Demo 1 (solution)'],
        [docs + 'simple_demo2', 'Demo 2 (solution)'],
        [docs + 'simple_demo3', 'Demo 3 (solution)'],
        [worlds + 'simple_path.json', 'Simple path'],
        [worlds + 'gravel_path.json', 'Gravel path'],
        [worlds + 'gravel_path',
                           'Gravel path (solution)'],
        [worlds + 'rain1.json', 'Rain 1'],
        [worlds + 'rain2.json', 'Rain 2'],
        [worlds + 'slalom.json', 'Slalom'],
        [permalinks + 'pre_post_demo', 'Pre & Post code demo'],
        [permalinks + 'story', 'Story'],
        [permalinks + 'test_remove', 'Robot replacement'],
        [docs + 'big_maze.json', 'Big maze'],
        [worlds + 'maze_gen_py', 'Maze generation (Python)'],
        [worlds + 'maze_gen_js', 'Maze generation (Javascript)'],
        [worlds + 'menus/tutorial_en', 'Tutorial menu'],
        [worlds + 'blank.json', 'Blank canvas'],
        ];

    RUR.custom_menu.make(contents);
};

RUR.make_default_menu_fr = function () {
    "use strict";
    var contents, worlds = 'src/worlds/';

    contents = [
        [worlds + 'alone.json', 'Seul'],
        [worlds + 'empty.json', 'Vide'],
        [worlds + 'simple_path.json', 'Simple sentier'],
        [worlds + 'gravel_path.json', 'Sentier de gravier'],
        [worlds + 'gravel_path_fr',
                           'Sentier de gravier (solution)'],
        [worlds + 'rain1.json', 'Pluie 1'],
        [worlds + 'rain2.json', 'Pluie 2'],
        [worlds + 'slalom.json', 'Slalom'],
        [worlds + 'menus/documentation_en', 'Documentation (menu anglais)'],
        [worlds + 'menus/tutorial_fr', 'Tutoriel: menu'],
        [worlds + 'blank.json', 'Canevas graphique'],
        ];

    RUR.custom_menu.make(contents);
};