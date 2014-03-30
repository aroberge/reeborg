/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.we = {};   // we == World Editor

RUR.we.edit_world = function  () {
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    switch (RUR.we.edit_world_flag) {
        case "robot-teleport":
            RUR.we.teleport_robot();
            break;
        case "robot-remove":
        case "robot-add":
        case "robot-turn":
        case "robot-tokens":
            break;
        case "world-tokens":
            RUR.we.set_token_number();
            break;
        case "world-walls":
            RUR.we.toggle_wall();
            break;
        case "goal-robot":
            RUR.we.set_goal_position();
            break;
        case "goal-wall":
            RUR.we.toggle_goal_wall();
            break;
        case "goal-tokens":
            RUR.we.set_goal_token_number();
            break;
    }
    RUR.we.refresh_world_edited();
};

RUR.we.select = function (choice) {
    $(".edit-world-submenus").hide();
    RUR.we.edit_world_flag = choice;
    switch (choice) {
        case "robot-teleport":
            $("#cmd-result").html("Click on canvas to move robot.").effect("highlight", {color: "gold"}, 1500);
            break;
        case "robot-remove":
            $("#cmd-result").html("Removed robot.").effect("highlight", {color: "gold"}, 1500);
            RUR.we.remove_robot();
            RUR.we.edit_world();
            RUR.we.change_edit_robot_menu();
            break;
        case "robot-add":
            $("#cmd-result").html("Added robot").effect("highlight", {color: "gold"}, 1500);
            RUR.we.add_robot(RUR.robot.create_robot());
            RUR.we.edit_world();
            RUR.we.change_edit_robot_menu();
            break;
        case "robot-orientation":
            $("#cmd-result").html("Click on image to turn robot").effect("highlight", {color: "gold"}, 1500);
            $("#edit-world-turn").show();
            break;
        case "robot-tokens":
            RUR.we.give_tokens_to_robot();
            RUR.we.edit_world();
            $("#cmd-result").html("Robot now has " + RUR.current_world.robots[0].tokens + " tokens.").effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-tokens":
            $("#cmd-result").html("Click on canvas to set number of tokens.").effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-walls":
            $("#cmd-result").html("Click on canvas to toggle walls.").effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-robot":
            $("#cmd-result").html("Click on canvas to set home position for robot.").effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-wall":
            $("#cmd-result").html("Click on canvas to toggle additional walls to build.").effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-tokens":
            $("#cmd-result").html("Click on canvas to set number of tokens as goal.").effect("highlight", {color: "gold"}, 1500);
            break;
    }
};

