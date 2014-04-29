/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */

var DEBUG = false;

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

RUR.BACKGROUND_CANVAS = document.getElementById("background_canvas");
RUR.BACKGROUND_CTX = RUR.BACKGROUND_CANVAS.getContext("2d");
RUR.WALL_CTX = document.getElementById("wall_canvas").getContext("2d");
RUR.TRACE_CTX = document.getElementById("trace_canvas").getContext("2d");
RUR.ROBOT_CTX = document.getElementById("robot_canvas").getContext("2d");

RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";

RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height;
RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;

RUR.WALL_LENGTH = 40;
RUR.WALL_THICKNESS = 5;

RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 2;

RUR.WALL_COLOR = "brown";   // changed (toggled) in world_editor.js
RUR.SHADOW_WALL_COLOR= "#f0f0f0";    // changed (toggled) in world_editor.js
RUR.GOAL_WALL_COLOR = "black";
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.STAR_COLOR = "red";
RUR.TRIANGLE_COLOR = "green";
RUR.SQUARE_COLOR = "blue";
RUR.SHAPE_OUTLINE_COLOR = "grey";
RUR.TARGET_TILE_COLOR = "#99ffcc";
RUR.ORIENTATION_TILE_COLOR = "black";

RUR.TOKEN_COLOR = "gold";
RUR.TEXT_COLOR = "black";
RUR.TOKEN_GOAL_COLOR = "#666";

RUR.DEBUG_INFO_COLOR = "blue";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;
/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.control = {};

RUR.control.move = function (robot) {
    if (!RUR.control.front_is_clear(robot, true)) {
        throw new RUR.ReeborgError(RUR.translation["Ouch! I hit a wall!"]);
    }
    if ((robot.y === RUR.ROWS && robot.orientation === RUR.NORTH) ||
        (robot.x === RUR.COLS && robot.orientation === RUR.EAST)) {
        throw new RUR.ReeborgError(RUR.translation["I am afraid of the void!"]);
    }
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    switch (robot.orientation){
    case RUR.EAST:
        robot.x += 1;
        break;
    case RUR.NORTH:
        robot.y += 1;
        break;
    case RUR.WEST:
        robot.x -= 1;
        break;
    case RUR.SOUTH:
        robot.y -= 1;
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.control.move().");
    }
    RUR.control.sound_id = "#move-sound";
    RUR.rec.record_frame();
};

RUR.control.turn_left = function(robot, no_frame){
    "use strict";
    robot._prev_orientation = robot.orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot.orientation += 1;
    robot.orientation %= 4;
    if (no_frame) return;
    RUR.control.sound_id = "#turn-sound";
    RUR.rec.record_frame();
};

RUR.control.__turn_right = function(robot, no_frame){
    "use strict";
    robot._prev_orientation = (robot.orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot.orientation += 3;
    robot.orientation %= 4;
    if (no_frame) return;
    RUR.rec.record_frame();
};

RUR.control.pause = function (ms) {
    RUR.rec.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    throw new RUR.ReeborgError(RUR.translation["Done!"]);
};

RUR.control.token_here = function (robot) {
    // returns the number of tokens at the location where the robot is
    var coords = robot.x + "," + robot.y;
    if (RUR.current_world.tokens === undefined) return 0;
    if (RUR.current_world.tokens[coords] === undefined) return 0;
    return RUR.current_world.tokens[coords];
};

RUR.control.put = function(robot, arg){
    RUR.control.sound_id = "#put-sound";
    if (arg === undefined || arg === RUR.translation.token) {
        RUR.control._put_token(robot);
        return;
    } else if ([RUR.translation.triangle, RUR.translation.square, RUR.translation.star].indexOf(arg) === -1){
        throw new RUR.ReeborgError(RUR.translation["Unknown object"].supplant({shape: arg}));
    }
    if (robot[RUR.translation[arg]] === 0){
        throw new RUR.ReeborgError(RUR.translation["I don't have any shape to put down!"].supplant({shape:arg}));
    } else if (RUR.control.object_here(robot) !== 0) {
        throw new RUR.ReeborgError(RUR.translation["There is already something here."]);
    }
    robot[RUR.translation[arg]] -= 1;
    RUR.control._put_object(robot, RUR.translation[arg]);
};

RUR.control._put_object = function (robot, obj) {
    RUR.we.ensure_key_exist(RUR.current_world, "shapes");
    RUR.current_world.shapes[robot.x + "," + robot.y] = obj;
    RUR.rec.record_frame();
};

RUR.control._put_token = function (robot) {
    var token;
    if (robot.tokens === 0){
        throw new RUR.ReeborgError(RUR.translation["I don't have any token to put down!"]);
    }
    token = RUR.control.token_here(robot);
    RUR.we.ensure_key_exist(RUR.current_world, "tokens");
    RUR.current_world.tokens[robot.x + "," + robot.y] = token+1;
    if (typeof robot.tokens === typeof 42){  // robot could have "infinite" amount
        robot.tokens -= 1;
    }
    RUR.rec.record_frame();
};

RUR.control.has_token = function (robot) {
    if (robot.tokens !== 0) return true;
    return false;
};
RUR.control.take = function(robot, arg){
    RUR.control.sound_id = "#take-sound";
    if (arg === undefined || arg === RUR.translation.token) {
        RUR.control._take_token(robot);
        return;
    } else if ([RUR.translation.triangle, RUR.translation.square, RUR.translation.star].indexOf(arg) === -1){
        throw new RUR.ReeborgError(RUR.translation["Unknown object"].supplant({shape: arg}));
    }
    if (RUR.control.object_here(robot) !== RUR.translation[arg]) {
        throw new RUR.ReeborgError(RUR.translation["No shape found here"].supplant({shape: arg}));
    }
    robot[RUR.translation[arg]] += 1;
    RUR.control._take_object(robot, RUR.translation[arg]);
};

RUR.control._take_object = function (robot, obj) {
    delete RUR.current_world.shapes[robot.x + "," + robot.y];
    RUR.rec.record_frame();
};

RUR.control._take_token = function (robot) {
    var token = RUR.control.token_here(robot);
    if (token === 0){
        throw new RUR.ReeborgError(RUR.translation["No token found here!"]);
    }
    token --;
    if (token > 0) {
        RUR.current_world.tokens[robot.x + "," + robot.y] = token;
    } else {
        delete RUR.current_world.tokens[robot.x + "," + robot.y];
    }
    if (typeof robot.tokens === typeof 42){  // robot could have "infinite" amount
        robot.tokens += 1;
    }
    RUR.rec.record_frame();
};


RUR.control.is_wall_at = function (coords, orientation) {
    if (RUR.current_world.walls === undefined) {
        return false;
    }
    if (RUR.current_world.walls[coords] !== undefined){
        if (RUR.current_world.walls[coords].indexOf(orientation) !== -1) {
            return true;
        }
    }
    return false;
};

RUR.control.build_wall = function (robot){
    var coords, orientation, x, y, walls;
    if (!RUR.control.front_is_clear(robot)){
        throw new RUR.ReeborgError(RUR.translation["There is already a wall here!"]);
    }

    switch (robot.orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        orientation = "east";
        x = robot.x;
        y = robot.y;
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        orientation = "north";
        x = robot.x;
        y = robot.y;
        break;
    case RUR.WEST:
        orientation = "east";
        x = robot.x-1;
        y = robot.y;
        break;
    case RUR.SOUTH:
        orientation = "north";
        x = robot.x;
        y = robot.y-1;
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.build_wall().");
    }

    coords = x + "," + y;
    walls = RUR.current_world.walls;

    if (walls[coords] === undefined){
        walls[coords] = [orientation];
    } else {
        walls[coords].push(orientation);
    }
    RUR.control.sound_id = "#build-sound";
    RUR.rec.record_frame();
};

RUR.control.front_is_clear = function(robot, flag){
    var coords;
    if (!flag) {
        RUR.rec.record_frame();
    }
    switch (robot.orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        if (RUR.control.is_wall_at(coords, "east")) {
            return false;
        }
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        if (RUR.control.is_wall_at(coords, "north")) {
            return false;
        }
        break;
    case RUR.WEST:
        if (robot.x===1){
            return false;
        } else {
            coords = (robot.x-1) + "," + robot.y; // do math first before building strings
            if (RUR.control.is_wall_at(coords, "east")) {
                return false;
            }
        }
        break;
    case RUR.SOUTH:
        if (robot.y===1){
            return false;
        } else {
            coords = robot.x + "," + (robot.y-1);  // do math first before building strings
            if (RUR.control.is_wall_at(coords, "north")) {
                return false;
            }
        }
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.front_is_clear().");
    }
    return true;
};

RUR.control.right_is_clear = function(robot){
    var result;
    RUR.control.__turn_right(robot, true);
    result = RUR.control.front_is_clear(robot, true);
    RUR.control.turn_left(robot, true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    RUR.rec.record_frame();
    return robot.orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    RUR.rec.delay = delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.current_world.goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            RUR.rec.record_frame();
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translation["There is no position as a goal in this world!"]);
    }
    throw new RUR.ReeborgError(RUR.translation["There is no goal in this world!"]);
};

