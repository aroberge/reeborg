/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.file_io = {};

RUR.file_io.load_world_file = function (url, existing) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data, i, change_selected_value=false, elt = document.getElementById("select_world");

    if (url === null) {
        console.log("ignoring null url in RUR.file_io.load_world_file");
        return;
    }

    for (i=0; i < elt.options.length; i++){
        if (elt.options[i].text === url) {
            if (elt.options[i].selected) {
                // Correct world already selected: we're good to go.
                return;
            } else {
                url = elt.options[i].value;
                change_selected_value = url;
                break;
            }
        }
    }

    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        RUR.world.import_world(data);
        RUR.we.show_pre_post_code();
        RUR.ui.new_world_selected = true;
        RUR.rec.frames = [];
    } else {
        $.ajax({url: url,
            async: true,
            error: function(e){
                RUR.rec.frames = [];
                RUR.ui.stop();
                $("#Reeborg-shouts").html(RUR.translate("Could not find link") + url).dialog("open");
            },
            success: function(data){
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    RUR.update_permalink(data, existing);
                    RUR.ui.reload();
                } else {
                    RUR.world.import_world(data);
                    RUR.we.show_pre_post_code();
                }
                RUR.ui.new_world_selected = true;
                RUR.rec.frames = [];
                if (change_selected_value) {
                    $("#select_world").val(url);
                }
            }
        });
    }
};