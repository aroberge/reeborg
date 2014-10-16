/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.storage = {};

RUR.storage.save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
    }
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