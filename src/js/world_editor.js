
require("./translator.js");
require("./constants.js");
require("./objects.js");
require("./robot.js");
require("./world.js");
require("./visible_world.js");
require("./exceptions.js");
require("./state.js");
require("./world_get.js");
require("./world_set.js");
require("./dialogs/create.js");

require("./world_set/add_object.js");
require("./world_set/add_goal_object.js");
require("./world_set/add_robot.js");

var edit_robot_menu = require("./ui/edit_robot_menu.js");
var dialog_add_object = require("./dialogs/add_object.js").dialog_add_object;
var dialog_give_object = require("./dialogs/give_object.js").dialog_give_object;
var dialog_goal_object = require("./dialogs/goal_object.js").dialog_goal_object;
var dialog_set_background_image = require("./dialogs/set_background_image.js").dialog_set_background_image;
var dialog_select_colour = require("./dialogs/select_colour.js").dialog_select_colour;


var filterInt = require("./utils/filterint.js").filterInt;
var identical = require("./utils/identical.js").identical;

RUR.we = {};   // we == World Editor

RUR.we.__give_to_robot = false;

RUR.we.edit_world = function  () {
    "use strict";
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    var value, split, root;
    split = RUR.we.edit_world_flag.split("-");
    root = split[0];
    value = split[1];
    switch (root) {
        case "robot":
            if (value == "place") {
                RUR.we.place_robot();
            }
            break;
        case "object":
            if (RUR.we.decorative_objects) {
                RUR.toggle_decorative_object_at_position(value);
            } else {
                RUR.we._add_object(value);
            }
            break;
        case "tile":
            RUR.we.toggle_tile(value);
            break;
        case "fill":
            RUR.we.fill_with_tile(value);
            break;
        case "solid_object":
            RUR.we.toggle_solid_object(value);
            break;
        case "world":
            if (value == "walls") {
                RUR.we._toggle_wall();
            }
            break;
        case "position":
            RUR.we.set_goal_position(value);
            break;
        case "goal":
            if (value == "wall") {
                RUR.we.toggle_goal_wall();
            } else {
                RUR.we._add_goal_objects(value);
            }
            break;
        default:
            break;
    }
    RUR.vis_world.refresh_world_edited();
};

