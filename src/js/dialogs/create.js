
require("./../libs/jquery.ui.dialog.minmax.js");
;
// require("jquery-ui");

RUR.create_and_activate_dialogs = function(button, element, add_options, special_fn) {
    var options = {
    minimize: true,
    maximize: false,
    autoOpen: false,
    width: 800,
    height: 600,
    position: {my: "center", at: "center", of: window},
    beforeClose: function( event, ui ) {
            button.addClass("blue-gradient").removeClass("reverse-blue-gradient");
            if (special_fn !== undefined){
                special_fn();
            }
        }
    };
    for (var attrname in add_options) {
        options[attrname] = add_options[attrname];
    }

    button.on("click", function(evt) {
        element.dialog(options);
        button.toggleClass("blue-gradient");
        button.toggleClass("reverse-blue-gradient");
        if (button.hasClass("reverse-blue-gradient")) {
            element.dialog("open");
        } else {
            element.dialog("close");
        }
        if (special_fn !== undefined && element.dialog("isOpen")){
            special_fn();
        }
    });
};


RUR.create_and_activate_dialogs($("#about-button"), $("#about-div"), {});
RUR.create_and_activate_dialogs($("#more-menus-button"), $("#more-menus"), {height:700});
RUR.create_and_activate_dialogs($("#special-keyboard-button"), $("#special-keyboard"),
        {autoOpen:false, width:600,  height:350, maximize: false, position:"left"});


$("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                position:{my: "center", at: "center", of: $("#robot_canvas")}});
$("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert",
                                position:{my: "center", at: "center", of: $("#robot_canvas")}});
$("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:250,
                                position:{my: "bottom", at: "bottom-20", of: window}});
$("#Reeborg-explores").dialog({minimize: false, maximize: false, autoOpen:false, width:600,
                                position:{my: "center", at: "center", of: $("#robot_canvas")}});
$("#Reeborg-proclaims").dialog({minimize: false, maximize: false, autoOpen:false, width:800, dialogClass: "proclaims",
                                position:{my: "bottom", at: "bottom-80", of: window}});
$("#Reeborg-watches").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:400, dialogClass: "watches",
                                position:{my: "bottom", at: "bottom-140", of: window}});
