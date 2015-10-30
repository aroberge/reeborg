/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.file_io = {};

RUR.file_io.load_world_from_program = function (url, shortname) {
    /*  Loads a world or permalink from a user's program using World()

    Possible choices:
        World(shortname)  where shortname is an existing name in html select
            example:  World ("Home 1")

            Another case is where a world in saved in local storage;
            in this case, the url must be modified by the user as in
            World("user_world:My World")

        World(url)  where url is a world or permalink located elsewhere
            example: World("http://personnel.usainteanne.ca/aroberge/reeborg/token.json")
            In this case, the url will be used as a shortname to appear in the menu

        World(url, shortname) where url is a world or permalink located elsewhere
            and shortname is the name to appear in the html select.
    */
    "use strict";
    var selected, possible_url, new_world=false, new_selection=false;
    RUR.file_io.status = undefined;

    if (url === undefined) {
        RUR.control.write(RUR.translate("World() needs an argument."))
        return;
    }

    if (shortname === undefined) {
        shortname = url;
        possible_url = RUR.world_select.url_from_shortname(shortname);
        if (possible_url !== undefined){
            url = possible_url;
        }
    }

    selected = RUR.world_select.get_selected();

    if (selected.shortname.toLowerCase() === shortname.toLowerCase()) {
        return; // Correct world already selected: we're good to go.
    } else if (RUR.world_select.url_from_shortname(shortname)!==undefined){
        url = RUR.world_select.url_from_shortname(shortname);
        new_selection = shortname;
    }  else {
        new_world = shortname;
    }

    RUR.file_io.load_world_file(url);

    if (RUR.file_io.status !== undefined) {
        RUR.rec.frames = [];
        RUR.ui.stop();
        RUR.ui.prevent_playback = true;
    }

    if (RUR.file_io.status === "no link") {
        RUR.cd.show_feedback("#Reeborg-shouts",
                RUR.translate("Could not find link: ") + url);
        throw new RUR.ReeborgError("ignore");
    } else if (RUR.file_io.status === "success") {
        if (new_world) {
            RUR.world_select.append_world({url:url, shortname:new_world});
        }
        RUR.world_select.set_url(url);
        RUR.cd.show_feedback("#Reeborg-shouts",
            RUR.translate("World selected").supplant({world: shortname}));
        throw new RUR.ReeborgError("ignore");
    }
    RUR.rec.frames = [];
    RUR.ui.stop();
    RUR.ui.prevent_playback = true;
    RUR.ui.new_world_selected = true;
};



RUR.file_io.load_world_file = function (url) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data, i, selected, possible_url, new_selection=false, new_world = false;

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
                RUR.file_io.status = "no link";
                console.log("error in ajax from RUR.file_io.")
            },
            success: function(data){
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    RUR.update_permalink(data);
                    RUR.ui.reload();
                } else {
                    RUR.world.import_world(data);
                    RUR.we.show_pre_post_code();
                }
                RUR.file_io.status = "success";
            }
        });
    }
};