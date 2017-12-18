/* Attempt at creating a way for users to follow their progress */

require("../rur.js");
require("../utils/key_exist.js");
require("./../translator.js");
var record_id = require("./../../lang/msg.js").record_id;
var remove_fileInput_listener = require("../listeners/onclick.js").remove_fileInput_listener;

function update_world_selector (name, remove) {
    var options = $("#select-world")[0].options;
    for (var i=0; i<options.length; i++) {
        if (remove) {
            if (RUR.strip_checkmark(options[i].innerHTML) == name) {
                options[i].innerHTML = name;
                break;
            }
        } else if (options[i].innerHTML == name) {
            options[i].innerHTML = name + RUR.CHECKMARK;
            break;
        }
    }
}

RUR.strip_checkmark = function (name) {
    return name.replace(RUR.CHECKMARK, '');
};

/* Add a checkmark only if the world has been solved.
*/
RUR.add_checkmark = function (name) {
    var menu = RUR.state.user_progress[RUR.state.current_menu];
    if (name.substring(0,11) === "user_world:"){
        return name;
    }
    if (menu !== undefined && menu.includes(name)) {
        return name += RUR.CHECKMARK;
    }
    return name;
};

RUR.update_progress = function(){
    var world_name, world = RUR.get_current_world();
    if (world.goal === undefined && world.post === undefined) {
        return;   // this world does not have anything that needs to be solved.
    }
    world_name = RUR.state.world_name;
    if (!world_name) {
        return;
    }
    if (world_name.substring(0,11) === "user_world:"){
        return;
    }

    RUR.utils.ensure_key_for_array_exists(RUR.state.user_progress, RUR.state.current_menu);
    if (!RUR.state.user_progress[RUR.state.current_menu].includes(world_name)) {
        RUR.state.user_progress[RUR.state.current_menu].push(world_name);
    }
    update_world_selector(world_name);
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
};

function retrieve_progress () {
    var progress = localStorage.getItem("user-progress");
    if (progress) {
        try {
            RUR.state.user_progress = JSON.parse(progress);
        } catch (e) {
            RUR.state.user_progress = {};
        }
    }
}

retrieve_progress();


function save_progress() {
    var blob, filename, filetype, progress;

    progress = JSON.stringify(RUR.state.user_progress);
    filetype = "text/javascript;charset=utf-8";
    filename = "progress.json";

    blob = new Blob([progress], {type: filetype});
    saveAs(blob, filename, true);
}


function import_progress () {
    var fileInput;
    remove_fileInput_listener();
    $("#fileInput").click();
    fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(e) {
        var file, reader;
        reader = new FileReader();
        reader.onload = function(e) {
            var content = reader.result, progress;
            try {
                progress = JSON.parse(content);
            } catch (e2) {
                alert(RUR.translate("Cannot parse progress file."));
                return;
            }
            Object.assign(RUR.state.user_progress, progress);
            localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
            refresh_world_selector();
            fileInput.value = '';
        };

        file = fileInput.files[0];
        reader.readAsText(file);
    });
}

function refresh_world_selector() {
    "use strict";
    var badges, menu, world_name, options = $("#select-world")[0].options;
    menu = RUR.state.current_menu;
    badges = RUR.state.user_progress[menu];
    if (badges === undefined) {
        return;
    }
    for (var i=0; i<options.length; i++) {
        world_name = RUR.strip_checkmark(options[i].innerHTML);
        if (badges.includes(world_name)) {
            options[i].innerHTML = world_name + RUR.CHECKMARK;
        }
    }
}

/** @function unmark_task
 * @memberof RUR
 * @instance
 * @summary Removes the tasks from the list of completed tasks. If the task
 * cannot be found, the function will fail silently.
 *
 * @param {string} name The name of task as it appears in the world selector, 
 * like `Home 1`.
 *
 */

RUR.unmark_task = function (name) {
    var tasks, remove=true;
    tasks = RUR.state.user_progress[RUR.state.current_menu];
    if (tasks === undefined) {
        return;
    }
    if (!tasks.includes(name)) {
        return;
    } 
    tasks.splice(tasks.indexOf(name), 1);
    RUR.state.user_progress[RUR.state.current_menu] = tasks;
    update_world_selector(name, remove);
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
};


record_id('save-progress-btn', "SAVE PROGRESS");
record_id('import-progress-btn', "IMPORT PROGRESS");
$(document).ready(function() {
    $("#save-progress-btn").on("click", function (evt) {
        save_progress();
    });
    $("#import-progress-btn").on("click", function (evt) {
        import_progress();
        try {
            $("#more-menus").dialog("close");
        } catch (e) {}
    });
});