RUR.we.alert_1 = function (txt) {
    $("#cmd-result").html(RUR.translate(txt)).effect("highlight", {color: "gold"}, 1500);
};
RUR.we.alert_2 = function (txt, value) {
    $("#cmd-result").html(RUR.translate(txt).supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
};

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
                RUR.we.alert_1("Click on world to move robot.");
                break;
            case "add":
                RUR.we.alert_1("Added robot.");
                RUR._add_robot();
                RUR.we.edit_world();
                edit_robot_menu.toggle();
                break;
            case "orientation":
                RUR.we.alert_1("Click on image to turn robot");
                $("#edit-world-turn").show();
                $("#random-orientation").show();
                break;
            case "objects":
                RUR.we.__give_to_robot = true;
                $("#edit-world-objects").show();
                $(".not-for-robot").hide();
                RUR.we.alert_1("Click on desired object below.");
                break;
            }
            break;
        case "decorative":
            RUR.we.decorative_objects = true;
            $("#edit-world-objects").show();
            RUR.we.__give_to_robot = false;
            RUR.we.alert_1("Click on desired object below.");
            break;
        case "background":
            dialog_set_background_image.dialog("open");
            break;
        case "world":
            switch (value) {
            case "objects":
                RUR.we.decorative_objects = false;
                $("#edit-world-objects").show();
                $(".not-for-robot").show();  // box
                RUR.we.__give_to_robot = false;
                RUR.we.alert_1("Click on desired object below.");
                break;
            case "tiles":
                $("#edit-tile").show();
                RUR.we.alert_1("Click on desired tile below.");
                break;
            case "fill_tiles":
                $("#fill-tile").show();
                RUR.we.alert_1("Click on desired tile below.");
                break;
            case "solid_objects":
                $("#edit-solid-object").show();
                RUR.we.alert_1("Click on desired object below.");
                break;
            case "walls":
                RUR.we.alert_1("Click on world to toggle walls.");
                break;
            }
            break;
        case "object":
            $("#edit-world-objects").show();
            if (RUR.we.__give_to_robot) {
                $(".not-for-robot").hide();
                RUR.we._give_objects_to_robot(value);
                RUR.we.edit_world_flag = '';
            } else {
                if (RUR.we.decorative_objects) {
                    $(".not-for-robot").show();
                }
                if (value == "box"){
                    RUR.we.alert_2("Click on world to add single object.", value);
                } else {
                    RUR.we.alert_2("Click on world to add object.", value);
                }
            }
            break;
        case "tile":
            $("#edit-tile").show();
            RUR.we.alert_2("Click on world to toggle tile.", value);
            break;
        case "fill":
            $("#fill-tile").show();
            RUR.we.alert_2("Click on world to fill with given tile.", value);
            break;
        case "solid_object":
            $("#edit-solid-object").show();
            RUR.we.alert_2("Click on world to toggle object.", value);
            break;
        case "position":
            RUR.we.alert_1("Click on world to set home position for robot.");
            break;
        case "goal":
            switch (value) {
            case "robot":
                $("#edit-goal-position").show();
                RUR.we.alert_1("Click on image desired to indicate the final position of the robot.");
                break;
            case "wall":
                RUR.we.alert_1("Click on world to toggle additional walls to build.");
                break;
            case "objects":
                $("#edit-goal-objects").show();
                RUR.we.alert_1("Click on desired goal object below.");
                break;
            default:
                $("#edit-goal-objects").show();
                if (value == "box"){
                RUR.we.alert_2("Click on world to set number of single goal objects.", value);
                } else {
                RUR.we.alert_2("Click on world to set number of goal objects.", value);
                }
                RUR.we.alert_2("Click on world to set number of goal objects.", value);
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
        $("#pre-code-link").parent().hide();
        $("#post-code-link").parent().hide();
        $("#description-link").parent().hide();
        $("#onload-editor-link").parent().hide();

        RUR.state.editing_world = false;
        RUR.state.code_evaluated = false;
        RUR.WALL_COLOR = "brown";
        RUR.SHADOW_WALL_COLOR = "#f0f0f0";
        RUR.vis_world.draw_all();
        try {
            localStorage.setItem(RUR.settings.editor, editor.getValue());
            localStorage.setItem(RUR.settings.library, library.getValue());
        } catch (e) {}
        RUR.CURRENT_WORLD = RUR.world.update_from_editors(RUR.CURRENT_WORLD);
        if (!identical(RUR.CURRENT_WORLD, RUR._SAVED_WORLD)) {
            $("#memorize-world").trigger('click');
        }
        $("#editor-tab").trigger('click');
    } else {

        $("#pre-code-link").parent().show();
        $("#post-code-link").parent().show();
        $("#description-link").parent().show();
        $("#onload-editor-link").parent().show();

        edit_robot_menu.toggle();
        RUR.state.editing_world = true;
        RUR.WALL_COLOR = "black";
        RUR.SHADOW_WALL_COLOR = "#ccd";
        RUR.vis_world.draw_all();
        // RUR.CURRENT_WORLD = RUR.world.editors_set_default_values(RUR.CURRENT_WORLD);
        $("#highlight").hide();
        $("#watch-variables-btn").hide();
    }
};

RUR.create_and_activate_dialogs( $("#edit-world"), $("#edit-world-panel"),
                                 {}, RUR.we.toggle_editing_mode);

RUR.we.calculate_grid_position = function () {
    var ctx, x, y;
    x = RUR.mouse_x - $("#robot-canvas").offset().left;
    y = RUR.mouse_y - $("#robot-canvas").offset().top;

    x /= RUR.WALL_LENGTH;
    x = Math.floor(x);

    y = RUR.HEIGHT - y + RUR.WALL_THICKNESS;
    y /= RUR.WALL_LENGTH;
    y = Math.floor(y);

    RUR.we.mouse_contained_flag = true;  // used in tooltip.js
    if (x < 1 ) {
        x = 1;
        RUR.we.mouse_contained_flag = false;
    } else if (x > RUR.COLS) {
        x = RUR.COLS;
        RUR.we.mouse_contained_flag = false;
    }
    if (y < 1 ) {
        y = 1;
        RUR.we.mouse_contained_flag = false;
    } else if (y > RUR.ROWS) {
        y = RUR.ROWS;
        RUR.we.mouse_contained_flag = false;
    }
    return [x, y];
};


