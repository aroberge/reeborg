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
};

MakeCustomMenu = RUR.custom_menu.make;
