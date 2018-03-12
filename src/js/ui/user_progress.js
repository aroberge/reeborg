/* Attempt at creating a way for users to follow their progress */

require("../rur.js");
require("../utils/key_exist.js");
require("./../translator.js");
var record_id = require("./../../lang/msg.js").record_id;
var remove_fileInput_listener = require("../listeners/onclick.js").remove_fileInput_listener;

function update_world_selector (name, remove) {
    var options = $("#select-world")[0].options;
    console.log("update_world_selector with name, remove:", name, remove);
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
    var prog_method, menu;

    if (name.substring(0,11) === "user_world:"){
        return name;
    }

    prog_method = _get_programming_method();
    if (RUR.state.user_progress[prog_method] === undefined) {
        return name;
    }

    menu = RUR.state.user_progress[prog_method][RUR.state.current_menu];
    if (menu !== undefined && menu.includes(name)) {
        return name += RUR.CHECKMARK;
    }
    return name;
};

RUR.update_progress = function(){
    var world_name, prog_method, world = RUR.get_current_world();
    console.log("entering update_progress");
    if (RUR.state.input_method == "py-repl") {
        console.log('input_method', RUR.state.input_method);
        return;
    }
    if (world.goal === undefined && world.post === undefined) {
        console.log("no goal");
        return;   // this world does not have anything that needs to be solved.
    }
    world_name = RUR.state.world_name;
    if (!world_name) {
        console.log("no world_name", world_name);
        return;
    }
    if (world_name.substring(0,11) === "user_world:"){
        console.log("user world", world_name);
        return;
    }
    console.log("about to update_progress");
    prog_method = _get_programming_method();
    RUR.utils.ensure_key_for_obj_exists(RUR.state.user_progress[prog_method], prog_method);
    RUR.utils.ensure_key_for_array_exists(RUR.state.user_progress[prog_method], RUR.state.current_menu);
    console.log("prog_method", prog_method);
    if (!RUR.state.user_progress[prog_method][RUR.state.current_menu].includes(world_name)) {
        RUR.state.user_progress[prog_method][RUR.state.current_menu].push(world_name);
    }
    update_world_selector(world_name);
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
};

function _get_programming_method() {
    var programming_method, input_method;
    input_method = localStorage.getItem("input_method");
    if (input_method == "blockly-py" || input_method == "blockly-js") {
        programming_method = "blockly";
    } else if (input_method == "javascript") {
        programming_method = "javascript";
    } else {
        programming_method = "python";
    }
    return programming_method;
}

/* The first implementation of user progress kept track of world collections (menu)
   and world names, regardless of the programming method used 
   (blockly, Python code, Javascript code).
   The new version, which is introduced just a few months after the intial
   implementation, allows users to try to solve a given world using different
   methods, and keep track of progress using each. 
   When we retrieve the progress status from local storage, we might need
   to convert from the old implementation to the new one.
   We guess the conversion based on the current input method which should be
   the last one used.

 */
function _retrieve_progress () {
    var prog_method, progress, user_progress, valid_methods, i, method;
    valid_methods = ["python", "javascript", "blockly"];
    progress = localStorage.getItem("user-progress");
    prog_method = _get_programming_method();

    user_progress = {}
    if (progress) {
        try {
            user_progress = JSON.parse(progress);
            if (user_progress == null || typeof user_progress == "string") {
                user_progress = {};
            }
        } catch (e) {}
    }

    for(i=0; i<valid_methods.length; i++){
        if (user_progress[valid_methods[i]] !== undefined){
            RUR.state.user_progress = user_progress;  // no conversion needed            
            return;
        }
    }
    RUR.state.user_progress[prog_method] = user_progress;
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));    
}

_retrieve_progress();


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
    var badges, menu, prog_method, world_name, options = $("#select-world")[0].options;
    prog_method = _get_programming_method();
    if (RUR.state.user_progress[prog_method] === undefined) {
        return;
    }
    menu = RUR.state.current_menu;
    badges = RUR.state.user_progress[prog_method][menu];
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
    if (RUR.state.user_progress[prog_method] === undefined) {
        return;
    }
    tasks = RUR.state.user_progress[prog_method][RUR.state.current_menu];
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