RUR.control.at_goal_orientation = function (robot) {
    var goal = RUR.current_world.goal;
    if (goal !== undefined){
        if (goal.orientation !== undefined) {
            RUR.rec.record_frame();
            return (robot.orientation === goal.orientation);
        }
        throw new RUR.ReeborgError(RUR.translation["There is no orientation as a goal in this world!"]);
    }
    throw new RUR.ReeborgError(RUR.translation["There is no goal in this world!"]);
};

RUR.control.object_here = function (robot) {
    var coords = robot.x + "," + robot.y;
    RUR.rec.record_frame();
    if (RUR.control.token_here(robot) !== 0) {
        return RUR.translation.token;
    }
    
    if (RUR.current_world.shapes === undefined) {
        return 0;
    }
    return RUR.translation[RUR.current_world.shapes[coords]] || 0;
};

RUR.control.write = function (s) {
    RUR.control.sound_id = "#write-sound";
    RUR.rec.record_frame("output", {"element": "#output-pre", "message": s.toString()});
};

RUR.control.sound_flag = false;
RUR.control.sound = function(on){
    if(!on){
        RUR.control.sound_flag = false;
        return;
    }
    RUR.control.sound_flag = true;
};

RUR.control.sound_id = undefined;
RUR.control.play_sound = function (sound_id) {
    var current_sound;
    current_sound = $(sound_id)[0];
    current_sound.load();
    current_sound.play();
};


/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world*/

$(document).ready(function() {
    
    RUR.ui.load_user_worlds();
    try {
        RUR.ui.select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.ui.select_world("Alone");
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
    
        if ($("#output-panel").hasClass("active")) {
            if ( $("#world-panel").hasClass("active")) {
                RUR.world.robot_world_active = true;
                RUR.reset_definitions();
                $("#run2").hide();
                $("#reload2").hide();
            } else {
                $("#run2").show();
                $("#reload2").show();
                RUR.world.robot_world_active = false;
                RUR.reset_definitions();
            }
        }

    });

    $(function() {
        $("#tabs").tabs({
            heightStyle: "auto",
            activate: function(event, ui){
                editor.refresh();
                library.refresh();
            }
        });
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
            RUR.storage.save_world(response.trim());
            $('#delete-world').show(); 
        }
    });
    
    $("#delete-world").on("click", function(evt) {
        var response = prompt("Enter world name to delete");
        if (response !== null) {
            RUR.storage.delete_world(response.trim());
        }
    });
  
    $("#classic-image").on("click", function(evt) {
        RUR.vis_robot.select_style(0);
    });
    
    $("#simple-topview").on("click", function(evt) {
        RUR.vis_robot.select_style(1);
    });
       
    $("#rover-type").on("click", function(evt) {
        RUR.vis_robot.select_style(2);
    });
    
    
    $("#robot_canvas").on("click", function (evt) {
        if (!RUR.we.editing_world) {
            return;
        }
        RUR.we.mouse_x = evt.clientX;
        RUR.we.mouse_y = evt.clientY;
        RUR.we.edit_world();
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
        RUR.settings.world_name = $(this).find(':selected').text();
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}
          
        RUR.world.robot_world_active = true;
        if (val.substring(0,11) === "user_world:"){
            data = localStorage.getItem(val);
            RUR.world.import_world(data);
        } else {
            $.get(val, function(data) {
                RUR.world.import_world(data);
                // jquery is sometimes too intelligent; it can guess
                // if the imported object is a string ... or a json object
                // I need a string here;  so make sure to prevent it from identifying.
            }, "text");
        }
    });
    // ... and trigger it to load the initial world.
    $("#select_world").change();
    
    try {  
        RUR.reset_code_in_editors();
    } catch (e){ console.log(e);alert("Your browser does not support localStorage; you will not be able to save your functions in the library.");
                }

    RUR.ui.set_ready_to_run();

});
/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.add_line_number = function (s) {
    var i, line, lines, result;
    
    if (s.slice(-1) !== "\n") {
        s += "\n";
    }
    lines = s.split("\n");
    
    result = "";
    for(i=1; i <= lines.length; i++){
        line = "RUR._line_number(" + i + ")\n" + lines[i-1] + "\n";
        result += line;
    }
    
    return result;
};/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, RUR, JSHINT, globals_ */


