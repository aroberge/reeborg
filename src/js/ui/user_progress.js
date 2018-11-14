/* Attempt at creating a way for users to follow their progress */

require("../rur.js");
require("../utils/key_exist.js");
require("./../translator.js");
var record_id = require("./../../lang/msg.js").record_id;
var remove_fileInput_listener = require("../listeners/onclick.js").remove_fileInput_listener;


/* This function updates a single name in the world selector,
   to either add or remove a checkmark */
function update_name_in_world_selector (name, remove) {
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

/* This function is intended to be called when a programming language is
   changed, so as to update the "checkmarks" in the world selector.
 */

RUR.update_marks_in_world_selector = function() {
    var prog_method, menu, options, name;

    options = $("#select-world")[0].options;
    for (var i=0; i<options.length; i++) {
        options[i].innerHTML = RUR.strip_checkmark(options[i].innerHTML);
    }

    prog_method = _get_programming_method();
    if (RUR.state.user_progress[prog_method] == undefined) {
        return;
    }
    menu = RUR.state.user_progress[prog_method][RUR.state.current_menu];
    if (menu == undefined) {
        return;
    }

    for (var i=0; i<options.length; i++) {
        name = options[i].innerHTML;
        if (menu.includes(name)) {
            options[i].innerHTML = name + RUR.CHECKMARK;
        }
    }
};


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
    if (!RUR.state.current_menu) {
        return;
    }
    if (RUR.state.input_method == "py-repl") {
        return;
    }
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
    prog_method = _get_programming_method();
    if (prog_method == "invalid") {
        return;
    }
    RUR.utils.ensure_key_for_obj_exists(RUR.state.user_progress, prog_method);
    RUR.utils.ensure_key_for_array_exists(RUR.state.user_progress[prog_method], RUR.state.current_menu);
    if (!RUR.state.user_progress[prog_method][RUR.state.current_menu].includes(world_name)) {
        RUR.state.user_progress[prog_method][RUR.state.current_menu].push(world_name);
    }
    update_name_in_world_selector(world_name);
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
    save_user_solution();
};

function _get_programming_method() {
    var programming_method, input_method;
    input_method = localStorage.getItem("input_method");
    if (input_method == "blockly-py" || input_method == "blockly-js") {
        programming_method = "blockly";
    } else if (input_method == "javascript") {
        programming_method = "javascript";
    } else if (input_method == "python") {
        programming_method = "python";
    } else {
        programming_method = "invalid"; // value not used for saving progress
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
    var prog_method, progress, user_progress, valid_methods, i;
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


function _retrieve_user_solutions () {
    solutions = localStorage.getItem("user-solutions");
    if (solutions) {
        try {
            solutions = JSON.parse(solutions);
        } catch (e) {
            solutions = {};
        }
        
    } else {
        solutions = {};
    }
    RUR.state.user_solutions = solutions;
}
_retrieve_user_solutions();


function save_progress() {
    var blob, combined;

    combined = JSON.stringify({'progress': RUR.state.user_progress,
                'solutions': RUR.state.user_solutions});

    blob = new Blob([combined], {type: "text/javascript;charset=utf-8"});
    saveAs(blob, "progress.json", true);
}

// From https://stackoverflow.com/a/8764974/558799
function mergeRecursive(obj1, obj2) {
  if (Array.isArray(obj2)) { return obj1.concat(obj2); }
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor==Object ) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p]);
      } else if (Array.isArray(obj2[p])) {
        obj1[p] = obj1[p].concat(obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }
  return obj1;
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
            var content = reader.result, progress, combined, solutions;
            try {
                combined = JSON.parse(content);
                progress = combined['progress'];
                solutions = combined['solutions'];
            } catch (e2) {
                alert(RUR.translate("Cannot parse progress file."));
                return;
            }
            try {
                RUR.state.user_progress = mergeRecursive(RUR.state.user_progress, progress);
                localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
                RUR.state.user_solutions = mergeRecursive(RUR.state.user_solutions, solutions);
                localStorage.setItem("user-solutions", JSON.stringify(RUR.state.user_solutions));
                refresh_world_selector();
            } catch (e) {
                alert(RUR.translate("Cannot merge progress."));
            }
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
 * Useful for testing interactively.
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
    RUR.state.user_progress[prog_method][RUR.state.current_menu] = tasks;
    update_name_in_world_selector(name, remove);
    localStorage.setItem("user-progress", JSON.stringify(RUR.state.user_progress));
};


record_id('save-progress-btn', "SAVE PROGRESS");
record_id('import-progress-btn', "IMPORT PROGRESS");
record_id('retrieve-solution-btn', "RETRIEVE SOLUTION")
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

    $("#retrieve-solution-btn").on("click", function (evt) {
        retrieve_user_solution();
    });

});


// Do not change the value of library_separator()as it could break
// some programs saved previously. Note that it will be different for each
// human language - provided that a translation exists.

RUR.library_separator = function () {  // also used in keyboard_shortcuts.js
    return "\n" +
    "################################################################\n# " +
    RUR.translate("WARNING: Do not change this comment.") +    
    "\n# " + RUR.translate("Library Code is below.") +  
    "\n################################################################\n";
}

// save solution for a given world
function save_user_solution () {
    var prog_method;
    prog_method = _get_programming_method();
    switch(prog_method) {
        case "python":
            content = editor.getValue() + RUR.library_separator()+ library.getValue();
            break;
        case "blockly":
            content = RUR.blockly.getValue();
            break;                 
        case "javascript":
            content = editor.getValue();
            break;      
        default:
            return;  
    }
    RUR.utils.ensure_key_for_obj_exists(RUR.state.user_solutions, prog_method);
    RUR.utils.ensure_key_for_obj_exists(RUR.state.user_solutions[prog_method], RUR.state.current_menu);
    try {
        RUR.utils.ensure_key_for_obj_exists(
            RUR.state.user_solutions[prog_method][RUR.state.current_menu], 
            RUR.state.world_name);
        RUR.state.user_solutions[prog_method][RUR.state.current_menu][RUR.state.world_name] = content;
        localStorage.setItem("user-solutions", JSON.stringify(RUR.state.user_solutions));
    } catch (e) {
        console.log("problem in save_user_solution", e);
        console.log("   world_name = ", RUR.state.world_name);
        console.log("   current_menu = ", RUR.state.current_menu);
    }

}

// retrieves user solution if it is found
retrieve_user_solution = function () {
    "use strict";
    var prog_method, parts, solution=undefined;
    prog_method = _get_programming_method();

    if (RUR.state.user_solutions[prog_method] &&
        RUR.state.user_solutions[prog_method][RUR.state.current_menu]
        ) {
        solution = RUR.state.user_solutions[prog_method][RUR.state.current_menu][RUR.state.world_name];
    }

    if (!solution) {
        alert(RUR.translate("No solution found for this world."));
        return;
    }

    switch(prog_method) {
        case "python":
            parts = solution.split(RUR.library_separator());
            if (parts.length == 2) {
                library.setValue(parts[1]);
            }
            editor.setValue(parts[0]);
            break;
        case "blockly":
            RUR.blockly.setValue(solution);
            break;                 
        case "javascript":
            editor.setValue(solution);
            break;      
        default:
            console.log("default should never be called in RUR.retrieve_user_solution");
            return;  
    }
}
