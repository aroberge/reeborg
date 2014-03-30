/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */

var RUR = {};
var DEBUG = {};
DEBUG.ON = false;

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

RUR.__background_canvas = document.getElementById("background_canvas");
RUR.__background_ctx = RUR.__background_canvas.getContext("2d");
RUR.__background_ctx.font = "bold 12px sans-serif";
RUR.__height = RUR.__background_canvas.height;
RUR.__width = RUR.__background_canvas.width;
RUR.__wall_ctx = document.getElementById("wall_canvas").getContext("2d");
RUR.__trace_ctx = document.getElementById("trace_canvas").getContext("2d");
RUR.__robot_ctx = document.getElementById("robot_canvas").getContext("2d");

RUR.__wall_length = 40;
RUR.__wall_thickness = 5;

RUR.__rows = Math.floor(RUR.__height / RUR.__wall_length) - 1;
RUR.__cols = Math.floor(RUR.__width / RUR.__wall_length) - 2;

RUR.__wall_color = "brown";
RUR.__goal_wall_color = "black";
RUR.__coordinates_color = "black";
RUR.__axis_label_color = "brown";
RUR.__shadow_wall_color= "#f0f0f0";

RUR.__star_color = "red";
RUR.__triangle_color = "green";
RUR.__square_color = "blue";
RUR.__shape_outline_color = "black";
RUR.__target_tile_color = "#99ffcc";
RUR.__orientation_tile_color = "black";

RUR.__token_color = "gold";
RUR.__text_color = "black";
RUR.__token_goal_color = "#666";

RUR.__debug_info_color = "blue";
/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world*/

$(document).ready(function() {
    
    RUR.__add_user_worlds_to_menu();
    try {
        RUR.__select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.__select_world("Alone");
    }
    // init
    var child, button_closed = false;

    $("#header-child button").on("click", function(){
        var index, label, children;
        $(this).toggleClass("active");
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("reverse-blue-gradient");
        label = $(this).attr("label");

        children = $("#panels").children();
        for (index = 0; index < children.length; index++){
            child = $(children[index]);
            if (child.attr("id") === label) {
                child.toggleClass("active");
            }
        }

        if (label === "world-panel"){
            $("#world-panel").toggleClass("active");
        }  else if (label === "output-panel"){
            $("#output-panel").toggleClass("active");
        }  else if (label === "editor-panel"){
            $("#editor-panel").toggleClass("active");
        }

    });

    $(function() {
        $("#tabs").tabs({heightStyle: "auto"});
    });

    $("#editor-link").on("click", function(){
        $("#save-library").hide();
        $("#load-library").hide();
        $("#save-editor").show();
        $("#load-editor").show();
    });
    $("#library-link").on("click", function(){
        $("#save-editor").hide();
        $("#load-editor").hide();
        $("#save-library").show();
        $("#load-library").show();
    });

    var load_file = function(obj) {
        $("#fileInput").click();
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                obj.setValue(reader.result);
                fileInput.value = "";
            };
            reader.readAsText(file);	
        }); 
    };

    $("#load-editor").on("click", function(evt) {
        load_file(editor);
    });
  
    $("#load-library").on("click", function(evt) {
        load_file(library);
    });
  
    var _all_files = "";
    $("#save-editor").on("click", function(evt) {
        var blob = new Blob([editor.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, _all_files);
    });

    $("#save-library").on("click", function(evt) {
        var blob = new Blob([library.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, _all_files);
    });
  
  
    $("#edit-world").on("click", function(evt) {
        toggle_editing_mode();
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("reverse-blue-gradient");
    });
  
    $("#save-world").on("click", function(evt) {
        var blob = new Blob([RUR.world.json_world_string], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, "*.json");
    });

  
    $("#load-world").on("click", function(evt) {
        $("#worldfileInput").show();
        var fileInput = document.getElementById('worldfileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    $("#worldfileInput").hide();
                } catch (e) {
                    alert(RUR.translation["Invalid world file."]);
                }
                fileInput.value = "";
            };
            reader.readAsText(file);	
        }); 
    });
    
    $("#memorize-world").on("click", function(evt) {
        var response = prompt("Enter world name to save");
        if (response !== null) {
            RUR.__storage_save_world(response.trim());
            $('#delete-world').show(); 
        }
    });
    
    $("#delete-world").on("click", function(evt) {
        var response = prompt("Enter world name to delete");
        if (response !== null) {
            RUR.__delete_world(response.trim());
        }
    });
  
    $("#robot_canvas").on("click", function (evt) {
        if (!RUR.__editing_world) {
            return;
        }
        RUR.__mouse_x = evt.clientX;
        RUR.__mouse_y = evt.clientY;
        RUR.__edit_world.edit_world();
    });

    $("#help").dialog({autoOpen:false, width:800,  height:600, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#help-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});
  
    $("#help-button").on("click", function() {
        if ($("#help-button").hasClass("reverse-blue-gradient")) {
            $("#help").dialog("open");
        } else {
            $("#help").dialog("close");
        }
        return;
    });

    $("#Reeborg-says").dialog({minimize: false, maximize: false, autoOpen:false, width:500, position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});

    editor.widgets = [];
    library.widgets = [];


    // Set listener ...  (continuing below)
    $("#select_world").change(function() {
        var data, val = $(this).val();
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}
          
//        RUR.world.robot_world_active = true;
        if (val.substring(0,11) === "user_world:"){
            data = localStorage.getItem(val);
            RUR.__import_world(data);
        } else {
            $.get(val, function(data) {
                RUR.__import_world(data);
                // jquery is sometimes too intelligent; it can guess
                // if the imported object is a string ... or a json object
                // I need a string here;  so make sure to prevent it from identifying.
            }, "text");
        }
    });
    // ... and trigger it to load the initial world.
    $("#select_world").change();
    
});
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.__edit_world = {};