RUR.removeHints = function () {
    editor.operation (function () {
        for(var i = 0; i < editor.widgets.length; ++i){
            editor.removeLineWidget(editor.widgets[i]);
        }
        editor.widgets.length = 0;
    });
    library.operation (function () {
        for(var i = 0; i < library.widgets.length; ++i){
            library.removeLineWidget(library.widgets[i]);
        }
        library.widgets.length = 0;
    });
};


function editorUpdateHints() {
    updateHints(editor);
}

function libraryUpdateHints() {
    updateHints(library);
}
var jshint_options = {
    eqeqeq: true,
    boss: true,
    undef: true,
    curly: true,
    nonew: true,
    browser: true,
    devel: true,
    white: false,
    plusplus: false,
    jquery: true
};


function updateHints(obj) {
    if (RUR.programming_language != "javascript") {
        return;
    }
    var values, nb_lines;
    var import_lib_regex = /^\s*import_lib\s*\(\s*\);/m;
    obj.operation(function () {
        for(var i = 0; i < obj.widgets.length; ++i){
            obj.removeLineWidget(obj.widgets[i]);
        }
        obj.widgets.length = 0;

        if (obj === editor) {
            values = globals_ + editor.getValue().replace(import_lib_regex, library.getValue());
            nb_lines = library.lineCount() + 1;
            JSHINT(values, jshint_options);
        } else {
            JSHINT(globals_ + obj.getValue(), jshint_options);
            nb_lines = 2;
        }
        for(i = 0; i < JSHINT.errors.length; ++i) {
            var err = JSHINT.errors[i];
            if(!err) continue;
            var msg = document.createElement("div");
            var icon = msg.appendChild(document.createElement("span"));
            icon.innerHTML = "!?!";
            icon.className = "lint-error-icon";
            msg.appendChild(document.createTextNode(err.reason));
            msg.className = "lint-error";
            obj.widgets.push(obj.addLineWidget(err.line - nb_lines, msg, {
                coverGutter: false,
                noHScroll: true
            }));
        }
    });

    var info = obj.getScrollInfo();
    var after = obj.charCoords({line: obj.getCursor().line + 1, ch: 0}, "local").top;
    if(info.top + info.clientHeight < after) {
        obj.scrollTo(null, after - info.clientHeight + 3);
    }
}
/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR , editor, __BRYTHON__*/

RUR.rec = {};

RUR.rec.reset = function() {
    RUR.rec.nb_frames = 0;
    RUR.rec.current_frame = 0;
    RUR.rec.frames = [];
    RUR.rec._line_numbers = [];
    RUR.rec.playback = false;
    RUR.rec.delay = 300;  
    clearTimeout(RUR.rec.timer);
    RUR._previous_line = undefined;
};
RUR.rec.reset();

RUR.rec.record_frame = function (name, obj) {
    // clone current world and store the clone
    var frame = {};
    frame.world = RUR.world.clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }
    if (RUR.control.sound_id && RUR.control.sound_flag && RUR.rec.delay > RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.control.sound_id;
    }
//    if (RUR.programming_langage === "javascript") { 
//        RUR.rec._line_numbers [RUR.rec.nb_frames] = RUR._current_line; 
//    } else if (RUR.programming_language === "python") {
//        if (__BRYTHON__.line_info !== undefined) { 
//            RUR.rec._line_numbers [RUR.rec.nb_frames] = __BRYTHON__.line_info[0]-1;
//        } else{
//            RUR.rec._line_numbers [RUR.rec.nb_frames] = 0;
//        }
//    }
    
    RUR.rec.nb_frames++;   // will start at 1 -- see display_frame for reason
    RUR.rec.frames[RUR.rec.nb_frames] = frame;
    // TODO add check for too many steps.
    RUR.control.sound_id = undefined;
    if (RUR.rec.nb_frames == RUR.MAX_STEPS) {
        throw new RUR.ReeborgError(RUR.translation["Too many steps:"].supplant({max_steps: RUR.MAX_STEPS}));
    }
};

RUR.rec.play = function () {
    "use strict";
    if (RUR.rec.playback){            // RUR.visible_world.running
        RUR.rec.playback = false;
        return;
    }
    RUR.rec.playback = true;
    RUR.rec.loop();
};

RUR.rec.loop = function () {
    "use strict";
    var frame_info;
    if (!RUR.rec.playback){
        return;
    }
    frame_info = RUR.rec.display_frame();

    if (frame_info === "immediate") {
        clearTimeout(RUR.rec.timer);
        RUR.rec.loop();
        return;
    } else if (frame_info === "pause") {
        return;
    } else if (frame_info === "stopped") {
        RUR.ui.stop();
        return;
    }

    RUR.rec.timer = setTimeout(RUR.rec.loop, RUR.rec.delay);
};

