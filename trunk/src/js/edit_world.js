/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */
var user_world = {};

$("#cmd-input").keyup(function (e) {
    if (e.keyCode == 13) {
        try {
            eval($("#cmd-input").val());
            $("#cmd-input").val("");
        } catch (e) {
            $("#cmd-result").html(e.message);
        }
        copy();
    }
});

function save_world(name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        alert("Name already exist; will not save.");
        return;
    }
    localStorage.setItem("user_world:"+ name, JSON.stringify(user_world));
    $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                              ).val("user_world:" + name).html(name));
    _update("saved world");
}

function delete_world(name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) === null){
        alert("No such world.");
        return;
    }
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();
    RUR.controls.deselect();
    _update("deleted world");
    user_world = {};
}

function _update(message) {
    "use strict";
    RUR.world.import_(JSON.stringify(user_world));
    RUR.world.reset();
    RUR.visible_world.reset();
    $("#cmd-result").html(message);
}

function copy(){
    "use strict";
    $("#output-pre").html(JSON.stringify(user_world, null, '   '));
}

function remove_robot() {
    "use strict";
    delete user_world.robots;
    _update("removed robot");
}

function add_robot(x, y, orientation, tokens){
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.orientation = orientation || 0;
    robot.tokens = tokens || 0;
    user_world.robots = [robot];
    _update("added or changed robot");
}

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
    _ensure_key_exist(user_world, "walls");
    if (user_world.walls[coords] === undefined){
        user_world.walls[coords] = [orientation];
        _update("wall added");
    } else {
        index = user_world.walls[coords].indexOf(orientation);
        if (index === -1) {
            user_world.walls[coords].push(orientation);
            _update("wall added");
        } else {
            user_world.walls[coords].remove(index);
            if (user_world.walls[coords].length === 0){
                delete user_world.walls[coords];
                if (Object.keys(user_world.walls).length === 0){
                    delete user_world.walls;
                }
            }
            _update("wall removed");
        }
    }
}

function set_tokens(x, y, nb_tokens) {
    "use strict";
    if (user_world.shapes !== undefined && user_world.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape here; can't put tokens");
        return;
    }
    _ensure_key_exist(user_world, "tokens");
    if (nb_tokens > 0) {
        user_world.tokens[x + "," + y] = nb_tokens;
    } else {
        delete user_world.tokens[x + "," + y];
        if (Object.keys(user_world.tokens).length === 0){
            delete user_world.tokens;
        }
    }
    _update("updated tokens");
}

function toggle_shape(x, y, shape){
    "use strict";
    if (!(shape === "star" || shape === "square" || shape === "triangle")){
        $("#cmd-result").html("unknown shape: " + shape);
        return;
    }
    if (user_world.tokens !== undefined && user_world.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html("tokens here; can't put a shape");
        return;
    }
    _ensure_key_exist(user_world, "shapes");
    if (user_world.shapes[x + "," + y] === shape) {
        delete user_world.shapes[x + "," + y];
        if (Object.keys(user_world.shapes).length === 0){
            delete user_world.shapes;
        }
    } else {
        user_world.shapes[x + "," + y] = shape;
    }
    _update("updated shapes");
}

function set_goal_position(x, y){
    "use strict";
    _ensure_key_exist(user_world, "goal");
    if (x >0  && y >0){
        user_world.goal.position = {"x": x, "y": y};
        _update("updated position goal");
    } else {
        if (user_world.goal.position !== undefined){
            delete user_world.goal.position;
            if (Object.keys(user_world.goal).length === 0){
                delete user_world.goal;
            }
        }
        _update("No position goal");
    }
}

function set_goal_orientation(orientation){
    "use strict";
    _ensure_key_exist(user_world, "goal");
    if ([0, 1, 2, 3].indexOf(orientation) !== -1){
        user_world.goal.orientation = orientation;
        _update("updated orientation goal");
    } else {
        if (user_world.goal.orientation !== undefined){
            delete user_world.goal.orientation;
            if (Object.keys(user_world.goal).length === 0){
                delete user_world.goal;
            }
        }
        _update("No orientation goal");
    }
}

function set_goal_tokens(x, y, nb_tokens){
    "use strict";
    _ensure_key_exist(user_world, "goal");
    if (user_world.goal.shapes !== undefined && user_world.goal.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html("shape goal here; can't set token goal");
        return;
    }
    _ensure_key_exist(user_world.goal, "tokens");
    if (nb_tokens > 0) {
        user_world.goal.tokens[x + "," + y] = nb_tokens;
    } else {
        delete user_world.goal.tokens[x + "," + y];
        if (Object.keys(user_world.goal.tokens).length === 0){
            delete user_world.goal.tokens;
            if (Object.keys(user_world.goal).length === 0){
                delete user_world.goal;
            }
        }
    }
    _update("updated tokens goal");
}

function set_goal_no_tokens(){
    "use strict";
    _ensure_key_exist(user_world, "goal");
    user_world.goal.tokens = {};
}

function set_goal_no_shapes(){
    "use strict";
    _ensure_key_exist(user_world, "goal");
    user_world.goal.shapes = {};
}

function set_goal_wall(x, y, orientation){
    "use strict";
    var index, coords;
    if (!(orientation ==="east" || orientation === "north")){
        $("#cmd-result").html("invalid orientation:" + orientation);
        return;
    }
    coords = x + "," + y;

    if (user_world.walls !== undefined){  // there are walls...
        if (user_world.walls[coords] !== undefined) {  // at that location
            if (user_world.walls[coords].indexOf(orientation) !== -1){ // and orientation
                $("#cmd-result").html("already a wall here; pointless goal ignored");
                return;
            }
        }
    }
    _ensure_key_exist(user_world, "goal");
    _ensure_key_exist(user_world.goal, "walls");
    if (user_world.goal.walls[coords] === undefined){
        user_world.goal.walls[coords] = [orientation];
        _update("Goal wall added");
        return;
    }

    index = user_world.goal.walls[coords].indexOf(orientation);
    if (index === -1) {
        user_world.goal.walls[coords].push(orientation);
        _update("Goal wall added");
        return;
    } else {
        user_world.goal.walls[coords].remove(index);
        if (user_world.goal.walls[coords].length === 0){
            delete user_world.goal.walls[coords];
            if (Object.keys(user_world.goal.walls).length === 0){
                delete user_world.goal.walls;
                if (Object.keys(user_world.goal).length === 0){
                    delete user_world.goal;
                }
            }
        }
        _update("Goal wall removed");
    }
}

function set_goal_shape(x, y, shape){
    "use strict";
    if (!(shape === "star" || shape === "square" || shape === "triangle")){
        $("#cmd-result").html("unknown shape: " + shape);
        return;
    }
    _ensure_key_exist(user_world, "goal");
    if (user_world.goal.tokens !== undefined &&
        user_world.goal.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html("tokens as a goal here; can't set a shape goal");
        return;
    }
    _ensure_key_exist(user_world.goal, "shapes");
    if (user_world.goal.shapes[x + "," + y] === shape) {
        delete user_world.goal.shapes[x + "," + y];
        if (Object.keys(user_world.goal.shapes).length === 0){
            delete user_world.goal.shapes;
            if (Object.keys(user_world.goal).length === 0){
                delete user_world.goal;
            }
        }
    } else {
        user_world.goal.shapes[x + "," + y] = shape;
    }
    _update("updated shapes");
}


function duplicate() {
    "use strict";
    user_world = JSON.parse(RUR.world.json_world_string);
    _update("duplicated world");
}