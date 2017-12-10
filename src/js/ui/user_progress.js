/* Attempt at creating a way for users to follow their progress */

require("../rur.js");
require("../utils/key_exist.js");

function update_world_selector (name) {
    var options = $("#select-world")[0].options;
    for (var i=0; i<options.length; i++) {
        if (options[i].innerHTML == name) {
            options[i].innerHTML = name + RUR.CHECKMARK;
            // Initially added extra styling with 
            // .select-success {
            //   background-color: green;
            //   color: white;
            //   }
            // in css file, and using the following code
            //    options[i].setAttribute("class", "select-success");
            // but this seems to be an overkill since the robot face
            // was added.  To be decided after some more tests.
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
    if (menu !== undefined && menu.indexOf(name) != -1) {
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
    if (world_name.substring(0,11) === "user_world:"){
        return;
    }
    update_world_selector(world_name);
    RUR.utils.ensure_key_for_array_exists(RUR.state.user_progress, RUR.state.current_menu);
    RUR.state.user_progress[RUR.state.current_menu].push(world_name);
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