RUR.rec.display_frame = function () {
    // set current world to frame being played.
    "use strict";
    var frame, goal_status;

    
    // track line number and highlight line to be executed
//    try {
//        
//        editor.removeLineClass(RUR._previous_line, 'background', 'editor-highlight');
//    }catch (e) {}
//    try { 
//        editor.addLineClass(RUR.rec._line_numbers [RUR.rec.current_frame], 'background', 'editor-highlight');
//        RUR._previous_line = RUR.rec._line_numbers [RUR.rec.current_frame];
//    } catch (e) {}
    
    
    if (RUR.rec.current_frame > RUR.rec.nb_frames) {
        return RUR.rec.conclude();
    }
    frame = RUR.rec.frames[RUR.rec.current_frame];
    RUR.rec.current_frame++;
    if(frame === undefined) {
        return;
    }
    
    if (frame.delay !== undefined) {
        RUR.visible_world.delay = frame.delay;   // FIXME
        return "immediate";
    } else if (frame.pause) {
        RUR.ui.pause(frame.pause.pause_time);
        return "pause";
    } else if (frame.error !== undefined) { 
        return RUR.rec.handle_error(frame);
    } else if (frame.output !== undefined) {
        $(frame.output.element).append(frame.output.message + "\n");
    }
    RUR.current_world = frame.world;
    if (frame.sound_id !== undefined){
        RUR.control.play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
//    try{ 
//        editor.removeLineClass(RUR._previous_line, 'background', 'editor-highlight');
//    } catch(e) {}
    var frame, goal_status;
    if (RUR.rec.nb_frames === 0) return "stopped";
    
    frame = RUR.rec.frames[RUR.rec.nb_frames]; // nb_frames could be zero ... but we might still want to check if goal reached.
    if (frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#success-sound");
            }
            $("#Reeborg-says").html(goal_status.message).dialog("open");
        } else {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#error-sound");
            }
            $("#Reeborg-shouts").html(goal_status.message).dialog("open");
        }
    } else {
        if (RUR.control.sound_flag) {
            RUR.control.play_sound("#success-sound");
        }
        $("#Reeborg-says").html("<p class='center'>" + RUR.translation["Last instruction completed!"] + "</p>").dialog("open");
    }
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    if (frame.error.message === RUR.translation["Done!"]){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#success-sound");
            }
            $("#Reeborg-says").html(RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"]).dialog("open");
        }
    } else {
        if (RUR.control.sound_flag) {
            RUR.control.play_sound("#error-sound");
        }
        $("#Reeborg-shouts").html(frame.error.message).dialog("open");
    }
    RUR.ui.stop();
    return "stopped";
};

RUR.rec.check_goal= function (frame) {
    var g, world, goal_status = {}, result;
    g = frame.world.goal;
    world = frame.world;
    goal_status.message = "<ul>";
    goal_status.success = true;
    if (g.position !== undefined){
        goal_status.position = {};
        if (g.position.x === world.robots[0].x){
            goal_status.message += RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"];
            goal_status.success = false;
        }
        if (g.position.y === world.robots[0].y){
            goal_status.message += RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"];
            goal_status.success = false;
        }
    }
    if (g.orientation !== undefined){
        if (g.orientation === world.robots[0].orientation){
            goal_status.message += RUR.translation["<li class='success'>Reeborg has the correct orientation.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>Reeborg has the wrong orientation.</li>"];
            goal_status.success = false;
        }
    }
    if (g.shapes !== undefined) {
        result = Object.identical(g.shapes, world.shapes, true);
        if (result){
            goal_status.message += RUR.translation["<li class='success'>All shapes are at the correct location.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>One or more shapes are not at the correct location.</li>"];
            goal_status.success = false;
        }
    }
    if (g.tokens !== undefined) {
        result = Object.identical(g.tokens, world.tokens, true);
        if (result){
            goal_status.message += RUR.translation["<li class='success'>All tokens are at the correct location.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>One or more tokens are not at the correct location.</li>"];
            goal_status.success = false;
        }
    }
    if (g.walls !== undefined) {
        result = true;
        loop:
        for(var w in g.walls){
            for(var i=0; i < g.walls[w].length; i++){
                if ( !(world.walls !== undefined &&
                       world.walls[w] !== undefined &&
                       world.walls[w].indexOf(g.walls[w][i]) !== -1)){
                    result = false;
                    break loop;
                }
            }
        }
        if (result){
            goal_status.message += RUR.translation["<li class='success'>All walls have been built correctly.</li>"];
        } else {
            goal_status.message += RUR.translation["<li class='failure'>One or more walls missing or built at wrong location.</li>"];
            goal_status.success = false;
        }
    }
    goal_status.message += "</u>";
    return goal_status;
};



/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.robot = {};
RUR.RobotFactory = {};

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.tokens = tokens || 0;

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
            throw new RUR.ReeborgError(RUR.translation["Unknown orientation for robot."]);
        }
    }
    
    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot.orientation;
    robot.triangle = 0; // can only be found in the world
    robot.square = 0;   // same
    robot.star = 0;     // same
    robot.__id = -1;
    return robot;
};



//function RobotFactory(x, y, o, t) {
//    UsedRobot.call(this, x, y, o, t);
//}
//RobotFactory.prototype = new UsedRobot();
//RobotFactory.constructor = RobotFactory;
//
//RobotFactory.prototype.right = function () {
//    RUR.control.__turn_right(this.robot);
//};
//var t = new RobotFactory(3, 3);
//t.move();
//t.right();
//t.move();
//t.move();

/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, editorUpdateHints, libraryUpdateHints, 
  translate_python, _import_library, CoffeeScript */

RUR.runner = {};

RUR.runner.interpreted = false;

RUR.runner.run = function (playback) {
    var src, fatal_error_found = false;
    if (!RUR.runner.interpreted) {
        src = RUR._import_library();                // defined in Reeborg_js_en, etc.
        fatal_error_found = RUR.runner.eval(src); // jshint ignore:line
        RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
    }
    if (!fatal_error_found) {
        try {
            localStorage.setItem(RUR.settings.editor, editor.getValue());
            localStorage.setItem(RUR.settings.library, library.getValue());
        } catch (e) {}
        // "playback" is afunction called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (playback() === "stopped") {
            RUR.ui.stop();
        } 
    }
};

