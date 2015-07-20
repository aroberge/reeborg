/* Author: André Roberge
   License: MIT

   Utilities for dealing with html LocalStorage.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.storage = {};

RUR.storage.memorize_world = function () {
    var existing_names, i, key, response;
    existing_names = ' [';

    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            existing_names += key.substring(11) + ", ";
        }
    }
    existing_names += "]";
    response = prompt(RUR.translate("Enter world name to save") + existing_names);
    if (response !== null) {
        RUR.storage._save_world(response.trim());
        $('#delete-world').show();
    }
};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        RUR.storage.delete_world(name);
    }
    RUR.storage.save_world(name);
};

RUR.storage.save_world = function (name){
    "use strict";
    localStorage.setItem("user_world:"+ name, RUR.world.export_world(RUR.current_world));
    $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                              ).val("user_world:" + name).html(name));
    $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
    $("#select_world").change();
};


RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    if (localStorage.getItem("user_world:" + name) === null){
        $("#Reeborg-shouts").html(RUR.translate("No such world!")).dialog("open");
        return;
    }
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();
    try {
        RUR.ui.select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.ui.select_world("Alone");
    }
    $("#select_world").change();

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};

RUR.storage.remove_world = function () {
    var existing_names, i, key, response;
    existing_names = ' [';

    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            existing_names += key.substring(11) + ", ";
        }
    }
    existing_names += "]";
    response = prompt(RUR.translate("Enter world name to delete") + existing_names);
    if (response !== null) {
        RUR.storage.delete_world(response.trim());
    }
};