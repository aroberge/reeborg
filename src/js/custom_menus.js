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

    $("#select_world").change();

    RUR.custom_menu.new_menu_added = true;  // will modify program execution

    editor.setValue(RUR.translate("move") + "()");
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
    var contents, worlds = 'src/worlds/';

    contents = [
        [worlds + 'alone.json', 'Alone'],
        [worlds + 'empty.json', 'Empty'],
        [worlds + 'simple_path.json', 'Simple path'],
        [worlds + 'gravel_path.json', 'Gravel path'],
        [worlds + 'gravel_path',
                           'Gravel path (solution)'],
        [worlds + 'rain1.json', 'Rain 1'],
        [worlds + 'rain2.json', 'Rain 2'],
        [worlds + 'menus/documentation_en', 'Documentation menu'],
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
        [worlds + 'menus/documentation_en', 'Documentation (menu anglais)'],
        [worlds + 'menus/tutorial_en', 'Tutoriel: menu'],
        [worlds + 'blank.json', 'Canevas graphique'],
        ];

    RUR.custom_menu.make(contents);
};