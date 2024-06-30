require("./../rur.js");
//TODO: review requirements
require("./../recorder/recorder.js");
require("./../editors/update.js");
require("./../world_utils/import_world.js");
require("./../ui/world_select.js");
require("./../permalink/permalink.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../ui/stop.js");
require("./../utils/supplant.js");

RUR._load_world_from_program = function (url, shortname) {
    "use strict";
    var selected, possible_url, new_world=false;
    RUR.file_io_status = undefined;

    //this is only for the Javascript version; Python will intercept
    // a missing argument before this is called.
    if (url === undefined) {
        throw new RUR.ReeborgError(RUR.translate("World() needs an argument."));
    }

    if (shortname === undefined) {
        shortname = url;
        possible_url = RUR.world_selector.url_from_shortname(shortname);
        if (possible_url !== undefined){
            url = possible_url;
        }
    }

    selected = RUR.world_selector.get_selected();

    if (selected.shortname.toLowerCase() === shortname.toLowerCase()) {
        // We never pay attention to the return value in the main program.
        // However, it is useful for testing purpose.
        return "no world change";
    } else if (selected.url === url && shortname != selected.shortname) {
        RUR.world_selector.replace_shortname(url, shortname);
        return;
    } else if (RUR.world_selector.url_from_shortname(shortname)!==undefined){
        url = RUR.world_selector.url_from_shortname(shortname);
    }  else {
        new_world = shortname;
    }

    RUR.load_world_file(url, shortname);
    if (RUR.file_io_status === "no link") {
        RUR.show_feedback("#Reeborg-failure", RUR.translate("Could not find link: ") + url);
        throw new RUR.ReeborgError(RUR.translate("Could not find link: ") + url);
    } else if (RUR.file_io_status === "success") {
        RUR.state.prevent_playback = true;
        if (new_world) {
            RUR.world_selector.append_world({url:url, shortname:new_world});
        }
        RUR.world_selector.set_url(url);
        RUR.stop();
        throw new RUR.ReeborgOK(RUR.translate("World selected").supplant({world: shortname}));
    }
};

RUR._last_url_loaded = undefined;
RUR._last_shortname_loaded = undefined;

RUR.load_world_file = function (url, shortname) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data;
    RUR.file_io_status = undefined;

    if (!shortname) {
        shortname = url;
    }

    if (RUR._last_url_loaded &&
        RUR._last_url_loaded == url &&
        RUR._last_shortname_loaded &&
        RUR._last_shortname_loaded == shortname) {
            return;
    } else {
        RUR._last_url_loaded = url;
        RUR._last_shortname_loaded = shortname;
    }
    if (!url) {
        RUR.file_io_status = "no link";
        return;
    }

    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        if (data === null) {
            RUR.file_io_status = "no link";
            return;
        }
        RUR.world_utils.import_world(data);
        RUR.file_io_status = "success";
        RUR.frames = [];
    } else {
        $.ajax({url: url,
            async: false,
            error: function(e){
                RUR.file_io_status = "no link";
            },
            success: function(data){
                RUR.state.world_url = url;
                RUR.state.world_name = shortname;
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    // TODO: the function below no longer exists; so something
                    // is definitely not right as I just commented it out
                    // RUR.permalink.update(data, shortname);
                    RUR.reload();
                } else {
                    RUR.world_utils.import_world(data);
                }
                RUR.permalink.update_URI();
                RUR.file_io_status = "success";
            }
        });
    }
};
