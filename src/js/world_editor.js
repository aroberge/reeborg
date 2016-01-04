/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

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
                RUR.we._add_decorative_object(value);
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
        case "toptile":
            RUR.we.toggle_toptile(value);
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
    RUR.we.refresh_world_edited();
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
                RUR.we.add_robot();
                RUR.we.edit_world();
                RUR.we.change_edit_robot_menu();
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
            RUR.cd.dialog_set_background_image.dialog("open");
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
            case "toptiles":
                $("#edit-top-tile").show();
                RUR.we.alert_1("Click on desired top tile below.");
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
        case "toptile":
            $("#edit-top-tile").show();
            RUR.we.alert_2("Click on world to toggle top tile.", value);
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
            RUR.cd.dialog_set_dimensions.dialog('open');
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
    if (RUR.we.editing_world) {  // done editing
        RUR.we.editing_world = false;
        RUR.runner.interpreted = false;
        RUR.WALL_COLOR = "brown";
        RUR.SHADOW_WALL_COLOR = "#f0f0f0";
        RUR.vis_world.draw_all();
        try {
            localStorage.setItem(RUR.settings.editor, editor.getValue());
            localStorage.setItem(RUR.settings.library, library.getValue());
        } catch (e) {}
        RUR.current_world = RUR.world.update_from_editors(RUR.current_world);
        if (!Object.identical(RUR.current_world, RUR.world.saved_world)) {
            $("#memorize-world").trigger('click');
        }
        $("#editor-tab").trigger('click');
    } else {
        RUR.we.change_edit_robot_menu();
        RUR.we.editing_world = true;
        RUR.WALL_COLOR = "black";
        RUR.SHADOW_WALL_COLOR = "#ccd";
        RUR.vis_world.draw_all();
        // RUR.current_world = RUR.world.editors_set_default_values(RUR.current_world);
        $("#highlight").hide();
        $("#watch_variables_btn").hide();
    }
    RUR.reset_programming_language(RUR.settings.current_language);
}

RUR.we.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.we.show_world_info();
};