RUR.__edit_world.edit_world = function  () {
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    switch (RUR.__edit_world_flag) {
        case "robot-teleport":
            RUR.__teleport_robot();
            break;
        case "robot-remove":
        case "robot-add":
        case "robot-turn":
        case "robot-tokens":
            break;
        case "world-tokens":
            RUR.__set_token_number();
            break;
        case "world-walls":
            RUR.__toggle_wall();
            break;
        case "goal-robot":
            RUR.__set_goal_position();
            break;
        case "goal-wall":
            RUR.__toggle_goal_wall();
            break;
    }
    RUR.__refresh_world_edited();
};

RUR.__edit_world.select = function (choice) {
    $(".edit-world-submenus").hide();
    RUR.__edit_world_flag = choice;
    switch (choice) {
        case "robot-teleport":
            $("#cmd-result").html("Click on canvas to move robot.");
            break;
        case "robot-remove":
            $("#cmd-result").html("Removed robot.");
            RUR.__remove_robot();
            RUR.__edit_world.edit_world();
            RUR.__change_edit_robot_menu();
            break;
        case "robot-add":
            $("#cmd-result").html("Added robot");
            RUR.__add_robot(RUR.__create_robot());
            RUR.__edit_world.edit_world();
            RUR.__change_edit_robot_menu();
            break;
        case "robot-orientation":
            $("#cmd-result").html("Click on image to turn robot");
            $("#edit-world-turn").show();
            break;
        case "robot-tokens":
            RUR.__give_tokens_to_robot();
            RUR.__edit_world.edit_world();
            $("#cmd-result").html("Robot now has " + RUR.__current_world.robots[0].tokens + " tokens.");
            break;
        case "world-tokens":
            $("#cmd-result").html("Click on canvas to set number of tokens.");
            break;
        case "world-walls":
            $("#cmd-result").html("Click on canvas to toggle walls.");
            break;
        case "goal-robot":
            $("#cmd-result").html("Click on canvas to set home position for robot.");
            break;
        case "goal-wall":
            $("#cmd-result").html("Click on canvas to toggle additional walls to build.");
            break;
    }
};

RUR.__change_edit_robot_menu = function () {
    if ("robots" in RUR.__current_world && 
        RUR.__current_world.robots.length > 0) {
        $(".robot-absent").hide();
        $(".robot-present").show();
    } else {
        $(".robot-absent").show();
        $(".robot-present").hide();
    }
};

function toggle_editing_mode () {
    $("#edit-world-panel").toggleClass("active");
    if (RUR.__editing_world) {
        RUR.__editing_world = false;
        editing_world_show_others();
        RUR.__wall_color = "brown";
        RUR.__shadow_wall_color = "#f0f0f0";
        RUR.__refresh_world_edited();
    } else {
        RUR.__change_edit_robot_menu();
        RUR.__editing_world = true;
        RUR.__wall_color = "black";
        RUR.__shadow_wall_color = "#ccd";
        RUR.__refresh_world_edited();
        editing_world_hide_others();
    }
}

RUR.__refresh_world_edited = function () {
    RUR.__visible_world.draw_all(RUR.__current_world);
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
        console.log(i);
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            console.log("returning");
            return;
        }
    }
    console.log("done");
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
    
    response = prompt("Enter number of tokens for at that location.");
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
    if (RUR.__edit_world_flag === "goal-robot") {
        RUR.__set_goal_orientation(orientation);
        RUR.__refresh_world_edited();
        return;
    }
    
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
    var position, x, y, orientation, coords, index;
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


