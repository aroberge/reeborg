/* Author: André Roberge
   License: MIT

   Utilities for dealing with html LocalStorage.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.file_io = {};

RUR.file_io.load_world_file = function (url, existing) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data;
    
    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        RUR.world.import_world(data);
        RUR.we.show_pre_post_code();
        RUR.ui.new_world_selected = true;
        RUR.rec.frames = [];
    } else {    
        $.ajax({url: url,
            async: false,
            error: function(e){
                $("#Reeborg-shouts").html(RUR.translate("Could not find link")).dialog("open");
                RUR.ui.stop();
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
            }
        });
    }
    RUR.we.show_pre_post_code();
};

WW = RUR.file_io.load_world_file;