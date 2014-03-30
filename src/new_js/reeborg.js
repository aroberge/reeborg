/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */

var DEBUG = false;
var RUR = {};

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
RUR.SHAPE_OUTLINE_COLOR = "black";
RUR.TARGET_TILE_COLOR = "#99ffcc";
RUR.ORIENTATION_TILE_COLOR = "black";

RUR.TOKEN_COLOR = "gold";
RUR.TEXT_COLOR = "black";
RUR.TOKEN_GOAL_COLOR = "#666";

RUR.DEBUG_INFO_COLOR = "blue";
/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world*/

$(document).ready(function() {
    
    RUR.ui.add_user_worlds_to_menu();
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
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}
          
//        RUR.world.robot_world_active = true;
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
    
});
/* Author: André Roberge
   License: MIT
   
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.rec = {
    nb_frames : undefined,
    current_frame : undefined,
    frames : undefined
};

RUR.rec.reset = function() {
    RUR.rec.nb_frames = 0;
    RUR.rec.current_frame = 0;
    RUR.rec.frames = [];
};
RUR.rec.reset();

RUR.rec.record_frame = function () {
    // clone current world and store the clone
    
};

RUR.rec.play_frame = function () {
    // set current world to frame being played.
};

RUR.rec.play = function () {
    // play all frames in succession
};
/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.robot = {};

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
            throw new RUR.Error(RUR.translation["Unknown orientation for robot."]);
        }
    }
    
    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot.orientation;
    robot._triangles = 0; // can only be found in the world
    robot._squares = 0;   // same
    robot._stars = 0;     // same
    robot.__id = -1;  // id of -1 means inactive robot which could be removed.
    return robot;
};

RUR.robot.clone_robot = function (robot) {
    return JSON.parse(JSON.stringify(robot));
};

RUR.robot.destroy_robot = function (robot) {
    robot.__id = -1;
};



/* Author: André Roberge
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
            alert(RUR.translation["World selected"].supplant({world: s}));
            return;
        }
    }
    if (silent) {
        return;
    }
    alert(RUR.translation["Could not find world"].supplant({world: s}));
};

RUR.ui.add_user_worlds_to_menu = function () {
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

RUR.vis_robot = {};
RUR.vis_robot.images = [{}, {}];

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

// poorly drawn
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


RUR.vis_robot.select_style = function (arg) {
    var style;
    if(arg === undefined) {
        style = 0;
    } else {
        style = arg;
    }
    RUR.vis_robot.e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[style].robot_s_img;
    RUR.vis_robot.x_offset = RUR.vis_robot.images[style].robot_x_offset;
    RUR.vis_robot.y_offset = RUR.vis_robot.images[style].robot_y_offset;
};

if (localStorage.getItem("top_view") === "true") {  // TODO fix this
    RUR.vis_robot.select_style(1);
} else {
    RUR.vis_robot.select_style(0);
}

// the following si to ensure that we won't attempt drawing until the default image is available
RUR.vis_robot.e_img.onload = function () {
    RUR.vis_world.draw_all();
};

RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y;
    if (!robot) {
        return;
    }
    if (robot.__id && robot.__id === -1){
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
//        this.draw_trace(robot);
};


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
        ctx.strokeStyle = RUR.SHAPE_OUTLINE_COLOR;
        ctx.fillStyle = RUR.TOKEN_COLOR;
        ctx.fill();
        ctx.stroke();
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
    if (json_string === undefined){
        return {};
    }
    RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
    RUR.vis_world.draw_all();
    if (RUR.we.editing_world) {
        RUR.we.change_edit_robot_menu();
    }
};

RUR.world.clone_world = function (world) {
    return JSON.parse(JSON.stringify(world));
};

RUR.world.add_robot = function (robot) {
    robot.__id = RUR.current_world.robots.length;
    RUR.current_world.robots.push(robot);
};
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.we = {};

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

//RUR.__delete_world = function (name){
//    "use strict";
//    var i, key;
//    if (localStorage.getItem("user_world:" + name) === null){
//        $("#Reeborg-shouts").html("No such world!").dialog("open");
//        return;
//    }
//    localStorage.removeItem("user_world:" + name);
//    $("select option[value='" + "user_world:" + name +"']").remove();
//    try {
//        RUR.ui.select_world(localStorage.getItem(RUR.settings.world), true);
//    } catch (e) {
//        RUR.ui.select_world("Alone");
//    }
//    $("#select_world").change();
//    
//    for (i = localStorage.length - 1; i >= 0; i--) {
//        console.log(i);
//        key = localStorage.key(i);
//        if (key.slice(0, 11) === "user_world:") {
//            console.log("returning");
//            return;
//        }
//    }
//    console.log("done");
//    $('#delete-world').hide();
//};

//
//RUR.__edit_world.update = function (message) {
//    "use strict";
//    RUR.world.import_(JSON.stringify(RUR.current_world));
//    RUR.world.reset();
//    RUR.__reset();
//    $("#cmd-result").html(message);
//};

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