RUR.__toggle_goal_wall = function () {
    var position, response, x, y, orientation, coords, index;
    position = RUR.__calculate_wall_position();
    x = position[0];
    y = position[1];
    orientation = position[2];
    coords = x + "," + y;

    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    RUR.__ensure_key_exist(RUR.__current_world.goal, "walls");
    if (RUR.__current_world.goal.walls[coords] === undefined){
        RUR.__current_world.goal.walls[coords] = [orientation];
    } else {
        index = RUR.__current_world.goal.walls[coords].indexOf(orientation);
        if (index === -1) {
            RUR.__current_world.goal.walls[coords].push(orientation);
        } else {
            RUR.__current_world.goal.walls[coords].remove(index);
            if (RUR.__current_world.goal.walls[coords].length === 0){
                delete RUR.__current_world.goal.walls[coords];
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

RUR.__set_goal_position = function (){
    // will remove the position if clicked again.
    "use strict";
    var position;
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    position = RUR.__calculate_grid_position();
    
    if (RUR.__current_world.goal.position !== undefined){
        if (position[0] === RUR.__current_world.goal.position.x &&
            position[1] === RUR.__current_world.goal.position.y) { 
            delete RUR.__current_world.goal.position;
            if (RUR.__current_world.goal.orientation !== undefined) {
                delete RUR.__current_world.goal.orientation;
            }
            $("#edit-world-turn").hide();
        } else {
            RUR.__current_world.goal.position = {"x": position[0], "y": position[1]};
            $("#cmd-result").html("Click on same position to remove, or robot to set orientation");
            $("#edit-world-turn").show();
        }
    } else {
        RUR.__current_world.goal.position = {"x": position[0], "y": position[1]};
        $("#cmd-result").html("Click on same position to remove, or robot to set orientation");
        $("#edit-world-turn").show();
    }
};

RUR.__set_goal_orientation = function(orientation){
    "use strict";
    RUR.__ensure_key_exist(RUR.__current_world, "goal");
    if (RUR.__current_world.goal.position === undefined) {
        return;
    }
    if (RUR.__current_world.goal.orientation !== undefined &&
        RUR.__current_world.goal.orientation === orientation) {
        delete RUR.__current_world.goal.orientation;  // toggle
    } else {
        RUR.__current_world.goal.orientation = orientation;
    }
};

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
/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.__create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.prev_x = robot.x;
    robot.prev_y = robot.y;
    robot.tokens = tokens || 0;
    robot._is_leaky = true;
    // the following can only be found in the world
    robot.triangles = 0;
    robot.squares = 0;
    robot.stars = 0;
    robot.__id = -1;  // id of -1 means inactive robot which could be removed.

    if (orientation === undefined){
        robot.orientation = RUR.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case RUR.translation.east:
            robot.orientation = RUR.EAST;
            break;
        case "n":
        case RUR.translation.north:
            robot.orientation = RUR.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            robot.orientation = RUR.WEST;
            break;
        case "s":
        case RUR.translation.south:
            robot.orientation = RUR.SOUTH;
            break;
        default:
            throw new RUR.Error(RUR.translation["Unknown orientation for robot."]);
        }
    }
    robot.prev_orientation = robot.orientation;
    return robot;
};

RUR.__clone_robot = function (robot) {
    return JSON.parse(JSON.stringify(robot));
};

RUR.__destroy_robot = function (robot) {
    robot.__id = -1;
};



/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */


RUR.__storage_save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        $("#Reeborg-shouts").html("Name already exist; will not save.").dialog("open");
        return;
    }
    localStorage.setItem("user_world:"+ name, RUR.__export_world(RUR.__current_world));
    $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                              ).val("user_world:" + name).html(name));
    $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
    $("#select_world").change();
};