RUR.we.calculate_grid_position = function () {
    var ctx, x, y;
    x = RUR.we.mouse_x - $("#robot_canvas").offset().left;
    y = RUR.we.mouse_y - $("#robot_canvas").offset().top;

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

RUR.we.show_world_info = function (no_grid) {
    "use strict";
    // shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // enabled in zz_dr_onclick.js
    var position, tile, obj, information, x, y, coords, obj_here, obj_type, goals;
    var topic, no_object, r, robot, robots;
    var tiles, tilename, fence_noted = false;

    information = "";

    if (RUR.current_world.description) {
        information +="<b>" + RUR.translate("Description") + "</b><br>" + RUR.current_world.description + "<hr>";
    }

    if (!no_grid) {
        position = RUR.we.calculate_grid_position();
        x = position[0];
        y = position[1];
        coords = x + "," + y;
        if (!isNaN(x)){
            information += "x = " + x + ", y = " + y;
        }
    }

    tile = RUR.control.get_tile_at_position(x, y);
    topic = true;
    if (tile){
        if (tile.info) {
            if (topic){
                topic = false;
                information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
            }
            information += "<br>" + tile.info;
        }
    }

    tiles = RUR.control.get_top_tiles_at_position(x, y);
    if (tiles) {
        for (tilename in tiles) {
            tile = RUR.top_tiles[tilename];
            if (tile.info){
                if (topic){
                    topic = false;
                    information += "<br><br><b>" + RUR.translate("Special information about this location:") + "</b>";
                }
                if (tile.name == "fence") {
                    if (!fence_noted) {
                        fence_noted = true;
                        information += "<br>" + tile.info;
                    }
                } else {
                    information +=  "<br>" + tile.info;
                }
            }
        }
    }

    obj = RUR.current_world.objects;
    topic = true;
    if (obj !== undefined && obj[coords] !== undefined){
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
    if (goals !== undefined){
        obj = goals.objects;
        topic = true;
        if (obj !== undefined && obj[coords] !== undefined){
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


    if (goals !== undefined){
        if (goals.walls !== undefined && coords) {
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built east of this location.");
                }
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built north of this location.");
                }
            }
            x -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("east") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built west of this location.");
                }
            }
            x += 1;
            y -= 1;
            coords = x + "," + y;
            if (goals.walls[coords] !== undefined){
                if (goals.walls[coords].indexOf("north") != -1) {
                    information += "<br>" + RUR.translate("A wall must be built south of this location.");
                }
            }
            y += 1;
            coords = x + "," + y;
        }
    }

    robots = RUR.current_world.robots;
    if (robots !== undefined && robots.length !== undefined){
        for (r=0; r<robots.length; r++){
            robot = robots[r];
            x = robot.x;
            y = robot.y;
            if (robot.start_positions !== undefined && robot.start_positions.length > 1){
                x = RUR.translate("random location");
                y = '';
            }
            no_object = true;
            for (obj in robot.objects){
                if (robot.objects.hasOwnProperty(obj)) {
                    if (no_object) {
                        no_object = false;
                        information += "<br><br><b>" + RUR.translate("A robot located here carries:").supplant({x:x, y:y}) + "</b>";
                    }
                    information += "<br>" + RUR.translate(obj) + ":" + robot.objects[obj];
                }
            }
            if (no_object){
                information += "<br><br><b>" + RUR.translate("A robot located here carries no objects.").supplant({x:x, y:y}) + "</b>";
            }
        }
    }


    goals = RUR.current_world.goal;
    if (goals !== undefined &&
         (goals.possible_positions !== undefined || goals.position !== undefined)){
        if (topic){
            topic = false;
            information += "<br><br><b>" + RUR.translate("Goal to achieve:") + "</b>";
        }
        if (goals.possible_positions !== undefined && goals.possible_positions.length > 2) {
            information += "<br>" + RUR.translate("The final required position of the robot will be chosen at random.");
        } else {
            information += "<br>" + RUR.translate("The final position of the robot must be (x, y) = ") +
                           "(" + goals.position.x + ", " + goals.position.y + ")";
        }
    }

    $("#World-info").html(information);
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


RUR.we._give_objects_to_robot = function (specific_object){
    "use strict";

    RUR.we.specific_object = specific_object;
    $("#give-object-name").html(RUR.translate(specific_object));
    RUR.cd.dialog_give_object.dialog("open");
};


RUR.we.give_objects_to_robot = function (obj, nb, robot) {
    var translated_arg = RUR.translate_to_english(obj);

    if (RUR.objects.known_objects.indexOf(translated_arg) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: obj}));
    }

    obj = translated_arg;
    if (robot === undefined){
        robot = RUR.current_world.robots[0];
    }
    RUR.we.ensure_key_exist(robot, "objects");

    if (nb === "inf"){
        robot.objects[obj] = "infinite";
    } else if (RUR.filterInt(nb) >= 0) {
        nb = RUR.filterInt(nb);
        if (nb !== 0) {
            robot.objects[obj] = nb;
        } else if (robot.objects[obj] !== undefined) {
            delete robot.objects[obj];
        }
    } else {
        RUR.cd.show_feedback("#Reeborg-shouts", nb + RUR.translate(" is not a valid value!"));
    }
};

