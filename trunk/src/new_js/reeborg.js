/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */

var RUR = {};
DEBUG = {};
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
RUR.__shadow_wall_color= "#f0f0f0";/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world*/

$(document).ready(function() {

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
        
        update_controls();

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
            RUR.edit_world.save_world(response.trim());
            $('#delete-world').show(); 
        }
    });
    
    $("#delete-world").on("click", function(evt) {
        var response = prompt("Enter world name to delete");
        if (response !== null) {
            RUR.edit_world.delete_world(response.trim());
            $('#delete-world').show(); 
        }
    });
  
    $("#robot_canvas").on("click", function (evt) {
        if (!RUR.editing_world) {
            return;
        }
        RUR.edit_world.edit_world();
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
          
        RUR.world.robot_world_active = true;
        if (val.substring(0,11) === "user_world:"){
            data = localStorage.getItem(val);
            RUR.__load_world(data);
        } else {
            $.get(val, function(data) {
                RUR.__load_world(data);
                // jquery is sometimes too intelligent; it can guess
                // if the imported object is a string ... or a json object
                // I need a string here;  so make sure to prevent it from identifying.
            }, "text");
        }
    });
    // ... and trigger it to load the initial world.
    //$("#select_world").change();

    
    $("#robot_canvas").click(function(event) {
        RUR.mouse_x = event.clientX;
        RUR.mouse_y = event.clientY;
        console.log(RUR.mouse_x);
    });    
    
    RUR.__current_world = RUR.__create_empty_world();
    var robot = RUR.__create_robot();
    RUR.__add_robot(RUR.__current_world, robot);
    // the following si to ensure that we won't attempt drawing until the default image is available
    RUR.__robot_e_img.onload = function () {
        RUR.__visible_world.draw_all(RUR.__current_world);
    };
    
    
    
    
});
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

if (localStorage.getItem("top_view") === "true") {
    RUR.__visible_robot.select_style(1);
} else {
    RUR.__visible_robot.select_style(0);
}

RUR.__visible_robot.draw = function (robot) {
    "use strict";
    var x, y;
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
/*globals RUR */

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
    var key, i, j, ctx = RUR.__wall_ctx;
    ctx.clearRect(0, 0, RUR.__width, RUR.__height);
    if (RUR.__current_world.blank_canvas) {
        return;
    }
    ctx.fillStyle = RUR.__wall_color;
    // TODO : make more efficient by not looping over all possible combinations
    // but identifying which walls need to be drawn the same way we do for tokens.
    for (i = 1; i <= RUR.__cols; i++) {
        for (j = 1; j <= RUR.__rows; j++) {
            key = i + "," + j;
            if ( key in walls ) {
                if ( walls[key].indexOf("north") !== -1) {
                    RUR.__visible_world.draw_north_wall(ctx, i, j);
                }
                if (walls[key].indexOf("east") !== -1) {
                    RUR.__visible_world.draw_east_wall(ctx, i, j);
                }
            }
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
    for (robot=0; robot < robots.length; robot++){
        RUR.__visible_robot.draw(robots[robot]); // draws trace automatically
        if (DEBUG.ON) {
            info += RUR.translation.robot + robot + ": x=" + robots[robot].x +
                    ", y=" + robots[robot].y + RUR.translation[", tokens="] + robots[robot].tokens + ".  ";
        }
    }
    if (DEBUG.ON) {
        RUR.__robot_ctx.font = "bold 12px sans-serif";
        RUR.__robot_ctx.fillStyle = "blue";
        RUR.__robot_ctx.fillText(info, 5, 15);
    }
}

RUR.__visible_world.draw_all = function (world) {
    "use strict";
    RUR.__visible_world.draw_background();
    RUR.__visible_world.draw_foreground_walls(world.walls);
    RUR.__visible_world.draw_robots(world.robots);
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
    } else {
        world.blank_canvas = false;
    }
    world.robots = [];
    world.walls = {};
    world.tokens = {};
    world.shapes = {};
    world.goal = {};
    return world;
};

RUR.__export_world = function (world) {
    return JSON.stringify(world, null, '   ');
};

RUR.__import_world = function (json_string) {
    if (json_string === undefined){
        return {};
    }
    return JSON.parse(json_string) || {};
};

RUR.__clone_world = function (world) {
    return JSON.parse(JSON.stringify(world));
};

RUR.__add_robot = function (world, robot) {
    world.robots.push(robot);
};
