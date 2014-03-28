/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.__edit_world = {};

RUR.__delete_world = function (name){
    "use strict";
    var i, key;
    if (localStorage.getItem("user_world:" + name) === null){
        $("#Reeborg-shouts").html("No such world!").dialog("open");
        return;
    }
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();
    try {
        RUR.__select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.__select_world("Alone");
    }
    $("#select_world").change();
    
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};


RUR.__edit_world.update = function (message) {
    "use strict";
    RUR.world.import_(JSON.stringify(RUR.user_world));
    RUR.world.reset();
    RUR.__reset();
    $("#cmd-result").html(message);
};

RUR.__calculate_grid_position = function () {
    var ctx, x, y;
    x = RUR.__mouse_x - $("#robot_canvas").offset().left;
    y = RUR.__mouse_y - $("#robot_canvas").offset().top;

    x /= RUR.__wall_length;
    x = Math.floor(x);
    y /= RUR.__wall_length;
    y = RUR.__rows - Math.floor(y) + 1;
    if (x < 1 ) {
        x = 1;
    } else if (x > RUR.__cols) {
        x = RUR.__cols;
    }
    if (y < 1 ) {
        y = 1;
    } else if (y > RUR.__rows) {
        y = RUR.__rows;
    }
    return [x, y];
};


RUR.__teleport_robot = function () {
    var position;
    position = RUR.__calculate_grid_position();
    RUR.__current_world.robots[0].x = position[0]; 
    RUR.__current_world.robots[0].y = position[1];
};

RUR.__give_tokens_to_robot = function () {
    var response = prompt("Enter number of tokens for robot to carry (use inf for infinite number)");
    if (response !== null) {
        if (response === "inf"){
            RUR.__current_world.robots[0].tokens = "infinite";
        } else if (parseInt(response, 10) >= 0) {
            RUR.__current_world.robots[0].tokens = parseInt(response, 10);
        } else {
            $("#Reeborg-shouts").html(response + " is not a valid value!").dialog("open");
        }
    }
};

RUR.__turn_robot = function (orientation) {
    RUR.__current_world.robots[0].orientation = orientation;
    RUR.__refresh_world_edited();
};

RUR.__remove_robot = function () {
    "use strict";
    RUR.__current_world.robots = [];
};

RUR.__add_robot = function () {
    "use strict";
    RUR.__current_world.robots = [RUR.__create_robot()];
};

RUR.__edit_world.add_robot = function (x, y, orientation, tokens){
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.orientation = orientation || 0;
    robot.tokens = tokens || 0;
    RUR.user_world.robots = [robot];
    RUR.__edit_world.update("added or changed robot");
};

function _ensure_key_exist(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    }
}

function toggle_wall(x, y, orientation){
    "use strict";
    var index, coords;
    if (!(orientation ==="east" || orientation === "north")){
        $("#cmd-result").html("invalid orientation:" + orientation);
        return;
    }
    coords = x + "," + y;
    _ensure_key_exist(RUR.user_world, "walls");
    if (RUR.user_world.walls[coords] === undefined){
        RUR.user_world.walls[coords] = [orientation];
        RUR.__edit_world.update("wall added");
    } else {
        index = RUR.user_world.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.user_world.walls[coords].push(orientation);
            RUR.__edit_world.update("wall added");
        } else {
            RUR.user_world.walls[coords].remove(index);
            if (RUR.user_world.walls[coords].length === 0){
                delete RUR.user_world.walls[coords];
                if (Object.keys(RUR.user_world.walls).length === 0){
                    delete RUR.user_world.walls;
                }
            }
            RUR.__edit_world.update("wall removed");
        }
    }
}

function set_tokens(x, y, nb_tokens) {
    "use strict";
    if (RUR.user_world.shapes !== undefined && RUR.user_world.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape here; can't put tokens");
        return;
    }
    _ensure_key_exist(RUR.user_world, "tokens");
    if (nb_tokens > 0) {
        RUR.user_world.tokens[x + "," + y] = nb_tokens;
    } else {
        delete RUR.user_world.tokens[x + "," + y];
        if (Object.keys(RUR.user_world.tokens).length === 0){
            delete RUR.user_world.tokens;
        }
    }
    RUR.__edit_world.update("updated tokens");
}

function toggle_shape(x, y, shape){
    "use strict";
    if (!(shape === "star" || shape === "square" || shape === "triangle")){
        $("#cmd-result").html("unknown shape: " + shape);
        return;
    }
    if (RUR.user_world.tokens !== undefined && RUR.user_world.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html("tokens here; can't put a shape");
        return;
    }
    _ensure_key_exist(RUR.user_world, "shapes");
    if (RUR.user_world.shapes[x + "," + y] === shape) {
        delete RUR.user_world.shapes[x + "," + y];
        if (Object.keys(RUR.user_world.shapes).length === 0){
            delete RUR.user_world.shapes;
        }
    } else {
        RUR.user_world.shapes[x + "," + y] = shape;
    }
    RUR.__edit_world.update("updated shapes");
}