RUR.__storage_delete_world = function (name){
    "use strict";
    var i, key;
    if (localStorage.getItem("user_world:" + name) === null){
        $("#Reeborg-shouts").html("No such world!").dialog("open");
        return;
    }
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();
    try {
        RUR.select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.select_world("Alone");
    }
    $("#select_world").change();
    
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, editorUpdateHints, libraryUpdateHints, JSHINT, think, _import_library */

RUR.Controls = function (programming_language) {
    "use strict";
    RUR.programming_language = programming_language;
    var src;
    this.end_flag = true;
    this.compile_and_run = function (func) {
        var lib_src, src, fatal_error_found = false;
        if (!RUR.visible_world.compiled) {
            src = _import_library();
        }
        if (!RUR.visible_world.compiled) {
            try {
                if (RUR.programming_language === "javascript") {
                    if (src.slice(1, 10) === "no strict") {
                        RUR.compile_no_strict_js(src);
                    } else {
                        RUR.compile_javascript(src);
                    }
                    RUR.visible_world.compiled = true;
                } else if (RUR.programming_language === "python") {
                    RUR.compile_python(src);
                    RUR.visible_world.compiled = true;
                } else {
                    alert("Unrecognized programming language.");
                    fatal_error_found = true;
                }
            } catch (e) {
                if (e.name === RUR.translation.ReeborgError){
                    RUR.world.add_frame("error", e);
                } else {
                    $("#Reeborg-shouts").html("<h3>" + e.name + "</h3><h4>" + e.message + "</h4>").dialog("open");
                    fatal_error_found = true;
                    this.stop();
                }
            }
        }
        if (!fatal_error_found) {
            try {
                localStorage.setItem(RUR.settings.editor, editor.getValue());
                localStorage.setItem(RUR.settings.library, library.getValue());
            } catch (e) {}
            func();
        }
    };

    this.set_ready_to_run = function () {
        $("#stop").attr("disabled", "true");
        $("#pause").attr("disabled", "true");
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reload").attr("disabled", "true");
  
        $("#stop2").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        $("#run2").removeAttr("disabled");
        $("#step2").removeAttr("disabled");
        $("#reload2").attr("disabled", "true");
    };

    this.run = function () {
        $("#stop").removeAttr("disabled");
        $("#pause").removeAttr("disabled");
        $("#run").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload").attr("disabled", "true");
      
        $("#stop2").removeAttr("disabled");
        $("#pause2").removeAttr("disabled");
        $("#run2").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload2").attr("disabled", "true");
        clearTimeout(RUR.timer);
        if (RUR.world.robot_world_active) {
            RUR.controls.compile_and_run(RUR.visible_world.play_frames);
        } else {
            RUR.controls.end_flag = false;
            RUR.controls.compile_and_run(function () {});
            RUR.controls.stop();
        }
    };

    this.pause = function (ms) {
        RUR.visible_world.running = false;
        clearTimeout(RUR.timer);
        $("#pause").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        if (ms !== undefined){
            RUR.timer = setTimeout(RUR.controls.run, ms);
        } else {
            $("#run").removeAttr("disabled");
            $("#step").removeAttr("disabled");
            $("#run2").removeAttr("disabled");
            $("#step2").removeAttr("disabled");
        }
    };

    this.step = function () {
        RUR.controls.compile_and_run(RUR.visible_world.play_single_frame);
    };

    this.stop = function () {
        clearTimeout(RUR.timer);
        $("#stop").attr("disabled", "true");
        $("#pause").attr("disabled", "true");
        $("#run").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload").removeAttr("disabled");
      
        $("#stop2").attr("disabled", "true");
        $("#pause2").attr("disabled", "true");
        $("#run2").attr("disabled", "true");
        $("#step2").attr("disabled", "true");
        $("#reload2").removeAttr("disabled");
    };

    this.reload = function() {
        RUR.visible_world.reset();
        if (RUR.editing_world){
            return;
        }
        this.set_ready_to_run();
        $("#output-pre").html("");
        $("#output-panel pre").remove(".jscode");
        RUR.world.reset();
        clearTimeout(RUR.timer);
        RUR.visible_world.compiled = false;
        RUR.visible_world.running = false;
        editorUpdateHints();
        libraryUpdateHints();
    };
};


function update_controls() {
    if ($("#world-panel").hasClass("active")){
        RUR.world.robot_world_active = true;
        $("#run2").css("visibility", "hidden");
        $("#reload2").css("visibility", "hidden");
    } else {
        $("#run2").css("visibility", "visible");
        $("#reload2").css("visibility", "visible");
        RUR.world.robot_world_active = false;
        RUR.world.reset();
    }
}

RUR.ajax_requests = {};

RUR.__select_world = function (s, silent) {
    var elt = document.getElementById("select_world");

    for (var i=0; i < elt.options.length; i++){
        if (elt.options[i].text === s) {
            if (elt.options[i].selected) {
                return;
            }
            /* A new world can be selected via a user program using the
              select_world() function. When this is done, and if the
              world is changed by this selection, an alert is first
              shown and the program is otherwise not run. Executing the
              program a second time will work as the correct world will
              be displayed.
            */
            elt.value = elt.options[i].value;
            $("#select_world").change();
            if (silent) {
                return;
            }
            alert(RUR.translation["World selected"].supplant({world: s}));
            return;
        }
    }
    if (silent) {
        return;
    }
    alert(RUR.translation["Could not find world"].supplant({world: s}));
};

RUR.__add_user_worlds_to_menu = function () {
    var key, name, i, user_world_present;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            $('#select_world').append( $('<option style="background-color:#ff9"></option>'
                              ).val("user_world:" + name).html(name));
            user_world_present = true;
        }
    }
    if (user_world_present){
        $('#delete-world').show();
    }
};


