/* Menu driven world editor */


require("./../translator.js");
require("./../rur.js");
require("./../default_tiles/tiles.js");

require("./../robot/robot.js");
require("./../editors/update.js");
require("./../drawing/visible_world.js");
require("./../programming_api/exceptions.js");
require("./../world_get/world_get.js");
require("./../world_set/world_set.js");
require("./../dialogs/create.js");
require("./../listeners/canvas.js");
require("./../editors/create.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");

require("./../world_set/object.js");
require("./../world_set/goal_object.js");
require("./../world_set/add_robot.js");
require("./../world_set/give_object_to_robot.js");

require("./../world_api/walls.js"); 

var edit_robot_menu = require("./../ui/edit_robot_menu.js");
var dialog_add_object = require("./../dialogs/add_object.js").dialog_add_object;
var dialog_give_object = require("./../dialogs/give_object.js").dialog_give_object;
var dialog_goal_object = require("./../dialogs/goal_object.js").dialog_goal_object;
var dialog_set_background_image = require("./../dialogs/set_background_image.js").dialog_set_background_image;
var dialog_select_colour = require("./../dialogs/select_colour.js").dialog_select_colour;


var identical = require("./../utils/identical.js").identical;

RUR.we = {};   // we == World Editor

RUR.we.give_to_robot_flag = false;

RUR.we.edit_world = function  () {
    "use strict";
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    var value, split, root, x, y, position;
    split = RUR.we.edit_world_flag.split("-");
    root = split[0];
    value = split[1];
    switch (root) {
        case "robot":
            if (value == "place") {
                place_robot();
            }
            break;
        case "object":
            if (RUR.we.decorative_objects_flag) {
                toggle_decorative_object(value);
            } else {
                add_object(value);
            }
            break;
        case "tile":
            toggle_tile(value);
            break;
        case "solid_object":
            toggle_obstacle(value);
            break;
        case "world":
            if (value == "walls") {
                toggle_wall();
            }
            break;
        case "position":
            RUR.we.set_goal_position(value);
            break;
        case "goal":
            if (value == "wall") {
                toggle_goal_wall();
            } else {
                add_goal_object(value);
            }
            break;
        default:
            break;
    }
    RUR.vis_world.refresh_world_edited();
};

function toggle_decorative_object(value) {
    "use strict";
    var x, y, position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (RUR.is_decorative_object(value, x, y)) {
        RUR.remove_decorative_object(value, x, y);
    } else {
        RUR.add_decorative_object(value, x, y);
    }
}

function alert_1 (txt) {
    $("#cmd-result").html(RUR.translate(txt)).effect("highlight", {color: "gold"}, 1500);
}

