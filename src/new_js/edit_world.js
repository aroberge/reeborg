/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.__edit_world = {};

RUR.__delete_world = function (name){
    "use strict";
    var i, key;
    if (localStorage.getItem("__current_world:" + name) === null){
        $("#Reeborg-shouts").html("No such world!").dialog("open");
        return;
    }
    localStorage.removeItem("__current_world:" + name);
    $("select option[value='" + "__current_world:" + name +"']").remove();
    try {
        RUR.__select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.__select_world("Alone");
    }
    $("#select_world").change();
    
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "__current_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};


RUR.__edit_world.update = function (message) {
    "use strict";
    RUR.world.import_(JSON.stringify(RUR.__current_world));
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

RUR.__set_token_number = function () {
    var position, response, x, y, tokens;
    position = RUR.__calculate_grid_position();
    x = position[0];
    y = position[1];
    
    if (RUR.__current_world.shapes !== undefined && RUR.__current_world.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape here; can't put tokens");
        $("#Reeborg-shouts").html("shape here; can't put tokens").dialog("open");
        return;
    }
    
    response = prompt("Enter number of tokens for robot to carry (use inf for infinite number)");
    if (response !== null) {
        tokens = parseInt(response, 10);
        if (tokens >= 0) {
            RUR.__ensure_key_exist(RUR.__current_world, "tokens");
            if (tokens > 0) {
                RUR.__current_world.tokens[x + "," + y] = tokens;
            } else {
                delete RUR.__current_world.tokens[x + "," + y];
            }
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

RUR.__calculate_wall_position = function () {
    var ctx, x, y, orientation, remain_x, remain_y, del_x, del_y;
    x = RUR.__mouse_x - $("#robot_canvas").offset().left;
    y = RUR.__mouse_y - $("#robot_canvas").offset().top;
    
    x /= RUR.__wall_length;
    y /= RUR.__wall_length;
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

RUR.__toggle_wall = function () {
    var position, response, x, y, orientation, coords, index;
    position = RUR.__calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    coords = x + "," + y;

    RUR.__ensure_key_exist(RUR.__current_world, "walls");
    if (RUR.__current_world.walls[coords] === undefined){
        RUR.__current_world.walls[coords] = [orientation];
    } else {
        index = RUR.__current_world.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.__current_world.walls[coords].push(orientation);
        } else {
            RUR.__current_world.walls[coords].remove(index);
            if (RUR.__current_world.walls[coords].length === 0){
                delete RUR.__current_world.walls[coords];
            }
        }
    }
};


RUR.__ensure_key_exist = function(obj, key){
    "use strict";
    if (obj[key] === undefined){
        obj[key] = {};
    }
};

function toggle_shape(x, y, shape){
    "use strict";
    if (!(shape === "star" || shape === "square" || shape === "triangle")){
        $("#cmd-result").html("unknown shape: " + shape);
        return;
    }
    if (RUR.__current_world.tokens !== undefined && RUR.__current_world.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html("tokens here; can't put a shape");
        return;
    }
    RUR.__ensure_key_exist(RUR.__current_world, "shapes");
    if (RUR.__current_world.shapes[x + "," + y] === shape) {
        delete RUR.__current_world.shapes[x + "," + y];
        if (Object.keys(RUR.__current_world.shapes).length === 0){
            delete RUR.__current_world.shapes;
        }
    } else {
        RUR.__current_world.shapes[x + "," + y] = shape;
    }
    RUR.__edit_world.update("updated shapes");
}

function set_goal_position(x, y){
    "use strict";
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    if (x >0  && y >0){
        RUR.__current_world.goal.position = {"x": x, "y": y};
        RUR.__edit_world.update("updated position goal");
    } else {
        if (RUR.__current_world.goal.position !== undefined){
            delete RUR.__current_world.goal.position;
            if (Object.keys(RUR.__current_world.goal).length === 0){
                delete RUR.__current_world.goal;
            }
        }
        RUR.__edit_world.update("No position goal");
    }
}

function set_goal_orientation(orientation){
    "use strict";
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    if ([0, 1, 2, 3].indexOf(orientation) !== -1){
        RUR.__current_world.goal.orientation = orientation;
        RUR.__edit_world.update("updated orientation goal");
    } else {
        if (RUR.__current_world.goal.orientation !== undefined){
            delete RUR.__current_world.goal.orientation;
            if (Object.keys(RUR.__current_world.goal).length === 0){
                delete RUR.__current_world.goal;
            }
        }
        RUR.__edit_world.update("No orientation goal");
    }
}

function set_goal_tokens(x, y, nb_tokens){
    "use strict";
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    if (RUR.__current_world.goal.shapes !== undefined && RUR.__current_world.goal.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape goal here; can't set token goal");
        return;
    }
    RUR.__ensure_key_exist(RUR.__current_world.goal, "tokens");
    if (nb_tokens > 0) {
        RUR.__current_world.goal.tokens[x + "," + y] = nb_tokens;
    } else {
        delete RUR.__current_world.goal.tokens[x + "," + y];
        if (Object.keys(RUR.__current_world.goal.tokens).length === 0){
            delete RUR.__current_world.goal.tokens;
            if (Object.keys(RUR.__current_world.goal).length === 0){
                delete RUR.__current_world.goal;
            }
        }
    }
    RUR.__edit_world.update("updated tokens goal");
}

function set_goal_no_tokens(){
    "use strict";
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    RUR.__current_world.goal.tokens = {};
}

function set_goal_no_shapes(){
    "use strict";
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    RUR.__current_world.goal.shapes = {};
}

function set_goal_wall(x, y, orientation){
    "use strict";
    var index, coords;
    if (!(orientation ==="east" || orientation === "north")){
        $("#cmd-result").html("invalid orientation:" + orientation);
        return;
    }
    coords = x + "," + y;

    if (RUR.__current_world.walls !== undefined){  // there are walls...
        if (RUR.__current_world.walls[coords] !== undefined) {  // at that location
            if (RUR.__current_world.walls[coords].indexOf(orientation) !== -1){ // and orientation
                $("#cmd-result").html("already a wall here; pointless goal ignored");
                return;
            }
        }
    }
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    RUR.__ensure_key_exist(RUR.__current_world.goal, "walls");
    if (RUR.__current_world.goal.walls[coords] === undefined){
        RUR.__current_world.goal.walls[coords] = [orientation];
        RUR.__edit_world.update("Goal wall added");
        return;
    }

    index = RUR.__current_world.goal.walls[coords].indexOf(orientation);
    if (index === -1) {
        RUR.__current_world.goal.walls[coords].push(orientation);
        RUR.__edit_world.update("Goal wall added");
        return;
    } else {
        RUR.__current_world.goal.walls[coords].remove(index);
        if (RUR.__current_world.goal.walls[coords].length === 0){
            delete RUR.__current_world.goal.walls[coords];
            if (Object.keys(RUR.__current_world.goal.walls).length === 0){
                delete RUR.__current_world.goal.walls;
                if (Object.keys(RUR.__current_world.goal).length === 0){
                    delete RUR.__current_world.goal;
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
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    if (RUR.__current_world.goal.tokens !== undefined &&
        RUR.__current_world.goal.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html("tokens as a goal here; can't set a shape goal");
        return;
    }
    RUR.__ensure_key_exist(RUR.__current_world.goal, "shapes");
    if (RUR.__current_world.goal.shapes[x + "," + y] === shape) {
        delete RUR.__current_world.goal.shapes[x + "," + y];
        if (Object.keys(RUR.__current_world.goal.shapes).length === 0){
            delete RUR.__current_world.goal.shapes;
            if (Object.keys(RUR.__current_world.goal).length === 0){
                delete RUR.__current_world.goal;
            }
        }
    } else {
        RUR.__current_world.goal.shapes[x + "," + y] = shape;
    }
    RUR.__edit_world.update("updated shapes");
}