RUR.Controls.buttons = {execute_button: '<img src="src/images/play.png" class="blue-gradient" alt="run"/>',
    reload_button: '<img src="src/images/reload.png" class="blue-gradient" alt="reload"/>',
    step_button: '<img src="src/images/step.png" class="blue-gradient" alt="step"/>',
    pause_button: '<img src="src/images/pause.png" class="blue-gradient" alt="pause"/>',
    stop_button: '<img src="src/images/stop.png" class="blue-gradient" alt="stop"/>'};

function toggle_contents_button () {
    if ($("#contents-button").hasClass("reverse-blue-gradient")) {
        RUR.tutorial_window = window.open("index_en.html", '_blank', 'location=no,height=600,width=800,scrollbars=yes,status=yes');
    } else {
        try {
            RUR.tutorial_window.close();
        }
        catch (e) {}
    }
    return false;
}

function toggle_contents_button_from_child () {
    // called when child window is closed by user
    $("#contents-button").toggleClass("blue-gradient");
    $("#contents-button").toggleClass("reverse-blue-gradient");
}

/* Author: André Roberge
   License: MIT  */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

if (!Array.prototype.remove){
    // Array remove - By John Resig (MIT Licensed) from http://ejohn.org/blog/javascript-array-remove/
    Array.prototype.remove = function(from, to) {
        "use strict";
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}

/*
    Original script title: "Object.identical.js"; version 1.12
    Copyright (c) 2011, Chris O'Brien, prettycode.org
    http://github.com/prettycode/Object.identical.js
*/

Object.identical = function (a, b, sortArrays) {

    function sort(object) {
        if (sortArrays === true && Array.isArray(object)) {
            return object.sort();
        }
        else if (typeof object !== "object" || object === null) {
            return object;
        }

        return Object.keys(object).sort().map(function(key) {
            return {
                key: key,
                value: sort(object[key])
            };
        });
    }

    return JSON.stringify(sort(a)) === JSON.stringify(sort(b));
};

// adapted from http://javascript.crockford.com/remedial.html
String.prototype.supplant = function (o) {
    return this.replace(
        /\{([^{}]*)\}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};


RUR.Error = function (message) {
    this.name = RUR.translation.ReeborgError;
    this.message = message;
};

RUR.List = function(){
    this.container = [];
    this.length = function(){
        return this.container.length;
    };
    this.add_item = function(data) {
        this.container.push(data);
        if (this.length() >= RUR.world.max_steps) {
            throw new RUR.Error(RUR.translation["Too many steps:"].supplant({max_steps: RUR.world.max_steps}));
        }
    };
    this.shift = function() {
        return this.container.shift();
    };
};
/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.__visible_robot = {};
RUR.__visible_robot.images = [{}, {}];

// classic
RUR.__visible_robot.images[0].robot_e_img = new Image();
RUR.__visible_robot.images[0].robot_e_img.src = 'src/images/robot_e.png';
RUR.__visible_robot.images[0].robot_n_img = new Image();
RUR.__visible_robot.images[0].robot_n_img.src = 'src/images/robot_n.png';
RUR.__visible_robot.images[0].robot_w_img = new Image();
RUR.__visible_robot.images[0].robot_w_img.src = 'src/images/robot_w.png';
RUR.__visible_robot.images[0].robot_s_img = new Image();
RUR.__visible_robot.images[0].robot_s_img.src = 'src/images/robot_s.png';
RUR.__visible_robot.images[0].robot_x_offset = 10;
RUR.__visible_robot.images[0].robot_y_offset = 8;

// poorly drawn
RUR.__visible_robot.images[1].robot_e_img = new Image();
RUR.__visible_robot.images[1].robot_e_img.src = 'src/images/top_e.png';
RUR.__visible_robot.images[1].robot_n_img = new Image();
RUR.__visible_robot.images[1].robot_n_img.src = 'src/images/top_n.png';
RUR.__visible_robot.images[1].robot_w_img = new Image();
RUR.__visible_robot.images[1].robot_w_img.src = 'src/images/top_w.png';
RUR.__visible_robot.images[1].robot_s_img = new Image();
RUR.__visible_robot.images[1].robot_s_img.src = 'src/images/top_s.png';
RUR.__visible_robot.images[1].robot_x_offset = 10;
RUR.__visible_robot.images[1].robot_y_offset = 8;


RUR.__visible_robot.select_style = function (arg) {
    var style;
    if(arg === undefined) {
        style = 0;
    } else {
        style = arg;
    }
    RUR.__robot_e_img = RUR.__visible_robot.images[style].robot_e_img;
    RUR.__robot_n_img = RUR.__visible_robot.images[style].robot_n_img;
    RUR.__robot_w_img = RUR.__visible_robot.images[style].robot_w_img;
    RUR.__robot_s_img = RUR.__visible_robot.images[style].robot_s_img;
    RUR.__robot_x_offset = RUR.__visible_robot.images[style].robot_x_offset;
    RUR.__robot_y_offset = RUR.__visible_robot.images[style].robot_y_offset;
};

if (localStorage.getItem("top_view") === "true") {  // TODO fix this
    RUR.__visible_robot.select_style(1);
} else {
    RUR.__visible_robot.select_style(0);
}

// the following si to ensure that we won't attempt drawing until the default image is available
RUR.__robot_e_img.onload = function () {
    RUR.__visible_world.draw_all();
};

RUR.__visible_robot.draw = function (robot) {
    "use strict";
    var x, y;
    if (!robot) {
        return;
    }
    if (robot.__id && robot.__id === -1){
        return;
    }
    
    x = robot.x * RUR.__wall_length + RUR.__robot_x_offset;
    y = RUR.__height - (robot.y +1) * RUR.__wall_length + RUR.__robot_y_offset;
    switch(robot.orientation){
    case RUR.EAST:
        RUR.__robot_ctx.drawImage(RUR.__robot_e_img, x, y);
        break;
    case RUR.NORTH:
        RUR.__robot_ctx.drawImage(RUR.__robot_n_img, x, y);
        break;
    case RUR.WEST:
        RUR.__robot_ctx.drawImage(RUR.__robot_w_img, x, y);
        break;
    case RUR.SOUTH:
        RUR.__robot_ctx.drawImage(RUR.__robot_s_img, x, y);
        break;
    default:
        RUR.__robot_ctx.drawImage(RUR.__robot_e_img, x, y);
    }
//        this.draw_trace(robot);
};


/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, DEBUG */

RUR.__visible_world = {};

RUR.__visible_world.draw_coordinates = function(ctx) {
    "use strict";
    var x, y;
    if (RUR.__current_world.blank_canvas) {
        return;
    }
    
    ctx.fillStyle = RUR.__coordinates_color;
    y = RUR.__height - RUR.__wall_length/2;
    for(x=1; x <= RUR.__cols; x++){
        ctx.fillText(x, (x+0.5)*RUR.__wall_length, y);
    }
    x = RUR.__wall_length/2;
    for(y=1; y <= RUR.__rows; y++){
        ctx.fillText(y, x, RUR.__height - (y+0.3)*RUR.__wall_length);
    }

    ctx.fillStyle = RUR.__axis_label_color;
    ctx.fillText("x", RUR.__width/2, RUR.__height - 10);
    ctx.fillText("y", 5, RUR.__height/2 );
};


RUR.__visible_world.draw_background = function () {
    "use strict";
    var i, j, ctx = RUR.__background_ctx;

    ctx.clearRect(0, 0, RUR.__width, RUR.__height);
    if (RUR.__current_world.blank_canvas) {
        return;
    }

    // grid walls - need to be drawn first
    ctx.fillStyle = RUR.__shadow_wall_color;
    for (i = 1; i <= RUR.__cols; i++) {
        for (j = 1; j <= RUR.__rows; j++) {
            RUR.__visible_world.draw_north_wall(ctx, i, j);
            RUR.__visible_world.draw_east_wall(ctx, i, j);
        }
    }

    // border walls (x and y axis)
    ctx.fillStyle = RUR.__wall_color;
    for (j = 1; j <= RUR.__rows; j++) {
        RUR.__visible_world.draw_east_wall(ctx, 0, j);
    }
    for (i = 1; i <= RUR.__cols; i++) {
        RUR.__visible_world.draw_north_wall(ctx, i, 0);
    }
    RUR.__visible_world.draw_coordinates(ctx);
    
};

RUR.__visible_world.draw_foreground_walls = function (walls) {
    "use strict";
    var keys, key, i, j, k, ctx = RUR.__wall_ctx;
    
    ctx.clearRect(0, 0, RUR.__width, RUR.__height);
    
    if (RUR.__current_world.blank_canvas || 
        walls === undefined || walls == {}) {
        return;
    }

    ctx.fillStyle = RUR.__wall_color;
    keys = Object.keys(walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( walls[keys[key]].indexOf("north") !== -1) {
            RUR.__visible_world.draw_north_wall(ctx, i, j);
        }
        if (walls[keys[key]].indexOf("east") !== -1) {
            RUR.__visible_world.draw_east_wall(ctx, i, j);
        }
    }
};

RUR.__visible_world.draw_north_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.__goal_wall_color;
        ctx.beginPath();
        ctx.rect(i*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length,
                      RUR.__wall_length + RUR.__wall_thickness, RUR.__wall_thickness);
        ctx.stroke();
        return;
    }
    ctx.fillRect(i*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length,
                      RUR.__wall_length + RUR.__wall_thickness, RUR.__wall_thickness);
};

