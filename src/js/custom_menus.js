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

    if (RUR.ui.user_worlds_loaded === undefined) {
        RUR.ui.load_user_worlds("initial");
        RUR.ui.user_worlds_loaded = true;
    }


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
    var base_url, contents, menus, worlds = 'src/worlds/';

    base_url = 'src/worlds/tutorial_en/';
    menus = 'src/worlds/menus/';
    worlds = 'src/worlds/';


    contents = [
        ['src/worlds/alone.json', 'Seul'],
        ['src/worlds/empty.json', 'Vide'],
        [base_url + 'around1.json', 'Autour 1'],
        [base_url + 'around2.json', 'Autour 2'],
        [base_url + 'around3.json', 'Autour 3'],
        [base_url + 'around4.json', 'Autour 4'],
        [base_url + 'home1.json', 'But 1'],
        [base_url + 'home2.json', 'But 2'],
        [base_url + 'home3.json', 'But 3'],
        [base_url + 'center1.json', 'Centrer 1'],
        [base_url + 'center2.json', 'Centrer 2'],
        [base_url + 'center3.json', 'Centrer 3'],
        [base_url + 'hurdle1.json', 'Haies 1'],
        [base_url + 'hurdle2.json', 'Haies 2'],
        [base_url + 'hurdle3.json', 'Haies 3'],
        [base_url + 'hurdle4.json', 'Haies 4'],
        [base_url + 'tokens1.json', 'Jetons 1'],
        [base_url + 'tokens2.json', 'Jetons 2'],
        [base_url + 'tokens3.json', 'Jetons 3'],
        [base_url + 'tokens4.json', 'Jetons 4'],
        [base_url + 'tokens5.json', 'Jetons 5'],
        [base_url + 'tokens6.json', 'Jetons 6'],
        [base_url + 'newspaper1.json', 'Journal 1'],
        [base_url + 'newspaper2.json', 'Journal 2'],
        [base_url + 'maze1.json', 'Labyrinthe 1'],
        [base_url + 'maze2.json', 'Labyrinthe 2'],
        [base_url + 'rain1.json', 'Pluie 1'],
        [base_url + 'rain2.json', 'Pluie 2'],
        [base_url + 'harvest1.json', 'Récolte 1'],
        [base_url + 'harvest2.json', 'Récolte 2'],
        [base_url + 'harvest3.json', 'Récolte 3'],
        [base_url + 'harvest4a.json', 'Récolte 4a'],
        [base_url + 'harvest4b.json', 'Récolte 4b'],
        [base_url + 'harvest4c.json', 'Récolte 4c'],
        [base_url + 'harvest4d.json', 'Récolte 4d'],
        [base_url + 'storm1.json', 'Tempête 1'],
        [base_url + 'storm2.json', 'Tempête 2'],
        [base_url + 'storm3.json', 'Tempête 3'],
        // [menus + 'default_fr', 'Menu par défaut'],
        [worlds + 'menus/documentation_fr', 'Documentation (menu anglais)'],
        [worlds + 'simple_path.json', 'Simple sentier'],
        [worlds + 'gravel_path.json', 'Sentier de gravier'],
        [worlds + 'gravel_path_fr',
                           'Sentier de gravier (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        ['src/worlds/blank.json', 'Canevas graphique'],
    ]

    RUR.custom_menu.make(contents);
};