RUR.runner.eval = function(src) {  // jshint ignore:line
    var error_name;
    try {
        if (RUR.programming_language === "javascript") {
            if (RUR.strict_javascript) {
                RUR.runner.eval_javascript(src);

            } else {
                RUR.runner.eval_no_strict_js(src);
            }

        } else if (RUR.programming_language === "python") {
            RUR.runner.eval_python(src);
        } else if (RUR.programming_language === "coffee") {
            RUR.runner.eval_coffee(src);
        } else {
            alert("Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        if (RUR.programming_language === "python") {
            console.log(e);
            error_name = e.__name__;
        } else {
            error_name = e.name;
        }
        if (error_name === RUR.translation.ReeborgError){
            RUR.rec.record_frame("error", e);
        } else {
            $("#Reeborg-shouts").html("<h3>" + error_name + "</h3><h4>" + e.message + "</h4>").dialog("open");
            RUR.ui.stop();
            return true;
        }
    }
    RUR.runner.interpreted = true;
    return false;
};

RUR.runner.eval_javascript = function (src) {
    // Note: by having "use strict;" here, it has the interesting effect of requiring user
    // programs to conform to "strict" usage, meaning that all variables have to be declared,
    // etc.
    "use strict";  // will propagate to user's code, enforcing good programming habits.
    // lint, then eval
    var i, line, lines, text = '';
    editorUpdateHints();
    if(editor.widgets.length === 0) {
        libraryUpdateHints();
        if(library.widgets.length !== 0) {
            $('#library-problem').show().fadeOut(4000);
        }
    }
    RUR.reset_definitions();

//    function set_line_no(n){
//        RUR._current_line = n;
//    }
//    
//    lines = src.split("\n");
//    for (i=0; i < lines.length; i++){
//        text += "set_line_no(" + i + ");";
//        text += lines[i];
//    }
//    src = text;
    eval(src); // jshint ignore:line
};

RUR.runner.eval_no_strict_js = function (src) {
    // bypass linting and does not "use strict"
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};

RUR.runner.eval_python = function (src) {
    // do not  "use strict" as we do not control the output produced by Brython
    RUR.reset_definitions();
    // translate_python is found in html file
    translate_python(src);
};


RUR.runner.eval_coffee = function (src) {
    var out;
    RUR.reset_definitions();
    eval(CoffeeScript.compile(src)); // jshint ignore:line
};/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.storage = {};

RUR.storage.save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        $("#Reeborg-shouts").html("Name already exist; will not save.").dialog("open");
        return;
    }
    localStorage.setItem("user_world:"+ name, RUR.world.export_world(RUR.current_world));
    $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                              ).val("user_world:" + name).html(name));
    $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
    $("#select_world").change();
};

RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    if (localStorage.getItem("user_world:" + name) === null){
        $("#Reeborg-shouts").html("No such world!").dialog("open");
        return;
    }
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();
    try {
        RUR.ui.select_world(localStorage.getItem(RUR.settings.world), true);
    } catch (e) {
        RUR.ui.select_world("Alone");
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

RUR.ui = {};

RUR.ui.set_ready_to_run = function () {
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

RUR.ui.run = function () {
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
    clearTimeout(RUR.rec.timer);
    if (RUR.world.robot_world_active) {
        RUR.runner.run(RUR.rec.play);
    } else {
//        RUR.controls.end_flag = false;
        RUR.runner.run(function () {});
        RUR.ui.stop();
    }
};

RUR.ui.pause = function (ms) {
    RUR.rec.playback = false;
    clearTimeout(RUR.rec.timer);
    $("#pause").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    if (ms !== undefined){      // pause called via a program instruction
        RUR.rec.timer = setTimeout(RUR.ui.run, ms);  // will reset RUR.rec.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#run2").removeAttr("disabled");
        $("#step2").removeAttr("disabled");
    }
};

RUR.ui.step = function () {
    RUR.runner.run(RUR.rec.display_frame);
};

RUR.ui.stop = function () {
    clearTimeout(RUR.rec.timer);
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

RUR.ui.reload = function() {
    RUR.world.reset();
    RUR.ui.set_ready_to_run();
    $("#output-pre").html("");
    $("#output-panel pre").remove(".jscode");
    $("#Reeborg-says").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    // reset the options in case the user has dragged the window.
    $("#Reeborg-says").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    RUR.world.reset();
    RUR.runner.interpreted = false;
    RUR.control.sound_flag = false;
    RUR.rec.reset();
    if (RUR.strict_javascript) {
        editorUpdateHints();
        libraryUpdateHints();
    }
    
};

RUR.ui.select_world = function (s, silent) {
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
            throw new RUR.ReeborgError(RUR.translation["World selected"].supplant({world: s}));
        }
    }
    if (silent) {
        return;
    }
    throw new RUR.ReeborgError(RUR.translation["Could not find world"].supplant({world: s}));
};

RUR.ui.load_user_worlds = function () {
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




RUR.ui.buttons = {execute_button: '<img src="src/images/play.png" class="blue-gradient" alt="run"/>',
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

//if (!Array.prototype.remove){
//    // Array remove - By John Resig (MIT Licensed) from http://ejohn.org/blog/javascript-array-remove/
//    Array.prototype.remove = function(from, to) {
//        "use strict";
//        var rest = this.slice((to || from) + 1 || this.length);
//        this.length = from < 0 ? this.length + from : from;
//        return this.push.apply(this, rest);
//    };
//}

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

// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};


RUR.ReeborgError = function (message) {
    this.name = RUR.translation.ReeborgError;
    this.message = message;
};

/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.vis_robot = {};
RUR.vis_robot.images = [{}, {}, {}];

// classic
RUR.vis_robot.images[0].robot_e_img = new Image();
RUR.vis_robot.images[0].robot_e_img.src = 'src/images/robot_e.png';
RUR.vis_robot.images[0].robot_n_img = new Image();
RUR.vis_robot.images[0].robot_n_img.src = 'src/images/robot_n.png';
RUR.vis_robot.images[0].robot_w_img = new Image();
RUR.vis_robot.images[0].robot_w_img.src = 'src/images/robot_w.png';
RUR.vis_robot.images[0].robot_s_img = new Image();
RUR.vis_robot.images[0].robot_s_img.src = 'src/images/robot_s.png';
RUR.vis_robot.images[0].robot_x_offset = 10;
RUR.vis_robot.images[0].robot_y_offset = 8;

// poorly drawn to view
RUR.vis_robot.images[1].robot_e_img = new Image();
RUR.vis_robot.images[1].robot_e_img.src = 'src/images/top_e.png';
RUR.vis_robot.images[1].robot_n_img = new Image();
RUR.vis_robot.images[1].robot_n_img.src = 'src/images/top_n.png';
RUR.vis_robot.images[1].robot_w_img = new Image();
RUR.vis_robot.images[1].robot_w_img.src = 'src/images/top_w.png';
RUR.vis_robot.images[1].robot_s_img = new Image();
RUR.vis_robot.images[1].robot_s_img.src = 'src/images/top_s.png';
RUR.vis_robot.images[1].robot_x_offset = 10;
RUR.vis_robot.images[1].robot_y_offset = 8;

// rover type
RUR.vis_robot.images[2].robot_e_img = new Image();
RUR.vis_robot.images[2].robot_e_img.src = 'src/images/rover_e.png';
RUR.vis_robot.images[2].robot_n_img = new Image();
RUR.vis_robot.images[2].robot_n_img.src = 'src/images/rover_n.png';
RUR.vis_robot.images[2].robot_w_img = new Image();
RUR.vis_robot.images[2].robot_w_img.src = 'src/images/rover_w.png';
RUR.vis_robot.images[2].robot_s_img = new Image();
RUR.vis_robot.images[2].robot_s_img.src = 'src/images/rover_s.png';
RUR.vis_robot.images[2].robot_x_offset = 10;
RUR.vis_robot.images[2].robot_y_offset = 8;

RUR.vis_robot.select_style = function (arg) {
    var style;
    style = parseInt(arg, 10);
    if (!(style === 0 || style === 1 || style === 2)) {
        style = 0;
    }
    RUR.vis_robot.e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[style].robot_s_img;
    RUR.vis_robot.x_offset = RUR.vis_robot.images[style].robot_x_offset;
    RUR.vis_robot.y_offset = RUR.vis_robot.images[style].robot_y_offset;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }

    localStorage.setItem("robot_style", arg);
};
RUR.vis_robot.select_style(localStorage.getItem("robot_style"));

// the following is to try to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.vis_robot.w_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.vis_robot.n_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.vis_robot.s_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};


RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y;
    if (!robot) {
        return;
    }
    
    x = robot.x * RUR.WALL_LENGTH + RUR.vis_robot.x_offset;
    y = RUR.HEIGHT - (robot.y +1) * RUR.WALL_LENGTH + RUR.vis_robot.y_offset;
    switch(robot.orientation){
    case RUR.EAST:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.e_img, x, y);
        break;
    case RUR.NORTH:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.n_img, x, y);
        break;
    case RUR.WEST:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.w_img, x, y);
        break;
    case RUR.SOUTH:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.s_img, x, y);
        break;
    default:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.e_img, x, y);
    }
    if (RUR.we.editing_world){
        return;
    }
    RUR.vis_robot.draw_trace(robot);
};