RUR.__visible_world.draw_east_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.__goal_wall_color;
        ctx.beginPath();
        ctx.rect((i+1)*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length,
                      RUR.__wall_thickness, RUR.__wall_length + RUR.__wall_thickness);
        ctx.stroke();
        return;
    }
    ctx.fillRect((i+1)*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length,
                      RUR.__wall_thickness, RUR.__wall_length + RUR.__wall_thickness);
};

RUR.__visible_world.draw_robots = function (robots) {
    var robot, info = '';
    RUR.__robot_ctx.clearRect(0, 0, RUR.__width, RUR.__height);
    if (RUR.__current_world.blank_canvas) {
        return;
    }
    if (!robots) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        RUR.__visible_robot.draw(robots[robot]); // draws trace automatically
        if (DEBUG.ON) {
            info += RUR.translation.robot + robot + ": x=" + robots[robot].x +
                    ", y=" + robots[robot].y + RUR.translation[", tokens="] + robots[robot].tokens + ".  ";
        }
    }
    if (DEBUG.ON) {
        RUR.__robot_ctx.fillStyle = RUR.__debug_info_color;
        RUR.__robot_ctx.fillText(info, 5, 15);
    }
};

RUR.__visible_world.draw_tokens = function(tokens, goal) {
    "use strict";
    var i, j, k, t, toks;
    if (!tokens) {
        return;
    }
    toks = Object.keys(tokens);
    for (t=0; t < toks.length; t++){
        k = toks[t].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        RUR.__visible_world.draw_token(i, j, tokens[toks[t]], goal);
    }
};

