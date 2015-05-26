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
            RUR.we.add_objects("token");
            break;
        case "world-star":
            RUR.we.add_objects("star");
            break;
        case "world-triangle":
            RUR.we.add_objects("triangle");
            break;
        case "world-square":
            RUR.we.add_objects("square");
            break;
        case "world-mud":
            RUR.we.toggle_tile("mud");
            break;
        case "world-water":
            RUR.we.toggle_tile("water");
            break;
        case "world-gravel":
            RUR.we.toggle_tile("gravel");
            break;
        case "world-ice":
            RUR.we.toggle_tile("ice");
            break;
        case "world-grass":
            RUR.we.toggle_tile("grass");
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
            RUR.we.add_goal_objects("token");
            break;
        case "goal-star":
            RUR.we.add_goal_objects("star");
            break;
        case "goal-triangle":
            RUR.we.add_goal_objects("triangle");
            break;
        case "goal-square":
            RUR.we.add_goal_objects("square");
            break;
        case "goal-no-objects":
            RUR.we.set_goal_no_objects();
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
    $("#edit-world-tiles").hide();
    RUR.we.edit_world_flag = choice;
    switch (choice) {
        case "world-info":
            $("#cmd-result").html(RUR.translate("Click on world to get information.")).effect("highlight", {color: "gold"}, 1500);
            break;
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
        case "world-tiles":
            $("#edit-world-tiles").show();
            $("#cmd-result").html(RUR.translate("Click on desired tile below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-star":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to add star.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-triangle":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to add triangle.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-square":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to add square.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-mud":
            $("#edit-world-tiles").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle mud tile.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-water":
            $("#edit-world-tiles").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle water tile.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-ice":
            $("#edit-world-tiles").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle ice tile.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-gravel":
            $("#edit-world-tiles").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle gravel tile.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-grass":
            $("#edit-world-tiles").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle grass tile.")).effect("highlight", {color: "gold"}, 1500);
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
            $("#cmd-result").html(RUR.translate("Click on world to add star goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-triangle":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to add triangle goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-square":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to add square goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-no-objects":
            $("#cmd-result").html(RUR.translate("Click on world at x=1, y=1 to have no object left as a goal.")).effect("highlight", {color: "gold"}, 1500);
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
        editing_world_enable_run();
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
        editing_world_disable_run();
        RUR.we.show_pre_post_code();
    }
}

RUR.we.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
};

function editing_world_enable_run(){
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
}

function editing_world_disable_run() {
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
}

RUR.we.calculate_grid_position = function () {
    var ctx, x, y;
    x = RUR.we.mouse_x - $("#robot_canvas").offset().left;
    y = RUR.we.mouse_y - $("#robot_canvas").offset().top;

    x /= RUR.WALL_LENGTH;
    x = Math.floor(x);

    y = RUR.HEIGHT - y + RUR.WALL_THICKNESS;
    y /= RUR.WALL_LENGTH;
    y = Math.floor(y);

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

RUR.we.show_world_info = function () {
    // shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // enabled in doc_ready.js
    var position, tile, obj, information, x, y, coords, obj_here, obj_type, goals;
    var topic, no_object, r, robot, robots;

    $("#World-info").dialog("open");
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;
    if (!isNaN(x)){
        information = "x = " + x + ", y = " + y;
    } else {
        information = "";
    }

    robots = RUR.current_world.robots;
    for (r=0; r<robots.length; r++){
        if (robots[r].x == x && robots[r].y == y) {
            robot = robots[r];
            no_object = true;
            for (obj in robot.objects){
                if (robot.objects.hasOwnProperty(obj)) {
                    if (no_object) {
                        no_object = false;
                        information += "<br><br><b>" + RUR.translate("A robot located here carries:") + "</b>"
                    }
                    information += "<br>" + RUR.translate(obj) + ":" + robot.objects[obj];
                }
            }
            if (no_object){
                information += "<br><br><b>" + RUR.translate("A robot located here carries no objects.") + "</b>"
            }
        }
    }


    tile = RUR.control.get_tile_at_position(x, y);
    topic = true;
    if (tile){
        if (tile.info) {
            if (topic){
                topic = false;
                information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>"
            }
            information += "<br>" + tile.info;
        }
    }
    obj = RUR.current_world.objects;
    topic = true;
    if (obj != undefined && obj[coords] != undefined){
        obj_here = obj[coords];
        for (obj_type in obj_here) {
            if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Objects found here:") + "</b>";
                    }
               information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
            }
        }
    }

    goals = RUR.current_world.goal;
    if (goals != undefined){
        obj = goals.objects;
        topic = true;
        if (obj != undefined && obj[coords] != undefined){
            obj_here = obj[coords];
            for (obj_type in obj_here) {
                if (obj_here.hasOwnProperty(obj_type)) {
                    if (topic){
                        topic = false;
                        information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
                    }
                   information += "<br>" + RUR.translate(obj_type) + ":" + obj_here[obj_type];
                }
            }
        }
    }


    goals = RUR.current_world.goal;
    no_object = true;
    if (goals != undefined){
        obj = goals.objects;
        topic = true;
        if (obj != undefined){
            for (coords in obj) {
                if (obj.hasOwnProperty(coords)) {
                    no_object = false;
                }
            }
        }
    } else {
        no_object = false;
    }
    if (no_object){
        information += "<br><br><b>" + RUR.translate("Note: no object must be left in this world at the end of the program.") + "</b>";
    }

    if (RUR.current_world.description) {
        information += "<br><br><b>" + RUR.translate("Description") + "</b><br>" + RUR.current_world.description;
    }

    $("#World-info").html(information);
}


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

RUR.we.insert_pre_code = function() {
    if (RUR.current_world.pre_code === undefined){
        RUR.current_world.pre_code = '';
        RUR.current_world.post_code = '';
    }
    RUR.current_world.pre_code = editor.getValue();
    RUR.we.show_pre_post_code();
}

RUR.we.insert_post_code = function() {
    if (RUR.current_world.post_code === undefined){
        RUR.current_world.pre_code = '';
        RUR.current_world.post_code = '';
    }
    RUR.current_world.post_code = editor.getValue();
    RUR.we.show_pre_post_code();
}

RUR.we.add_description = function() {
    if (RUR.current_world.description === undefined){
        RUR.current_world.description = '';
    }
    RUR.current_world.description = editor.getValue();
    RUR.we.show_world_info();
}

RUR.we.show_pre_post_code = function() {
    if (RUR.current_world.pre_code == undefined) {
        $("#code-copied").html('');
        return;
    }
    $("#code-copied").html("<br>pre-code: <pre>" + RUR.current_world.pre_code +
                           "</pre>post-code:<pre>" + RUR.current_world.post_code + "</pre>");
}

RUR.we.add_objects = function (specific_object){
    "use strict";
    var position, x, y, coords, query;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    query = prompt(RUR.translate("Enter number of objects desired at that location."));

    RUR.we.ensure_key_exist(RUR.current_world, "objects");
    RUR.we.ensure_key_exist(RUR.current_world.objects, coords);
    if (query==0) {
        delete RUR.current_world.objects[coords][specific_object];
        if (Object.keys(RUR.current_world.objects).length === 0){
            delete RUR.current_world.objects[coords];
        }
        if (Object.keys(RUR.current_world.objects).length === 0){
            delete RUR.current_world.objects;
        }
    } else {
        RUR.current_world.objects[coords][specific_object] = query;
    }
};


RUR.we.add_goal_objects = function (specific_object){
    "use strict";
    var position, x, y, coords, query;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    query = prompt(RUR.translate("Enter number of objects desired as a goal at that location."));
    if (query != "all"){
        try {
            query = parseInt(query, 10);
            if (isNaN(query)){
                $("#cmd-result").html(RUR.translate("Only integer values or 'all' please!")).effect("highlight", {color: "gold"}, 1500);
                return;
            }
        } catch (e) {
                $("#cmd-result").html(RUR.translate("Only integer values or 'all' please!")).effect("highlight", {color: "gold"}, 1500);
            return;
        }
    }

    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.we.ensure_key_exist(RUR.current_world.goal, "objects");
    RUR.we.ensure_key_exist(RUR.current_world.goal.objects, coords);
    if (query==0) {
        delete RUR.current_world.goal.objects[coords][specific_object];
        if (Object.keys(RUR.current_world.goal.objects).length === 0){
            delete RUR.current_world.goal.objects[coords];
        }
        if (Object.keys(RUR.current_world.goal.objects).length === 0){
            delete RUR.current_world.goal.objects;
        }
        if (Object.keys(RUR.current_world.goal).length === 0){
            delete RUR.current_world.goal;
        }
    } else {
        RUR.current_world.goal.objects[coords][specific_object] = query;
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
    RUR.current_world.goal.objects = {};
    $("#cmd-result").html(RUR.translate("Goal: no object left in world.")).effect("highlight", {color: "gold"}, 1500);
};


RUR.we.toggle_tile = function (tile){
    // will remove the position if clicked again with tile of same type.
    "use strict";
    var x, y, position, coords, index;

    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    RUR.we.ensure_key_exist(RUR.current_world, "tiles");
    if (RUR.current_world.tiles[coords] === undefined ||
        RUR.current_world.tiles[coords] != tile){
        RUR.current_world.tiles[coords] = tile;
    } else {
        delete RUR.current_world.tiles[coords];
    }
};
