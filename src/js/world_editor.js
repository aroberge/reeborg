/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.we = {};   // we == World Editor

RUR.we.edit_world = function  () {
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    switch (RUR.we.edit_world_flag) {
        case "robot-place":
            RUR.we.place_robot();
            break;
        case "world-tokens":
            RUR.we.set_token_number();
            break;
        case "world-star":
            RUR.we.toggle_shape("star");
            break;
        case "world-triangle":
            RUR.we.toggle_shape("triangle");
            break;
        case "world-square":
            RUR.we.toggle_shape("square");
            break;
        case "world-mud":
            RUR.we.toggle_mud();
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
        case "goal-star":
            RUR.we.toggle_goal_shape("star");
            break;
        case "goal-triangle":
            RUR.we.toggle_goal_shape("triangle");
            break;
        case "goal-square":
            RUR.we.toggle_goal_shape("square");
            break;
        case "goal-no-objects":
            RUR.we.set_goal_no_objects();
            break;
        case "goal-no-tokens":
            RUR.we.set_goal_no_tokens();
            break;
        default:
            break;
    }
    RUR.we.refresh_world_edited();
};

RUR.we.select = function (choice) {
    $(".edit-world-submenus").hide();
    $(".edit-world-canvas").hide();
    $(".edit-goal-canvas").hide();
    RUR.we.edit_world_flag = choice;
    switch (choice) {
        case "robot-place":
            $("#cmd-result").html(RUR.translate("Click on world to move robot.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "robot-add":
            $("#cmd-result").html(RUR.translate("Added robot.")).effect("highlight", {color: "gold"}, 1500);
            RUR.we.add_robot();
            RUR.we.edit_world();
            RUR.we.change_edit_robot_menu();
            break;
        case "robot-orientation":
            $("#cmd-result").html(RUR.translate("Click on image to turn robot")).effect("highlight", {color: "gold"}, 1500);
            $("#edit-world-turn").show();
            $("#random-orientation").show();
            break;
        case "robot-tokens":
            RUR.we.give_tokens_to_robot();
            RUR.we.edit_world();
            $("#cmd-result").html(RUR.translate("Robot now has tokens.").supplant({x_tokens: RUR.current_world.robots[0].tokens})).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-tokens":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to set number of tokens.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-objects":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on desired object below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-star":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle star.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-triangle":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle triangle.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-square":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle square.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-mud":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle mud tile.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-walls":
            $("#cmd-result").html(RUR.translate("Click on world to toggle walls.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-robot":
            $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);
            if (RUR.current_world.goal !== undefined && RUR.current_world.goal.position !== undefined){
                $("#edit-world-turn").show();
                $("#random-orientation").hide();
            } else {
                $("#edit-world-turn").hide();
            }
            break;
        case "goal-wall":
            $("#cmd-result").html(RUR.translate("Click on world to toggle additional walls to build.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-objects":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on desired goal object below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-tokens":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to set number of goal tokens.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-star":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle star goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-triangle":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle triangle goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-square":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle square goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-no-objects":
            $("#cmd-result").html(RUR.translate("Click on world at x=1, y=1 to have no object left as a goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-no-tokens":
            $("#cmd-result").html(RUR.translate("Click on world at x=1, y=1 to have no tokens left as a goal.")).effect("highlight", {color: "gold"}, 1500);
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
        if (!Object.identical(RUR.current_world, RUR.world.saved_world)) {
            $("#memorize-world").trigger('click');
        }
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
    RUR.vis_world.draw_all();
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

RUR.we.place_robot = function () {
    "use strict";
    var position, world=RUR.current_world, robot, arr=[], pos, present=false;
    position = RUR.we.calculate_grid_position();
    if (world.robots !== undefined){
        if (world.robots.length >0) {
            robot = world.robots[0];
            if (!robot.start_positions){
                robot.start_positions = [[robot.x, robot.y]];
            }
        } else {
            RUR.we.add_robot();
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
        RUR.current_world.robots = [];
        RUR.we.change_edit_robot_menu();
        return;
    }
    robot.start_positions = arr;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

};

RUR.we.give_tokens_to_robot = function () {
    var _tok, tokens, max_tokens;
    var response = prompt(RUR.translate("Enter number of tokens for robot to carry (use inf for infinite number)"));
    if (response !== null) {
        _tok = response.split("-");
        if (response === "inf"){
            RUR.current_world.robots[0].tokens = "infinite";
        } else if (RUR.filterInt(_tok[0]) >= 0) {
            tokens = RUR.filterInt(_tok[0]);
            if (_tok[1] !== undefined) {
                max_tokens = RUR.filterInt(_tok[1]);
                if (max_tokens <= tokens) {
                    $("#Reeborg-shouts").html(response + RUR.translate(" is not a valid value!")).dialog("open");
                    delete RUR.current_world.robots[0].tokens_range;
                    delete RUR.current_world.robots[0].max_tokens;
                    delete RUR.current_world.robots[0].min_tokens;
                    RUR.current_world.robots[0].tokens = "infinite";
                } else {
                    RUR.current_world.robots[0].max_tokens = max_tokens;
                    RUR.current_world.robots[0].min_tokens = tokens;
                    RUR.current_world.robots[0].tokens_range = tokens+"-"+max_tokens;
                    RUR.current_world.robots[0].tokens = tokens+"-"+max_tokens;
                }
            } else {
                RUR.current_world.robots[0].tokens = tokens;
            }
        } else {
            $("#Reeborg-shouts").html(response + RUR.translate(" is not a valid value!")).dialog("open");
        }
    }
};

RUR.we.set_token_number = function () {
    var position, response, x, y, tokens, _tok, max_tokens;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.current_world.shapes !== undefined && RUR.current_world.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html(RUR.translate("Other object here; can't put tokens")).effect("highlight", {color: "gold"}, 1500);
        $("#Reeborg-shouts").html(RUR.translate("Other object here; can't put tokens")).dialog("open");
        return;
    }

    response = prompt(RUR.translate("Enter number of tokens for at that location."));
    if (response !== null) {
        _tok = response.split("-");
        tokens = RUR.filterInt(_tok[0]);
        if (_tok[1] !== undefined) {
            max_tokens = RUR.filterInt(_tok[1]);
            if (max_tokens <= tokens) {
                tokens = -1;
            }
        }
        if (tokens >= 0) {
            RUR.we.ensure_key_exist(RUR.current_world, "tokens");
            if (max_tokens !== undefined) {
                RUR.we.ensure_key_exist(RUR.current_world, "min_tokens");
                RUR.we.ensure_key_exist(RUR.current_world, "max_tokens");
                RUR.we.ensure_key_exist(RUR.current_world, "tokens_range");
            }
            if (tokens > 0 || (max_tokens !== undefined && max_tokens > tokens)) {
                RUR.current_world.tokens[x + "," + y] = tokens;
                if (max_tokens !== undefined) {
                    RUR.current_world.max_tokens[x + "," + y] = max_tokens;
                    RUR.current_world.min_tokens[x + "," + y] = tokens;
                    RUR.current_world.tokens_range[x + "," + y] = tokens+"-"+max_tokens;
                } else {
                    delete RUR.current_world.min_tokens[x + "," + y];
                    delete RUR.current_world.max_tokens[x + "," + y];
                    delete RUR.current_world.tokens_range[x + "," + y];
                }
            } else {
                delete RUR.current_world.tokens[x + "," + y];
                if (RUR.current_world.max_tokens !== undefined) {
                    delete RUR.current_world.min_tokens[x + "," + y];
                    delete RUR.current_world.max_tokens[x + "," + y];
                    delete RUR.current_world.tokens_range[x + "," + y];
                }
            }
        } else {
            $("#Reeborg-shouts").html(response + RUR.translate(" is not a valid value!")).dialog("open");
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
        $("#cmd-result").html(RUR.translate("Other object goal here; can't put tokens")).effect("highlight", {color: "gold"}, 1500);
        $("#Reeborg-shouts").html(RUR.translate("Other object goal here; can't put tokens")).dialog("open");
        return;
    }

    response = prompt(RUR.translate("Enter number of tokens for at that location."));
    if (response !== null) {
        tokens = RUR.filterInt(response);
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
            $("#Reeborg-shouts").html(response + RUR.translate(" is not a valid value!")).dialog("open");
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
    RUR.current_world.robots[0]._prev_orientation = orientation;
    RUR.we.refresh_world_edited();
};

RUR.we.add_robot = function () {
    "use strict";
    RUR.current_world.robots = [RUR.robot.create_robot()];
};

RUR.we.calculate_wall_position = function () {
    var ctx, x, y, orientation, remain_x, remain_y, del_x, del_y;
    x = RUR.we.mouse_x - $("#robot_canvas").offset().left;
    y = RUR.we.mouse_y - $("#robot_canvas").offset().top;

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

RUR.we.toggle_shape = function (shape){
    "use strict";
    var position, x, y;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (RUR.current_world.tokens !== undefined && RUR.current_world.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html(RUR.translate("tokens here; can't put another object")).effect("highlight", {color: "gold"}, 1500);
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
};

RUR.we.toggle_goal_shape = function (shape){
    "use strict";
    var position, x, y;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];

    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    if (RUR.current_world.goal.tokens !== undefined &&
        RUR.current_world.goal.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html(RUR.translate("tokens as a goal here; can't set another object as goal."));
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world.goal, "shapes");
    if (RUR.current_world.goal.shapes[x + "," + y] === shape) {
        delete RUR.current_world.goal.shapes[x + "," + y];
    } else {
        RUR.current_world.goal.shapes[x + "," + y] = shape;
    }
};

RUR.we.set_goal_position = function (){
    // will remove the position if clicked again.
    "use strict";
    var position, world=RUR.current_world, robot, arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);
    $("#edit-world-turn").show();
    $("#random-orientation").hide();

    RUR.we.ensure_key_exist(world, "goal");
    goal = world.goal;

    if (goal.possible_positions === undefined) {
        RUR.we.ensure_key_exist(goal, "possible_positions");
        if (goal.position !== undefined) {
            goal.possible_positions = [[goal.position.x, goal.position.y]];
        } else {
            RUR.we.ensure_key_exist(goal, "position");
        }
    }

    position = RUR.we.calculate_grid_position();
    goal.position.x = position[0];
    goal.position.y = position[1];

    for(var i=0; i<goal.possible_positions.length; i++) {
        pos = goal.possible_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
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
        delete RUR.current_world.goal.position;
        delete RUR.current_world.goal.possible_positions;
        if (RUR.current_world.goal.orientation !== undefined) {
            delete RUR.current_world.goal.orientation;
        }
        if (Object.keys(RUR.current_world.goal).length === 0) {
            delete RUR.current_world.goal;
        }
        $("#edit-world-turn").hide();
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


RUR.we.set_goal_no_objects = function(){
    "use strict";
    var position;
    position = RUR.we.calculate_grid_position();
    if (position[0] !== 1 || position[1] !== 1) {
        $("#cmd-result").html(RUR.translate("No effect.")).effect("highlight", {color: "gold"}, 1500);
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.current_world.goal.shapes = {};
    $("#cmd-result").html(RUR.translate("Goal: no object left in world.")).effect("highlight", {color: "gold"}, 1500);
};

RUR.we.set_goal_no_tokens = function(){
    "use strict";
    var position;
    position = RUR.we.calculate_grid_position();
    if (position[0] !== 1 || position[1] !== 1) {
        $("#cmd-result").html(RUR.translate("No effect.")).effect("highlight", {color: "gold"}, 1500);
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.current_world.goal.tokens = {};
    $("#cmd-result").html(RUR.translate("Goal: no tokens left in world.")).effect("highlight", {color: "gold"}, 1500);
};

RUR.we.draw_token = function (goal) {
    "use strict";
    var ctx, size = 12;
    if (goal) {
        ctx = document.getElementById("canvas-goal-token").getContext("2d");
    } else {
        ctx = document.getElementById("canvas-token").getContext("2d");
    }
    ctx.beginPath();
    ctx.arc(20,20, size, 0 , 2 * Math.PI, false);
    ctx.fillStyle = RUR.TOKEN_COLOR;
    ctx.strokeStyle = RUR.SHAPE_OUTLINE_COLOR;
    if (goal) {
        ctx.stroke();
    } else {
        ctx.fill();
    }
};
RUR.we.draw_token();
RUR.we.draw_token(true);

RUR.we.draw_square = function (goal) {
    "use strict";
    var ctx, size=12;
    if (goal) {
        ctx = document.getElementById("canvas-goal-square").getContext("2d");
    } else {
        ctx = document.getElementById("canvas-square").getContext("2d");
    }
    ctx.fillStyle = RUR.SQUARE_COLOR;
    ctx.strokeStyle = RUR.SHAPE_OUTLINE_COLOR;
    if (goal) {
        ctx.rect(8, 8, 2*size, 2*size);
        ctx.stroke();
    } else {
        ctx.fillRect(8, 8, 2*size, 2*size);
    }
};
RUR.we.draw_square();
RUR.we.draw_square(true);

RUR.we.draw_triangle = function (goal) {
    "use strict";
    var ctx, size=12, scale = RUR.WALL_LENGTH;
    if (goal) {
        ctx = document.getElementById("canvas-goal-triangle").getContext("2d");
    } else {
        ctx = document.getElementById("canvas-triangle").getContext("2d");
    }
    ctx.fillStyle = RUR.TRIANGLE_COLOR;
    ctx.strokeStyle = RUR.SHAPE_OUTLINE_COLOR;
    ctx.beginPath();
    ctx.moveTo(0.5*scale - size, 0.5*scale + size);
    ctx.lineTo(0.5*scale, 0.5*scale - size);
    ctx.lineTo(0.5*scale + size, 0.5*scale + size);
    ctx.lineTo(0.5*scale - size, 0.5*scale + size);
    if (goal) {
        ctx.stroke();
    } else {
        ctx.fill();
    }
};
RUR.we.draw_triangle();
RUR.we.draw_triangle(true);

RUR.we.draw_star = function (goal){
    var ctx, scale = RUR.WALL_LENGTH, x, y, r;
    if (goal) {
        ctx = document.getElementById("canvas-goal-star").getContext("2d");
    } else {
        ctx = document.getElementById("canvas-star").getContext("2d");
    }
    ctx.fillStyle = RUR.STAR_COLOR;
    ctx.strokeStyle = RUR.SHAPE_OUTLINE_COLOR;
    x = 0.5*scale;
    y = 0.5*scale;
    r = 18;
    // adapted from https://developer.mozilla.org/en-US/docs/HTML/Canvas/Tutorial/Compositing
    ctx.save();
    ctx.translate(x, y);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r,0);
    for (var i=0; i<9; i++){
        ctx.rotate(Math.PI/5);
        if(i%2 === 0) {
            ctx.lineTo((r/0.525731)*0.200811, 0);
        } else {
            ctx.lineTo(r, 0);
        }
    }
    ctx.closePath();
    if (goal) {
        ctx.stroke();
    } else {
        ctx.fill();
    }
    ctx.restore();
    ctx.restore();
};
RUR.we.draw_star();
RUR.we.draw_star(true);

RUR.we.draw_mud = function () {
    "use strict";
    var ctx, size=12;
    ctx = document.getElementById("canvas-mud").getContext("2d");
    ctx.fillStyle = RUR.MUD_COLOR;
    ctx.fillRect(0, 0, 40, 40);
};
RUR.we.draw_mud();

RUR.we.toggle_mud = function (){
    // will remove the position if clicked again.
    "use strict";
    var x, y, position, coords, index;

    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    RUR.we.ensure_key_exist(RUR.current_world, "other");
    if (RUR.current_world.other.mud === undefined) {
        RUR.current_world.other.mud = [];
    }
    index = RUR.current_world.other.mud.indexOf(coords);
    if (index === -1) {
        RUR.current_world.other.mud.push(coords);
    } else {
        RUR.current_world.other.mud.remove(index);
    }
};