function alert_2 (txt, value) {
    $("#cmd-result").html(RUR.translate(txt).supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
}

RUR.we.select = function (choice) {
    "use strict";
    var value, split, root;
    RUR.we.edit_world_flag = choice;
    split = choice.split("-");
    root = split[0];
    value = split[1];
    $(".edit-world-canvas").hide();
    $(".edit-goal-canvas").hide();
    $("#edit-goal-position").hide();
    $("#edit-world-objects").hide();
    $(".not-for-robot").hide();
    switch (root) {
        case "robot":
            switch (value) {
            case "place":
                alert_1("Click on world to move robot.");
                break;
            case "add":
                alert_1("Added robot.");
                RUR._add_robot();
                RUR.we.edit_world();
                edit_robot_menu.toggle();
                break;
            case "orientation":
                alert_1("Click on image to turn robot");
                $("#edit-world-turn").show();
                $("#random-orientation").show();
                break;
            case "objects":
                RUR.we.give_to_robot_flag = true;
                $("#edit-world-objects").show();
                $(".not-for-robot").hide();
                alert_1("Click on desired object below.");
                break;
            }
            break;
        case "decorative":
            RUR.we.decorative_objects_flag = true;
            $("#edit-world-objects").show();
            RUR.we.give_to_robot_flag = false;
            alert_1("Click on desired object below.");
            break;
        case "background":
            dialog_set_background_image.dialog("open");
            break;
        case "world":
            switch (value) {
            case "objects":
                RUR.we.decorative_objects_flag = false;
                $("#edit-world-objects").show();
                RUR.we.give_to_robot_flag = false;
                alert_1("Click on desired object below.");
                break;
            case "tiles":
                $("#edit-tile").show();
                alert_1("Click on desired tile below.");
                break;
            case "fill_tiles":
                $("#fill-tile").show();
                alert_1("Click on desired tile below.");
                break;
            case "solid_objects":
                $("#edit-solid-object").show();
                alert_1("Click on desired object below.");
                break;
            case "walls":
                alert_1("Click on world to toggle walls.");
                break;
            }
            break;
        case "object":
            $("#edit-world-objects").show();
            if (RUR.we.give_to_robot_flag) {
                give_objects_to_robot(value);
                RUR.we.edit_world_flag = '';
            } else {
                alert_2("Click on world to add object.", value);
            }
            break;
        case "tile":
            $("#edit-tile").show();
            alert_2("Click on world to toggle tile.", value);
            break;
        case "fill":
            fill_with_tile(value);
            break;
        case "solid_object":
            $("#edit-solid-object").show();
            alert_2("Click on world to toggle object.", value);
            break;
        case "position":
            alert_1("Click on world to set home position for robot.");
            break;
        case "goal":
            switch (value) {
            case "robot":
                $("#edit-goal-position").show();
                alert_1("Click on image desired to indicate the final position of the robot.");
                break;
            case "wall":
                alert_1("Click on world to toggle additional walls to build.");
                break;
            case "objects":
                $("#edit-goal-objects").show();
                alert_1("Click on desired goal object below.");
                break;
            default:
                $("#edit-goal-objects").show();
                alert_2("Click on world to set number of goal objects.", value);
                break;
            }
        break;
        case "set":
            RUR.world_set.dialog_set_dimensions.dialog('open');
            break;
    }
};

RUR.we.toggle_editing_mode = function () {
    if (RUR.state.editing_world) {  // done editing
        $("#pre-code-tab").parent().hide();
        $("#post-code-tab").parent().hide();
        $("#description-tab").parent().hide();
        $("#onload-editor-tab").parent().hide();

        RUR.state.editing_world = false;
        RUR.state.code_evaluated = false;
        RUR.WALL_COLOR = "brown";
        RUR.SHADOW_WALL_COLOR = "#f0f0f0";
        try {
            localStorage.setItem("editor", editor.getValue());
            localStorage.setItem("library", library.getValue());
        } catch (e) {}
        $("#editor-tab").trigger('click');
    } else {
        $("#pre-code-tab").parent().show();
        $("#post-code-tab").parent().show();
        $("#description-tab").parent().show();
        $("#onload-editor-tab").parent().show();
        edit_robot_menu.toggle();
        RUR.state.editing_world = true;
        RUR.WALL_COLOR = "black";
        RUR.SHADOW_WALL_COLOR = "#ccd";
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
    RUR.vis_world.draw_all();
};

record_id("edit-world", "EDIT WORLD");
record_id("edit-world-text", "EDIT WORLD EXPLAIN");
RUR.create_and_activate_dialogs( $("#edit-world"), $("#edit-world-panel"),
                                 {}, function () {RUR.we.toggle_editing_mode();
                                     $("#more-menus").dialog("minimize"); });

function place_robot () {
    "use strict";
    var position, world=RUR.CURRENT_WORLD, robot, arr=[], pos, present=false;
    position = RUR.calculate_grid_position();
    if (world.robots !== undefined){
        if (world.robots.length >0) {
            robot = world.robots[0];
            if (!robot.possible_initial_positions){
                robot.possible_initial_positions = [[robot.x, robot.y]];
            }
        } else {
            RUR._add_robot();
            robot = world.robots[0];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            robot.possible_initial_positions = [[robot.x, robot.y]];
            return;
        }
    }

    for (var i=0; i < robot.possible_initial_positions.length; i++){
        pos = robot.possible_initial_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
        } else {
            arr.push(pos);
            robot.x = pos[0];
            robot.y = pos[1];
        }
    }
    if (!present){
        arr.push(position);
        robot.x = position[0];
        robot.y = position[1];
    }

    if (arr.length===0){
        RUR.CURRENT_WORLD.robots = [];
        edit_robot_menu.toggle();
        return;
    }

    robot.possible_initial_positions = arr;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
}


function give_objects_to_robot (specific_object){
    "use strict";

    RUR.state.specific_object = specific_object;
    $("#give-object-name").html(RUR.translate(specific_object));
    dialog_give_object.dialog("open");
}


RUR.we.turn_robot = function (orientation) { // function used on reeborg.html
    RUR.CURRENT_WORLD.robots[0]._orientation = orientation;
    RUR.CURRENT_WORLD.robots[0]._prev_orientation = orientation;
    RUR.vis_world.refresh_world_edited();
};

function calculate_wall_position () {
    var ctx, x, y, orientation, remain_x, remain_y, del_x, del_y;
    x = RUR.mouse_x - $("#robot-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-canvas").offset().top;

    y = RUR.BACKGROUND_CANVAS.height - y;  // count from bottom

    x /= RUR.WALL_LENGTH;
    y /= RUR.WALL_LENGTH;
    remain_x = x - Math.floor(x);
    remain_y = y - Math.floor(y);

    // del_  denotes the distance to the closest wall
    if (Math.abs(1.0 - remain_x) < remain_x) {
        del_x = Math.abs(1.0 - remain_x);
    } else {
        del_x = remain_x;
    }

    if (Math.abs(1.0 - remain_y) < remain_y) {
        del_y = Math.abs(1.0 - remain_y);
    } else {
        del_y = remain_y;
    }

    x = Math.floor(x);
    y = Math.floor(y);

    if ( del_x < del_y ) {
        orientation = "east";
        if (remain_x < 0.5) {
            x -= 1;
        }
    } else {
        orientation = "north";
        if (remain_y < 0.5) {
            y -= 1;
        }
    }

    if (x < 1 ) {
        x = 1;
    } else if (x > RUR.MAX_X) {
        x = RUR.MAX_X;
    }
    if (y < 1 ) {
        y = 1;
    } else if (y > RUR.MAX_Y) {
        y = RUR.MAX_Y;
    }

    return [x, y, orientation];
}

function __toggle_wall (goal) {
    var position, x, y, orientation;
    position = calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];

    if (RUR.is_wall(orientation, x, y, goal)){
        RUR.remove_wall(orientation, x, y, goal);
    } else {
        RUR.add_wall(orientation, x, y, goal);
    }   
}