RUR.we.turn_robot = function (orientation) {

    RUR.current_world.robots[0]._orientation = orientation;
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

    RUR.we.ensure_key_exist(RUR.current_world, "walls");
    if (RUR.current_world.walls[coords] === undefined){
        RUR.current_world.walls[coords] = [orientation];
    } else {
        index = RUR.current_world.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.current_world.walls[coords].push(orientation);
        } else {
            RUR.current_world.walls[coords].splice(index, 1);
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
            RUR.current_world.goal.walls[coords].splice(index, 1);
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


RUR.we._add_object = function (specific_object){
    "use strict";
    var position, x, y, query, tmp;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (specific_object == "box") {
        if (RUR.current_world.objects !== undefined &&
            RUR.current_world.objects[x+','+y] !== undefined &&
            RUR.current_world.objects[x+','+y]["box"] == 1){  // jshint ignore:line
            RUR.we.add_object("box", x, y, 0);
        } else {
            RUR.we.add_object("box", x, y, 1);
        }
        return;
    }

    RUR.we.specific_object = specific_object;
    RUR.we.x = x;
    RUR.we.y = y;
    $("#add-object-name").html(RUR.translate(specific_object));
    RUR.cd.dialog_add_object.dialog("open");
};


RUR.we._add_decorative_object = function (specific_object){
    "use strict";
    // only one decorative object is allowed per grid position
    var position, x, y, coords;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    if (RUR.objects.known_objects.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    RUR.we.ensure_key_exist(RUR.current_world, "decorative_objects");
    RUR.we.ensure_key_exist(RUR.current_world.decorative_objects, coords);

    if (RUR.current_world.decorative_objects[coords][specific_object] !== undefined) {
        delete RUR.current_world.decorative_objects[coords];
    } else {
        RUR.current_world.decorative_objects[coords] = {};
        RUR.current_world.decorative_objects[coords][specific_object] = 1;
    }
};


RUR.we.add_object = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;
    if (RUR.objects.known_objects.indexOf(specific_object) == -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: specific_object}));
    }

    coords = x + "," + y;
    RUR.we.ensure_key_exist(RUR.current_world, "objects");
    RUR.we.ensure_key_exist(RUR.current_world.objects, coords);

    if (nb === 0) {
        delete RUR.current_world.objects[coords][specific_object];
        if (Object.keys(RUR.current_world.objects[coords]).length === 0){
            delete RUR.current_world.objects[coords];
        }
        if (Object.keys(RUR.current_world.objects).length === 0){
            delete RUR.current_world.objects;
        }
    } else {
        RUR.current_world.objects[coords][specific_object] = nb;
    }
};


RUR.we._add_goal_objects = function (specific_object){
    "use strict";
    var position, x, y, coords, query;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    if (specific_object == "box") {
        if (RUR.current_world.goal !== undefined &&
            RUR.current_world.goal.objects !== undefined &&
            RUR.current_world.goal.objects[coords] !== undefined &&
            RUR.current_world.goal.objects[coords].box ==1){
                RUR.we.add_goal_objects("box", x, y, 0);
        } else {
            RUR.we.add_goal_objects("box", x, y, 1);
        }
        return;
    }

    RUR.we.specific_object = specific_object;
    RUR.we.x = x;
    RUR.we.y = y;
    $("#goal-object-name").html(RUR.translate(specific_object));
    RUR.cd.dialog_goal_object.dialog("open");
};

RUR.we.add_goal_objects = function (specific_object, x, y, nb){
    "use strict";
    var coords;

    coords = x + "," + y;

    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.we.ensure_key_exist(RUR.current_world.goal, "objects");
    RUR.we.ensure_key_exist(RUR.current_world.goal.objects, coords);
    if (nb === 0) {
        delete RUR.current_world.goal.objects[coords][specific_object];
        if (JSON.stringify(RUR.current_world.goal.objects[coords]) === '{}'){
            delete RUR.current_world.goal.objects[coords];
        }
        if (JSON.stringify(RUR.current_world.goal.objects) === '{}'){
            delete RUR.current_world.goal.objects;
        }
        if (JSON.stringify(RUR.current_world.goal) === '{}'){
            delete RUR.current_world.goal;
        }
    } else {
        RUR.current_world.goal.objects[coords][specific_object] = nb;
    }
};


RUR.we.set_goal_position = function (home){
    // will remove the position if clicked again.
    "use strict";
    var position, world=RUR.current_world, robot, arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);

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
        delete RUR.current_world.goal.position;
        delete RUR.current_world.goal.possible_positions;
        if (Object.keys(RUR.current_world.goal).length === 0) {
            delete RUR.current_world.goal;
        }
        $("#edit-world-turn").hide();
    }
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