RUR.__visible_world.draw_token = function (i, j, num, goal) {
    "use strict";
    var size = 12, scale = RUR.__wall_length, Y = RUR.__height;
    var ctx;
    if (goal) {
        ctx = RUR.__background_ctx;
    } else {
        ctx = RUR.__wall_ctx;
    }
    ctx.beginPath();
    ctx.arc((i+0.6)*scale, Y - (j+0.4)*scale, size, 0 , 2 * Math.PI, false);
    if (goal) {
        ctx.strokeStyle = RUR.__token_goal_color;
        ctx.fillStyle = RUR.__text_color;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillText(num, (i+0.2)*scale, Y - (j)*scale);
    } else {
        ctx.fillStyle = RUR.__token_color;
        ctx.strokeStyle = RUR.__text_color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.fillStyle = RUR.__text_color;
        ctx.fillText(num, (i+0.5)*scale, Y - (j+0.3)*scale);
    }
};

RUR.__visible_world.draw_goal = function () {
    "use strict";
    var goal, key, keys, i, j, k, ctx = RUR.__background_ctx;
    if (RUR.__current_world.goal === undefined) {
        return;
    }

    goal = RUR.__current_world.goal;
    if (goal.position !== undefined) {
        RUR.__visible_world.draw_coloured_tile(goal.position.x, goal.position.y, goal.orientation);
    }
    if (goal.shapes !== undefined){
        RUR.__visible_world.draw_shapes(goal.shapes, true);
    }
    if (goal.tokens !== undefined) {
        RUR.__visible_world.draw_tokens(goal.tokens, true);
    }
    if (goal.walls !== undefined){
        ctx.fillStyle = RUR.__wall_color;
        keys = Object.keys(goal.walls);
        for (key=0; key < keys.length; key++){
            k = keys[key].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            if ( goal.walls[keys[key]].indexOf("north") !== -1) {
                RUR.__visible_world.draw_north_wall(ctx, i, j, true);
            }
            if (goal.walls[keys[key]].indexOf("east") !== -1) {
                RUR.__visible_world.draw_east_wall(ctx, i, j, true);
            }
        }
    }
};