RUR.we.place_robot = function () {
    "use strict";
    var position, world=RUR.CURRENT_WORLD, robot, arr=[], pos, present=false;
    position = RUR.we.calculate_grid_position();
    if (world.robots !== undefined){
        if (world.robots.length >0) {
            robot = world.robots[0];
            if (!robot.start_positions){
                robot.start_positions = [[robot.x, robot.y]];
            }
        } else {
            RUR._add_robot();
            robot = world.robots[0];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            robot.start_positions = [[robot.x, robot.y]];
            return;
        }
    }

    for (var i=0; i < robot.start_positions.length; i++){
        pos = robot.start_positions[i];
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

    robot.start_positions = arr;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
};


RUR.we._give_objects_to_robot = function (specific_object){
    "use strict";

    RUR.state.specific_object = specific_object;
    $("#give-object-name").html(RUR.translate(specific_object));
    dialog_give_object.dialog("open");
};

RUR.we.turn_robot = function (orientation) {

    RUR.CURRENT_WORLD.robots[0]._orientation = orientation;
    RUR.CURRENT_WORLD.robots[0]._prev_orientation = orientation;
    RUR.vis_world.refresh_world_edited();
};

RUR.we.calculate_wall_position = function () {
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
    } else if (x > RUR.COLS) {
        x = RUR.COLS;
    }
    if (y < 1 ) {
        y = 1;
    } else if (y > RUR.ROWS) {
        y = RUR.ROWS;
    }

    return [x, y, orientation];
};

RUR.we._toggle_wall = function () {
    var position, x, y, orientation;
    position = RUR.we.calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    RUR.we.toggle_wall(x, y, orientation);
};

RUR.we.toggle_wall = function (x, y, orientation) {
    var coords, index;
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "walls");
    if (RUR.CURRENT_WORLD.walls[coords] === undefined){
        RUR.CURRENT_WORLD.walls[coords] = [orientation];
    } else {
        index = RUR.CURRENT_WORLD.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.CURRENT_WORLD.walls[coords].push(orientation);
        } else {
            RUR.CURRENT_WORLD.walls[coords].splice(index, 1);
            if (RUR.CURRENT_WORLD.walls[coords].length === 0){
                delete RUR.CURRENT_WORLD.walls[coords];
            }
        }
    }
};



RUR.we.toggle_goal_wall = function () {
    var position, response, x, y, orientation, coords, index;
    position = RUR.we.calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "goal");
    RUR._ensure_key_exists(RUR.CURRENT_WORLD.goal, "walls");
    if (RUR.CURRENT_WORLD.goal.walls[coords] === undefined){
        RUR.CURRENT_WORLD.goal.walls[coords] = [orientation];
    } else {
        index = RUR.CURRENT_WORLD.goal.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.CURRENT_WORLD.goal.walls[coords].push(orientation);
        } else {
            RUR.CURRENT_WORLD.goal.walls[coords].splice(index, 1);
            if (Object.keys(RUR.CURRENT_WORLD.goal.walls[coords]).length === 0){
                delete RUR.CURRENT_WORLD.goal.walls[coords];
                if (Object.keys(RUR.CURRENT_WORLD.goal.walls).length === 0) {
                    delete RUR.CURRENT_WORLD.goal.walls;
                    if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0) {
                        delete RUR.CURRENT_WORLD.goal;
                    }
                }
            }
        }
    }
};

RUR.we._add_object = function (specific_object){
    "use strict";
    var position, x, y, query, tmp;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (specific_object == "box") {
        if (RUR.CURRENT_WORLD.objects !== undefined &&
            RUR.CURRENT_WORLD.objects[x+','+y] !== undefined &&
            RUR.CURRENT_WORLD.objects[x+','+y]["box"] == 1){  // jshint ignore:line
            RUR.add_object_at_position("box", x, y, 0);
        } else {
            RUR.add_object_at_position("box", x, y, 1);
        }
        return;
    }

    RUR.state.specific_object = specific_object;
    RUR.state.x = x;
    RUR.state.y = y;
    $("#add-object-name").html(RUR.translate(specific_object));
    dialog_add_object.dialog("open");
};