function toggle_wall () {
    __toggle_wall(false); 
}

function toggle_goal_wall () {
    __toggle_wall(true); 
}

function set_add_object_position () {
    var position, x, y;
    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];
    RUR.state.x = x;
    RUR.state.y = y;
}

function add_object (specific_object){
    set_add_object_position();
    RUR.state.specific_object = specific_object;
    $("#add-object-name").html(RUR.translate(specific_object));
    dialog_add_object.dialog("open");
}

function add_goal_object (specific_object){
    "use strict";
    set_add_object_position();
    RUR.state.specific_object = specific_object;
    $("#goal-object-name").html(RUR.translate(specific_object));
    dialog_goal_object.dialog("open");
}

/** @function set_goal_position
 * @memberof RUR
 * @instance
 * @summary TODO This needs to be refactored and documented
 *
 * @desc Ceci doit être documenté
 *
 */


RUR.we.set_goal_position = function (home){
    // will remove the position if clicked again.
    "use strict";
    var position, world=RUR.CURRENT_WORLD, robot, arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);

    RUR.utils.ensure_key_for_obj_exists(world, "goal");
    goal = world.goal;

    if (goal.possible_final_positions === undefined) {
        RUR.utils.ensure_key_for_obj_exists(goal, "possible_final_positions");
        if (goal.position !== undefined) {
            goal.possible_final_positions = [[goal.position.x, goal.position.y]];
        } else {
            RUR.utils.ensure_key_for_obj_exists(goal, "position");
        }
    }

    goal.position.image = home;

    position = RUR.calculate_grid_position();
    goal.position.x = position[0];
    goal.position.y = position[1];

    for(var i=0; i<goal.possible_final_positions.length; i++) {
        pos = goal.possible_final_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
            break;
        } else {
            arr.push(pos);
            goal.position.x = pos[0];
            goal.position.y = pos[1];
        }
    }

    if (!present){
        arr.push(position);
        goal.position.x = position[0];
        goal.position.y = position[1];
    }
    goal.possible_final_positions = arr;

    if (arr.length === 0) {
        delete RUR.CURRENT_WORLD.goal.position;
        delete RUR.CURRENT_WORLD.goal.possible_final_positions;
        if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0) {
            delete RUR.CURRENT_WORLD.goal;
        }
        $("#edit-world-turn").hide();
    }
};

function toggle_tile (name){
    // will remove the position if clicked again with tile of same type.
    "use strict";
    var x, y, position;

    if (!name) {  // if we cancel the dialog
        return;
    } else if (name === "colour") {
        RUR._CALLBACK_FN = toggle_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.is_background_tile(name, x, y)) {
        RUR.remove_background_tile(name, x, y);
    } else {
        RUR.add_background_tile(name, x, y);
    }
}

function fill_with_tile (name) {
    "use strict";
    var x, y;

    if (!name) {    // if we cancel the dialog
        return;
    } else if (name === "colour") {
        RUR._CALLBACK_FN = fill_with_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    RUR.fill_background(name);

    RUR.vis_world.refresh_world_edited();
    $("#cmd-result").html("");
}


function toggle_obstacle (obj){
    // will remove the position if clicked again with object of same type.
    "use strict";
    var x, y, position;

    position = RUR.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.is_obstacle(obj, x, y)) {
        RUR.remove_obstacle(obj, x, y);
    } else {
        RUR.add_obstacle(obj, x, y);
    }
}


// mouse clicks also requested in listeners/canvas.js
$("#robot-canvas").on("click", function (evt) {
    if (RUR.state.editing_world && RUR.we.edit_world_flag !== undefined) {
        RUR.we.edit_world();
    }
    RUR.world_get.world_info();
});