RUR.vis_robot.draw_trace = function (robot) {
    "use strict";
    if (robot === undefined || robot._is_leaky === false) {
        return;
    }
    var ctx = RUR.TRACE_CTX;
    ctx.strokeStyle = RUR.vis_robot.trace_color;
    ctx.lineWidth = RUR.vis_robot.trace_thickness;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(robot._prev_x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation][0],
                    RUR.HEIGHT - (robot._prev_y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation][1]);
    ctx.lineTo(robot.x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot.orientation][0],
                    RUR.HEIGHT - (robot.y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot.orientation][1]);
    ctx.stroke();
};

RUR.vis_robot.set_trace_style = function (choice){
    "use strict";
    if (choice === "thick") {
        RUR.vis_robot.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        RUR.vis_robot.trace_color = "seagreen";
        RUR.vis_robot.trace_thickness = 4;
    } else {
        RUR.vis_robot.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
        RUR.vis_robot.trace_color = "seagreen";
        RUR.vis_robot.trace_thickness = 1;
    }
};

RUR.vis_robot.set_trace_style(); 
/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, DEBUG */

RUR.vis_world = {};

RUR.vis_world.draw_coordinates = function(ctx) {
    "use strict";
    var x, y;
    if (RUR.current_world.blank_canvas) {
        return;
    }
    
    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT - RUR.WALL_LENGTH/2;
    for(x=1; x <= RUR.COLS; x++){
        ctx.fillText(x, (x+0.5)*RUR.WALL_LENGTH, y);
    }
    x = RUR.WALL_LENGTH/2;
    for(y=1; y <= RUR.ROWS; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*RUR.WALL_LENGTH);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
};


RUR.vis_world.draw_background = function () {
    "use strict";
    var i, j, ctx = RUR.BACKGROUND_CTX;

    ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.current_world.blank_canvas) {
        return;
    }

    // grid walls - need to be drawn first
    ctx.fillStyle = RUR.SHADOW_WALL_COLOR;
    for (i = 1; i <= RUR.COLS; i++) {
        for (j = 1; j <= RUR.ROWS; j++) {
            RUR.vis_world.draw_north_wall(ctx, i, j);
            RUR.vis_world.draw_east_wall(ctx, i, j);
        }
    }

    // border walls (x and y axis)
    ctx.fillStyle = RUR.WALL_COLOR;
    for (j = 1; j <= RUR.ROWS; j++) {
        RUR.vis_world.draw_east_wall(ctx, 0, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        RUR.vis_world.draw_north_wall(ctx, i, 0);
    }
    RUR.vis_world.draw_coordinates(ctx);
    
};

RUR.vis_world.draw_foreground_walls = function (walls) {
    "use strict";
    var keys, key, i, j, k, ctx = RUR.WALL_CTX;
    
    ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    
    if (RUR.current_world.blank_canvas || 
        walls === undefined || walls == {}) {
        return;
    }

    ctx.fillStyle = RUR.WALL_COLOR;
    keys = Object.keys(walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( walls[keys[key]].indexOf("north") !== -1) {
            RUR.vis_world.draw_north_wall(ctx, i, j);
        }
        if (walls[keys[key]].indexOf("east") !== -1) {
            RUR.vis_world.draw_east_wall(ctx, i, j);
        }
    }
};

RUR.vis_world.draw_north_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect(i*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_LENGTH + RUR.WALL_THICKNESS, RUR.WALL_THICKNESS);
        ctx.stroke();
        return;
    }
    ctx.fillRect(i*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_LENGTH + RUR.WALL_THICKNESS, RUR.WALL_THICKNESS);
};

