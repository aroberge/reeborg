
require("./../libs/jquery.ui.dialog.minmax.js");
require("./../rur.js");
var update_titles = require("./../../lang/msg.js").update_titles;


RUR.create_and_activate_dialogs = function(button, element, add_options, special_fn) {
    var options = {
    minimize: true,
    maximize: false,
    autoOpen: false,
    width: 800,
    height: 600,
    position: {my: "center", at: "center", of: window},
    beforeClose: function( event, ui ) {
            button.addClass("blue-gradient").removeClass("active-element");
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
        button.toggleClass("active-element");
        if (button.hasClass("active-element")) {
            element.dialog("open");
        } else {
            element.dialog("close");
        }
        if (special_fn !== undefined && element.dialog("isOpen")){
            special_fn();
        }
        update_titles();
    });
};

$(document).ready( function () {
    RUR.create_and_activate_dialogs($("#more-menus-button"), $("#more-menus"), {height:700});
    RUR.create_and_activate_dialogs($("#special-keyboard-button"), $("#special-keyboard"),
            {autoOpen:false, width:750, height:400, maximize: false, position:"left"});

    $("#Reeborg-success").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                    position:{my: "left", at: "left", of: $("#editor-panel")}});
    $("#Reeborg-failure").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert",
                                    position:{my: "left", at: "left", of: $("#editor-panel")}});
    $("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:800, height:350,
                                    position:{my: "bottom", at: "bottom-20", of: window}});
    $("#Reeborg-proclaims").dialog({minimize: false, maximize: false, autoOpen:false, width:800, height:400, dialogClass: "proclaims",
                                    position:{my: "bottom", at: "bottom-80", of: window}});
    $("#Reeborg-watches").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:400, dialogClass: "watches",
                                    position:{my: "bottom", at: "bottom-140", of: window}});

});