RUR.we.change_edit_robot_menu = function () {
    if ("robots" in RUR.current_world && 
        RUR.current_world.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};

function toggle_editing_mode () {
    $("#edit-world-panel").toggleClass("active");
    if (RUR.we.editing_world) {
        RUR.we.editing_world = false;
        editing_world_show_others();
        RUR.WALL_COLOR = "brown";
        RUR.SHADOW_WALL_COLOR = "#f0f0f0";
        RUR.we.refresh_world_edited();
    } else {
        RUR.we.change_edit_robot_menu();
        RUR.we.editing_world = true;
        RUR.WALL_COLOR = "black";
        RUR.SHADOW_WALL_COLOR = "#ccd";
        RUR.we.refresh_world_edited();
        editing_world_hide_others();
    }
}

RUR.we.refresh_world_edited = function () {
    RUR.vis_world.draw_all(RUR.current_world);
};

function editing_world_show_others(){
    $("#contents-button").removeAttr("disabled");
    $("#help-button").removeAttr("disabled");
    $("#world-panel-button").removeAttr("disabled");
    $("#output-panel-button").removeAttr("disabled");
    $("#editor-panel-button").removeAttr("disabled");
    $("#editor-panel-button").click();
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#run2").removeAttr("disabled");
    $("#step2").removeAttr("disabled");
}

function editing_world_hide_others() {
    if ($("#editor-panel-button").hasClass("active")) {
        $("#editor-panel-button").click();
    }
    $("#editor-panel-button").attr("disabled", "true");
    if ($("#output-panel-button").hasClass("active")) {
        $("#output-panel-button").click();
    }
    $("#output-panel-button").attr("disabled", "true");
    $("#world-panel-button").attr("disabled", "true");
    $("#contents-button").attr("disabled", "true");
    $("#help-button").attr("disabled", "true");

    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
    $("#stop2").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    $("#run2").attr("disabled", "true");
    $("#step2").attr("disabled", "true");
    $("#reload2").attr("disabled", "true"); 
}

RUR.we.calculate_grid_position = function () {
    var ctx, x, y;
    x = RUR.we.mouse_x - $("#robot_canvas").offset().left;
    y = RUR.we.mouse_y - $("#robot_canvas").offset().top;

    x /= RUR.WALL_LENGTH;
    x = Math.floor(x);
    y /= RUR.WALL_LENGTH;
    y = RUR.ROWS - Math.floor(y) + 1;
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
    return [x, y];
};

RUR.we.teleport_robot = function () {
    var position;
    position = RUR.we.calculate_grid_position();
    console.log(position);
    console.log(RUR.current_world.robots[0].x);
    RUR.current_world.robots[0].x = position[0]; 
    RUR.current_world.robots[0].y = position[1];
    console.log(RUR.current_world.robots[0].x);
};

RUR.we.give_tokens_to_robot = function () {
    var response = prompt("Enter number of tokens for robot to carry (use inf for infinite number)");
    if (response !== null) {
        if (response === "inf"){
            RUR.current_world.robots[0].tokens = "infinite";
        } else if (parseInt(response, 10) >= 0) {
            RUR.current_world.robots[0].tokens = parseInt(response, 10);
        } else {
            $("#Reeborg-shouts").html(response + " is not a valid value!").dialog("open");
        }
    }
};

RUR.we.set_token_number = function () {
    var position, response, x, y, tokens;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    
    if (RUR.current_world.shapes !== undefined && RUR.current_world.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape here; can't put tokens").effect("highlight", {color: "gold"}, 1500);
        $("#Reeborg-shouts").html("shape here; can't put tokens").dialog("open");
        return;
    }
    
    response = prompt("Enter number of tokens for at that location.");
    if (response !== null) {
        tokens = parseInt(response, 10);
        if (tokens >= 0) {
            RUR.we.ensure_key_exist(RUR.current_world, "tokens");
            if (tokens > 0) {
                RUR.current_world.tokens[x + "," + y] = tokens;
            } else {
                delete RUR.current_world.tokens[x + "," + y];
            }
        } else {
            $("#Reeborg-shouts").html(response + " is not a valid value!").dialog("open");
        }
    } 
};

RUR.we.set_goal_token_number = function () {
    var position, response, x, y, tokens;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    if (RUR.current_world.goal.shapes !== undefined && RUR.current_world.goal.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape here; can't put tokens").effect("highlight", {color: "gold"}, 1500);
        $("#Reeborg-shouts").html("shape here; can't put tokens").dialog("open");
        return;
    }
    
    response = prompt("Enter number of tokens for at that location.");
    if (response !== null) {
        tokens = parseInt(response, 10);
        if (tokens >= 0) {
            RUR.we.ensure_key_exist(RUR.current_world.goal, "tokens");
            if (tokens > 0) {
                RUR.current_world.goal.tokens[x + "," + y] = tokens;
            } else {
                delete RUR.current_world.goal.tokens[x + "," + y];
                if (Object.keys(RUR.current_world.goal.tokens).length === 0){
                    delete RUR.current_world.goal.tokens;
                    if (Object.keys(RUR.current_world.goal).length === 0){
                        delete RUR.current_world.goal;
                    }
                }
            }
        } else {
            $("#Reeborg-shouts").html(response + " is not a valid value!").dialog("open");
        }
    } 
};


RUR.we.turn_robot = function (orientation) {
    if (RUR.we.edit_world_flag === "goal-robot") {
        RUR.we.set_goal_orientation(orientation);
        RUR.we.refresh_world_edited();
        return;
    }
    
    RUR.current_world.robots[0].orientation = orientation;
    RUR.we.refresh_world_edited();
};

RUR.we.remove_robot = function () {
    "use strict";
    RUR.current_world.robots = [];
};

RUR.we.add_robot = function () {
    "use strict";
    RUR.current_world.robots = [RUR.robot.create_robot()];
};

RUR.we.calculate_wall_position = function () {
    var ctx, x, y, orientation, remain_x, remain_y, del_x, del_y;
    x = RUR.we.mouse_x - $("#robot_canvas").offset().left;
    y = RUR.we.mouse_y - $("#robot_canvas").offset().top;
    
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
    y = RUR.ROWS - Math.floor(y) + 1;
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
    
    if ( del_x < del_y ) {
        orientation = "east";
        if (remain_x < 0.5) {
            x -= 1;
        }
    } else {
        orientation = "north";
        if (remain_y > 0.5) {
            y -= 1;
        }
    }
    return [x, y, orientation];
};

RUR.we.toggle_wall = function () {
    var position, x, y, orientation, coords, index;
    position = RUR.we.calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    coords = x + "," + y;

    RUR.we.ensure_key_exist(RUR.current_world, "walls");
    if (RUR.current_world.walls[coords] === undefined){
        RUR.current_world.walls[coords] = [orientation];
    } else {
        index = RUR.current_world.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.current_world.walls[coords].push(orientation);
        } else {
            RUR.current_world.walls[coords].remove(index);
            if (RUR.current_world.walls[coords].length === 0){
                delete RUR.current_world.walls[coords];
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

    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.we.ensure_key_exist(RUR.current_world.goal, "walls");
    if (RUR.current_world.goal.walls[coords] === undefined){
        RUR.current_world.goal.walls[coords] = [orientation];
    } else {
        index = RUR.current_world.goal.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.current_world.goal.walls[coords].push(orientation);
        } else {
            RUR.current_world.goal.walls[coords].remove(index);
            if (Object.keys(RUR.current_world.goal.walls[coords]).length === 0){
                delete RUR.current_world.goal.walls[coords];
                if (Object.keys(RUR.current_world.goal.walls).length === 0) {
                    delete RUR.current_world.goal.walls;
                    if (Object.keys(RUR.current_world.goal).length === 0) {
                        delete RUR.current_world.goal;
                    }
                }
            }
        }
    }
};

RUR.we.ensure_key_exist = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    }
};