function set_goal_position(x, y){
    "use strict";
    _ensure_key_exist(RUR.user_world, "goal");
    if (x >0  && y >0){
        RUR.user_world.goal.position = {"x": x, "y": y};
        RUR.__edit_world.update("updated position goal");
    } else {
        if (RUR.user_world.goal.position !== undefined){
            delete RUR.user_world.goal.position;
            if (Object.keys(RUR.user_world.goal).length === 0){
                delete RUR.user_world.goal;
            }
        }
        RUR.__edit_world.update("No position goal");
    }
}

function set_goal_orientation(orientation){
    "use strict";
    _ensure_key_exist(RUR.user_world, "goal");
    if ([0, 1, 2, 3].indexOf(orientation) !== -1){
        RUR.user_world.goal.orientation = orientation;
        RUR.__edit_world.update("updated orientation goal");
    } else {
        if (RUR.user_world.goal.orientation !== undefined){
            delete RUR.user_world.goal.orientation;
            if (Object.keys(RUR.user_world.goal).length === 0){
                delete RUR.user_world.goal;
            }
        }
        RUR.__edit_world.update("No orientation goal");
    }
}

function set_goal_tokens(x, y, nb_tokens){
    "use strict";
    _ensure_key_exist(RUR.user_world, "goal");
    if (RUR.user_world.goal.shapes !== undefined && RUR.user_world.goal.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape goal here; can't set token goal");
        return;
    }
    _ensure_key_exist(RUR.user_world.goal, "tokens");
    if (nb_tokens > 0) {
        RUR.user_world.goal.tokens[x + "," + y] = nb_tokens;
    } else {
        delete RUR.user_world.goal.tokens[x + "," + y];
        if (Object.keys(RUR.user_world.goal.tokens).length === 0){
            delete RUR.user_world.goal.tokens;
            if (Object.keys(RUR.user_world.goal).length === 0){
                delete RUR.user_world.goal;
            }
        }
    }
    RUR.__edit_world.update("updated tokens goal");
}

function set_goal_no_tokens(){
    "use strict";
    _ensure_key_exist(RUR.user_world, "goal");
    RUR.user_world.goal.tokens = {};
}

function set_goal_no_shapes(){
    "use strict";
    _ensure_key_exist(RUR.user_world, "goal");
    RUR.user_world.goal.shapes = {};
}

function set_goal_wall(x, y, orientation){
    "use strict";
    var index, coords;
    if (!(orientation ==="east" || orientation === "north")){
        $("#cmd-result").html("invalid orientation:" + orientation);
        return;
    }
    coords = x + "," + y;

    if (RUR.user_world.walls !== undefined){  // there are walls...
        if (RUR.user_world.walls[coords] !== undefined) {  // at that location
            if (RUR.user_world.walls[coords].indexOf(orientation) !== -1){ // and orientation
                $("#cmd-result").html("already a wall here; pointless goal ignored");
                return;
            }
        }
    }
    _ensure_key_exist(RUR.user_world, "goal");
    _ensure_key_exist(RUR.user_world.goal, "walls");
    if (RUR.user_world.goal.walls[coords] === undefined){
        RUR.user_world.goal.walls[coords] = [orientation];
        RUR.__edit_world.update("Goal wall added");
        return;
    }

    index = RUR.user_world.goal.walls[coords].indexOf(orientation);
    if (index === -1) {
        RUR.user_world.goal.walls[coords].push(orientation);
        RUR.__edit_world.update("Goal wall added");
        return;
    } else {
        RUR.user_world.goal.walls[coords].remove(index);
        if (RUR.user_world.goal.walls[coords].length === 0){
            delete RUR.user_world.goal.walls[coords];
            if (Object.keys(RUR.user_world.goal.walls).length === 0){
                delete RUR.user_world.goal.walls;
                if (Object.keys(RUR.user_world.goal).length === 0){
                    delete RUR.user_world.goal;
                }
            }
        }
        RUR.__edit_world.update("Goal wall removed");
    }
}

function set_goal_shape(x, y, shape){
    "use strict";
    if (!(shape === "star" || shape === "square" || shape === "triangle")){
        $("#cmd-result").html("unknown shape: " + shape);
        return;
    }
    _ensure_key_exist(RUR.user_world, "goal");
    if (RUR.user_world.goal.tokens !== undefined &&
        RUR.user_world.goal.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html("tokens as a goal here; can't set a shape goal");
        return;
    }
    _ensure_key_exist(RUR.user_world.goal, "shapes");
    if (RUR.user_world.goal.shapes[x + "," + y] === shape) {
        delete RUR.user_world.goal.shapes[x + "," + y];
        if (Object.keys(RUR.user_world.goal.shapes).length === 0){
            delete RUR.user_world.goal.shapes;
            if (Object.keys(RUR.user_world.goal).length === 0){
                delete RUR.user_world.goal;
            }
        }
    } else {
        RUR.user_world.goal.shapes[x + "," + y] = shape;
    }
    RUR.__edit_world.update("updated shapes");
}