RUR.__visible_world.draw_coloured_tile = function (i, j, orientation) {
    var size = RUR.__wall_thickness, ctx = RUR.__background_ctx;
    ctx.fillStyle = RUR.__target_tile_color;
    ctx.fillRect(i*RUR.__wall_length + size, RUR.__height - (j+1)*RUR.__wall_length + size,
                      RUR.__wall_length - size, RUR.__wall_length - size);
    if (orientation === undefined) return;

    ctx.fillStyle = RUR.__orientation_tile_color;
    switch(orientation){
    case 0:
        ctx.fillRect((i+1)*RUR.__wall_length - size, RUR.__height - (j+0.5)*RUR.__wall_length,
                      size, size);
        break;
    case 1:
        ctx.fillRect((i+0.5)*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length + size,
                      size, size);
        break;
    case 2:
        ctx.fillRect((i)*RUR.__wall_length + size, RUR.__height - (j+0.5)*RUR.__wall_length,
                      size, size);
        break;
    case 3:
        ctx.fillRect((i+0.5)*RUR.__wall_length , RUR.__height - (j)*RUR.__wall_length - size,
                      size, size);
        break;
    }
};

RUR.__visible_world.draw_shapes = function(shapes, goal) {
    "use strict";
    var i, j, k, t, sh;
    if (shapes === undefined) {
        return;
    }
    sh = Object.keys(shapes);
    for (t=0; t < sh.length; t++){
        k = sh[t].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        RUR.__visible_world.draw_shape(i, j, shapes[sh[t]], goal);
    }
};

RUR.__visible_world.draw_shape = function (i, j, shape, goal) {
    "use strict";
    var ctx, size = 12, scale = RUR.__wall_length, Y = RUR.__height;
    if(goal !== undefined){
        ctx = RUR.__background_ctx;
        ctx.lineWidth = 3;
    } else {
        ctx = RUR.__wall_ctx;
    }
    ctx.strokeStyle = RUR.__shape_outline_color;
    if (shape === "square") {
        ctx.fillStyle = RUR.__square_color;
        if(goal !== undefined){
            ctx.beginPath();
            ctx.rect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
            ctx.stroke();
        } else {
            ctx.fillRect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
        }
    } else if (shape === "triangle") { // triangle
        ctx.fillStyle = RUR.__triangle_color;
        ctx.beginPath();
        ctx.moveTo((i+0.6)*scale - size, Y - (j+0.4)*scale + size);
        ctx.lineTo((i+0.6)*scale, Y - (j+0.4)*scale - size);
        ctx.lineTo((i+0.6)*scale + size, Y - (j+0.4)*scale + size);
        ctx.lineTo((i+0.6)*scale - size, Y - (j+0.4)*scale + size);
        if(goal !== undefined) {
            ctx.closePath();
            ctx.stroke();
        } else {
            ctx.fill();
        }
    } else {
        ctx.fillStyle = RUR.__star_color;
        RUR.__visible_world.draw_star(ctx, (i+0.6)*scale, Y-(j+0.4)*scale, 1.5*size, goal);
    }
};

RUR.__visible_world.draw_star = function (ctx, x, y, r, goal){
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
    if (goal !== undefined){
        ctx.lineWidth = 3;
        ctx.stroke();
    } else {
        ctx.fill();
    }
    ctx.restore();
    ctx.restore();
};

RUR.__visible_world.draw_all = function () {
    "use strict";
    RUR.__visible_world.draw_background();
    RUR.__visible_world.draw_goal();
    RUR.__visible_world.refresh();
};

RUR.__visible_world.refresh = function (world) {
    "use strict";
    RUR.__visible_world.draw_foreground_walls(RUR.__current_world.walls);
    RUR.__visible_world.draw_robots(RUR.__current_world.robots);
    RUR.__visible_world.draw_tokens(RUR.__current_world.tokens);
    RUR.__visible_world.draw_shapes(RUR.__current_world.shapes);
};/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.__create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.tokens = {};
    world.shapes = {};
    world.goal = {};
    return world;
};
RUR.__current_world = RUR.__create_empty_world();

RUR.__export_world = function () {
    return JSON.stringify(RUR.__current_world, null, '   ');
};

RUR.__import_world = function (json_string) {
    if (json_string === undefined){
        return {};
    }
    RUR.__current_world = JSON.parse(json_string) || RUR.__create_empty_world();
    RUR.__visible_world.draw_all();
    if (RUR.__editing_world) {
        RUR.__change_edit_robot_menu();
    }
};

RUR.__clone_world = function (world) {
    return JSON.parse(JSON.stringify(world));
};

RUR.__add_robot = function (robot) {
    robot.__id = RUR.__current_world.robots.length;
    RUR.__current_world.robots.push(robot);
};