function toggle_shape(x, y, shape){
    "use strict";
    if (!(shape === "star" || shape === "square" || shape === "triangle")){
        $("#cmd-result").html("unknown shape: " + shape).effect("highlight", {color: "gold"}, 1500);
        return;
    }
    if (RUR.current_world.tokens !== undefined && RUR.current_world.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html("tokens here; can't put a shape").effect("highlight", {color: "gold"}, 1500);
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world, "shapes");
    if (RUR.current_world.shapes[x + "," + y] === shape) {
        delete RUR.current_world.shapes[x + "," + y];
        if (Object.keys(RUR.current_world.shapes).length === 0){
            delete RUR.current_world.shapes;
        }
    } else {
        RUR.current_world.shapes[x + "," + y] = shape;
    }
    RUR.we.update("updated shapes");
}

RUR.we.set_goal_position = function (){
    // will remove the position if clicked again.
    "use strict";
    var position;
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    position = RUR.we.calculate_grid_position();
    
    if (RUR.current_world.goal.position !== undefined){
        if (position[0] === RUR.current_world.goal.position.x &&
            position[1] === RUR.current_world.goal.position.y) { 
            delete RUR.current_world.goal.position;
            if (RUR.current_world.goal.orientation !== undefined) {
                delete RUR.current_world.goal.orientation;
            }
            if (Object.keys(RUR.current_world.goal).length === 0) {
                delete RUR.current_world.goal;
            }
            $("#edit-world-turn").hide();
        } else {
            RUR.current_world.goal.position = {"x": position[0], "y": position[1]};
            $("#cmd-result").html("Click on same position to remove, or robot to set orientation").effect("highlight", {color: "gold"}, 1500);
            $("#edit-world-turn").show();
        }
    } else {
        RUR.current_world.goal.position = {"x": position[0], "y": position[1]};
        $("#cmd-result").html("Click on same position to remove, or robot to set orientation").effect("highlight", {color: "gold"}, 1500);
        $("#edit-world-turn").show();
    }
};

RUR.we.set_goal_orientation = function(orientation){
    "use strict";
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    if (RUR.current_world.goal.position === undefined) {
        return;
    }
    if (RUR.current_world.goal.orientation !== undefined &&
        RUR.current_world.goal.orientation === orientation) {
        delete RUR.current_world.goal.orientation;  // toggle
    } else {
        RUR.current_world.goal.orientation = orientation;
    }
};

function set_goal_tokens(x, y, nb_tokens){
    "use strict";
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    if (RUR.current_world.goal.shapes !== undefined && RUR.current_world.goal.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape goal here; can't set token goal").effect("highlight", {color: "gold"}, 1500);
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world.goal, "tokens");
    if (nb_tokens > 0) {
        RUR.current_world.goal.tokens[x + "," + y] = nb_tokens;
    } else {
        delete RUR.current_world.goal.tokens[x + "," + y];
        if (Object.keys(RUR.current_world.goal.tokens).length === 0){
            delete RUR.current_world.goal.tokens;
            if (Object.keys(RUR.current_world.goal).length === 0){
                delete RUR.current_world.goal;
            }
        }
    }
    RUR.we.update("updated tokens goal");
}

function set_goal_no_tokens(){
    "use strict";
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.current_world.goal.tokens = {};
}

function set_goal_no_shapes(){
    "use strict";
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.current_world.goal.shapes = {};
}


function set_goal_shape(x, y, shape){
    "use strict";
    if (!(shape === "star" || shape === "square" || shape === "triangle")){
        $("#cmd-result").html("unknown shape: " + shape);
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    if (RUR.current_world.goal.tokens !== undefined &&
        RUR.current_world.goal.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html("tokens as a goal here; can't set a shape goal");
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world.goal, "shapes");
    if (RUR.current_world.goal.shapes[x + "," + y] === shape) {
        delete RUR.current_world.goal.shapes[x + "," + y];
        if (Object.keys(RUR.current_world.goal.shapes).length === 0){
            delete RUR.current_world.goal.shapes;
            if (Object.keys(RUR.current_world.goal).length === 0){
                delete RUR.current_world.goal;
            }
        }
    } else {
        RUR.current_world.goal.shapes[x + "," + y] = shape;
    }
    RUR.we.update("updated shapes");
}