RUR.vis_world.draw_east_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect((i+1)*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_THICKNESS, RUR.WALL_LENGTH + RUR.WALL_THICKNESS);
        ctx.stroke();
        return;
    }
    ctx.fillRect((i+1)*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_THICKNESS, RUR.WALL_LENGTH + RUR.WALL_THICKNESS);
};

RUR.vis_world.draw_robots = function (robots) {
    var robot, info = '';
    RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.current_world.blank_canvas) {
        return;
    }
    if (!robots) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        if (DEBUG) {
            info += RUR.translation.robot + robot + ": x=" + robots[robot].x +
                    ", y=" + robots[robot].y + RUR.translation[", tokens="] + robots[robot].tokens + ".  ";
        }
    }
    if (DEBUG) {
        RUR.ROBOT_CTX.fillStyle = RUR.DEBUG_INFO_COLOR;
        RUR.ROBOT_CTX.fillText(info, 5, 15);
    }
};

RUR.vis_world.draw_tokens = function(tokens, goal) {
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
        RUR.vis_world.draw_token(i, j, tokens[toks[t]], goal);
    }
};

RUR.vis_world.draw_token = function (i, j, num, goal) {
    "use strict";
    var size = 12, scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT;
    var ctx;
    if (goal) {
        ctx = RUR.BACKGROUND_CTX;
    } else {
        ctx = RUR.WALL_CTX;
    }
    ctx.beginPath();
    ctx.arc((i+0.6)*scale, Y - (j+0.4)*scale, size, 0 , 2 * Math.PI, false);
    if (goal) {
        ctx.strokeStyle = RUR.TOKEN_GOAL_COLOR;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = RUR.TEXT_COLOR;
        ctx.fillText(num, (i+0.2)*scale, Y - (j)*scale);
    } else {
        ctx.lineWidth = 1;
        ctx.fillStyle = RUR.TOKEN_COLOR;
        ctx.fill();
        ctx.fillStyle = RUR.TEXT_COLOR;
        ctx.fillText(num, (i+0.5)*scale, Y - (j+0.3)*scale);
    }
};

RUR.vis_world.draw_goal = function () {
    "use strict";
    var goal, key, keys, i, j, k, ctx = RUR.BACKGROUND_CTX;
    if (RUR.current_world.goal === undefined) {
        return;
    }

    goal = RUR.current_world.goal;
    if (goal.position !== undefined) {
        RUR.vis_world.draw_coloured_tile(goal.position.x, goal.position.y, goal.orientation);
    }
    if (goal.shapes !== undefined){
        RUR.vis_world.draw_shapes(goal.shapes, true);
    }
    if (goal.tokens !== undefined) {
        RUR.vis_world.draw_tokens(goal.tokens, true);
    }
    if (goal.walls !== undefined){
        ctx.fillStyle = RUR.WALL_COLOR;
        keys = Object.keys(goal.walls);
        for (key=0; key < keys.length; key++){
            k = keys[key].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            if ( goal.walls[keys[key]].indexOf("north") !== -1) {
                RUR.vis_world.draw_north_wall(ctx, i, j, true);
            }
            if (goal.walls[keys[key]].indexOf("east") !== -1) {
                RUR.vis_world.draw_east_wall(ctx, i, j, true);
            }
        }
    }
};


RUR.vis_world.draw_coloured_tile = function (i, j, orientation) {
    var size = RUR.WALL_THICKNESS, ctx = RUR.BACKGROUND_CTX;
    ctx.fillStyle = RUR.TARGET_TILE_COLOR;
    ctx.fillRect(i*RUR.WALL_LENGTH + size, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + size,
                      RUR.WALL_LENGTH - size, RUR.WALL_LENGTH - size);
    if (orientation === undefined) return;

    ctx.fillStyle = RUR.ORIENTATION_TILE_COLOR;
    switch(orientation){
    case 0:
        ctx.fillRect((i+1)*RUR.WALL_LENGTH - size, RUR.HEIGHT - (j+0.5)*RUR.WALL_LENGTH,
                      size, size);
        break;
    case 1:
        ctx.fillRect((i+0.5)*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + size,
                      size, size);
        break;
    case 2:
        ctx.fillRect((i)*RUR.WALL_LENGTH + size, RUR.HEIGHT - (j+0.5)*RUR.WALL_LENGTH,
                      size, size);
        break;
    case 3:
        ctx.fillRect((i+0.5)*RUR.WALL_LENGTH , RUR.HEIGHT - (j)*RUR.WALL_LENGTH - size,
                      size, size);
        break;
    }
};

RUR.vis_world.draw_shapes = function(shapes, goal) {
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
        RUR.vis_world.draw_shape(i, j, shapes[sh[t]], goal);
    }
};

RUR.vis_world.draw_shape = function (i, j, shape, goal) {
    "use strict";
    var ctx, size = 12, scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT;
    if(goal !== undefined){
        ctx = RUR.BACKGROUND_CTX;
        ctx.lineWidth = 3;
    } else {
        ctx = RUR.WALL_CTX;
    }
    ctx.strokeStyle = RUR.SHAPE_OUTLINE_COLOR;
    if (shape === "square") {
        ctx.fillStyle = RUR.SQUARE_COLOR;
        if(goal !== undefined){
            ctx.beginPath();
            ctx.rect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
            ctx.stroke();
        } else {
            ctx.fillRect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
        }
    } else if (shape === "triangle") { // triangle
        ctx.fillStyle = RUR.TRIANGLE_COLOR;
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
        ctx.fillStyle = RUR.STAR_COLOR;
        RUR.vis_world.draw_star(ctx, (i+0.6)*scale, Y-(j+0.4)*scale, 1.5*size, goal);
    }
};

RUR.vis_world.draw_star = function (ctx, x, y, r, goal){
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

RUR.vis_world.draw_all = function () {
    "use strict";
    RUR.vis_world.draw_background();
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.draw_goal();
    RUR.vis_world.refresh();
};

RUR.vis_world.refresh = function (world) {
    "use strict";
    RUR.vis_world.draw_foreground_walls(RUR.current_world.walls);
    RUR.vis_world.draw_robots(RUR.current_world.robots);
    RUR.vis_world.draw_tokens(RUR.current_world.tokens);
    RUR.vis_world.draw_shapes(RUR.current_world.shapes);
};/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.world = {};

RUR.world.create_empty_world = function (blank_canvas) {
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
    return world;
};
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, '   ');
};

