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
        $('#select_world').append( $('<option></option>').val(contents[i][0]).html(contents[i][1]));
    }

    $("#select_world").change();

    RUR.custom_menu.new_menu_added = true;  // will modify program execution
};



// RUR.custom_menu.load_world = function (filename) {
//     "use strict";
//     var url, elt = document.getElementById("custom-world-menu");

//     for (var i=0; i < elt.options.length; i++){
//         if (elt.options[i].text === filename) {
//             if (elt.options[i].selected) {
//                 // Correct world already selected: we're good to go.
//                 return;
//             } else {
//                 RUR.custom_menu.load_file(elt.options[i].value);
//                 RUR.ui.new_world_selected = true;
//                 RUR.rec.frames = [];
//                 throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: filename}));
//             }
//         }
//     }
// };