RUR.we._add_goal_objects = function (specific_object){
    "use strict";
    var position, x, y, coords, query;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    // TODO investigate potential bug; should toggle if box ...
    if (specific_object == "box") {
        if (RUR.CURRENT_WORLD.goal !== undefined &&
            RUR.CURRENT_WORLD.goal.objects !== undefined &&
            RUR.CURRENT_WORLD.goal.objects[coords] !== undefined &&
            RUR.CURRENT_WORLD.goal.objects[coords].box ==1){
                RUR.add_goal_object_at_position("box", x, y, 0);
        } else {
            RUR.add_goal_object_at_position("box", x, y, 1);
        }
        return;
    }

    RUR.state.specific_object = specific_object;
    RUR.state.x = x;
    RUR.state.y = y;
    $("#goal-object-name").html(RUR.translate(specific_object));
    dialog_goal_object.dialog("open");
};




RUR.we.set_goal_position = function (home){
    // will remove the position if clicked again.
    "use strict";
    var position, world=RUR.CURRENT_WORLD, robot, arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);

    RUR._ensure_key_exists(world, "goal");
    goal = world.goal;

    if (goal.possible_positions === undefined) {
        RUR._ensure_key_exists(goal, "possible_positions");
        if (goal.position !== undefined) {
            goal.possible_positions = [[goal.position.x, goal.position.y]];
        } else {
            RUR._ensure_key_exists(goal, "position");
        }
    }

    goal.position.image = home;

    position = RUR.we.calculate_grid_position();
    goal.position.x = position[0];
    goal.position.y = position[1];

    for(var i=0; i<goal.possible_positions.length; i++) {
        pos = goal.possible_positions[i];
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
    goal.possible_positions = arr;

    if (arr.length === 0) {
        delete RUR.CURRENT_WORLD.goal.position;
        delete RUR.CURRENT_WORLD.goal.possible_positions;
        if (Object.keys(RUR.CURRENT_WORLD.goal).length === 0) {
            delete RUR.CURRENT_WORLD.goal;
        }
        $("#edit-world-turn").hide();
    }
};

RUR.we.toggle_tile = function (tile){
    // will remove the position if clicked again with tile of same type.
    "use strict";
    var x, y, position, coords, index;

    if (!tile) {  // if we cancel the dialog
        return;
    } else if (tile === "colour") {
        RUR._CALLBACK_FN = RUR.we.toggle_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    if (RUR.CURRENT_WORLD.tiles[coords] === undefined ||
        RUR.CURRENT_WORLD.tiles[coords] != tile){
        RUR.CURRENT_WORLD.tiles[coords] = tile;
    } else {
        delete RUR.CURRENT_WORLD.tiles[coords];
    }
};

RUR.we.fill_with_tile = function (tile) {
    var x, y, coords;

    if (!tile) {    // if we cancel the dialog
        return;
    } else if (tile === "colour") {
        RUR._CALLBACK_FN = RUR.we.fill_with_tile;
        dialog_select_colour.dialog("open");
        return;
    }

    RUR._ensure_key_exists(RUR.CURRENT_WORLD, "tiles");
    for (x = 1; x <= RUR.COLS; x++) {
        for (y = 1; y <= RUR.ROWS; y++) {
            coords = x + "," + y;
            RUR.CURRENT_WORLD.tiles[coords] = tile;
        }
    }
};


RUR.we.toggle_solid_object = function (obj){
    // will remove the position if clicked again with object of same type.
    "use strict";
    var x, y, position;

    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.world_get.solid_objects_at_position(x, y)[obj] !== undefined) {
        RUR.world_set.add_solid_object(obj, x, y, 0);
    } else {
        RUR.world_set.add_solid_object(obj, x, y, 1);
    }
};



$("#robot-canvas").on("click", function (evt) {
    RUR.mouse_x = evt.pageX;
    RUR.mouse_y = evt.pageY;
    if (RUR.state.editing_world) {
        RUR.we.edit_world();
    }
    RUR.world_get.world_info();
});