RUR.world.import_world = function (json_string) {
    var robot;
    if (json_string === undefined){
        return {};
    }
    RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            robot = RUR.current_world.robots[0];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            robot._prev_orientation = robot.orientation;
        }
    }
    RUR.world.saved_world = RUR.world.clone_world();
    RUR.vis_world.draw_all();
    if (RUR.we.editing_world) {
        RUR.we.change_edit_robot_menu();
    }
};

RUR.world.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.current_world));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};

RUR.world.reset = function () {
    RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
    RUR.MAX_STEPS = 1000;
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.refresh();
};

RUR.world.add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    robot.__id = RUR.current_world.robots.length;
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


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
        case "robot-teleport":
            $("#cmd-result").html(RUR.translation["Click on world to move robot."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "robot-remove":
            $("#cmd-result").html(RUR.translation["Removed robot."]).effect("highlight", {color: "gold"}, 1500);
            RUR.we.remove_robot();
            RUR.we.edit_world();
            RUR.we.change_edit_robot_menu();
            break;
        case "robot-add":
            $("#cmd-result").html(RUR.translation["Added robot."]).effect("highlight", {color: "gold"}, 1500);
            RUR.we.add_robot(RUR.robot.create_robot());
            RUR.we.edit_world();
            RUR.we.change_edit_robot_menu();
            break;
        case "robot-orientation":
            $("#cmd-result").html(RUR.translation["Click on image to turn robot"]).effect("highlight", {color: "gold"}, 1500);
            $("#edit-world-turn").show();
            break;
        case "robot-tokens":
            RUR.we.give_tokens_to_robot();
            RUR.we.edit_world();
            $("#cmd-result").html(RUR.translation["Robot now has tokens."].supplant({x_tokens: RUR.current_world.robots[0].tokens})).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-tokens":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on world to set number of tokens."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-objects":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on desired object below."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-star":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on world to toggle star."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-triangle":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on world to toggle triangle."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-square":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on world to toggle square."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-walls":
            $("#cmd-result").html(RUR.translation["Click on world to toggle walls."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-robot":
            $("#cmd-result").html(RUR.translation["Click on world to set home position for robot."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-wall":
            $("#cmd-result").html(RUR.translation["Click on world to toggle additional walls to build."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-objects":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on desired goal object below."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-tokens":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on world to set number of goal tokens."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-star":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on world to toggle star goal."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-triangle":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on world to toggle triangle goal."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-square":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translation["Click on world to toggle square goal."]).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-no-objects":
            $("#cmd-result").html(RUR.translation["Click on world at x=1, y=1 to have no object left as a goal."]).effect("highlight", {color: "gold"}, 1500);
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
    RUR.current_world.robots[0].x = position[0]; 
    RUR.current_world.robots[0].y = position[1];
    RUR.current_world.robots[0]._prev_x = position[0]; 
    RUR.current_world.robots[0]._prev_y = position[1];
};

RUR.we.give_tokens_to_robot = function () {
    var response = prompt(RUR.translation["Enter number of tokens for robot to carry (use inf for infinite number)"]);
    if (response !== null) {
        if (response === "inf"){
            RUR.current_world.robots[0].tokens = "infinite";
        } else if (parseInt(response, 10) >= 0) {
            RUR.current_world.robots[0].tokens = parseInt(response, 10);
        } else {
            $("#Reeborg-shouts").html(response + RUR.translation[" is not a valid value!"]).dialog("open");
        }
    }
};

RUR.we.set_token_number = function () {
    var position, response, x, y, tokens;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    
    if (RUR.current_world.shapes !== undefined && RUR.current_world.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html(RUR.translation["Other object here; can't put tokens"]).effect("highlight", {color: "gold"}, 1500);
        $("#Reeborg-shouts").html(RUR.translation["Other object here; can't put tokens"]).dialog("open");
        return;
    }
    
    response = prompt(RUR.translation["Enter number of tokens for at that location."]);
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
            $("#Reeborg-shouts").html(response + RUR.translation[" is not a valid value!"]).dialog("open");
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
        $("#cmd-result").html(RUR.translation["Other object goal here; can't put tokens"]).effect("highlight", {color: "gold"}, 1500);
        $("#Reeborg-shouts").html(RUR.translation["Other object goal here; can't put tokens"]).dialog("open");
        return;
    }
    
    response = prompt(RUR.translation["Enter number of tokens for at that location."]);
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
            $("#Reeborg-shouts").html(response + RUR.translation[" is not a valid value!"]).dialog("open");
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

RUR.we.toggle_shape = function (shape){
    "use strict";
    var position, x, y;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    if (RUR.current_world.tokens !== undefined && RUR.current_world.tokens[x + "," + y] !== undefined){
        $("#cmd-result").html(RUR.translation["tokens here; can't put another object"]).effect("highlight", {color: "gold"}, 1500);
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
        $("#cmd-result").html(RUR.translation["tokens as a goal here; can't set another object as goal."]);
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
            $("#cmd-result").html(RUR.translation["Click on same position to remove, or robot to set orientation."]).effect("highlight", {color: "gold"}, 1500);
            $("#edit-world-turn").show();
        }
    } else {
        RUR.current_world.goal.position = {"x": position[0], "y": position[1]};
        $("#cmd-result").html(RUR.translation["Click on same position to remove, or robot to set orientation."]).effect("highlight", {color: "gold"}, 1500);
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


RUR.we.set_goal_no_objects = function(){
    "use strict";
    var position;
    position = RUR.we.calculate_grid_position();
    if (position[0] !== 1 || position[1] !== 1) {
        $("#cmd-result").html(RUR.translation["No effect."]).effect("highlight", {color: "gold"}, 1500);
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.current_world.goal.tokens = {};
    RUR.current_world.goal.shapes = {};
    $("#cmd-result").html(RUR.translation["Goal: no object left in world."]).effect("highlight", {color: "gold"}, 1500);
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