RUR.we.fill_with_tile = function (tile) {
    var x, y, coords;

    RUR.we.ensure_key_exist(RUR.current_world, "tiles");
    for (x = 1; x <= RUR.COLS; x++) {
        for (y = 1; y <= RUR.ROWS; y++) {
            coords = x + "," + y;
            RUR.current_world.tiles[coords] = tile;
        }
    }
};


RUR.we.toggle_toptile = function (tile){
    // will remove the position if clicked again with tile of same type.
    "use strict";
    var x, y, position;

    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.control.get_top_tiles_at_position(x, y)[tile] !== undefined) {
        RUR.we.add_top_tile(tile, x, y, 0);
    } else {
        RUR.we.add_top_tile(tile, x, y, 1);
    }
};


RUR.we.add_top_tile = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;

    coords = x + "," + y;
    RUR.we.ensure_key_exist(RUR.current_world, "top_tiles");
    RUR.we.ensure_key_exist(RUR.current_world.top_tiles, coords);


    try {
        tmp = parseInt(nb, 10);
        nb = tmp;
    } catch (e) {}


    if (nb === 0) {
        delete RUR.current_world.top_tiles[coords][specific_object];
        if (Object.keys(RUR.current_world.top_tiles[coords]).length === 0){
            delete RUR.current_world.top_tiles[coords];
        }
        if (Object.keys(RUR.current_world.top_tiles).length === 0){
            delete RUR.current_world.top_tiles;
        }
    } else {
        RUR.current_world.top_tiles[coords][specific_object] = nb;
    }
};

RUR.we.remove_all = function () {
    RUR.current_world.robots = [];
    RUR.we._trim_world(0,0, RUR.COLS, RUR.ROWS);
};

RUR.we._trim_world = function (min_x, min_y, max_x, max_y) {
    var x, y, coords;

    for (x = min_x+1; x <= max_x; x++) {
        for (y = 1; y <= max_y; y++) {
            coords = x + "," + y;
            RUR.we._remove_all_at_location(coords);
        }
    }
    for (x = 1; x <= max_x; x++) {
        for (y = min_y+1; y <= max_y; y++) {
            coords = x + "," + y;
            RUR.we._remove_all_at_location(coords);
        }
    }
    if (RUR.current_world.goal !== undefined) {
        if (RUR.current_world.goal.possible_positions !== undefined) {
            delete RUR.current_world.goal.possible_positions;
            delete RUR.current_world.goal.position;
            RUR.cd.show_feedback("#Reeborg-shouts",
                                 RUR.translate("WARNING: deleted final positions choices while resizing world!"));
        }
    }
};

RUR.we._remove_all_at_location = function(coords) {
    // trading efficiency for clarity
    if (RUR.current_world.tiles !== undefined) {
        if (RUR.current_world.tiles[coords] !== undefined){
            delete RUR.current_world.tiles[coords];
        }
    }
    if (RUR.current_world.top_tiles !== undefined) {
        if (RUR.current_world.top_tiles[coords] !== undefined){
            delete RUR.current_world.top_tiles[coords];
        }
    }
    if (RUR.current_world.objects !== undefined) {
        if (RUR.current_world.objects[coords] !== undefined){
            delete RUR.current_world.objects[coords];
        }
    }
    if (RUR.current_world.walls !== undefined) {
        if (RUR.current_world.walls[coords] !== undefined){
            delete RUR.current_world.walls[coords];
        }
    }
    if (RUR.current_world.goal !== undefined) {
        if (RUR.current_world.goal.objects !== undefined) {
            if (RUR.current_world.goal.objects[coords] !== undefined){
                delete RUR.current_world.goal.objects[coords];
            }
        }
    }
    if (RUR.current_world.goal !== undefined) {
        if (RUR.current_world.goal.walls !== undefined) {
            if (RUR.current_world.goal.walls[coords] !== undefined){
                delete RUR.current_world.goal.walls[coords];
            }
        }
    }
};
