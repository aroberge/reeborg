
// aa_utils.js : name starting with aa so that it is loaded first :-/

var RUR = RUR || {};  // jshint ignore:line

RUR._active_console = false;
RUR.ReeborgError = function (message) {
    if (RUR.programming_language == "python"){
        return ReeborgError(message);
    }
    this.name = "ReeborgError";
    this.message = message;
    this.reeborg_shouts = message;
};

RUR.WallCollisionError = function (message) {
    if (RUR.programming_language == "python"){
        return WallCollisionError(message);
    }
    this.name = "WallCollisionError";
    this.message = message;
    this.reeborg_shouts = message;
};

RUR.translate = function (s) {
    if (RUR.translation[s] !== undefined) {
        return RUR.translation[s];
    } else {
        console.log("Translation needed for");
        console.log("%c" + s, "color:blue;font-weight:bold;");
        console.log("called from ", arguments.callee.caller);
        return s;
    }
};

RUR.translate_to_english = function (s) {
    if (RUR.translation_to_english[s] !== undefined) {
        return RUR.translation_to_english[s];
    } else {
        console.log("Translation to English needed for");
        console.log("%c" + s, "color:green;font-weight:bold;");
        console.log("called from ", arguments.callee.caller);
        return s;
    }
};


RUR.reset_code_in_editors = function () {
    var library_default, library_content, editor_content, editor_default,
        default_instruction = RUR.translate("move"),
        library_default_en = "# 'from library import *' in Python Code is required to use\n# the code in this library. \n\n";

    if (RUR.programming_language == "javascript") {
        editor_default = default_instruction + "();";
    } else if (RUR.programming_language == "python") {
        library_default = RUR.translate(library_default_en);
        library_content = localStorage.getItem(RUR.settings.library);
        if (!library_content || library_content == library_default_en){
            library_content = library_default;
        }
        library.setValue(library_content);
        editor_default = default_instruction + "()";
    }
    editor_content = localStorage.getItem(RUR.settings.editor);
    if (!editor_content){
        editor_content = editor_default;
    }
    editor.setValue(editor_content);
};


RUR.reset_programming_language = function(choice){
    var human_language = document.documentElement.lang;
    RUR.removeHints();
    RUR.settings.current_language = choice;
    try {
        localStorage.setItem("last_programming_language_" + human_language, RUR.settings.current_language);
    } catch (e) {}
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#javascript-additional-menu p button").attr("disabled", "true");
    $("#library-tab").parent().hide();
    $("#highlight").hide();
    $("#py_console").hide();

    $("#pre-code-link").parent().hide();
    $("#post-code-link").parent().hide();
    $("#description-link").parent().hide();
    $("#onload-editor-link").parent().hide();
    $("#python_choices").hide();
    $("#javascript_choices").hide();
    $("#special-keyboard-button").show();

    switch(RUR.settings.current_language){
        case 'python-' + human_language :
            $("#python_choices").show();
            $("#python_choices").change();
            RUR.settings.editor = "editor_py_" + human_language;
            RUR.settings.library = "library_py_" + human_language;
            RUR.programming_language = "python";
            $("#editor-tab").html(RUR.translate("Python Code"));
            editor.setOption("mode", {name: "python", version: 3});
            pre_code_editor.setOption("mode", {name: "python", version: 3});
            post_code_editor.setOption("mode", {name: "python", version: 3});
            // show language specific
            $("#library-tab").parent().show();
            $("#python-additional-menu p button").removeAttr("disabled");
            if (RUR._active_console) {
                $("#py_console").show();
            }
            RUR.kbd.set_programming_language("python");
            break;
        case 'javascript-' + human_language :
            $("#javascript_choices").show();
            $("#javascript_choices").change();
            $("#editor-panel").addClass("active");
            RUR.settings.editor = "editor_js_" + human_language;
            RUR.programming_language = "javascript";
            $("#editor-tab").html(RUR.translate("Javascript Code"));
            editor.setOption("mode", "javascript");
            pre_code_editor.setOption("mode", "javascript");
            post_code_editor.setOption("mode", "javascript");
            // show language specific
            $("#javascript-additional-menu p button").removeAttr("disabled");
            RUR.kbd.set_programming_language("javascript");
            break;
    }
    $("#editor-tab").click();
    try {
        RUR.reset_code_in_editors();
    } catch (e) {}

    if (RUR.we.editing_world) {
        $("#pre-code-link").parent().show();
        $("#post-code-link").parent().show();
        $("#description-link").parent().show();
        $("#onload-editor-link").parent().show();        
    }
};


// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});


RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.output._write(result);
};

// Returns a random integer between min and max (both included)
RUR.randint = function (min, max, previous) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

RUR.filterInt = function (value) {
  if(/^\s*([0-9]+)\s*$/.test(value))
    return parseInt(value, 10);
  return undefined;
};

RUR.set_lineno_highlight = function(lineno, frame) {
    RUR.current_lineno = lineno;
    if (frame) {
        RUR.rec.record_frame();
        return true;
    }
};
/*  The purpose of this module is to act as an intermediary between end user
modules in various languages (e.g. reeborg_en.py or reeborg_fr.js) and
the other modules.  This way, in theory, (most) refactoring can take place in the
basic javascript code without affecting the end user code.

The one allowed exception is for human language specific functions
(say "verify") that are defined in Javascript and need to be made available
in other languages, such as Python; these functions should be defined in
reeborg_xx.js where xx is the human language two-letter code.

Convention: all function names follow the pattern RUR._xyz_
            Use four spaces for indentation
            Order function names alphabetically (in English)
 */

/*jshint devel:true, white:false, plusplus:false */


var RUR = RUR || {};

RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.current_world.robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.current_world.robots[0]);
};

RUR._clear_print_ = function() {
    RUR.output.clear_print();
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.current_world.robots[0], arg);
};

RUR._done_ = function () {
    RUR.control.done();
};

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.current_world.robots[0]);
};


RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.current_world.robots[0]);
};

RUR._inspect_ = function (obj) {
    RUR.inspect(obj);
};

RUR._in_the_bag_ = function() {
    return RUR.control.in_the_bag(RUR.current_world.robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.current_world.robots[0]);
};

RUR._no_highlight_ = function () {
    RUR.ui.user_no_highlight();
};

RUR._new_robot_images_ = function (images) {
    RUR.vis_robot.new_robot_images(images);
};

RUR._object_here_ = function (arg) {
    return RUR.control.object_here(RUR.current_world.robots[0], arg);
};

RUR._pause_ = function (ms) {
    RUR.control.pause(ms);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.current_world.robots[0], arg);
};

RUR._remove_robots = function () {
    RUR.world.remove_robots();
};

RUR._right_is_clear_ = function() {
    return RUR.control.right_is_clear(RUR.current_world.robots[0]);
};

RUR._set_max_nb_robots_ = function(n){
    RUR.control.set_max_nb_robots(n);
};

RUR._set_max_steps_ = function(n){
    RUR.MAX_STEPS = n;
};

RUR._set_trace_color_ = function(color){
    RUR.current_world.robots[0].trace_color = color;
};

RUR._set_trace_style_ = function(style){
    RUR.vis_robot.set_trace_style(style);
};

RUR._sound_ = function (bool) {
    RUR.control.sound(bool);
};

RUR._take_ = function(arg) {
    RUR.control.take(RUR.current_world.robots[0], arg);
};

RUR._think_ = function (ms) {
    RUR.control.think(ms);
};

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.current_world.robots[0]);
};

RUR._view_source_js_ = function (obj) {
    RUR.output.view_source(obj);
};

RUR._wall_in_front_ = function() {
    return RUR.control.wall_in_front(RUR.current_world.robots[0]);
};


RUR._wall_on_right_ = function() {
    return RUR.control.wall_on_right(RUR.current_world.robots[0]);
};

RUR._recording_ = function(bool) {
    if (bool) {
        RUR.rec.do_not_record = false;
    } else {
        RUR.rec.do_not_record = true;
    }
};
/* 
   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
var RUR = RUR || {};

RUR.EAST = 0;
RUR.NORTH = 1;
RUR.WEST = 2;
RUR.SOUTH = 3;

// all images are of this size.
RUR.TILE_SIZE = 40;

// current default canvas size.
RUR.DEFAULT_HEIGHT = 550;
RUR.DEFAULT_WIDTH = 625;

RUR.BACKGROUND_CANVAS = document.getElementById("background_canvas");
RUR.HEIGHT = RUR.BACKGROUND_CANVAS.height;
RUR.WIDTH = RUR.BACKGROUND_CANVAS.width;

RUR.BACKGROUND_CTX = document.getElementById("background_canvas").getContext("2d");
RUR.SECOND_LAYER_CTX = document.getElementById("second_layer_canvas").getContext("2d");
RUR.GOAL_CTX = document.getElementById("goal_canvas").getContext("2d");
RUR.OBJECTS_CTX = document.getElementById("objects_canvas").getContext("2d");
RUR.TRACE_CTX = document.getElementById("trace_canvas").getContext("2d");
RUR.ROBOT_CTX = document.getElementById("robot_canvas").getContext("2d");

RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";

RUR.WALL_LENGTH = 40;   // These can be adjusted
RUR.WALL_THICKNESS = 4;  // elsewhere if RUR.current_world.small_tiles become true.

RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;
// the current default values of RUR.COLS and RUR.ROWS on the fixed-size
// canvas work out to be 14 and 12 respectively: these seem to be appropriate
// values for the lower entry screen resolution.  The following are meant
// to be essentially synonymous - but are also meant to be used only if/when
// specific values are not used in the "new" dialog that allows them to be specified
// worlds created.  Everywhere else, RUR.COLS and RUR.ROWS should be used.
RUR.MAX_X = 14;
RUR.MAX_Y = 12;
RUR.USE_SMALL_TILES = false;  // keep as unchanged default

RUR.WALL_COLOR = "brown";   // changed (toggled) in world_editor.js
RUR.SHADOW_WALL_COLOR= "#f0f0f0";    // changed (toggled) in world_editor.js
RUR.GOAL_WALL_COLOR = "black";
RUR.COORDINATES_COLOR = "black";
RUR.AXIS_LABEL_COLOR = "brown";

RUR.MAX_STEPS = 1000;
RUR.MIN_TIME_SOUND = 250;

RUR.DEFAULT_TRACE_COLOR = "seagreen";

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var tile, tiles, name, objects, tile_beyond, solid_tile_beyond,
        solids_beyond, solid_object_beyond,
        pushable_object_here, pushable_object_beyond,
        wall_beyond, x_beyond, y_beyond;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.WallCollisionError(RUR.translate("Ouch! I hit a wall!"));
    }

    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

    x_beyond = robot.x;  // if robot is moving vertically, it x coordinate does not change
    y_beyond = robot.y;

    switch (robot._orientation){
    case RUR.EAST:
        robot.x += 1;
        x_beyond = robot.x + 1;
        break;
    case RUR.NORTH:
        robot.y += 1;
        y_beyond = robot.y + 1;
        break;
    case RUR.WEST:
        robot.x -= 1;
        x_beyond = robot.x - 1;
        break;
    case RUR.SOUTH:
        robot.y -= 1;
        y_beyond = robot.y - 1;
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.control.move().");
    }

    pushable_object_here = RUR.control.pushable_object_here(robot.x, robot.y);

    if (pushable_object_here) {
        // we had assume that we have made a successful move as nothing was
        // blocking the robot which is now at its next position.
        // However, something may have prevented the pushable object from
        // actually being pushed
        wall_beyond = RUR.control.wall_in_front(robot);
        pushable_object_beyond = RUR.control.pushable_object_here(x_beyond, y_beyond);
        tile_beyond = RUR.control.get_tile_at_position(x_beyond, y_beyond);
        if (tile_beyond && tile_beyond.solid) {
            solid_tile_beyond = true;
            } else {
            solid_tile_beyond = false;
        }

        solids_beyond = RUR.control.get_solid_objects_at_position(x_beyond, y_beyond);
        solid_object_beyond = false;
        if (solids_beyond) {
            for (name in solids_beyond) {
                if (RUR.solid_objects[name] !== undefined && RUR.solid_objects[name].solid) {
                    solid_object_beyond = true;
                    break;
                }
            }
        }

        if (pushable_object_beyond || wall_beyond || solid_tile_beyond || solid_object_beyond) {
            robot.x = robot._prev_x;
            robot.y = robot._prev_y;
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR.control.move_object(pushable_object_here, robot.x, robot.y,
            x_beyond, y_beyond);
        }
    }

    RUR.control.sound_id = "#move-sound";
    RUR.rec.record_frame("debug", "RUR.control.move");

    tile = RUR.control.get_tile_at_position(robot.x, robot.y);
    if (tile) {
        if (tile.fatal){
            if (!(tile == RUR.tiles.water && RUR.control.solid_object_here(robot, RUR.translate("bridge"))) ){
                throw new RUR.ReeborgError(tile.message);
            }
        }
        if (tile.slippery){
            RUR.output.write(tile.message + "\n");
            RUR.control.move(robot);
        }
    }

    objects = RUR.control.get_solid_objects_at_position(robot.x, robot.y);
    if (objects) {
        for (name in objects) {
            if (RUR.solid_objects[name] !== undefined && RUR.solid_objects[name].fatal) {
                robot.x = robot._prev_x;
                robot.y = robot._prev_y;
                throw new RUR.ReeborgError(RUR.solid_objects[name].message);
            }
        }
    }
};

RUR.control.move_object = function(obj, x, y, to_x, to_y){
    "use strict";
    var bridge_already_there = false;
    if (RUR.control.get_solid_objects_at_position(to_x, to_y).bridge !== undefined){
        bridge_already_there = true;
    }


    RUR.we.add_object(obj, x, y, 0);
    if (RUR.objects[obj].in_water &&
        RUR.control.get_tile_at_position(to_x, to_y) == RUR.tiles.water &&
        !bridge_already_there){
        RUR.we.add_solid_object(RUR.objects[obj].in_water, to_x, to_y, 1);
    } else {
        RUR.we.add_object(obj, to_x, to_y, 1);
    }
};


RUR.control.turn_left = function(robot){
    "use strict";
    robot._prev_orientation = robot._orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 1;  // could have used "++" instead of "+= 1"
    robot._orientation %= 4;
    RUR.control.sound_id = "#turn-sound";
    RUR.rec.record_frame("debug", "RUR.control.turn_left");
};

RUR.control.__turn_right = function(robot){
    "use strict";
    robot._prev_orientation = (robot._orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 3;
    robot._orientation %= 4;
    RUR.rec.record_frame("debug", "RUR.control.__turn_right");
};

RUR.control.pause = function (ms) {
    RUR.rec.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    throw new RUR.ReeborgError(RUR.translate("Done!"));
};

RUR.control.put = function(robot, arg){
    var translated_arg, objects_carried, obj_type, all_objects;
    RUR.control.sound_id = "#put-sound";

    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.objects.known_objects.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_carried = robot.objects;
    all_objects = [];
    for (obj_type in objects_carried) {
        if (objects_carried.hasOwnProperty(obj_type)) {
            all_objects.push(obj_type);
        }
    }
    if (all_objects.length === 0){
        throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
    }
    if (arg !== undefined) {
        if (robot.objects[translated_arg] === undefined) {
            throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }  else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }  else {
        if (objects_carried.length === 0){
            throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
        } else if (all_objects.length > 1){
             throw new RUR.ReeborgError(RUR.translate("I carry too many different objects. I don't know which one to put down!"));
        } else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }
};

RUR.control._robot_put_down_object = function (robot, obj) {
    "use strict";
    var objects_carried, coords, obj_type;
    if (obj === undefined){
        objects_carried = robot.objects;
        for (obj_type in objects_carried) {
            if (objects_carried.hasOwnProperty(obj_type)) {
                obj = obj_type;
            }
        }
    }
    if (robot.objects[obj] != "infinite") {
        robot.objects[obj] -= 1;
        if (robot.objects[obj] === 0) {
            delete robot.objects[obj];
        }
    }

    RUR.we.ensure_key_exist(RUR.current_world, "objects");
    coords = robot.x + "," + robot.y;
    RUR.we.ensure_key_exist(RUR.current_world.objects, coords);
    if (RUR.current_world.objects[coords][obj] === undefined) {
        RUR.current_world.objects[coords][obj] = 1;
    } else {
        RUR.current_world.objects[coords][obj] += 1;
    }
    RUR.rec.record_frame("debug", "RUR.control._put_object");
};


RUR.control.take = function(robot, arg){
    var translated_arg, objects_here;
    RUR.control.sound_id = "#take-sound";
    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.objects.known_objects.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_here = RUR.control.object_here(robot, arg);
    if (arg !== undefined) {
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (objects_here.length === 0 || objects_here == false) { // jshint ignore:line
            throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else {
            RUR.control._take_object_and_give_to_robot(robot, arg);
        }
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
    }  else if (objects_here.length === 0 || objects_here == false){ // jshint ignore:line
        throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.ReeborgError(RUR.translate("Many objects are here; I do not know which one to take!"));
    } else {
        RUR.control._take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

RUR.control._take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    obj = RUR.translate_to_english(obj);
    coords = robot.x + "," + robot.y;
    RUR.current_world.objects[coords][obj] -= 1;

    if (RUR.current_world.objects[coords][obj] === 0){
        delete RUR.current_world.objects[coords][obj];
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (RUR.control.object_here(robot) == false){ // jshint ignore:line
            delete RUR.current_world.objects[coords];
        }
    }
    RUR.we.ensure_key_exist(robot, "objects");
    if (robot.objects[obj] === undefined){
        robot.objects[obj] = 1;
    } else if (robot.objects[obj] == "infinite") {
        return;
    } else {
        robot.objects[obj]++;
    }
    RUR.rec.record_frame("debug", "RUR.control._take_object");
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
    if (RUR.control.wall_in_front(robot)){
        throw new RUR.WallCollisionError(RUR.translate("There is already a wall here!"));
    }

    switch (robot._orientation){
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
    if (walls === undefined){
        walls = {};
        RUR.current_world.walls = walls;
    }

    if (walls[coords] === undefined){
        walls[coords] = [orientation];
    } else {
        walls[coords].push(orientation);
    }
    RUR.control.sound_id = "#build-sound";
    RUR.rec.record_frame("debug", "RUR.control.build_wall");
};


RUR.control.wall_in_front = function (robot) {
    var coords;
    switch (robot._orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        if (robot.x == RUR.COLS){
            return true;
        }
        if (RUR.control.is_wall_at(coords, "east")) {
            return true;
        }
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        if (robot.y == RUR.ROWS){
            return true;
        }
        if (RUR.control.is_wall_at(coords, "north")) {
            return true;
        }
        break;
    case RUR.WEST:
        if (robot.x===1){
            return true;
        } else {
            coords = (robot.x-1) + "," + robot.y; // do math first before building strings
            if (RUR.control.is_wall_at(coords, "east")) {
                return true;
            }
        }
        break;
    case RUR.SOUTH:
        if (robot.y===1){
            return true;
        } else {
            coords = robot.x + "," + (robot.y-1);  // do math first before building strings
            if (RUR.control.is_wall_at(coords, "north")) {
                return true;
            }
        }
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
    }
    return false;
};

RUR.control.wall_on_right = function (robot) {
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.wall_in_front(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};

RUR.control.tile_in_front = function (robot) {
    // returns single tile
    switch (robot._orientation){
    case RUR.EAST:
        return RUR.control.get_tile_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.control.get_tile_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.control.get_tile_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.control.get_tile_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.tile_in_front().");
    }
};


RUR.control.solid_objects_in_front = function (robot) {
    // returns list of tiles
    switch (robot._orientation){
    case RUR.EAST:
        return RUR.control.get_solid_objects_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.control.get_solid_objects_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.control.get_solid_objects_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.control.get_solid_objects_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.solid_objects_in_front().");
    }
};


RUR.control.front_is_clear = function(robot){
    var tile, tiles, solid, name;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    tile = RUR.control.tile_in_front(robot);
    if (tile) {
        if (tile.detectable && tile.fatal){
                if (tile == RUR.tiles.water) {
                    if (!RUR.control._bridge_present(robot)){
                        return false;
                    }
                } else {
                    return false;
                }
        }
    }

    solid = RUR.control.solid_objects_in_front(robot);
    if (solid) {
        for (name in solid) {
            if (RUR.solid_objects[name] !== undefined &&
                RUR.solid_objects[name].detectable &&
                RUR.solid_objects[name].fatal) {
                return false;
            }
        }
    }

    return true;
};


RUR.control._bridge_present = function(robot) {
    var solid, name;
        solid = RUR.control.solid_objects_in_front(robot);
    if (solid) {
        for (name in solid) {
            if (name == "bridge") {
                return true;
            }
        }
    }
    return false;
};


RUR.control.right_is_clear = function(robot){
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    return robot._orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    RUR.rec.delay = delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.current_world.goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};

RUR.control.object_here = function (robot, obj) {
    return RUR.control.__object_here(robot, obj, RUR.current_world.objects);
};

RUR.control.decorative_object_here = function (robot, obj) {
    return RUR.control.__object_here(robot, obj, RUR.current_world.decorative_objects);
};

RUR.control.__object_here = function (robot, obj, _objects) {

    var obj_here, obj_type, all_objects;
    var coords = robot.x + "," + robot.y;

    if (_objects === undefined ||
        _objects[coords] === undefined) {
        return [];
    }

    obj_here =  _objects[coords];
    all_objects = [];

    for (obj_type in obj_here) {
        if (obj_here.hasOwnProperty(obj_type)) {
            if (obj !== undefined && obj_type == RUR.translate_to_english(obj)) {
                return [RUR.translate(obj_type)];
            }
            all_objects.push(RUR.translate(obj_type));
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
};


RUR.control.solid_object_here = function (robot, tile) {
    var tile_here, tile_type, all_solid_objects;
    var coords = robot.x + "," + robot.y;

    if (RUR.current_world.solid_objects === undefined ||
        RUR.current_world.solid_objects[coords] === undefined) {
        return false;
    }

    tile_here =  RUR.current_world.solid_objects[coords];

    for (tile_type in tile_here) {
        if (tile_here.hasOwnProperty(tile_type)) {
            if (tile!== undefined && tile_type == RUR.translate_to_english(tile)) {
                return true;
            }
        }
    }
    return false;
};


RUR.control.carries_object = function (robot, obj) {
    var obj_carried, obj_type, all_objects;

    if (robot === undefined || robot.objects === undefined) {
        return [];
    }

    obj_carried =  robot.objects;
    all_objects = [];

    for (obj_type in obj_carried) {
        if (obj_carried.hasOwnProperty(obj_type)) {
            all_objects.push(RUR.translate(obj_type));
            if (RUR.translate(obj_type) == obj){
                return [obj_type];
            }
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
};

RUR.control.in_the_bag = function (robot) {
    var obj_carried, obj_type, all_objects;

    if (robot === undefined || robot.objects === undefined) {
        return {};
    }
    all_objects = {};

    for (obj_type in robot.objects) {
        if (robot.objects.hasOwnProperty(obj_type)) {
            all_objects[RUR.translate(obj_type)] = robot.objects[obj_type];
        }
    }
    return all_objects;
};


RUR.control.set_model = function(robot, model){
    robot.model = model;
    RUR.rec.record_frame();
 };

RUR.control.set_trace_color = function(robot, color){
    robot.trace_color = color;
 };

RUR.control.set_trace_style = function(robot, style){
    robot.trace_style = style;
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

RUR.control.get_colour_at_position = function (x, y) {
    if (RUR.control.get_tile_at_position(x, y)===false) {
        return null;
    } else if (RUR.control.get_tile_at_position(x, y)===undefined){
        return RUR.current_world.tiles[x + "," + y];
    } else {
        return null;
    }
};

RUR.control.set_tile_at_position = function (x, y, tile) {
    "use strict";
    // note: "tile" will most often be a colour.
    RUR.we.ensure_key_exist(RUR.current_world, "tiles");
    RUR.current_world.tiles[x + "," + y] = tile;
    RUR.rec.record_frame("debug", "set_tile_at_position");
};

RUR.control.get_tile_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.current_world.tiles === undefined) return false;
    if (RUR.current_world.tiles[coords] === undefined) return false;
    return RUR.tiles[RUR.current_world.tiles[coords]];
};

RUR.control.get_solid_objects_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.current_world.solid_objects === undefined) return false;
    if (RUR.current_world.solid_objects[coords] === undefined) return false;
    return RUR.current_world.solid_objects[coords];
};


RUR.control.pushable_object_here = function(x, y) {
    "use strict";
    var objects_here, obj_here, obj_type, coords = x + ',' + y;
    if (RUR.current_world.objects === undefined) return false;
    if (RUR.current_world.objects[coords] === undefined) return false;
    objects_here = RUR.current_world.objects[coords];

    for (obj_type in objects_here) {
        if (objects_here.hasOwnProperty(obj_type)) {
            if (RUR.objects[obj_type].pushable) {
                return obj_type;
            }
        }
    }
};

RUR.control.set_max_nb_robots = function(nb){
    if (RUR.MAX_NB_ROBOTS !== undefined){
        throw new RUR.ReeborgError(RUR.translate("Cheater! You are not allowed to change the number of robots this way!"));
    } else {
        RUR.MAX_NB_ROBOTS = nb;
    }
};

RUR.control.get_world_map = function () {
    return JSON.stringify(RUR.current_world, null, 2);
};
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $*/

RUR.cd = {};

RUR.cd.show_feedback = function (element, content) {
    $(element).html(content).dialog("open");
};


RUR.cd.create_custom_dialogs = function() {

    RUR.cd.dialog_add_object = $("#dialog-add-object").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.add_objects();
            },
            Cancel: function() {
                RUR.cd.dialog_add_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.add_objects_form[0].reset();
        }
    });
    RUR.cd.add_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_add_number_result = parseInt($("#input-add-number").val(), 10);
        RUR.cd.input_maximum_result = parseInt($("#maximum-number").val(), 10);
        if (RUR.cd.input_maximum_result > RUR.cd.input_add_number_result){
            query =  RUR.cd.input_add_number_result + "-" + RUR.cd.input_maximum_result;
        } else {
            query = RUR.cd.input_add_number_result;
        }
        RUR.we.add_object(RUR.we.specific_object, RUR.we.x, RUR.we.y, query);
        RUR.we.refresh_world_edited();
        RUR.cd.dialog_add_object.dialog("close");
        return true;
    };
    RUR.cd.add_objects_form = RUR.cd.dialog_add_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.add_objects();
    });

    RUR.cd.dialog_give_object = $("#dialog-give-object").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.give_objects();
            },
            Cancel: function() {
                RUR.cd.dialog_give_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.give_objects_form[0].reset();
        }
    });
    RUR.cd.give_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_give_number_result = parseInt($("#input-give-number").val(), 10);
        RUR.cd.unlimited_number_result = $("#unlimited-number").prop("checked");
        if (RUR.cd.unlimited_number_result){
            query =  "inf";
        } else {
            query = RUR.cd.input_give_number_result;
        }
        RUR.we.give_objects_to_robot(RUR.we.specific_object, query);
        RUR.we.refresh_world_edited();
        RUR.cd.dialog_give_object.dialog("close");
        return true;
    };
    RUR.cd.give_objects_form = RUR.cd.dialog_give_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.give_objects();
    });

    RUR.cd.dialog_goal_object = $("#dialog-goal-object").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.goal_objects();
            },
            Cancel: function() {
                RUR.cd.dialog_goal_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.goal_objects_form[0].reset();
        }
    });
    RUR.cd.goal_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_goal_number_result = parseInt($("#input-goal-number").val(), 10);
        RUR.cd.all_objects_result = $("#all-objects").prop("checked");
        if (RUR.cd.all_objects_result){
            query =  "all";
        } else {
            query = RUR.cd.input_goal_number_result;
        }
        RUR.we.add_goal_objects(RUR.we.specific_object, RUR.we.x, RUR.we.y, query);
        RUR.we.refresh_world_edited();
        RUR.cd.dialog_goal_object.dialog("close");
        return true;
    };
    RUR.cd.goal_objects_form = RUR.cd.dialog_goal_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.goal_objects();
    });


    RUR.cd.dialog_set_dimensions = $("#dialog-set-dimensions").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        //modal: true,
        buttons: {
            OK: function () {
                RUR.cd.set_dimensions();
            },
            Cancel: function() {
                RUR.cd.dialog_set_dimensions.dialog("close");
            }
        },
        close: function() {
            RUR.cd.set_dimensions_form[0].reset();
        }
    });
    RUR.cd.set_dimensions = function () {
        "use strict";
        var max_x, max_y;
        max_x = parseInt($("#input-max-x").val(), 10);
        max_y = parseInt($("#input-max-y").val(), 10);
        RUR.current_world.small_tiles = $("#use-small-tiles").prop("checked");

        RUR.we._trim_world(max_x, max_y, RUR.COLS, RUR.ROWS);   // remove extra objects
        RUR.vis_world.compute_world_geometry(max_x, max_y);
        RUR.cd.dialog_set_dimensions.dialog("close");
        return true;
    };
    RUR.cd.set_dimensions_form = RUR.cd.dialog_set_dimensions.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.set_dimensions();
    });

    RUR.cd.dialog_save_world = $("#dialog-save-world").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.save_world();
            },
            Cancel: function() {
                RUR.cd.dialog_save_world.dialog("close");
            }
        }
    });
    RUR.cd.save_dialog_form = RUR.cd.dialog_save_world.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.save_world();
    });
    RUR.cd.save_world = function () {
        RUR.storage._save_world($("#world-name").val().trim());
        RUR.world.saved_world = RUR.world.clone_world();
        RUR.cd.dialog_save_world.dialog("close");
        $('#delete-world').show();
    };

    RUR.cd.dialog_update_editors_from_world = $("#dialog-update-editors-from-world").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            Cancel: function() {
                RUR.cd.dialog_update_editors_from_world.dialog("close");
            }
        }
    });

    RUR.cd.dialog_set_background_image = $("#dialog-set-background-image").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.set_background_image();
            },
            Cancel: function() {
                RUR.cd.dialog_set_background_image.dialog("close");
            }
        }
    });
    RUR.cd.set_background_image_form = RUR.cd.dialog_set_background_image.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.set_background_image();
    });
    RUR.cd.set_background_image = function () {
        var url = $("#image-url").val();
        if (!url) {
            url = '';
        }
        RUR.current_world.background_image = url;
        RUR.background_image.src = url;
        RUR.background_image.onload = RUR.vis_world.draw_all;
        RUR.cd.dialog_set_background_image.dialog("close");
    };


    RUR.cd.dialog_select_colour = $("#dialog-select-colour").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            OK: function () {
                RUR.cd.select_colour();
            },
            Cancel: function() {
                RUR.cd.dialog_select_colour.dialog("close");
            }
        }
    });
    RUR.cd.select_colour_form = RUR.cd.dialog_select_colour.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.select_colour();
    });
    RUR.cd.select_colour = function () {
        var colour = $("#colour-selection").val();
        if (!colour) {
            colour = false;
        }
        RUR.cd.dialog_select_colour.dialog("close");
        RUR.we.call_back(colour);
        RUR.vis_world.draw_all();
    };
};

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.custom_menu = {};

RUR.custom_menu.make = function (contents) {
    "use strict";
    var i, url;

    RUR.world_select.empty_menu();

    for(i=0; i<contents.length; i++){
        RUR.world_select.append_world( {url:contents[i][0],
                                        shortname:contents[i][1]});
    }

    if (RUR.ui.user_worlds_loaded === undefined) {
        RUR.ui.load_user_worlds("initial");
        RUR.ui.user_worlds_loaded = true;
    }

    if (RUR.settings.initial_world) {  // loaded the very first time
        url = RUR.world_select.url_from_shortname(RUR.settings.initial_world);
        RUR.settings.initial_world = null;
        if (url !== undefined) {
            try {
                RUR.world_select.set_url(url);
            } catch (e) {
                RUR.world_select.set_default();
            }
        }
    } else {
        editor.setValue(RUR.translate("move") + "()");
        RUR.world_select.set_default();
    }
};


RUR.make_default_menu = function(language) {
    switch (language) {
        case 'en': RUR.make_default_menu_en();
                   break;
        case 'fr': RUR.make_default_menu_fr();
                   break;
        default: RUR.make_default_menu_en();
    }
};


RUR.make_default_menu_en = function () {
    "use strict";
    var contents,
        tutorial_en = '/src/worlds/tutorial_en/',
        menus = '/src/worlds/menus/',
        worlds = '/src/worlds/',
        docs = '/src/worlds/documentation/',
        permalinks = '/src/worlds/permalinks/';

    contents = [
        [worlds + 'alone.json', 'Alone'],
        [worlds + 'empty.json', 'Empty'],
        [tutorial_en + 'around1.json', 'Around 1'],
        [tutorial_en + 'around2.json', 'Around 2'],
        [tutorial_en + 'around3.json', 'Around 3'],
        [tutorial_en + 'around4.json', 'Around 4'],
        [tutorial_en + 'center1.json', 'Center 1'],
        [tutorial_en + 'center2.json', 'Center 2'],
        [tutorial_en + 'center3.json', 'Center 3'],
        [tutorial_en + 'harvest1.json', 'Harvest 1'],
        [tutorial_en + 'harvest2.json', 'Harvest 2'],
        [tutorial_en + 'harvest3.json', 'Harvest 3'],
        [tutorial_en + 'harvest4a.json', 'Harvest 4a'],
        [tutorial_en + 'harvest4b.json', 'Harvest 4b'],
        [tutorial_en + 'harvest4c.json', 'Harvest 4c'],
        [tutorial_en + 'harvest4d.json', 'Harvest 4d'],
        [tutorial_en + 'home1.json', 'Home 1'],
        [tutorial_en + 'home2.json', 'Home 2'],
        [tutorial_en + 'home3.json', 'Home 3'],
        [tutorial_en + 'hurdle1.json', 'Hurdle 1'],
        [tutorial_en + 'hurdle2.json', 'Hurdle 2'],
        [tutorial_en + 'hurdle3.json', 'Hurdle 3'],
        [tutorial_en + 'hurdle4.json', 'Hurdle 4'],
        [tutorial_en + 'maze1.json', 'Maze 1'],
        [tutorial_en + 'maze2.json', 'Maze 2'],
        [tutorial_en + 'newspaper0.json', 'Newspaper 0'],
        [tutorial_en + 'newspaper1.json', 'Newspaper 1'],
        [tutorial_en + 'newspaper2.json', 'Newspaper 2'],
        [tutorial_en + 'rain1.json', 'Rain 1'],
        [tutorial_en + 'rain2.json', 'Rain 2'],
        [tutorial_en + 'storm1.json', 'Storm 1'],
        [tutorial_en + 'storm2.json', 'Storm 2'],
        [tutorial_en + 'storm3.json', 'Storm 3'],
        [tutorial_en + 'tokens1.json', 'Tokens 1'],
        [tutorial_en + 'tokens2.json', 'Tokens 2'],
        [tutorial_en + 'tokens3.json', 'Tokens 3'],
        [tutorial_en + 'tokens4.json', 'Tokens 4'],
        [tutorial_en + 'tokens5.json', 'Tokens 5'],
        [tutorial_en + 'tokens6.json', 'Tokens 6'],
        [docs + 'simple_demo1', 'Demo 1 (solution)'],
        [docs + 'simple_demo2', 'Demo 2 (solution)'],
        [docs + 'simple_demo3', 'Demo 3 (solution)'],
        [worlds + 'simple_path.json', 'Simple path'],
        [worlds + 'gravel_path.json', 'Gravel path'],
        [worlds + 'gravel_path',
                           'Gravel path (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        [permalinks + 'pre_post_demo', 'Pre & Post code demo'],
        [permalinks + 'story', 'Story'],
        [permalinks + 'test_remove', 'Robot replacement'],
        [docs + 'big_maze.json', 'Big maze'],
        [worlds + 'maze_gen_py', 'Maze generation (Python)'],
        [worlds + 'maze_gen_js', 'Maze generation (Javascript)'],
        [worlds + 'blank.json', 'Blank canvas'],
        ];

    RUR.custom_menu.make(contents);
};

RUR.make_default_menu_fr = function () {
    "use strict";
    var base_url, base_url2, contents, menus, worlds;

    base_url = '/src/worlds/tutorial_en/';
    base_url2 = '/src/worlds/tutorial_fr/';

    menus = '/src/worlds/menus/';
    worlds = '/src/worlds/';


    contents = [
        ['/src/worlds/alone.json', 'Seul'],
        ['/src/worlds/empty.json', 'Vide'],
        [base_url2 + 'around1.json', 'Autour 1'],
        [base_url2 + 'around2.json', 'Autour 2'],
        [base_url2 + 'around3.json', 'Autour 3'],
        [base_url2 + 'around4.json', 'Autour 4'],
        [base_url + 'home1.json', 'But 1'],
        [base_url + 'home2.json', 'But 2'],
        [base_url + 'home3.json', 'But 3'],
        [base_url + 'center1.json', 'Centrer 1'],
        [base_url + 'center2.json', 'Centrer 2'],
        [base_url + 'center3.json', 'Centrer 3'],
        [base_url + 'hurdle1.json', 'Haies 1'],
        [base_url + 'hurdle2.json', 'Haies 2'],
        [base_url + 'hurdle3.json', 'Haies 3'],
        [base_url + 'hurdle4.json', 'Haies 4'],
        [base_url + 'tokens1.json', 'Jetons 1'],
        [base_url + 'tokens2.json', 'Jetons 2'],
        [base_url + 'tokens3.json', 'Jetons 3'],
        [base_url + 'tokens4.json', 'Jetons 4'],
        [base_url + 'tokens5.json', 'Jetons 5'],
        [base_url + 'tokens6.json', 'Jetons 6'],
        [base_url + 'newspaper0.json', 'Journal 0'],
        [base_url + 'newspaper1.json', 'Journal 1'],
        [base_url + 'newspaper2.json', 'Journal 2'],
        [base_url + 'maze1.json', 'Labyrinthe 1'],
        [base_url + 'maze2.json', 'Labyrinthe 2'],
        [base_url + 'rain1.json', 'Pluie 1'],
        [base_url + 'rain2.json', 'Pluie 2'],
        [base_url + 'harvest1.json', 'Récolte 1'],
        [base_url + 'harvest2.json', 'Récolte 2'],
        [base_url + 'harvest3.json', 'Récolte 3'],
        [base_url + 'harvest4a.json', 'Récolte 4a'],
        [base_url + 'harvest4b.json', 'Récolte 4b'],
        [base_url + 'harvest4c.json', 'Récolte 4c'],
        [base_url + 'harvest4d.json', 'Récolte 4d'],
        [base_url + 'storm1.json', 'Tempête 1'],
        [base_url + 'storm2.json', 'Tempête 2'],
        [base_url + 'storm3.json', 'Tempête 3'],
        // [menus + 'default_fr', 'Menu par défaut'],
        [worlds + 'menus/documentation_fr', 'Documentation (menu anglais)'],
        [worlds + 'simple_path_fr.json', 'Simple sentier'],
        [worlds + 'gravel_path.json', 'Sentier de gravier'],
        [worlds + 'gravel_path_fr',
                           'Sentier de gravier (solution)'],
        [worlds + 'slalom.json', 'Slalom'],
        ['/src/worlds/blank.json', 'Canevas graphique'],
    ];

    RUR.custom_menu.make(contents);
};

RUR.file_io = {};

RUR.file_io.load_world_from_program = function (url, shortname) {
    /*  Loads a world or permalink from a user's program using World()

    Possible choices:
        World(shortname)  where shortname is an existing name in html select
            example:  World ("Home 1")

            Another case is where a world in saved in local storage;
            in this case, the url must be modified by the user as in
            World("user_world:My World")

        World(url)  where url is a world or permalink located elsewhere
            example: World("http://personnel.usainteanne.ca/aroberge/reeborg/token.json")
            In this case, the url will be used as a shortname to appear in the menu

        World(url, shortname) where url is a world or permalink located elsewhere
            and shortname is the name to appear in the html select.

        If "url" already exists and is the selected world BUT shortname is
        different than the existing name, a call
        World(url, shortname)
        will result in the shortname being updated.
    */
    "use strict";
    var selected, possible_url, new_world=false, new_selection=false;
    RUR.file_io.status = undefined;

    if (url === undefined) {
        RUR.output.write(RUR.translate("World() needs an argument."));
        return;
    }

    if (shortname === undefined) {
        shortname = url;
        possible_url = RUR.world_select.url_from_shortname(shortname);
        if (possible_url !== undefined){
            url = possible_url;
        }
    }

    selected = RUR.world_select.get_selected();

    if (selected.shortname.toLowerCase() === shortname.toLowerCase()) {
        return "no world change";
    } else if (selected.url === url && shortname != selected.shortname) {
        RUR.world_select.replace_shortname(url, shortname);
        return;
    } else if (RUR.world_select.url_from_shortname(shortname)!==undefined){
        url = RUR.world_select.url_from_shortname(shortname);
        new_selection = shortname;
    }  else {
        new_world = shortname;
    }

    RUR.file_io.load_world_file(url, shortname);

    if (RUR.file_io.status !== undefined) {
        RUR.rec.frames = [];
        RUR.ui.stop();
        RUR.ui.prevent_playback = true;
    }
    if (RUR.file_io.status === "no link") {
        RUR.cd.show_feedback("#Reeborg-shouts",
                RUR.translate("Could not find link: ") + url);
        throw new RUR.ReeborgError("no link");
    } else if (RUR.file_io.status === "success") {
        if (new_world) {
            RUR.world_select.append_world({url:url, shortname:new_world});
        }
        RUR.world_select.set_url(url);
        RUR.cd.show_feedback("#Reeborg-shouts",
            RUR.translate("World selected").supplant({world: shortname}));
        throw new RUR.ReeborgError("success");
    }
};

RUR.file_io.last_url_loaded = undefined;
RUR.file_io.last_shortname_loaded = undefined;

RUR.file_io.load_world_file = function (url, shortname) {
    /** Loads a bare world file (json) or more complex permalink */
    "use strict";
    var data;

    if (RUR.file_io.last_url_loaded == url &&
        RUR.file_io.last_shortname_loaded == shortname) {
            return;
    } else {
        RUR.file_io.last_url_loaded = url;
        RUR.file_io.last_shortname_loaded = shortname;
    }

    if (url.substring(0,11) === "user_world:"){
        data = localStorage.getItem(url);
        if (data === null) {
            RUR.file_io.status = "no link";
            return;
        }
        RUR.world.import_world(data);
        RUR.file_io.status = "success";
        RUR.rec.frames = [];
    } else {
        $.ajax({url: url,
            async: false,
            error: function(e){
                RUR.file_io.status = "no link";
            },
            success: function(data){
                if (typeof data == "string" && data.substring(0,4) == "http"){
                    RUR.permalink.update(data, shortname);
                    RUR.ui.reload();
                } else {
                    RUR.world.import_world(data);
                }
                RUR.file_io.status = "success";
            }
        });
    }
};

RUR.objects = {};
RUR.tiles = {};
RUR.solid_objects = {};
RUR.home_images = {};
RUR.objects.known_objects = [];
RUR.tiles.known_tiles = [];

// allow for the possibility of a background image
RUR.background_image = new Image();
RUR.background_image.src = '';

// we will keep track if we have loaded all images
RUR.objects.loaded_images = 0;
RUR.objects.nb_images = 0;

RUR.base_url = RUR.base_url || '';  // enable changing defaults for unit tests

RUR.increment_loaded = function () {
    RUR.objects.loaded_images += 1;
};

RUR.add_object_image = function (name, url, url_goal) {
    var obj = RUR.objects;
    obj[name] = {};
    obj[name].image = new Image();
    obj[name].image_goal = new Image();
    if (url === undefined) {
        obj[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
        obj[name].image_goal.src = RUR.base_url + '/src/images/' + name + '_goal.png';

    } else {
        obj[name].image.src = url;
        obj[name].image_goal.src = url_goal;
    }
    obj[name].image.onload = RUR.increment_loaded;
    obj[name].image_goal.onload = RUR.increment_loaded;
    obj.nb_images += 2;
    obj.known_objects.push(name);
};

RUR.add_object_image("token");
RUR.add_object_image("star");
RUR.add_object_image("triangle");
RUR.add_object_image("square");
RUR.add_object_image("strawberry");
RUR.add_object_image("banana");
RUR.add_object_image("apple");
RUR.add_object_image("leaf");
RUR.add_object_image("carrot");
RUR.add_object_image("dandelion");
RUR.add_object_image("orange");
RUR.add_object_image("daisy");
RUR.add_object_image("tulip");

RUR.add_object_image("box");
RUR.objects.box.name = "box";
RUR.objects.box.pushable = true;
RUR.objects.box.in_water = "bridge";
RUR.objects.box.ctx = RUR.ROBOT_CTX;


RUR.add_tile_image = function (name, url) {
    var tiles = RUR.tiles;
    tiles[name] = {};
    tiles[name].name = name;
    tiles[name].image = new Image();
    if (url===undefined) {
        tiles[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    } else {
        tiles[name].image.src = url;
    }
    tiles[name].image.onload = RUR.increment_loaded;
    tiles.known_tiles.push(name);
    RUR.objects.nb_images += 1;
};

RUR.add_tile_image("mud");
RUR.tiles.mud.fatal = true;
RUR.tiles.mud.message = RUR.translate("I'm stuck in mud.");
RUR.tiles.mud.info = RUR.translate("Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.");

RUR.add_tile_image("ice");
RUR.tiles.ice.slippery = true;
RUR.tiles.ice.message = RUR.translate("I'm slipping on ice!");
RUR.tiles.ice.info = RUR.translate("Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.");

RUR.add_tile_image("grass");
RUR.tiles.grass.info = RUR.translate("Grass: usually safe.");

RUR.add_tile_image("pale_grass");
RUR.tiles.grass.info = RUR.translate("Grass: usually safe.");
RUR.tiles.pale_grass.name = "grass"; // replace

RUR.add_tile_image("gravel");
RUR.tiles.gravel.info = RUR.translate("Gravel: usually safe.");


RUR.tiles.water = {};
RUR.tiles.water.name = "water";
RUR.tiles.water.fatal = true;
RUR.tiles.water.detectable = true;
RUR.tiles.water.message = RUR.translate("I'm in water!");
RUR.tiles.water.info = RUR.translate("Water: Reeborg <b>can</b> detect this but will get damaged if it moves to this location.");
RUR.tiles.water.image = new Image();
RUR.tiles.water.image.src = RUR.base_url + '/src/images/water.png';
RUR.tiles.water.image2 = new Image();
RUR.tiles.water.image2.src = RUR.base_url + '/src/images/water2.png';
RUR.tiles.water.image3 = new Image();
RUR.tiles.water.image3.src = RUR.base_url + '/src/images/water3.png';
RUR.tiles.water.image4 = new Image();
RUR.tiles.water.image4.src = RUR.base_url + '/src/images/water4.png';
RUR.tiles.water.image5 = new Image();
RUR.tiles.water.image5.src = RUR.base_url + '/src/images/water5.png';
RUR.tiles.water.image6 = new Image();
RUR.tiles.water.image6.src = RUR.base_url + '/src/images/water6.png';
RUR.tiles.water.choose_image = function () {
    var choice = Math.floor(Math.random() * 6) + 1;
    switch (choice) {
        case 1: return RUR.tiles.water.image;
        case 2: return RUR.tiles.water.image2;
        case 3: return RUR.tiles.water.image3;
        case 4: return RUR.tiles.water.image4;
        case 5: return RUR.tiles.water.image5;
        case 6: return RUR.tiles.water.image6;
    }
};
RUR.tiles.water.image.onload = RUR.increment_loaded;
RUR.tiles.water.image2.onload = RUR.increment_loaded;
RUR.tiles.water.image3.onload = RUR.increment_loaded;
RUR.tiles.water.image4.onload = RUR.increment_loaded;
RUR.tiles.water.image5.onload = RUR.increment_loaded;
RUR.tiles.water.image6.onload = RUR.increment_loaded;
RUR.objects.nb_images += 6;

RUR.add_tile_image("bricks");
RUR.tiles.bricks.name = "brick wall"; // replace
RUR.tiles.bricks.fatal = true;
RUR.tiles.bricks.solid = true;
RUR.tiles.bricks.detectable = true;
RUR.tiles.bricks.message = RUR.translate("Crash!");
RUR.tiles.bricks.info = RUR.translate("brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.");


RUR.add_home_image = function (name, info) {
    var home = RUR.home_images;
    home[name] = {};
    home[name].detectable = true;
    home[name].info = RUR.translate(info) + RUR.translate("Reeborg <b>can</b> detect this tile using at_goal().");
    home[name].image = new Image();
    home[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    home[name].image.onload = RUR.increment_loaded;
    RUR.objects.nb_images += 1;
};

RUR.add_home_image("green_home_tile", "green home tile:");
RUR.add_home_image("house", "house:");
RUR.add_home_image("racing_flag", "racing flag:");


RUR.add_solid_object = function (name, nickname) {
    var obj = RUR.solid_objects;
    obj[name] = {};
    if (nickname === undefined) {
        obj[name].name = name;
    } else {
        obj[name].name = nickname;
        obj[name].fatal = true;
        obj[name].solid = true;
        obj[name].detectable = true;
    }
    obj[name].ctx = RUR.SECOND_LAYER_CTX;
    obj[name].image = new Image();
    obj[name].image.src = RUR.base_url + '/src/images/' + name + '.png';
    obj[name].image.onload = RUR.increment_loaded;
    RUR.objects.nb_images += 1;
};

RUR.add_solid_object("bridge");
RUR.solid_objects.bridge.info = RUR.translate("Bridge:") + RUR.translate("Reeborg <b>can</b> detect this and will know that it allows safe passage over water.");

RUR.add_solid_object("fence_right", "fence");
RUR.solid_objects.fence_right.message = RUR.translate("I hit a fence!");
RUR.solid_objects.fence_right.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.solid_objects.fence4 = RUR.solid_objects.fence_right;  // compatibility with old worlds

RUR.add_solid_object("fence_left", "fence");
RUR.solid_objects.fence_left.message = RUR.translate("I hit a fence!");
RUR.solid_objects.fence_left.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence5 = RUR.solid_objects.fence_left;  // compatibility with old worlds

RUR.add_solid_object("fence_double", "fence");
RUR.solid_objects.fence_double.message = RUR.translate("I hit a fence!");
RUR.solid_objects.fence_double.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence6 = RUR.solid_objects.fence_double;  // compatibility with old worlds

RUR.add_solid_object("fence_vertical", "fence");
RUR.solid_objects.fence_vertical.message = RUR.translate("I hit a fence!");
RUR.solid_objects.fence_vertical.info = RUR.solid_objects.fence_right.info;
RUR.solid_objects.fence7 = RUR.solid_objects.fence_vertical;  // compatibility with old worlds
/*  Handler of special on-screen keyboard
*/

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library */

RUR.kbd = {};
RUR.kbd.prog_lang = "python";

RUR.kbd.set_programming_language = function (lang) {
    switch (lang) {
        case "python":
            RUR.kbd.prog_lang = "python";
            if (RUR._active_console){
                $("#kbd_python_btn").hide();
                $("#kbd_py_console_btn").show();
            } else {
                $("#kbd_python_btn").show();
                $("#kbd_py_console_btn").hide();
            }
            $("#kbd_javascript_btn").hide();
            break;
        case "javascript":
            RUR.kbd.prog_lang = "javascript";
            $("#kbd_python_btn").hide();
            $("#kbd_py_console_btn").hide();
            $("#kbd_javascript_btn").show();
            break;
    }
    RUR.kbd.select();
};

RUR.kbd.insert2 = function (txt){
    if (RUR.kbd.prog_lang == "javascript") {
        RUR.kbd.insert(txt + ";");
    } else {
        RUR.kbd.insert(txt);
    }
};

RUR.kbd.insert_in_console = function (txt) {
    var console = $("#py_console");
    console.val(console.val() + txt);
    console.focus();
};

RUR.kbd.insert = function (txt){
    "use strict";
    var doc, cursor, line, pos;
    if (RUR._active_console) {
        RUR.kbd.insert_in_console(txt);
        return;
    }
    if (txt === undefined) {
        txt = "'";
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    cursor = doc.getCursor();
    line = doc.getLine(cursor.line);
    pos = { // create a new object to avoid mutation of the original selection
       line: cursor.line,
       ch: cursor.ch // set the character position to the end of the line
   };
    doc.replaceRange(txt, pos); // adds a new line
    doc.focus();
};

RUR.kbd.undo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.undo();
    doc.focus();
};

RUR.kbd.redo = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.redo();
    doc.focus();
};

RUR.kbd.enter = function () {
    "use strict";
    var doc, ev;
    if (RUR._active_console) {
        ev = {};
        ev.keyCode = 13;
        ev.preventDefault = function () {};
        myKeyPress(ev);
        return;
    }
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("newlineAndIndent");
    doc.focus();
};

RUR.kbd.tab = function () {
    "use strict";
    var doc;
    if (RUR._active_console) {
        RUR.kbd.insert_in_console('    ');
        return;
    }

    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentMore");
    doc.focus();
};

RUR.kbd.shift_tab = function () {
    "use strict";
    var doc;
    if ($("#tabs").tabs('option', 'active') === 0) {
        doc = editor;
    } else {
        doc = library;
    }
    doc.execCommand("indentLess");
    doc.focus();
};

RUR.kbd.select = function (choice) {
    "use strict";
    $(".kbd_command").hide();
    $(".kbd_condition").hide();
    $(".kbd_objects").hide();
    $(".kbd_python").hide();
    $(".kbd_py_console").hide();
    $(".kbd_javascript").hide();
    $(".kbd_special").hide();
    $(".no_console").hide();
    if ($("#kbd_command_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_command_btn").removeClass("reverse-blue-gradient");
        $("#kbd_command_btn").addClass("blue-gradient");
    } else if ($("#kbd_condition_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_condition_btn").removeClass("reverse-blue-gradient");
        $("#kbd_condition_btn").addClass("blue-gradient");
    } else if ($("#kbd_python_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_python_btn").removeClass("reverse-blue-gradient");
        $("#kbd_python_btn").addClass("blue-gradient");
    } else if ($("#kbd_py_console_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_py_console_btn").removeClass("reverse-blue-gradient");
        $("#kbd_py_console_btn").addClass("blue-gradient");
    } else if ($("#kbd_javascript_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_javascript_btn").removeClass("reverse-blue-gradient");
        $("#kbd_javascript_btn").addClass("blue-gradient");
    } else if ($("#kbd_objects_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_objects_btn").removeClass("reverse-blue-gradient");
        $("#kbd_objects_btn").addClass("blue-gradient");
    } else if ($("#kbd_special_btn").hasClass("reverse-blue-gradient")) {
        $("#kbd_special_btn").removeClass("reverse-blue-gradient");
        $("#kbd_special_btn").addClass("blue-gradient");
    }
    switch (choice) {
        case "kbd_condition":
            $(".kbd_condition").show();
            $("#kbd_condition_btn").removeClass("blue-gradient");
            $("#kbd_condition_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_objects":
            $(".kbd_objects").show();
            $("#kbd_objects_btn").removeClass("blue-gradient");
            $("#kbd_objects_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_python":
            $(".kbd_python").show();
            $("#kbd_python_btn").removeClass("blue-gradient");
            $("#kbd_python_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_py_console":
            $(".kbd_py_console").show();
            $("#kbd_py_console_btn").removeClass("blue-gradient");
            $("#kbd_py_console_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_javascript":
            $(".kbd_javascript").show();
            $("#kbd_javascript_btn").removeClass("blue-gradient");
            $("#kbd_javascript_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_special":
            $(".kbd_special").show();
            $("#kbd_special_btn").removeClass("blue-gradient");
            $("#kbd_special_btn").addClass("reverse-blue-gradient");
            break;
        case "kbd_command":  // jshint ignore:line
        default:
            $(".kbd_command").show();
            $("#kbd_command_btn").removeClass("blue-gradient");
            $("#kbd_command_btn").addClass("reverse-blue-gradient");
    }

    if (RUR.kbd.prog_lang == "python") {
        $(".only_py").show();
        if (RUR._active_console) {
            $(".no_console").hide();
        }
        $(".only_js").hide();
    } else {
        $(".only_js").show();
        $(".only_py").hide();
    }
};

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, RUR, JSHINT, globals_ */

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

RUR.removeHints = function () {
    editor.operation (function () {
        for(var i = 0; i < editor.widgets.length; ++i){
            editor.removeLineWidget(editor.widgets[i]);
        }
        editor.widgets.length = 0;
    });
};

RUR.editorUpdateHints = function() {
    var values;
    if (RUR.programming_language != "javascript") {
        return;
    }
    RUR.removeHints();
    editor.operation(function () {
        values = globals_ + editor.getValue();
        JSHINT(values, jshint_options);
        for(var i = 0; i < JSHINT.errors.length; ++i) {
            var err = JSHINT.errors[i];
            if(!err) continue;
            var msg = document.createElement("div");
            var icon = msg.appendChild(document.createElement("span"));
            icon.innerHTML = "!?!";
            icon.className = "lint-error-icon";
            msg.appendChild(document.createTextNode(err.reason));
            msg.className = "lint-error";
            editor.widgets.push(editor.addLineWidget(err.line-2, msg, {
                coverGutter: false,
                noHScroll: true
            }));
        }
    });
};
RUR.output = {};

RUR.output.write = function () {
    var output_string = '';
    RUR.control.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    output_string = output_string.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    RUR.rec.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output._write = function () {
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == "string") {
            output_string += arguments[i];
        } else {
            output_string += JSON.stringify(arguments[i]);
        }
    }
    RUR.rec.record_frame("stdout", {"element": "#stdout", "message": output_string});
};

RUR.output.clear_print = function () {
    RUR.rec.record_frame("stdout", {"element": "#stdout", "clear": true});
};

RUR.output.print_html = function (arg, append) {
    if (append) {
        RUR.rec.record_frame("print_html", {"element": "#print_html", "message": arg, "append": true});
    } else {
        RUR.rec.record_frame("print_html", {"element": "#print_html", "message": arg});
    }
};

RUR.output.watch_variables = function (arg) {
    RUR.rec.record_frame("watch_variables", {"element": "#watch_variables", "message": arg});
};


RUR.output.view_source = function(fn) {
    $("#Reeborg-explores").dialog("open");
    RUR.cd.show_feedback("#Reeborg-explores", "<pre class='js_code view_source'>" + fn + "</pre>" );
    $('.js_code').each(function() {
        var $this = $(this), $code = $this.text();
        $this.removeClass("js_code");
        $this.addClass("jscode");
        $this.empty();
        var myCodeMirror = CodeMirror(this, {
            value: $code,
            mode: 'javascript',
            lineNumbers: !$this.is('.inline'),
            readOnly: true,
            theme: 'reeborg-dark'
        });
    });
};

RUR.permalink = {};

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
}

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


RUR.permalink.__create = function () {
    "use strict";
    var proglang, world, _editor, _library, url_query, permalink, parts;
    var human_language = document.documentElement.lang;
    url_query = parseUri(window.location.href);

    permalink = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        permalink += ":" + url_query.port;
    }
    permalink += url_query.path;
    proglang = RUR.programming_language + "-" + human_language;
    world = encodeURIComponent(RUR.world.export_world());
    _editor = encodeURIComponent(editor.getValue());
    if (RUR.programming_language == "python") {
        _library = encodeURIComponent(library.getValue());
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor + "&library=" + _library;
    } else {
        permalink += "?proglang=" + proglang + "&world=" + world + "&editor=" + _editor;
    }
    return permalink;
};


RUR.permalink.create = function () {
    var permalink;

    permalink = RUR.permalink.__create();

    $("#url_input_textarea").val(permalink);
    $("#url_input").toggle();
    $("#ok-permalink").removeAttr("disabled");
    $("#cancel-permalink").removeAttr("disabled");

    return false;
};


RUR.permalink.update = function (arg, shortname) {
    "use strict";
    var url_query, name;

	if (RUR.permalink_update_previous_arg === undefined) {
		RUR.permalink_update_previous_arg = arg;
	} else if (RUR.permalink_update_previous_arg === arg) {
		return;
	} else {
		RUR.permalink_update_previous_arg = arg;
	}

    if (arg !== undefined) {
        url_query = parseUri(arg);
    } else {
        url_query = parseUri($("#url_input_textarea").val());
    }
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined) {
        var prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        if (shortname !== undefined) {
            RUR.storage.save_world(shortname);
        } else {
            RUR.storage.save_world(RUR.translate("PERMALINK"));
        }
        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
    }

    if (RUR.programming_language == "python" &&
       url_query.queryKey.library !== undefined) {
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    }

    if(url_query.queryKey.css !== undefined) {
        var new_css = decodeURIComponent(url_query.queryKey.css);
        eval(new_css);    // jshint ignore:line
    }
    $("#url_input").hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
};

RUR.permalink.cancel = function () {
    $('#url_input').hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
};

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR , editor*/

RUR.rec = {};

RUR.rec.reset = function() {
    RUR.rec.nb_frames = 0;
    RUR.rec.current_frame = 0;
    RUR.rec.extra_highlighting_frames = 0;
    RUR.current_lineno = undefined;
    RUR.rec.frames = [];
    RUR.rec._line_numbers = [];
    RUR.rec.playback = false;
    RUR.rec.delay = 300;
    RUR.rec.do_not_record = false;
    RUR.watched_expressions = [];
    clearTimeout(RUR.rec.timer);
    if (RUR.programming_language === "python" &&
        RUR._highlight &&
        RUR.rec._max_lineno_highlighted !== undefined) {
        for (var i=0; i <= RUR.rec._max_lineno_highlighted; i++){
            try {
                editor.removeLineClass(i, 'background', 'editor-highlight');
            }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        }
    }
    RUR.rec._previous_lines = [];
    RUR.rec._max_lineno_highlighted = 0;
};


RUR.rec.record_frame = function (name, obj) {
    // clone current world and store the clone
    var frame = {};

    if (RUR.programming_language === "python" && RUR._immediate_playback) {
        RUR.vis_world.refresh();
        if (name !== undefined && name == "print_html") {
            if (obj.append){
                $(obj.element).append(obj.message);
            } else {
                $(obj.element).html(obj.message);
            }
            $("#Reeborg-proclaims").dialog("open");
        }
        return;
    }


    if (RUR.rec.do_not_record) {
        return;
    }
    if (RUR.ui.prevent_playback){
        return;
    }

    // // Used mainly to add watch variables to previous frame
    // if (name !== undefined && name == "output" &&
    //     obj.element == "#print_html" && obj.append == undefined &&
    //     RUR.rec.nb_frames > 1) {
    //     RUR.rec.frames[RUR.rec.nb_frames-1]["output"] = obj;
    //     return;
    // }


    frame.world = RUR.world.clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }

    frame.delay = RUR.rec.delay;
    if (RUR.control.sound_id && RUR.control.sound_flag && frame.delay >= RUR.MIN_TIME_SOUND) {
        frame.sound_id = RUR.control.sound_id;
    }

   if (RUR.programming_language === "python" && RUR._highlight) {
       if (RUR.current_lineno !== undefined) {
           RUR.rec._line_numbers [RUR.rec.nb_frames] = RUR.current_lineno;
       } else{
           RUR.rec._line_numbers [RUR.rec.nb_frames] = [0];
       }
   }

    RUR.previous_lineno = RUR.current_lineno;

    RUR.rec.frames[RUR.rec.nb_frames] = frame;
    RUR.rec.nb_frames++;

    RUR.control.sound_id = undefined;
    if (name === "error"){
        return;
    }

    // catch any robot that teleported itself to a forbidden tile
    // to try to do a sneaky action
    RUR.rec.check_robots_on_tiles(frame);

    if (RUR.rec.nb_frames > RUR.MAX_STEPS + RUR.rec.extra_highlighting_frames) {
        throw new RUR.ReeborgError(RUR.translate("Too many steps:").supplant({max_steps: RUR.MAX_STEPS}));
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

    if (frame_info === "pause") {
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
    var frame, goal_status, i, next_frame_line_numbers;

    if (RUR.rec.current_frame >= RUR.rec.nb_frames) {
        return RUR.rec.conclude();
    }

    //track line number and highlight line to be executed
    if (RUR.programming_language === "python" && RUR._highlight) {
        try {
            for (i = 0; i < RUR.rec._previous_lines.length; i++){
                editor.removeLineClass(RUR.rec._previous_lines[i], 'background', 'editor-highlight');
            }
        }catch (e) {console.log("diagnostic: error was raised while trying to removeLineClass", e);}
        if (RUR.rec._line_numbers [RUR.rec.current_frame+1] !== undefined){
            next_frame_line_numbers = RUR.rec._line_numbers [RUR.rec.current_frame+1];
            for(i = 0; i < next_frame_line_numbers.length; i++){
                editor.addLineClass(next_frame_line_numbers[i], 'background', 'editor-highlight');
            }
            i = next_frame_line_numbers.length - 1;
            if (RUR.rec._max_lineno_highlighted < next_frame_line_numbers[i]) {
                RUR.rec._max_lineno_highlighted = next_frame_line_numbers[i];
            }
            RUR.rec._previous_lines = RUR.rec._line_numbers [RUR.rec.current_frame+1];
        } else {
            try {  // try adding back to capture last line of program
                for (i=0; i < RUR.rec._previous_lines.length; i++){
                    editor.addLineClass(RUR.rec._previous_lines[i], 'background', 'editor-highlight');
                }
            }catch (e) {console.log("diagnostic: error was raised while trying to addLineClass", e);}
        }
    }

    frame = RUR.rec.frames[RUR.rec.current_frame];
    RUR.rec.current_frame++;

    if (frame === undefined){
        //RUR.current_world = RUR.world.saved_world;  // useful when ...
        RUR.vis_world.refresh();                    // ... reversing step
        return;
    }

    if (RUR.__debug && frame.debug) {
        console.log("debug: ", frame.debug);
    }

    // many of these are exlusive of others ... but to give more flexibility
    // in adding options (and prevent bugs!!), we do not use an
    // if/else if/... structure, but rather a series of if clauses.


    if (frame.delay !== undefined){
        RUR.rec.delay = frame.delay;
    }

    if (frame.pause) {
        RUR.ui.pause(frame.pause.pause_time);
        return "pause";
    }

    if (frame.error !== undefined) {
        return RUR.rec.handle_error(frame);
    }

    if (frame.stdout !== undefined) {
        if (frame.stdout.clear) { // for clearprint
            $(frame.stdout.element).html('');
        } else {
            $(frame.stdout.element).append(frame.stdout.message);
        }
        $("#Reeborg-writes").dialog("open");
    }

    if (frame.print_html !== undefined) {
        if (frame.print_html.append){
            $(frame.print_html.element).append(frame.print_html.message);
        } else {
            $(frame.print_html.element).html(frame.print_html.message);
        }
        $("#Reeborg-proclaims").dialog("open");
    }

    if (frame.watch_variables !== undefined) {
        $(frame.watch_variables.element).html(frame.watch_variables.message);
        $("#Reeborg-watches").dialog("open");
    }

    RUR.current_world = frame.world;
    if (frame.sound_id !== undefined){
        RUR.control.play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {
    var frame, goal_status;

    frame = RUR.rec.frames[RUR.rec.nb_frames-1];
    if (frame !== undefined && frame.world !== undefined && frame.world.goal !== undefined){
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#success-sound");
            }
            RUR.cd.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#error-sound");
            }
            RUR.cd.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    } else {
        if (RUR.control.sound_flag) {
            RUR.control.play_sound("#success-sound");
        }
        RUR.cd.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    }
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    if (frame.error.reeborg_shouts === RUR.translate("Done!")){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#success-sound");
            }
            RUR.cd.show_feedback("#Reeborg-concludes",
                RUR.translate("<p class='center'>Instruction <code>done()</code> executed.</p>"));
        }
    } else {
        if (RUR.control.sound_flag) {
            RUR.control.play_sound("#error-sound");
        }
        RUR.cd.show_feedback("#Reeborg-shouts", frame.error.message);
    }
    RUR.ui.stop();
    return "stopped";
};

RUR.rec.check_current_world_status = function() {
    // this function is to check goals from the Python console.
    frame = {};
    frame.world = RUR.current_world;
    if (frame.world.goal === undefined){
        RUR.cd.show_feedback("#Reeborg-concludes",
                             "<p class='center'>" +
                             RUR.translate("Last instruction completed!") +
                             "</p>");
    } else {
        goal_status = RUR.rec.check_goal(frame);
        if (goal_status.success) {
            RUR.cd.show_feedback("#Reeborg-concludes", goal_status.message);
        } else {
            RUR.cd.show_feedback("#Reeborg-shouts", goal_status.message);
        }
    }
};

RUR.rec.check_goal = function (frame) {
    var g, world, goal_status = {}, result;
    g = frame.world.goal;
    world = frame.world;
    goal_status.message = "<ul>";
    goal_status.success = true;
    if (g.position !== undefined){
        if (g.position.x === world.robots[0].x){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct x position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong x position.</li>");
            goal_status.success = false;
        }
        if (g.position.y === world.robots[0].y){
            goal_status.message += RUR.translate("<li class='success'>Reeborg is at the correct y position.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg is at the wrong y position.</li>");
            goal_status.success = false;
        }
    }
    if (g.objects !== undefined) {
        result = Object.identical(g.objects, world.objects, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All objects are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more objects are not at the correct location.</li>");
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
            goal_status.message += RUR.translate("<li class='success'>All walls have been built correctly.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more walls missing or built at wrong location.</li>");
            goal_status.success = false;
        }
    }
    goal_status.message += "</u>";
    return goal_status;
};

// A sneaky programmer could teleport a robot on a forbidden tile
// to perform an action; we catch any such potential problem here
RUR.rec.check_robots_on_tiles = function(frame){
    var tile, robots, robot, coords;
    if (frame.world.robots === undefined){
        return;
    }
    for (robot=0; robot < frame.world.robots.length; robot++){
        tile = RUR.control.get_tile_at_position(frame.world.robots[robot]);
        if (tile) {
            if (tile.fatal){
                throw new RUR.ReeborgError(tile.message);
            }
        }
    }
};

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.robot = {};

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.objects = {};
    if (tokens !== undefined && tokens > 0){
        robot.objects.token = tokens;
    }

    if (orientation === undefined){
        robot._orientation = RUR.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case RUR.translation.east:
            robot._orientation = RUR.EAST;
            break;
        case "n":
        case RUR.translation.north:
            robot._orientation = RUR.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            robot._orientation = RUR.WEST;
            break;
        case "s":
        case RUR.translation.south:
            robot._orientation = RUR.SOUTH;
            break;
        default:
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
        }
    }

    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot._orientation;

    return robot;
};

RUR.robot.cleanup_objects = function (robot) {
    "use strict";
    var obj_name, objects_carried = {};
    for (obj_name in robot.objects) {
        if (robot.objects.hasOwnProperty(obj_name)){
             if (robot.objects[obj_name] == "infinite" || robot.objects[obj_name] > 0){
                objects_carried[obj_name] = robot.objects[obj_name];
             }
        }
    }
    robot.objects = objects_carried;
    // handling legacy notation
    if (robot.orientation !== undefined){
        robot._orientation = robot.orientation;
        delete robot.orientation;
    }
};
/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, editorUpdateHints,
  translate_python,*/

RUR.runner = {};

RUR.runner.interpreted = false;

RUR.runner.assign_initial_values = function () {
    "use strict";
    var coords, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};

   // First, deal with objects

    if (RUR.current_world.objects !== undefined){
        objects = RUR.current_world.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb.toString().indexOf("-") != -1){
                            range = nb.split("-");
                            nb = RUR.randint(parseInt(range[0], 10), parseInt(range[1], 10));
                            if (nb !== 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) !== 0) {
                                total_nb_objects[obj] = parseInt(nb, 10);
                            }
                        } else {
                            total_nb_objects[obj] += parseInt(nb, 10);
                        }
                    }
                }
                if (Object.keys(RUR.current_world.objects[coords]).length === 0){
                    delete RUR.current_world.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.objects !== undefined){
        objects = RUR.current_world.goal.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb == "all") {
                            try {
                                if (total_nb_objects[obj] !== undefined) {
                                    objects_here[obj] = total_nb_objects[obj];
                                } else {
                                    delete objects[coords][obj];
                                }
                            } catch (e) {
                                $("#world-info-button").click();
                                $("#World-info").html("<b>Warning</b> Trying to assign a goal when no corresponding objects are found in the world.");
                            }
                        }
                    }
                }
                if (Object.keys(RUR.current_world.goal.objects[coords]).length === 0){
                    delete RUR.current_world.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    if (RUR.current_world.robots !== undefined && RUR.current_world.robots.length == 1){
        robot = RUR.current_world.robots[0];
        if (robot.start_positions !== undefined) {
            position = robot.start_positions[RUR.randint(0, robot.start_positions.length-1)];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            delete robot.start_positions;
        }
        if (robot._orientation == -1){
            RUR.current_world.robots[0]._orientation = RUR.randint(0, 3);
            RUR.current_world.robots[0]._prev_orientation = RUR.current_world.robots[0]._orientation;
        }
    }

    // then final position for robot

    if (RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.possible_positions !== undefined &&
        RUR.current_world.goal.possible_positions.length > 1) {
        goal = RUR.current_world.goal;
        position = goal.possible_positions[RUR.randint(0, goal.possible_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_positions;
    }
    if (RUR.current_world.goal !== undefined) {
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.vis_world.draw_goal();
    }
    RUR.vis_world.refresh();
};


RUR.runner.run = function (playback) {
    var src, fatal_error_found = false;
    if (RUR.we.editing_world && !RUR.runner.interpreted) {
        RUR.world.saved_world = RUR.world.clone_world(RUR.current_world);
    }
    if (!RUR.runner.interpreted) {
        RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
        RUR.runner.assign_initial_values();

        if (RUR.blockly.active) {
            if (RUR.programming_language == "python") {
                editor.setValue(Blockly.Python.workspaceToCode(RUR.blockly.workspace));
            } else {
                editor.setValue(Blockly.JavaScript.workspaceToCode(RUR.blockly.workspace));
            }
        }
        src = editor.getValue();
        fatal_error_found = RUR.runner.eval(src); // jshint ignore:line
    }
    if (!fatal_error_found) {
        try {
            localStorage.setItem(RUR.settings.editor, src);
            localStorage.setItem(RUR.settings.library, library.getValue());
        } catch (e) {}
        // "playback" is a function called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (RUR.ui.prevent_playback) {
            RUR.ui.stop();
            return;
        }
        if (playback() === "stopped") {
            RUR.ui.stop();
        }
    }
};

RUR.runner.eval = function(src) {  // jshint ignore:line
    var error_name, message, response, other_info, from_python, error;
    other_info = '';

    /* At some point around version 3.2.0, Brython changed the way it
       handled uncaught errors, and no longer pass a "nice" object
       to the surrounding Javascript environment - since this is not
       the way Brython programmers normally do things.   While this
       has been changed back some time after version 3.2.3, we nonetheless
       guard against any future changes by doing our own handling. */

    RUR.__python_error = false;
    try {
        if (RUR.programming_language === "javascript") {
            RUR.runner.eval_javascript(src);
        } else if (RUR.programming_language === "python") {
            RUR.runner.eval_python(src);
            if (RUR.__python_error) {
                throw RUR.__python_error;
            }
        } else {
            alert("FATAL ERROR: Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        if (RUR.__debug){
            console.dir(e);
        }
        error = {};
        if (RUR.programming_language === "python") {
            error.reeborg_shouts = e.reeborg_shouts;
            response = RUR.runner.simplify_python_traceback(e);
            message = response.message;
            other_info = response.other_info;
            error_name = response.error_name;
            error.message = "<h3>" + error_name + "</h3><h4>" +
                                    message + "</h4><p>" + other_info + '</p>';
        } else {
            error_name = e.name;
            message = e.message;
            other_info = '';
            if (e.reeborg_shouts !== undefined) {
                error.message = e.reeborg_shouts;
                error.reeborg_shouts = e.reeborg_shouts;
            }
        }

        if (e.reeborg_shouts !== undefined){
            RUR.rec.record_frame("error", error);
        } else {
            RUR.cd.show_feedback("#Reeborg-shouts",
                                    "<h3>" + error_name + "</h3><h4>" +
                                    message + "</h4><p>" + other_info + '</p>');
            return true;
        }
    }
    RUR.runner.interpreted = true;
    return false;
};


RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    var pre_code, post_code;
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    RUR.reset_definitions();
    src = pre_code + "\n" + src + "\n" + post_code;
    eval(src); // jshint ignore:line
};


RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    var pre_code, post_code, highlight;
    RUR.reset_definitions();
    pre_code = pre_code_editor.getValue();
    post_code = post_code_editor.getValue();
    translate_python(src, RUR._highlight, RUR._watch_vars, pre_code, post_code);
};

RUR.runner.simplify_python_traceback = function(e) {
    "use strict";
    var message, error_name, other_info, diagnostic;
    other_info = '';
    if (e.reeborg_shouts === undefined) {
        message = e.$message;
        error_name = e.__name__;
        diagnostic = '';
        switch (error_name) {
            case "SyntaxError":
                try {
                    other_info = RUR.runner.find_line_number(e.args[1][3]);
                    if (RUR.runner.check_colons(e.args[1][3])) {
                        other_info += RUR.translate("<br>Perhaps a missing colon is the cause.");
                    } else if (RUR.runner.check_func_parentheses(e.args[1][3])){
                        other_info += RUR.translate("<br>Perhaps you forgot to add parentheses ().");
                    }
                } catch (e) { // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                }
                break;
            case "IndentationError":
                message = RUR.translate("The code is not indented correctly.");
                try {
                    other_info = RUR.runner.find_line_number(e.args[1][3]);
                    if (e.args[1][3].indexOf("RUR.set_lineno_highlight([") == -1){
                        other_info += "<br><code>" + e.args[1][3] + "</code>";
                    }
                } catch (e) {  // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer with a description of this problem.";
                }
                break;
            case "NameError":
                try {
                    other_info = RUR.runner.find_line_number(message);
                    other_info += RUR.translate("<br>Perhaps you misspelled a word or forgot to define a function or a variable.");
                } catch (e) {  // jshint ignore:line
                    other_info = "I could not analyze this error; you might want to contact my programmer.";
                }
                break;
            case "Internal Javascript error: SyntaxError":
            case "Internal Javascript error: TypeError":
                error_name = "Invalid Python Code";
                message = '';
                other_info = RUR.translate("I cannot help you with this problem.");
                break;
            default:
                other_info = "";
        }
    } else {
        message = e.reeborg_shouts;
        if (e.__name__ === undefined) {
            error_name = "ReeborgError";
        } else {
            error_name = e.__name__;
        }
    }
    return {message:message, other_info:other_info, error_name:error_name};
};


RUR.runner.find_line_number = function(bad_code) {
    /** With the possibility of having code inserted by the highlighting routine,
        with some pre-code, and with Brython not counting empty lines at the
        beginning of a program, it is more reliable to scan the source code
        for the offending code as identified by Brython and see if it occurs
        only once in the user's program */
    var lines, found, i, lineno;
    if (bad_code.indexOf("RUR.set_lineno_highlight([") != -1){
        bad_code = bad_code.replace("RUR.set_lineno_highlight([", "");
        lines = bad_code.split("]");
        lineno = lines[0] + 1;
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    lines = editor.getValue().split("\n");
    found = false;
    lineno = false;
    for (i=0; i<lines.length; i++) {
        try {
        } catch (e) {
            return '';
        }
         if(lines[i].indexOf(bad_code) != -1){
            if (found){
                return '';   // found the offending code twice; can not rely on this
            } else {
                found = true;
                lineno = i+1;
            }
        }
    }
    if (lineno) {
        return RUR.translate("Error found at or near line {number}.").supplant({number: lineno.toString()});
    }
    return '';
};


RUR.runner.check_colons = function(line_of_code) {
    var tokens, line, nb_token;
    tokens = ['if ', 'if(', 'else', 'elif ','elif(','while ','while(',
              'for ','for(', 'def '];
    for (nb_token=0; nb_token < tokens.length; nb_token++){
        if (line_of_code.indexOf(tokens[nb_token]) != -1){
            if (line_of_code.indexOf(":") == -1){
                return true;    // missing colon
            }
        }
    }
    return false;  // no missing colon
};

RUR.runner.check_func_parentheses = function(line_of_code) {
    if (line_of_code.indexOf('def') != -1){
        if (line_of_code.indexOf("(") == -1){
            return true;    // missing parentheses
        }
    }
    return false;  // no missing parentheses
};
/*
   Utilities for dealing with html LocalStorage.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.storage = {};

RUR.storage.memorize_world = function () {
    var existing_names, i, key, response;

    existing_names = '';
    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            if (!existing_names) {
                existing_names = "Existing names: " + key.substring(11);
            } else {
                existing_names += "," + key.substring(11);
            }
        }
    }

    if (existing_names) {
        $("#existing-world-names").html(existing_names);
    }
    RUR.cd.dialog_save_world.dialog("open");
};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        // replace existing
        localStorage.setItem("user_world:"+ name, RUR.world.export_world(RUR.current_world));
    } else {
        RUR.storage.save_world(name);
    }
    RUR.world.saved_world = RUR.world.clone_world();
};

RUR.storage.save_world = function (name){
    "use strict";
    var url = "user_world:"+ name;
    localStorage.setItem(url, RUR.world.export_world(RUR.current_world));
    RUR.storage.append_world_name(name);
};

RUR.storage.append_world_name = function (name){
    "use strict";
    var url = "user_world:"+ name;
    RUR.storage.appending_world_name_flag = true;
    RUR.world_select.append_world({url:url, shortname:name, local_storage:true});
    RUR.world_select.set_url(url);  // reload as updating select choices blanks the world.

    /* appends name to world selector and to list of possible worlds to delete */
    $('#delete-world h3').append(
        '<button class="blue-gradient inline-block" onclick="RUR.storage.delete_world(' +
            "'"+ name + "'" + ');$(this).remove()"">' + RUR.translate('Delete ') + name + '</button>');
    $('#delete-world').show();
};

RUR.storage.delete_world = function (name){
    "use strict";
    var i, key;
    localStorage.removeItem("user_world:" + name);
    $("select option[value='" + "user_world:" + name +"']").remove();

    try {
        RUR.world_select.set_url(localStorage.getItem(RUR.settings.world));
    } catch (e) {
        RUR.world_select.set_default();
    }

    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            return;
        }
    }
    $('#delete-world').hide();
};
/* comprenhensive tests run from the Additional Options menu */

RUR.testing = {};

RUR.testing._test_permalink = function(permalink, function_name, name) {
    var url_query, base_url;
    url_query = parseUri(window.location.href);
    base_url = url_query.protocol + "://" + url_query.host;
    if (url_query.port){
        base_url += ":" + url_query.port;
    }
    editor.setValue(function_name + '("' + base_url + permalink + '","' + name + '")');
    RUR.testing.run_test();
};

RUR.testing.test_permalink = function (permalink, name){
    RUR.testing._test_permalink(permalink, "World", name);
};

RUR.testing.test_permalien = function (permalink, name){
    RUR.testing._test_permalink(permalink, "Monde", name);
};

RUR.testing.run_test = function() {
    RUR.ui.run();  // runs the permalink instruction, thus loading the appropriate test
    RUR.ui.reload();
    RUR.ui.run();
};

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $, CodeMirror, ReeborgError, editor, library, removeHints, parseUri */

/* Intended to provide information about objects carried by robot */

RUR.tooltip = {};
RUR.tooltip.canvas = document.getElementById("tooltip");
RUR.tooltip.ctx = RUR.tooltip.canvas.getContext("2d");

// request mousemove events
$("#robot_canvas").mousemove(function (evt) {
    RUR.we.mouse_x = evt.pageX;
    RUR.we.mouse_y = evt.pageY;
    RUR.tooltip.handleMouseMove(evt);
});

RUR.tooltip.handleMouseMove = function handleMouseMove(evt) {
    var x, y, hit, position, world, robot, mouse_above_robot, image, nb_obj;
    var size = 40, objects_carried;

    world = RUR.current_world;
    x = evt.pageX - $("#robot_canvas").offset().left;
    y = evt.pageY - $("#robot_canvas").offset().top;
    position = RUR.we.calculate_grid_position();
    RUR.tooltip.canvas.style.left = "-200px";
    if (!RUR.we.mouse_contained_flag) {
        return;
    }

    //mouse_above_robot = false;
    if (world.robots !== undefined) {
        for (i=0; i < world.robots.length; i++) {
            robot = world.robots[i];
            if (robot.start_positions === undefined) {
                robot.start_positions = [[robot.x, robot.y]];
            }
            for (j=0; j < robot.start_positions.length; j++){
                pos = robot.start_positions[j];
                if(pos[0]==position[0] && pos[1]==position[1]){
                    mouse_above_robot = true;
                    if (robot.objects !== undefined){
                        objects_carried = Object.keys(robot.objects);
                        break;
                    }
                }
            }
            if (mouse_above_robot) {
                break;
            }
        }
    }

    RUR.tooltip.canvas = document.getElementById("tooltip");
    RUR.tooltip.canvas.height = size;
    if (objects_carried !== undefined) {
        RUR.tooltip.canvas.width = size*Math.max(objects_carried.length, 1);
    } else {
        RUR.tooltip.canvas.width = size;
        objects_carried = [];
    }
    if (mouse_above_robot){
        RUR.tooltip.canvas.style.left = x+20 + "px";
        RUR.tooltip.canvas.style.top = y + "px";
        RUR.tooltip.ctx.clearRect(0, 0, RUR.tooltip.canvas.width, RUR.tooltip.canvas.height);
        for (i=0; i < objects_carried.length; i++){
            image = RUR.objects[objects_carried[i]].image;
            nb_obj = robot.objects[objects_carried[i]];
            if (nb_obj == "infinite") {
                nb_obj = "∞";
            }
            RUR.tooltip.ctx.drawImage(image, i*size, 0, image.width, image.height);
            RUR.tooltip.ctx.fillText(nb_obj, i*size+1, size-1);
        }
    }
};

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.ui = {};

RUR.ui.stop_called = false;
RUR.ui.prevent_playback = false;

RUR.ui.show_only_reload2 = function (bool) {
    if (bool) {
        $("#stop").hide();
        $("#pause").hide();
        $("#run").hide();
        $("#step").hide();
        $("#reverse-step").hide();
        $("#reload").hide();
        $("#reload2").show();
        $("#reload2").removeAttr("disabled");
    } else {
        $("#stop").show();
        $("#pause").show();
        $("#run").show();
        $("#step").show();
        $("#reverse-step").show();
        $("#reload").show();
        $("#reload2").hide();
    }
};


RUR.ui.set_ready_to_run = function () {
    RUR.ui.prevent_playback = false;
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
};

RUR.ui.run = function () {
    if (RUR.ui.stop_called){
        RUR.ui.stop_called = false;
        RUR.ui.reload();
    }
    $("#stop").removeAttr("disabled");
    $("#pause").removeAttr("disabled");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");

    clearTimeout(RUR.rec.timer);
    RUR.runner.run(RUR.rec.play);
};

RUR.ui.pause = function (ms) {
    RUR.rec.playback = false;
    clearTimeout(RUR.rec.timer);
    $("#pause").attr("disabled", "true");
    if (ms !== undefined){      // pause called via a program instruction
        RUR.rec.timer = setTimeout(RUR.ui.run, ms);  // will reset RUR.rec.playback to true
    } else {
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reverse-step").removeAttr("disabled");
    }
};

RUR.ui.step = function () {
    RUR.runner.run(RUR.rec.display_frame);
    RUR.ui.stop_called = false;
    $("#stop").removeAttr("disabled");
    $("#reverse-step").removeAttr("disabled");
    clearTimeout(RUR.rec.timer);
};


RUR.ui.reverse_step = function () {
    RUR.rec.current_frame -= 2;
    if (RUR.rec.current_frame < 0){
        $("#reverse-step").attr("disabled", "true");
    }
    RUR.runner.run(RUR.rec.display_frame);
    RUR.ui.stop_called = false;
    $("#stop").removeAttr("disabled");
    clearTimeout(RUR.rec.timer);
};


RUR.ui.stop = function () {
    clearTimeout(RUR.rec.timer);
    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").removeAttr("disabled");
    $("#step").attr("disabled", "true");
    $("#reverse-step").attr("disabled", "true");
    $("#reload").removeAttr("disabled");
    RUR.ui.stop_called = true;
};

RUR.ui.reload = function() {
    RUR.ui.set_ready_to_run();
    RUR.ui.reload2();
    $("#highlight-impossible").hide();
    RUR.runner.interpreted = false;
    RUR.control.sound_flag = false;
};

RUR.ui.reload2 = function() {
    $("#stdout").html("");
    $(".view_source").remove();
    $("#print_html").html("");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    $("#watch_variables").html("");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    RUR.world.reset();
    RUR.rec.reset();
    try {
        restart_repl();
    } catch (e) {
        console.log("can not restart repl", e);
    }      // firefox no longer works :(

};

RUR.ui.select_world = function (s, silent) {
    var elt = document.getElementById("select_world");
    for (var i=0; i < elt.options.length; i++){
        if (elt.options[i].text === s) {
            if (elt.options[i].selected) {
                return;
            }
            elt.value = elt.options[i].value;
            $("#select_world").change();
            if (silent) {
                return;
            }
            throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: s}));
        }
    }
    if (silent) {
        return;
    }
    throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: s}));
};


RUR.ui.load_user_worlds = function (initial) {
    var key, name, i;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            RUR.storage.append_world_name(name, initial);
            $('#delete-world').show();
        }
    }
};

RUR.ui.highlight = function () {
    if (RUR._highlight) {
        RUR._highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("reverse-blue-gradient");
    } else {
        RUR._highlight = true;
        $("#highlight").addClass("reverse-blue-gradient");
        $("#highlight").removeClass("blue-gradient");
    }
};

RUR.ui.watch_variables = function () {
    if (RUR._watch_vars) {
        RUR._watch_vars = false;
        $("#watch_variables_btn").addClass("blue-gradient");
        $("#watch_variables_btn").removeClass("reverse-blue-gradient");
        $("#watch_variables").html("");
        $("#Reeborg-watches").dialog("close");
    } else {
        RUR._watch_vars = true;
        $("#watch_variables_btn").addClass("reverse-blue-gradient");
        $("#watch_variables_btn").removeClass("blue-gradient");
        $("#watch_variables").html("");
        $("#Reeborg-watches").dialog("open");
    }
};

RUR.ui.user_no_highlight = function () {
    // meant to be used in a Python program (under a different name)
    // to ensure highlighting is turned off.
    if (RUR._highlight) {
        RUR._highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("reverse-blue-gradient");
    }
};

RUR.ui.toggle_panel = function (button, element) {
    button.toggleClass("blue-gradient");
    button.toggleClass("reverse-blue-gradient");
    element.toggleClass("active");
};

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
        } else if (Object.keys(object).length === 0){     // added by A.R. for Reeborg's World comparisons - issue 59
            return undefined;
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

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.vis_robot = {};
RUR.vis_robot.images = [{}, {}, {}, {}];

// we will keep track if we have loaded all images
RUR.vis_robot.loaded_images = 0;
RUR.vis_robot.nb_images = 0;

RUR.base_url = RUR.base_url || '';  // enable changing defaults for unit tests

// classic
RUR.vis_robot.images[0].robot_e_img = new Image();
RUR.vis_robot.images[0].robot_e_img.src = RUR.base_url + '/src/images/robot_e.png';
RUR.vis_robot.images[0].robot_n_img = new Image();
RUR.vis_robot.images[0].robot_n_img.src = RUR.base_url + '/src/images/robot_n.png';
RUR.vis_robot.images[0].robot_w_img = new Image();
RUR.vis_robot.images[0].robot_w_img.src = RUR.base_url + '/src/images/robot_w.png';
RUR.vis_robot.images[0].robot_s_img = new Image();
RUR.vis_robot.images[0].robot_s_img.src = RUR.base_url + '/src/images/robot_s.png';
RUR.vis_robot.images[0].robot_random_img = new Image();
RUR.vis_robot.images[0].robot_random_img.src = RUR.base_url + '/src/images/robot_random.png';

// rover type
RUR.vis_robot.images[1].robot_e_img = new Image();
RUR.vis_robot.images[1].robot_e_img.src = RUR.base_url + '/src/images/rover_e.png';
RUR.vis_robot.images[1].robot_n_img = new Image();
RUR.vis_robot.images[1].robot_n_img.src = RUR.base_url + '/src/images/rover_n.png';
RUR.vis_robot.images[1].robot_w_img = new Image();
RUR.vis_robot.images[1].robot_w_img.src = RUR.base_url + '/src/images/rover_w.png';
RUR.vis_robot.images[1].robot_s_img = new Image();
RUR.vis_robot.images[1].robot_s_img.src = RUR.base_url + '/src/images/rover_s.png';
RUR.vis_robot.images[1].robot_random_img = new Image();
RUR.vis_robot.images[1].robot_random_img.src = RUR.base_url + '/src/images/rover_random.png';

// 3d red type
RUR.vis_robot.images[2].robot_e_img = new Image();
RUR.vis_robot.images[2].robot_e_img.src = RUR.base_url + '/src/images/plain_e.png';
RUR.vis_robot.images[2].robot_n_img = new Image();
RUR.vis_robot.images[2].robot_n_img.src = RUR.base_url + '/src/images/plain_n.png';
RUR.vis_robot.images[2].robot_w_img = new Image();
RUR.vis_robot.images[2].robot_w_img.src = RUR.base_url + '/src/images/plain_w.png';
RUR.vis_robot.images[2].robot_s_img = new Image();
RUR.vis_robot.images[2].robot_s_img.src = RUR.base_url + '/src/images/plain_s.png';
RUR.vis_robot.images[2].robot_random_img = new Image();
RUR.vis_robot.images[2].robot_random_img.src = RUR.base_url + '/src/images/robot_random.png';

// solar panel type
RUR.vis_robot.images[3].robot_e_img = new Image();
RUR.vis_robot.images[3].robot_e_img.src = RUR.base_url + '/src/images/sp_e.png';
RUR.vis_robot.images[3].robot_n_img = new Image();
RUR.vis_robot.images[3].robot_n_img.src = RUR.base_url + '/src/images/sp_n.png';
RUR.vis_robot.images[3].robot_w_img = new Image();
RUR.vis_robot.images[3].robot_w_img.src = RUR.base_url + '/src/images/sp_w.png';
RUR.vis_robot.images[3].robot_s_img = new Image();
RUR.vis_robot.images[3].robot_s_img.src = RUR.base_url + '/src/images/sp_s.png';
RUR.vis_robot.images[3].robot_random_img = new Image();
RUR.vis_robot.images[3].robot_random_img.src = RUR.base_url + '/src/images/robot_random.png';

RUR.vis_robot.style = 0;

RUR.vis_robot.select_default_model = function (arg) {
    var style;
    RUR.vis_robot.style = parseInt(arg, 10);
    style = RUR.vis_robot.style;
    if ( !(style ===0 || style==1 || style==2 || style==3)){
        RUR.vis_robot.style = 0;
        style = 0;
    }
    // RUR.vis_robot.set_offsets();

    style = RUR.vis_robot.style;
    RUR.vis_robot.e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[style].robot_s_img;
    RUR.vis_robot.random_img = RUR.vis_robot.images[style].robot_random_img;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }

    localStorage.setItem("robot_default_model", arg);
};
RUR.vis_robot.select_default_model(localStorage.getItem("robot_default_model"));

// the following is to try to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.w_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.n_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.s_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.random_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;



RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image;
    // handling legacy Code
    if (robot.orientation !== undefined) {
        robot._orientation = robot.orientation;
        robot.orientation = null;
    }
    if (!robot) {
        return;
    }
    if (robot.x > RUR.COLS || robot.y > RUR.ROWS) {
        return;
    }

    // all images are taken to be centered on a tile 40x40, which are scaled
    //  appropriately
    width = RUR.TILE_SIZE * RUR.SCALE;
    height = RUR.TILE_SIZE * RUR.SCALE;

    x = robot.x*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;
    y = RUR.HEIGHT - (robot.y+1)*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;

    switch(robot._orientation){
        case RUR.EAST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_e_img;
            } else {
                image = RUR.vis_robot.e_img;
            }
            break;
        case RUR.NORTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_n_img;
            } else {
                image = RUR.vis_robot.n_img;
            }
            break;
        case RUR.WEST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_w_img;
            } else {
                image = RUR.vis_robot.w_img;
            }
            break;
        case RUR.SOUTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_s_img;
            } else {
                image = RUR.vis_robot.s_img;
            }
            break;
        case -1:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_random_img;
            } else {
                image = RUR.vis_robot.random_img;
            }
            break;
        default:
            image = RUR.vis_robot.e_img;
        }
    RUR.ROBOT_CTX.drawImage(image, x, y, width, height);
    if (RUR.we.editing_world){
        return;
    }
    RUR.vis_robot.draw_trace(robot);
};


RUR.vis_robot.draw_trace = function (robot) {
    "use strict";
    if (robot === undefined || robot._is_leaky === false || robot._orientation === -1) {
        return;
    }
    if (robot.x > RUR.COLS || robot.y > RUR.ROWS) {
        return;
    }
    var ctx = RUR.TRACE_CTX;
    if (robot.trace_color !== undefined){
        ctx.strokeStyle = robot.trace_color;
    } else {
        ctx.strokeStyle = RUR.vis_robot.trace_color;
    }

    // overrides user choice for large world (small grid size)
    if(RUR.current_world.small_tiles) {
        RUR.vis_robot.trace_offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        RUR.vis_robot.trace_thickness = 2;
    } else {
        RUR.vis_robot.set_trace_style(RUR.TRACE_STYLE, robot);
    }

    ctx.lineWidth = RUR.vis_robot.trace_thickness;
    ctx.lineCap = "round";

    ctx.beginPath();
    // ensure that _prev_orientation and orientation are within bounds as these could be messed
    // up by a user program and crash the robot program with a message sent to the console and nothing else.
    ctx.moveTo(robot._prev_x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation%4][0],
                    RUR.HEIGHT - (robot._prev_y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation%4][1]);
    ctx.lineTo(robot.x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._orientation%4][0],
                    RUR.HEIGHT - (robot.y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._orientation%4][1]);
    ctx.stroke();
};

RUR.vis_robot.set_trace_style = function (choice, robot){
    "use strict";
    if (choice === undefined) {
        return;
    }
    RUR.TRACE_STYLE = choice;
    if (robot !== undefined && robot.trace_style !== undefined){
        choice = robot.trace_style;
    }
    if (choice === "thick") {
        RUR.vis_robot.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        RUR.vis_robot.trace_color = RUR.DEFAULT_TRACE_COLOR;
        RUR.vis_robot.trace_thickness = 4;
    } else if (choice === "invisible") {
        RUR.vis_robot.trace_color = "rgba(0,0,0,0)";
    } else if (choice === "default") {
        RUR.vis_robot.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
        RUR.vis_robot.trace_color = RUR.DEFAULT_TRACE_COLOR;
        RUR.vis_robot.trace_thickness = 1;
    }
};

RUR.vis_robot.set_trace_style("default");

RUR.vis_robot.new_robot_images = function (images) {
    var model = 0;
    if (images.model !== undefined) {
        switch (images.model) {
            case 0:
            case 1:
            case 2:
            case 3:
                model = images.model;
                break;
            default:
                model = 0;
        }
    }

    if (images.east !== undefined) {
        RUR.vis_robot.images[model].robot_e_img.src = images.east;
    }
    if (images.west !== undefined) {
        RUR.vis_robot.images[model].robot_w_img.src = images.west;
    }
    if (images.north !== undefined) {
        RUR.vis_robot.images[model].robot_n_img.src = images.north;
    }
    if (images.south !== undefined) {
        RUR.vis_robot.images[model].robot_s_img.src = images.south;
    }
    if (images.random !== undefined) {
        RUR.vis_robot.images[model].robot_random_img.src = images.random;
    }

    // change the image displayed in the html file.
    switch (model) {
        case 0:
            $("#classic-image img").attr("src", images.east);
            break;
        case 1:
            $("#rover-type img").attr("src", images.east);
            break;
        case 2:
            $("#3d-red-type img").attr("src", images.east);
            break;
        case 3:
            $("#solar-panel-type img").attr("src", images.east);
            break;
    }

    RUR.vis_robot.select_default_model(model);
};

/*jshint  -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR*/

RUR.vis_world = {};

RUR.vis_world.compute_world_geometry = function (cols, rows) {
    "use strict";
    var height, width;
    if (RUR.current_world.small_tiles) {
        RUR.WALL_LENGTH = 20;
        RUR.WALL_THICKNESS = 2;
        RUR.SCALE = 0.5;
    } else {
        RUR.WALL_LENGTH = 40;
        RUR.WALL_THICKNESS = 4;
        RUR.SCALE = 1;
    }

    if (cols !== undefined && rows !== undefined) {
        height = (rows + 1.5) * RUR.WALL_LENGTH;
        width = (cols + 1.5) * RUR.WALL_LENGTH;
    } else {
        height = (RUR.ROWS + 1.5) * RUR.WALL_LENGTH;
        width = (RUR.COLS + 1.5) * RUR.WALL_LENGTH;
    }

    if (height !== RUR.HEIGHT || width !== RUR.WIDTH) {
        RUR.BACKGROUND_CANVAS = document.getElementById("background_canvas");
        RUR.BACKGROUND_CANVAS.width = width;
        RUR.BACKGROUND_CANVAS.height = height;
        RUR.second_layer_canvas = document.getElementById("second_layer_canvas");
        RUR.second_layer_canvas.width = width;
        RUR.second_layer_canvas.height = height;
        RUR.goal_canvas = document.getElementById("goal_canvas");
        RUR.goal_canvas.width = width;
        RUR.goal_canvas.height = height;
        RUR.objects_canvas = document.getElementById("objects_canvas");
        RUR.objects_canvas.width = width;
        RUR.objects_canvas.height = height;
        RUR.trace_canvas = document.getElementById("trace_canvas");
        RUR.trace_canvas.width = width;
        RUR.trace_canvas.height = height;
        RUR.robot_canvas = document.getElementById("robot_canvas");
        RUR.robot_canvas.width = width;
        RUR.robot_canvas.height = height;
        RUR.HEIGHT = height;
        RUR.WIDTH = width;
    }

    // background context may have change - hence wait until here
    // to set
    if (RUR.current_world.small_tiles) {
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }

    RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
    RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 1;
    RUR.current_world.rows = RUR.ROWS;
    RUR.current_world.cols = RUR.COLS;
    RUR.vis_world.draw_all();
};

RUR.vis_world.draw_all = function () {
    "use strict";

    if (RUR.current_world.blank_canvas) {
        if (RUR.we.editing_world) {
            RUR.cd.show_feedback("#Reeborg-shouts",
                                RUR.translate("Editing of blank canvas is not supported."));
            return;
         }
        clearTimeout(RUR.animation_frame_id);
        RUR.animation_frame_id = undefined;
        RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.SECOND_LAYER_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        return;
    }

    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.animated_tiles = false;

    if (RUR.we.editing_world) {
        if (RUR.background_image.src) {
            RUR.vis_world.draw_single_object(RUR.background_image, 1, RUR.ROWS, RUR.BACKGROUND_CTX);
        }
        RUR.vis_world.draw_grid_walls();  // on BACKGROUND_CTX
    } else {
        RUR.vis_world.draw_grid_walls();
        if (RUR.background_image.src) {
            RUR.vis_world.draw_single_object(RUR.background_image, 1, RUR.ROWS, RUR.BACKGROUND_CTX);
        }
    }

    RUR.vis_world.draw_coordinates(); // on BACKGROUND_CTX

    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.draw_goal();  // on GOAL_CTX

    RUR.vis_world.refresh();
};


RUR.vis_world.refresh = function () {
    "use strict";
    // meant to be called at each step
    // does not draw background (i.e. coordinates and grid walls)
    // does not draw goals - they should not change during a running program
    // does not clear trace

    // start by clearing all the relevant contexts first.
    // some objects are drown on their own contexts.
    RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.SECOND_LAYER_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    // animated tiles are redrawn according to their own schedule
    if (!RUR.animated_tiles) {
        RUR.vis_world.draw_animated_tiles(); // on BACKGROUND_CTX
    }
    RUR.vis_world.draw_tiles(RUR.current_world.tiles); // on BACKGROUND_CTX

    if (RUR.__debug) {
        RUR.vis_world.sanity_check(0);
    }
    RUR.vis_world.draw_foreground_walls(RUR.current_world.walls); // on OBJECTS_CTX
    RUR.vis_world.draw_all_objects(RUR.current_world.decorative_objects);
    RUR.vis_world.draw_all_objects(RUR.current_world.objects);  // on OBJECTS_CTX
        // RUR.vis_world.draw_all_objects also called by draw_goal, and draws on GOAL_CTX
        // and, draws some objects on ROBOT_CTX

    // objects: goal is false, tile is true
    RUR.vis_world.draw_all_objects(RUR.current_world.solid_objects, false, true); // likely on RUR.SECOND_LAYER_CTX


    RUR.vis_world.draw_robots(RUR.current_world.robots);  // on ROBOT_CTX
    RUR.vis_world.compile_info();  // on ROBOT_CTX
    RUR.vis_world.draw_info();     // on ROBOT_CTX
    if (RUR.__debug) {
        RUR.vis_world.sanity_check(100);
    }
};

RUR.vis_world.sanity_check = function(offset) {
    // An intermittent bug sometimes  causes the robot NOT to be drawn.
    // This sanity check is, enabled when the debug option is turned on,
    // is performed so as to see if any unexpected
    // canvas clearing occurs.

    RUR.BACKGROUND_CTX.fillStyle = "red";
    RUR.SECOND_LAYER_CTX.fillStyle = "green";
    RUR.GOAL_CTX.fillStyle = "yellow";
    RUR.OBJECTS_CTX.fillStyle = "blue";
    RUR.TRACE_CTX.fillStyle = "cyan";
    RUR.ROBOT_CTX.fillStyle = "magenta";

    RUR.BACKGROUND_CTX.fillRect(0+offset, 0, 10, 10);
    RUR.SECOND_LAYER_CTX.fillRect(10+offset, 0, 10, 10);
    RUR.GOAL_CTX.fillRect(20+offset, 0, 10, 10);
    RUR.OBJECTS_CTX.fillRect(30+offset, 0, 10, 10);
    RUR.TRACE_CTX.fillRect(40+offset, 0, 10, 10);
    RUR.ROBOT_CTX.fillRect(50+offset, 0, 10, 10);
};


RUR.vis_world.draw_coordinates = function() {
    "use strict";
    var x, y, ctx = RUR.BACKGROUND_CTX;

    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - RUR.WALL_LENGTH/2;
    for(x=1; x <= RUR.COLS; x++){
        ctx.fillText(x, (x+0.5)*RUR.WALL_LENGTH, y);
    }
    x = RUR.WALL_LENGTH/2 -5;
    for(y=1; y <= RUR.ROWS; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*RUR.WALL_LENGTH);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
};


RUR.vis_world.draw_grid_walls = function(){
    var i, j, ctx;
    if (RUR.we.editing_world) {
        ctx = RUR.GOAL_CTX;     // have the appear above the tiles while editing
    } else {
        ctx = RUR.BACKGROUND_CTX;
    }

    ctx.fillStyle = RUR.SHADOW_WALL_COLOR;
    for (i = 1; i <= RUR.COLS; i++) {
        for (j = 1; j <= RUR.ROWS; j++) {
            RUR.vis_world.draw_north_wall(ctx, i, j);
            RUR.vis_world.draw_east_wall(ctx, i, j);
        }
    }
};

RUR.vis_world.draw_foreground_walls = function (walls) {
    "use strict";
    var keys, key, i, j, k, ctx = RUR.OBJECTS_CTX;


    // border walls (x and y axis)
    ctx.fillStyle = RUR.WALL_COLOR;
    for (j = 1; j <= RUR.ROWS; j++) {
        RUR.vis_world.draw_east_wall(ctx, 0, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        RUR.vis_world.draw_north_wall(ctx, i, 0);
    }
    for (j = 1; j <= RUR.ROWS; j++) {
        RUR.vis_world.draw_east_wall(ctx, RUR.COLS, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        RUR.vis_world.draw_north_wall(ctx, i, RUR.ROWS);
    }


    if (walls === undefined || walls == {}) {
        return;
    }

    // other walls
    keys = Object.keys(walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( walls[keys[key]].indexOf("north") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            RUR.vis_world.draw_north_wall(ctx, i, j);
        }
        if (walls[keys[key]].indexOf("east") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
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
    "use strict";
    var robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        if (robots[robot].start_positions !== undefined && robots[robot].start_positions.length > 1){
            RUR.vis_world.draw_robot_clones(robots[robot]);
        } else {
            RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        }
    }
};

RUR.vis_world.draw_robot_clones = function(robot){
    "use strict";
    var i, clone;
    RUR.ROBOT_CTX.save();
    RUR.ROBOT_CTX.globalAlpha = 0.4;
    for (i=0; i < robot.start_positions.length; i++){
            clone = JSON.parse(JSON.stringify(robot));
            clone.x = robot.start_positions[i][0];
            clone.y = robot.start_positions[i][1];
            clone._prev_x = clone.x;
            clone._prev_y = clone.y;
            RUR.vis_robot.draw(clone);
    }
    RUR.ROBOT_CTX.restore();
};

RUR.vis_world.draw_goal = function () {
    "use strict";
    var goal, ctx = RUR.GOAL_CTX;

    if (RUR.we.editing_world){  // have to appear above tiles;
        RUR.vis_world.draw_grid_walls();  //  so this is a convenient canvas
    }

    if (RUR.current_world.goal === undefined) {
        return;
    }

    goal = RUR.current_world.goal;
    if (goal.position !== undefined) {
        RUR.vis_world.draw_goal_position(goal, ctx);
    }
    if (goal.objects !== undefined){
        RUR.vis_world.draw_all_objects(goal.objects, true);
    }

    if (goal.walls !== undefined){
        RUR.vis_world.draw_goal_walls(goal, ctx);
    }
};


RUR.vis_world.draw_goal_position = function (goal, ctx) {
    "use strict";
    var image, i, g;

    if (goal.position.image !== undefined &&
        typeof goal.position.image === 'string' &&
        RUR.home_images[goal.position.image] !== undefined){
        image = RUR.home_images[goal.position.image].image;
    } else {    // For anyone wondering, this step might be needed only when using older world
                // files that were created when there was not a choice
                // of image for indicating the home position.
        image = RUR.home_images.green_home_tile.image;
    }
    if (goal.possible_positions !== undefined && goal.possible_positions.length > 1){
            ctx.save();
            ctx.globalAlpha = 0.5;
            for (i=0; i < goal.possible_positions.length; i++){
                    g = goal.possible_positions[i];
                    RUR.vis_world.draw_single_object(image, g[0], g[1], ctx);
            }
            ctx.restore();
    } else {
        RUR.vis_world.draw_single_object(image, goal.position.x, goal.position.y, ctx);
    }
};

RUR.vis_world.draw_goal_walls = function (goal, ctx) {
    "use strict";
    var key, keys, i, j, k;
    ctx.fillStyle = RUR.WALL_COLOR;
    keys = Object.keys(goal.walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( goal.walls[keys[key]].indexOf("north") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            RUR.vis_world.draw_north_wall(ctx, i, j, true);
        }
        if (goal.walls[keys[key]].indexOf("east") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            RUR.vis_world.draw_east_wall(ctx, i, j, true);
        }
    }
};

RUR.vis_world.clear_trace = function(){
    "use strict";
    // potentially useful as it can be called from a user's program.
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
};

RUR.vis_world.draw_tiles = function (tiles){
    "use strict";
    var i, j, k, keys, key, image, tile, colour;
    if (tiles === undefined) {
        return;
    }
    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if (tiles[keys[key]] !== undefined) {
            tile = RUR.tiles[tiles[keys[key]]];
            if (tile === undefined) {
                colour = tiles[keys[key]];
                RUR.vis_world.draw_coloured_tile(colour, i, j, RUR.BACKGROUND_CTX);
                continue;
            }
        }

        if (tile.choose_image === undefined){
            image = tile.image;
            RUR.vis_world.draw_single_object(image, i, j, RUR.BACKGROUND_CTX);
        }
    }
};

RUR.vis_world.draw_animated_tiles = function (){
    "use strict";
    var i, j, k, keys, key, image, tile, tiles;

    tiles = RUR.current_world.tiles;
    if (tiles === undefined) {
        return;
    }

    RUR.animated_tiles = false;
    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        tile = RUR.tiles[tiles[keys[key]]];
        if (tile === undefined) {
            continue;
        }
        if (tile.choose_image !== undefined){
            RUR.animated_tiles = true;
            image = tile.choose_image();
            RUR.vis_world.draw_single_object(image, i, j, RUR.BACKGROUND_CTX);
        }
    }
    if (RUR.animated_tiles) {
        clearTimeout(RUR.animation_frame_id);
        RUR.animation_frame_id = setTimeout(RUR.vis_world.draw_animated_tiles, 120);
    }
};

RUR.vis_world.draw_coloured_tile = function (colour, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS;
    var x, y, size;
    if (i > RUR.COLS || j > RUR.ROWS){
        return;
    }
    x = i*RUR.WALL_LENGTH + thick/2;
    y = RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + thick/2;
    size = RUR.WALL_LENGTH*RUR.SCALE;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};


RUR.vis_world.draw_all_objects = function (objects, goal, tile){
    "use strict";
    var i, j, image, ctx, coords, specific_object, objects_here, obj_name, grid_pos;
    if (objects === undefined) {
        return;
    }

    for (coords in objects){
        if (objects.hasOwnProperty(coords)){
            objects_here = objects[coords];
            grid_pos = coords.split(",");
            i = parseInt(grid_pos[0], 10);
            j = parseInt(grid_pos[1], 10);
            if (i <= RUR.COLS && j <= RUR.ROWS) {
                for (obj_name in objects_here){
                    if (objects_here.hasOwnProperty(obj_name)){
                        if (tile){
                            specific_object = RUR.solid_objects[obj_name];
                        } else {
                            specific_object = RUR.objects[obj_name];
                        }
                        if (goal) {
                            ctx = RUR.GOAL_CTX;
                            image = specific_object.image_goal;
                        } else if (specific_object.ctx !== undefined){
                            ctx = specific_object.ctx;
                            image = specific_object.image;
                        } else {
                            ctx = RUR.OBJECTS_CTX;
                            image = specific_object.image;
                        }
                        RUR.vis_world.draw_single_object(image, i, j, ctx);
                    }
                }
            }
        }
    }
};

RUR.vis_world.draw_single_object = function (image, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS;
    var x, y;
    if (i > RUR.COLS || j > RUR.ROWS){
        return;
    }
    x = i*RUR.WALL_LENGTH + thick/2;
    y = RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + thick/2;
    try{
       ctx.drawImage(image, x, y, image.width*RUR.SCALE, image.height*RUR.SCALE);
   } catch (e) {
       console.log("problem in draw_single_object", image, ctx);
   }
};



RUR.vis_world.compile_info = function() {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drown - if anything.
    var coords, obj, quantity;
    RUR.vis_world.information = {};
    RUR.vis_world.goal_information = {};
    RUR.vis_world.goal_present = false;
    if (RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.objects !== undefined) {
        RUR.vis_world.compile_partial_info(RUR.current_world.goal.objects,
            RUR.vis_world.goal_information, 'goal');
            RUR.vis_world.goal_present = true;
    }


    if (RUR.current_world.objects !== undefined) {
        RUR.vis_world.compile_partial_info(RUR.current_world.objects,
            RUR.vis_world.information, 'objects');
    }
};

RUR.vis_world.compile_partial_info = function(objects, information, type){
    "use strict";
    var coords, obj, quantity, color, goal_information;
    if (type=="objects") {
        color = "black";
        goal_information = RUR.vis_world.goal_information;
    } else {
        color = "blue";
    }

    for (coords in objects) {
        if (objects.hasOwnProperty(coords)){
            // objects found here
            for(obj in objects[coords]){
                if (objects[coords].hasOwnProperty(obj)){
                    if (information[coords] !== undefined){
                        // already at least one other object there
                        information[coords] = [undefined, "?"];  // assign impossible object
                    } else {
                        quantity = objects[coords][obj];
                        if (quantity.toString().indexOf("-") != -1) {
                            quantity = "?";
                        } else if (quantity == "all") {
                            quantity = "?";
                        } else {
                            try{
                                quantity = parseInt(quantity, 10);
                            } catch (e) {
                                quantity = "?";
                                console.log("WARNING: this should not happen in RUR.vis_world.compile_info");
                            }
                        }
                        if (RUR.vis_world.goal_present && typeof quantity == 'number' && goal_information !== undefined) {
                            if ( goal_information[coords] !== undefined &&  goal_information[coords][1] == objects[coords][obj]) {
                            information[coords] = [obj, objects[coords][obj], 'green'];
                            } else {
                                information[coords] = [obj, objects[coords][obj], 'red'];
                            }
                        } else {
                            information[coords] = [obj, quantity, color];
                        }
                    }
                }
            }
        }
    }
};

RUR.vis_world.draw_info = function() {
    var i, j, coords, keys, key, info, ctx;
    var scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;
    if (RUR.vis_world.information === undefined &&
        RUR.vis_world.goal_information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;

    if (RUR.vis_world.information !== undefined) {
        keys = Object.keys(RUR.vis_world.information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.information[coords][1];
            if (i <= RUR.COLS && j <= RUR.ROWS){
                text_width = ctx.measureText(info).width/2;
                ctx.font = RUR.BACKGROUND_CTX.font;
                ctx.fillStyle = RUR.vis_world.information[coords][2];
                // information drawn to left side of object
                ctx.fillText(info, (i+0.2)*scale, Y - (j)*scale);
            }
        }
    }

    if (RUR.vis_world.goal_information !== undefined) {
        keys = Object.keys(RUR.vis_world.goal_information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.goal_information[coords][1];
            if (i <= RUR.COLS && j <= RUR.ROWS){
                text_width = ctx.measureText(info).width/2;
                ctx.font = RUR.BACKGROUND_CTX.font;
                ctx.fillStyle = RUR.vis_world.goal_information[coords][2];
                // information drawn to right side of object
                ctx.fillText(info, (i+0.8)*scale, Y - (j)*scale);
            }
        }
    }
};

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
    world.objects = {};
    // allow teacher to insert code to be run before and after the
    // code entered by the student
    world.small_tiles = false;
    world.rows = RUR.MAX_Y;
    world.cols = RUR.MAX_X;

    return world;
};
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, 2);
};

RUR.world.import_world = function (json_string) {
    "use strict";
    var body, editor_content, library_content;
    if (json_string === undefined){
        console.log("Problem: no argument passed to RUR.world.import_world");
        return {};
    }
    if (typeof json_string == "string"){
        try {
            RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
        } catch (e) {
            console.log("Exception caught in import_world.");
            console.log(json_string);
            console.log(e);
            RUR.world.create_empty_world();
            return;
        }
    } else {  // already parsed
        RUR.current_world = json_string;
    }

    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            RUR.robot.cleanup_objects(RUR.current_world.robots[0]);
            body = RUR.current_world.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body._orientation;
        }
    }

    // Backward compatibility following change done on Jan 5, 2016
    // top_tiles has been renamed solid_objects; to ensure compatibility of
    // worlds created prior to using solid_objects, we change the old name
    // following http://stackoverflow.com/a/14592469/558799
    // thus ensuring that if a new world is created from an old one,
    // it will have the new syntax.
    if (RUR.current_world.top_tiles !== undefined) {
        Object.defineProperty(RUR.current_world, "solid_objects",
            Object.getOwnPropertyDescriptor(RUR.current_world, "top_tiles"));
        delete RUR.current_world.top_tiles;
    }

    if (RUR.current_world.background_image !== undefined) {
        RUR.background_image.src = RUR.current_world.background_image;
        RUR.background_image.onload = function () {
            RUR.vis_world.draw_all();
        };
    } else {
        RUR.background_image.src = '';
    }

    if (RUR.current_world.onload !== undefined) {
        try {
            eval(RUR.current_world.onload);  // jshint ignore:line
        } catch (e) {
            RUR.cd.show_feedback("#Reeborg-shouts",
                RUR.translate("Problem with onload code.") + "<br><pre>" +
                RUR.current_world.onload + "</pre>");
        }
    }

    RUR.current_world.small_tiles = RUR.current_world.small_tiles || false;
    RUR.current_world.rows = RUR.current_world.rows || RUR.MAX_Y;
    RUR.current_world.cols = RUR.current_world.cols || RUR.MAX_X;
    RUR.vis_world.compute_world_geometry(RUR.current_world.cols, RUR.current_world.rows);

    $("#add_editor_to_world").prop("checked",
                                   RUR.current_world.editor !== undefined);
    $("#add_library_to_world").prop("checked",
                                    RUR.current_world.library !== undefined);

    if (RUR.current_world.editor !== undefined &&
        RUR.current_world.editor !== editor.getValue()) {
        RUR.cd.dialog_update_editors_from_world.dialog("open");
        $("#update-editor-content").show();
    } else {
        $("#update-editor-content").hide();
    }
    if (RUR.programming_language === "python" &&
        RUR.current_world.library !== undefined &&
        RUR.current_world.library !== library.getValue()) {
        RUR.cd.dialog_update_editors_from_world.dialog("open");
        $("#update-library-content").show();
    } else {
        $("#update-library-content").hide();
    }

    // make a clean (predictable) copy
    RUR.current_world = RUR.world.editors_remove_default_values(RUR.current_world);
    RUR.world.saved_world = RUR.world.clone_world();
    // restore defaults everywhere for easier comparison when editing
    RUR.current_world = RUR.world.editors_set_default_values(RUR.current_world);
    RUR.world.update_editors(RUR.current_world);

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
    if (RUR.MAX_NB_ROBOTS !== undefined){
        delete RUR.MAX_NB_ROBOTS;
    }
    RUR.vis_robot.set_trace_style("default");
    RUR.MAX_STEPS = 1000;
    RUR.vis_world.draw_all();
};

RUR.world.add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    if (RUR.MAX_NB_ROBOTS !== undefined &&
        RUR.MAX_NB_ROBOTS >= RUR.current_world.robots.length){
        throw new RUR.ReeborgError(RUR.translate("You cannot create another robot!"));
    }
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


RUR.world.remove_robots = function () {
    if (RUR.MAX_NB_ROBOTS !== undefined){
        throw new RUR.ReeborgError(RUR.translate("Cheater! You are not allowed to change the number of robots this way!"));
    } else {
        RUR.current_world.robots = [];
    }
};

/* When a world is edited, as we are about to leave the editing mode,
   a comparison of the world before editing and after is performed.
   If the content of the world before and after has changed, including that
   of the editors, this is taken as an indication that the world should
   perhaps be saved.  Some worlds are saved without having some content in
   the extra editors (perhaps because they were created before new editors
   were added, or since the new cleanup procedure was introduced). To avoid
   erroneous indication that the world content has changed, we use the
   following.
*/
RUR.world.editors_default_values = {
    'pre_code': '"pre code"',
    'post_code': '"post code"',
    'description': 'description',
    'onload': '/* Javascript */'
};

RUR.world.editors_set_default_values = function (world) {
    "use strict";
    var edit, editors;
    editors = RUR.world.editors_default_values;
    for (edit in editors){
        if (!world[edit]){
            world[edit] = editors[edit];
        }
    }
    return world;
};

RUR.world.editors_remove_default_values = function (world) {
    "use strict";
    var edit, editors;
    editors = RUR.world.editors_default_values;
    for (edit in editors) {
        if (world[edit] === undefined) {
            continue;
        }
        if (world[edit] == editors[edit] || world[edit].trim().length < 3) {
            try {
                delete world[edit];
            } catch (e) {}
        }
    }
    return world;
};

RUR.world.update_from_editors = function (world) {
    /* When editing a world, new content may be inserted in the additional
       editors.  This function updates the world to include this content,
       while removing the irrelevant, default */
    world.pre_code = pre_code_editor.getValue();
    world.post_code = post_code_editor.getValue();
    world.description = description_editor.getValue();
    world.onload = onload_editor.getValue();
    return RUR.world.editors_remove_default_values(world);
};

RUR.world.update_editors = function (world) {
   pre_code_editor.setValue(world.pre_code);
   post_code_editor.setValue(world.post_code);
   description_editor.setValue(world.description);
   onload_editor.setValue(world.onload);
   // todo: conditionally update editor and library.
};
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
        case "solid_object":
            RUR.we.toggle_solid_object(value);
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
            case "solid_objects":
                $("#edit-solid_object").show();
                RUR.we.alert_1("Click on desired object below.");
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
        case "solid_object":
            $("#edit-solid_object").show();
            RUR.we.alert_2("Click on world to toggle object.", value);
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

    tiles = RUR.control.get_solid_objects_at_position(x, y);
    if (tiles) {
        for (tilename in tiles) {
            tile = RUR.solid_objects[tilename];
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

    if (!tile) {  // if we cancel the dialog
        return;
    } else if (tile === "colour") {
        RUR.we.call_back = RUR.we.toggle_tile;
        RUR.cd.dialog_select_colour.dialog("open");
        return;
    }

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

    if (!tile) {    // if we cancel the dialog
        return;
    } else if (tile === "colour") {
        RUR.we.call_back = RUR.we.fill_with_tile;
        RUR.cd.dialog_select_colour.dialog("open");
        return;
    }

    RUR.we.ensure_key_exist(RUR.current_world, "tiles");
    for (x = 1; x <= RUR.COLS; x++) {
        for (y = 1; y <= RUR.ROWS; y++) {
            coords = x + "," + y;
            RUR.current_world.tiles[coords] = tile;
        }
    }
};


RUR.we.toggle_solid_object = function (obj){
    // will remove the position if clicked again with object of same type.
    "use strict";
    var x, y, position;

    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.control.get_solid_objects_at_position(x, y)[obj] !== undefined) {
        RUR.we.add_solid_object(obj, x, y, 0);
    } else {
        RUR.we.add_solid_object(obj, x, y, 1);
    }
};


RUR.we.add_solid_object = function (specific_object, x, y, nb){
    "use strict";
    var coords, tmp;

    coords = x + "," + y;
    RUR.we.ensure_key_exist(RUR.current_world, "solid_objects");
    RUR.we.ensure_key_exist(RUR.current_world.solid_objects, coords);

    try {
        tmp = parseInt(nb, 10);
        nb = tmp;
    } catch (e) {}

    if (nb === 0) {
        delete RUR.current_world.solid_objects[coords][specific_object];
        if (Object.keys(RUR.current_world.solid_objects[coords]).length === 0){
            delete RUR.current_world.solid_objects[coords];
        }
        if (Object.keys(RUR.current_world.solid_objects).length === 0){
            delete RUR.current_world.solid_objects;
        }
    } else {
        RUR.current_world.solid_objects[coords][specific_object] = nb;
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
    if (RUR.current_world.solid_objects !== undefined) {
        if (RUR.current_world.solid_objects[coords] !== undefined){
            delete RUR.current_world.solid_objects[coords];
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
/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

/*  Purpose of this file: abstract handling of menus so that all jQuery
    dependencies (and possibly obscure syntax in some cases) can be pulled
    away from other files.

    The world menu is currently an html select element with
    id = select_world.  Doing a global search for "#select_world" should
    only find items in this file.
*/

RUR.world_select = {};

RUR.world_select.empty_menu = function () {
    $("#select_world").html('');
};

RUR.world_select.set_default = function () {
    $("#select_world").selectedIndex = 0;
    $("#select_world").change();
};

RUR.world_select.set_url = function (url) {
    $('#select_world').val(url);
    $("#select_world").change();
};

RUR.world_select.get_selected = function () {
    "use strict";
    var select, index, url, shortname;
    select = document.getElementById("select_world");
    index = select.selectedIndex;
    try {
        url = select.options[index].value;
        shortname = select.options[index].text;
    } catch (e) {
        url = select.options[0].value;
        shortname = select.options[0].text;
    }
    return {url:url, shortname:shortname};
};

RUR.world_select.url_from_shortname = function (shortname) {
    // if exists, returns the corresponding url
    "use strict";
    var i, select;
    select = document.getElementById("select_world");
    shortname = shortname.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].text.toLowerCase() === shortname) {
            return select.options[i].value;
        }
    }
    return undefined;
};

RUR.world_select.replace_shortname = function (url, shortname) {
    "use strict";
    var i, select;
    select = document.getElementById("select_world");
    url = url.toLowerCase();

    for (i=0; i < select.options.length; i++){
        if (select.options[i].value.toLowerCase() === url) {
            select.options[i].text = shortname;
            return true;
        }
    }
    return false;
};

RUR.world_select.append_world = function (arg) {
    "use strict";
    var option_elt, url, shortname;
    url = arg.url;

    if (arg.shortname !== undefined) {
        shortname = arg.shortname;
    } else {
        shortname = url;
    }

    // allow for special styling of any url containing the string "menu".
    if (url.indexOf('menu') != -1) {
        option_elt = '<option class="select-menu"></option>';
    } else if (arg.local_storage !== undefined){
        option_elt = '<option class="select-local-storage"></option>';
    } else {
        option_elt = '<option></option>';
    }
    // Append only if new world.
    if (!RUR.world_select.replace_shortname(url, shortname)) {
        $('#select_world').append( $(option_elt).val(url).html(shortname));
    }
};
// called by zzz_doc_ready.js
RUR.zz_dr_dialogs = function () {

    function create_and_activate_dialog(button, element, add_options, special_fn) {
        var options = {
        minimize: true,
        maximize: false,
        autoOpen: false,
        width: 800,
        height: 600,
        position: {my: "center", at: "center", of: window},
        beforeClose: function( event, ui ) {
                button.addClass("blue-gradient").removeClass("reverse-blue-gradient");
                if (special_fn !== undefined){
                    special_fn();
                }
            }
        };
        for (var attrname in add_options) {
            options[attrname] = add_options[attrname];
        }

        button.on("click", function(evt) {
            element.dialog(options);
            button.toggleClass("blue-gradient");
            button.toggleClass("reverse-blue-gradient");
            if (button.hasClass("reverse-blue-gradient")) {
                element.dialog("open");
            } else {
                element.dialog("close");
            }
            if (special_fn !== undefined && element.dialog("isOpen")){
                special_fn();
            }
        });
    }

    create_and_activate_dialog($("#edit-world"), $("#edit-world-panel"), {}, toggle_editing_mode);
    create_and_activate_dialog($("#about-button"), $("#about-div"), {});
    create_and_activate_dialog($("#more-menus-button"), $("#more-menus"), {height:700});
    create_and_activate_dialog($("#world-info-button"), $("#World-info"), {height:300, width:600}, RUR.we.show_world_info);
    create_and_activate_dialog($("#special-keyboard-button"), $("#special-keyboard"),
            {autoOpen:false, width:600,  height:350, maximize: false, position:"left"});

    $("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                    position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert",
                                    position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:250,
                                    position:{my: "bottom", at: "bottom-20", of: window}});
    $("#Reeborg-explores").dialog({minimize: false, maximize: false, autoOpen:false, width:600,
                                    position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-proclaims").dialog({minimize: false, maximize: false, autoOpen:false, width:800, dialogClass: "proclaims",
                                    position:{my: "bottom", at: "bottom-80", of: window}});
    $("#Reeborg-watches").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:400, dialogClass: "watches",
                                    position:{my: "bottom", at: "bottom-140", of: window}});


};

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world, parseUri*/

$(document).ready(function() {
    "use strict";
    var prog_lang, url_query, name;
    var human_language = document.documentElement.lang;
    RUR._highlight = true;
    RUR._python_loaded = false;

    function everything_loaded () {
        var loaded, total_images, py_modules=0;
        if (RUR.objects.loaded_images == RUR.objects.nb_images &&
            RUR.vis_robot.loaded_images == RUR.vis_robot.nb_images){
            RUR.vis_world.draw_all();
            $("#splash-screen").hide();
        } else {
            loaded = RUR.objects.loaded_images + RUR.vis_robot.loaded_images;
            total_images = RUR.objects.nb_images + RUR.vis_robot.nb_images;
            if (!RUR._python_loaded) {
                $("#splash-text").html("Loading Python modules. <br>Images: " + loaded + "/" + total_images);
            } else {
                $("#splash-text").html("Images: " + loaded + "/" + total_images);
            }
            requestAnimationFrame(everything_loaded);
        }
    }
    everything_loaded();

    RUR.rec.reset();
    try {
        RUR.world_select.set_url(localStorage.getItem(RUR.settings.world));
    } catch (e) {
        RUR.world_select.set_default();
    }

    // check if this is needed or does conflict with MakeCustomMenu
    RUR.settings.initial_world = localStorage.getItem(RUR.settings.world);

    RUR.cd.create_custom_dialogs();
    RUR.zz_dr_dialogs();
    RUR.zz_dr_onclick();
    RUR.zz_dr_onchange();
    RUR.zz_dr_editor_ui();

    brython({debug:1, pythonpath:['/src/python']});

    RUR.ui.show_only_reload2(false);

    try {
        RUR.reset_code_in_editors();
    } catch (e){
        console.log(e);
        RUR.cd.show_feedback("#Reeborg-shouts",
                        "Your browser does not support localStorage. " +
                        "You will not be able to save your functions in the library.");
    }
    // for embedding in iframe
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.permalink.update(event.data);
    }

    RUR.ui.set_ready_to_run();
    RUR.kbd.select();

    RUR.make_default_menu(human_language);


    url_query = parseUri(window.location.href);
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined &&
       url_query.queryKey.library !== undefined) {
        prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        name = RUR.translate("PERMALINK");
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        RUR.storage.save_world(name);

        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    } else {
        prog_lang = localStorage.getItem("last_programming_language_" + human_language);
        switch (prog_lang) {
            case 'python-' + human_language:
                $("#python_choices").val("editor").change();  // jshint ignore:line
            case 'javascript-' + human_language:
                $("#javascript_choices").val("editor").change(); // jshint ignore:line
            default:
                RUR.reset_programming_language('python-' + human_language);
        }
        // trigger it to load the initial world.
        $("#select_world").change();
    }
    if(url_query.queryKey.css !== undefined) {
        var new_css = decodeURIComponent(url_query.queryKey.css);
        eval(new_css);  // jshint ignore:line
    }
});
/* jshint -W069 */

RUR.color_basic = 120;
RUR.color_condition = 240;
RUR.done_colour = "#aa0000";
RUR.blockly = {};

/****  Begin over-riding Blockly's default */
Blockly.Blocks.loops.HUE = 230;

Blockly.JavaScript['text_print'] = function(block) {
  var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'';
  return RUR.translate("write")+'(' + argument0 + ');\n';
};
Blockly.Msg.TEXT_PRINT_TITLE = "print %1";
Blockly.makeColour = function(hue) {
  if (hue === RUR.done_colour){
      return hue;
  }
  return goog.color.hsvToHex(hue, Blockly.HSV_SATURATION,
      Blockly.HSV_VALUE * 255);
};

if (document.documentElement.lang=="fr") {
    Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE = "pour";
    Blockly.Msg.PROCEDURES_DEFRETURN_TITLE = "pour";
}
Blockly.Python.INDENT = '    ';
Blockly.JavaScript.INDENT = '    ';
Blockly.Msg.CONTROLS_IF_MSG_THEN = "    " + Blockly.Msg.CONTROLS_IF_MSG_THEN;
Blockly.Msg.CONTROLS_REPEAT_INPUT_DO = "    " + Blockly.Msg.CONTROLS_REPEAT_INPUT_DO;
Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO = "    " + Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO;

// removing mutator for simple function definitions as per
// https://groups.google.com/d/msg/blockly/_rrwh-Lc-sE/cHAk5yNfhUEJ

(function(){var old = Blockly.Blocks.procedures_defnoreturn.init;
    Blockly.Blocks.procedures_defnoreturn.init =
    function(){old.call(this);
        this.setMutator(undefined);
        // this.setColour(RUR.color_basic);
    };
})();

/****  End of over-riding Blockly's default */

Blockly.Blocks['_sound_'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(RUR.translate("sound"))
        .appendField(new Blockly.FieldCheckbox("TRUE"), "SOUND");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(20);
    this.setTooltip('');
  }
};
Blockly.JavaScript['_sound_'] = function(block) {
  var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
  if (checkbox_sound) {
      return RUR.translate("sound") + "(true);\n";
  } else {
      return RUR.translate("sound") + "(false);\n";
  }
};
Blockly.Python['_sound_'] = function(block) {
  var checkbox_sound = block.getFieldValue('SOUND') == 'TRUE';
  if (checkbox_sound) {
      return RUR.translate("sound") + "(True)\n";
  } else {
      return RUR.translate("sound") + "(False)\n";
  }
};


Blockly.Blocks['_think_'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField(RUR.translate("think"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
    this.setTooltip(RUR.translate("Delay between actions; default is 300 ms."));
  }
};
Blockly.Python['_think_'] = function(block) {
  var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
  return RUR.translate("think") + "("+value_name+")\n";
};
Blockly.JavaScript['_think_'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  return RUR.translate("think") + "("+value_name+");\n";
};



Blockly.Blocks['_move_'] = {
  init: function() {
    this.setColour(RUR.color_basic);
    this.appendDummyInput().appendField(RUR.translate("move"));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(RUR.translate("move forward"));
  }
};
Blockly.Python['_move_'] = function(block) {
  return RUR.translate("move")+'()\n';
};
Blockly.JavaScript['_move_'] = function(block) {
  return RUR.translate("move")+'();\n';
};


Blockly.Blocks['_turn_left_'] = {
  init: function() {
    this.setColour(RUR.color_basic);
    this.appendDummyInput().appendField(RUR.translate("turn_left")+" \u21BA");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(RUR.translate("turn left"));
  }
};
Blockly.Python['_turn_left_'] = function(block) {
  return RUR.translate("turn_left")+'()\n';
};
Blockly.JavaScript['_turn_left_'] = function(block) {
  return RUR.translate("turn_left")+'();\n';
};


Blockly.Blocks['_take_'] = {
  init: function() {
    this.setColour(RUR.color_basic);
    this.appendDummyInput().appendField(RUR.translate("take"));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(RUR.translate("take object"));
  }
};
Blockly.Python['_take_'] = function(block) {
  return RUR.translate("take")+'()\n';
};
Blockly.JavaScript['_take_'] = function(block) {
  return RUR.translate("take")+'();\n';
};


Blockly.Blocks['_put_'] = {
  init: function() {
    this.setColour(RUR.color_basic);
    this.appendDummyInput().appendField(RUR.translate("put"));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(RUR.translate("put object"));
  }
};
Blockly.Python['_put_'] = function(block) {
  return RUR.translate("put")+'()\n';
};
Blockly.JavaScript['_put_'] = function(block) {
  return RUR.translate("put")+'();\n';
};


Blockly.Blocks['_pause_'] = {
  init: function() {
    this.setColour(30);
    this.appendDummyInput().appendField(RUR.translate("pause"));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(RUR.translate("Pause the program's execution."));
  }
};
Blockly.Python['_pause_'] = function(block) {
  return RUR.translate("pause")+'()\n';
};
Blockly.JavaScript['_pause_'] = function(block) {
  return RUR.translate("pause")+'();\n';
};


Blockly.Blocks['_build_wall_'] = {
  init: function() {
    this.setColour(RUR.color_basic);
    this.appendDummyInput().appendField(RUR.translate("build_wall"));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(RUR.translate("Build a wall in front of the robot."));
  }
};
Blockly.Python['_build_wall_'] = function(block) {
  return RUR.translate("build_wall")+'()\n';
};
Blockly.JavaScript['_build_wall_'] = function(block) {
  return RUR.translate("build_wall")+'();\n';
};


Blockly.Blocks['_done_'] = {
  init: function() {
    this.setColour(RUR.done_colour);
    this.appendDummyInput().appendField(RUR.translate("done"));
    this.setPreviousStatement(true);
    this.setTooltip(RUR.translate("End the program's execution."));
  }
};
Blockly.Python['_done_'] = function(block) {
  return RUR.translate("done")+'()\n';
};
Blockly.JavaScript['_done_'] = function(block) {
  return RUR.translate("done")+'();\n';
};


Blockly.Blocks['_wall_in_front_or_right_'] = {
  init: function() {
    var choices =  [
        [RUR.translate("wall_in_front"), RUR.translate("wall_in_front")],
        [RUR.translate("wall_on_right"), RUR.translate("wall_on_right")]];
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
    this.setOutput(true, "Boolean");
    this.setTooltip(RUR.translate("True if a wall is blocking the way."));
  }
};
Blockly.Python['_wall_in_front_or_right_'] = function(block) {
  return [block.getFieldValue('choice')+'()'];
};
Blockly.JavaScript['_wall_in_front_or_right_'] = function(block) {
  return [block.getFieldValue('choice')+'()'];
};


Blockly.Blocks['_front_or_right_is_clear_'] = {
  init: function() {
    var choices =  [
        [RUR.translate("front_is_clear"), RUR.translate("front_is_clear")],
        [RUR.translate("right_is_clear"), RUR.translate("right_is_clear")]];
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(new Blockly.FieldDropdown(choices), 'choice');
    this.setOutput(true, "Boolean");
    this.setTooltip(RUR.translate("True if nothing is blocking the way."));
  }
};
Blockly.Python['_front_or_right_is_clear_'] = function(block) {
  return [block.getFieldValue('choice')+'()'];
};
Blockly.JavaScript['_front_or_right_is_clear_'] = function(block) {
  return [block.getFieldValue('choice')+'()'];
};


Blockly.Blocks['_at_goal_'] = {
  init: function() {
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(RUR.translate("at_goal"));
    this.setOutput(true, "Boolean");
    this.setTooltip(RUR.translate("True if desired destination."));
  }
};
Blockly.Python['_at_goal_'] = function(block) {
  return [RUR.translate("at_goal")+'()'];
};
Blockly.JavaScript['_at_goal_'] = function(block) {
  return [RUR.translate("at_goal")+'()'];
};


Blockly.Blocks['_carries_object_'] = {
  init: function() {
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(RUR.translate("carries_object"));
    this.setOutput(true, "Boolean");
    this.setTooltip(RUR.translate("True if robot carries at least one object."));
  }
};
Blockly.Python['_carries_object_'] = function(block) {
  return [RUR.translate("carries_object")+'()'];
};
Blockly.JavaScript['_carries_object_'] = function(block) {
  return [RUR.translate("carries_object")+'()'];
};


Blockly.Blocks['_object_here_'] = {
  init: function() {
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(RUR.translate("object_here"));
    this.setOutput(true, "Boolean");
    this.setTooltip(RUR.translate("True if there is at least one object here."));
  }
};
Blockly.Python['_object_here_'] = function(block) {
  return [RUR.translate("object_here")+'()'];
};
Blockly.JavaScript['_object_here_'] = function(block) {
  return [RUR.translate("object_here")+'()'];
};


Blockly.Blocks['_is_facing_north_'] = {
  init: function() {
    this.setColour(RUR.color_condition);
    this.appendDummyInput().appendField(RUR.translate("is_facing_north"));
    this.setOutput(true, "Boolean");
    this.setTooltip(RUR.translate("True if robot is facing North."));
  }
};
Blockly.Python['_is_facing_north_'] = function(block) {
  return [RUR.translate("is_facing_north")+'()'];
};
Blockly.JavaScript['_is_facing_north_'] = function(block) {
  return [RUR.translate("is_facing_north")+'()'];
};


Blockly.Blocks['_star_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("star"))
        .appendField(new Blockly.FieldImage("/src/images/star.png", 15, 15, RUR.translate("star")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_star_'] = function(block) {
  return [RUR.translate("star")];
};
Blockly.JavaScript['_star_'] = function(block) {
  return [RUR.translate("star")];
};

Blockly.Blocks['_token_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("token"))
        .appendField(new Blockly.FieldImage("/src/images/token.png", 15, 15, RUR.translate("token")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_token_'] = function(block) {
  return [RUR.translate("token")];
};
Blockly.JavaScript['_token_'] = function(block) {
  return [RUR.translate("token")];
};

Blockly.Blocks['_apple_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("apple"))
        .appendField(new Blockly.FieldImage("/src/images/apple.png", 15, 15, RUR.translate("apple")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_apple_'] = function(block) {
  return [RUR.translate("apple")];
};
Blockly.JavaScript['_apple_'] = function(block) {
  return [RUR.translate("apple")];
};

Blockly.Blocks['_carrot_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("carrot"))
        .appendField(new Blockly.FieldImage("/src/images/carrot.png", 15, 15, RUR.translate("carrot")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_carrot_'] = function(block) {
  return [RUR.translate("carrot")];
};
Blockly.JavaScript['_carrot_'] = function(block) {
  return [RUR.translate("carrot")];
};

Blockly.Blocks['_dandelion_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("dandelion"))
        .appendField(new Blockly.FieldImage("/src/images/dandelion.png", 15, 15, RUR.translate("dandelion")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_dandelion_'] = function(block) {
  return [RUR.translate("dandelion")];
};
Blockly.JavaScript['_dandelion_'] = function(block) {
  return [RUR.translate("dandelion")];
};

Blockly.Blocks['_daisy_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("daisy"))
        .appendField(new Blockly.FieldImage("/src/images/daisy.png", 15, 15, RUR.translate("daisy")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_daisy_'] = function(block) {
  return [RUR.translate("daisy")];
};
Blockly.JavaScript['_daisy_'] = function(block) {
  return [RUR.translate("daisy")];
};

Blockly.Blocks['_triangle_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("triangle"))
        .appendField(new Blockly.FieldImage("/src/images/triangle.png", 15, 15, RUR.translate("triangle")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_triangle_'] = function(block) {
  return [RUR.translate("triangle")];
};
Blockly.JavaScript['_triangle_'] = function(block) {
  return [RUR.translate("triangle")];
};

Blockly.Blocks['_square_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("square"))
        .appendField(new Blockly.FieldImage("/src/images/square.png", 15, 15, RUR.translate("square")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_square_'] = function(block) {
  return [RUR.translate("square")];
};
Blockly.JavaScript['_square_'] = function(block) {
  return [RUR.translate("square")];
};

Blockly.Blocks['_strawberry_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("strawberry"))
        .appendField(new Blockly.FieldImage("/src/images/strawberry.png", 15, 15, RUR.translate("strawberry")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_strawberry_'] = function(block) {
  return [RUR.translate("strawberry")];
};
Blockly.JavaScript['_strawberry_'] = function(block) {
  return [RUR.translate("strawberry")];
};

Blockly.Blocks['_leaf_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("leaf"))
        .appendField(new Blockly.FieldImage("/src/images/leaf.png", 15, 15, RUR.translate("leaf")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_leaf_'] = function(block) {
  return [RUR.translate("leaf")];
};
Blockly.JavaScript['_leaf_'] = function(block) {
  return [RUR.translate("leaf")];
};

Blockly.Blocks['_banana_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("banana"))
        .appendField(new Blockly.FieldImage("/src/images/banana.png", 15, 15, RUR.translate("banana")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_banana_'] = function(block) {
  return [RUR.translate("banana")];
};
Blockly.JavaScript['_banana_'] = function(block) {
  return [RUR.translate("banana")];
};

Blockly.Blocks['_orange_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("orange"))
        .appendField(new Blockly.FieldImage("/src/images/orange.png", 15, 15, RUR.translate("orange")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_orange_'] = function(block) {
  return [RUR.translate("orange")];
};
Blockly.JavaScript['_orange_'] = function(block) {
  return [RUR.translate("orange")];
};

Blockly.Blocks['_tulip_'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(RUR.translate("tulip"))
        .appendField(new Blockly.FieldImage("/src/images/tulip.png", 15, 15, RUR.translate("tulip")));
    this.setOutput(true, "String");
    this.setColour(0);
  }
};
Blockly.Python['_tulip_'] = function(block) {
  return [RUR.translate("tulip")];
};
Blockly.JavaScript['_tulip_'] = function(block) {
  return [RUR.translate("tulip")];
};









Blockly.Blocks['_carries_object_or_here_'] = {
  init: function() {
    this.appendValueInput("action")
        .setCheck("String")
        .appendField(new Blockly.FieldDropdown([
            [RUR.translate("carries_object"), RUR.translate("carries_object")],
            [RUR.translate("object_here"), RUR.translate("object_here")]]), "condition");
    this.setOutput(true, "Boolean");
    this.setColour(RUR.color_condition);
  }
};
Blockly.Python['_carries_object_or_here_'] = function(block) {
  var dropdown_condition = block.getFieldValue('condition');
  var value_action = Blockly.Python.valueToCode(block, 'action', Blockly.Python.ORDER_ATOMIC);
  return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
};
Blockly.JavaScript['_carries_object_or_here_'] = function(block) {
  var dropdown_condition = block.getFieldValue('condition');
  var value_action = Blockly.JavaScript.valueToCode(block, 'action', Blockly.JavaScript.ORDER_ATOMIC);
  return [RUR.translate(dropdown_condition)+'("'+ value_action +'")'];
};


Blockly.Blocks['_take_or_put_'] = {
  init: function() {
    this.appendValueInput("obj")
        .setCheck("String")
        .appendField(new Blockly.FieldDropdown([
            [RUR.translate("take"), RUR.translate("take")],
            [RUR.translate("put"), RUR.translate("put")]]), "action");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(RUR.color_basic);
  }
};
Blockly.Python['_take_or_put_'] = function(block) {
  var dropdown_action = block.getFieldValue('action');
  var value_obj = Blockly.Python.valueToCode(block, 'obj', Blockly.Python.ORDER_ATOMIC);
  return dropdown_action + '("' + value_obj + '")\n';
};
Blockly.JavaScript['_take_or_put_'] = function(block) {
  var dropdown_action = block.getFieldValue('action');
  var value_obj = Blockly.JavaScript.valueToCode(block, 'obj', Blockly.JavaScript.ORDER_ATOMIC);
  return dropdown_action + '("' + value_obj + '");\n';
};



/** Simple if skeletton from
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#k8aine
****/

Blockly.Blocks['_if_'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendStatementInput("then")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    // this.setTooltip('');
  }
};
Blockly.JavaScript['_if_'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
  return "if (" + value_condition + ") {\n" + statements_then + "}\n";

};
Blockly.Python['_if_'] = function(block) {
  var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var statements_then = Blockly.Python.statementToCode(block, 'then');
  return "if " + value_condition + ":\n" + statements_then;
};


Blockly.Blocks['_if_else_'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendStatementInput("then")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    this.appendStatementInput("else")
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
  }
};
Blockly.JavaScript['_if_else_'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_then = Blockly.JavaScript.statementToCode(block, 'then');
  var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
  return "if (" + value_condition + ") {\n" + statements_then + "} else {\n" + statements_else+"}\n";
};
Blockly.Python['_if_else_'] = function(block) {
  var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var statements_then = Blockly.Python.statementToCode(block, 'then');
  var statements_else = Blockly.Python.statementToCode(block, 'else');
  return "if " + value_condition + ":\n" + statements_then + "else:\n" + statements_else;
};


Blockly.Blocks['_if_else_if_else_'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
    this.appendStatementInput("do")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.appendValueInput("condition2")
        .setCheck("Boolean")
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
    this.appendStatementInput("do2")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.appendDummyInput()
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    this.appendStatementInput("else")
        .setCheck(null)
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(210);
    this.setTooltip('');
  }
};
Blockly.JavaScript['_if_else_if_else_'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do = Blockly.JavaScript.statementToCode(block, 'do');
  var value_condition2 = Blockly.JavaScript.valueToCode(block, 'condition2', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_do2 = Blockly.JavaScript.statementToCode(block, 'do2');
  var statements_else = Blockly.JavaScript.statementToCode(block, 'else');
  return "if (" + value_condition + ") {\n" + statements_do +
         "} else if (" + value_condition2 + ") {\n" + statements_do2 +
         "} else {\n" + statements_else+"}\n";
};
Blockly.Python['_if_else_if_else_'] = function(block) {
  var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var statements_do = Blockly.Python.statementToCode(block, 'do');
  var value_condition2 = Blockly.Python.valueToCode(block, 'condition2', Blockly.Python.ORDER_ATOMIC);
  var statements_do2 = Blockly.Python.statementToCode(block, 'do2');
  var statements_else = Blockly.Python.statementToCode(block, 'else');
  return "if " + value_condition + ":\n" + statements_do +
         "elif " + value_condition2 + ":\n" + statements_do2 +
         "else:\n" + statements_else;
};

RUR.blockly.workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    zoom:{
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2},
    trashcan: true});


$("#blocklyDiv").resizable({
    resize: function() {
        $("#blocklyDiv:first-child").height($(this).height()-1).width($(this).width()-1);
        window.dispatchEvent(new Event('resize'));
    }
});

$("#blockly-wrapper").draggable({
    cursor: "move",
    handle: "p",
    drag: function( event, ui ) {
        window.dispatchEvent(new Event('resize'));
    },
    stop: function( event, ui ) {
        window.dispatchEvent(new Event('resize'));
    }
});
/* Sets up the UI for various editors.

called by zzz_doc_ready.js
*/
RUR.zz_dr_editor_ui = function () {
    $("#tabs").tabs({
            heightStyle: "auto",
            activate: function(event, ui){
                editor.refresh();
                library.refresh();
                pre_code_editor.refresh();
                post_code_editor.refresh();
                description_editor.refresh();
                onload_editor.refresh();
            }
    });

    $("#editor-panel").resizable({
        resize: function() {
            editor.setSize(null, $(this).height()-40);
            library.setSize(null, $(this).height()-40);
            pre_code_editor.setSize(null, $(this).height()-40);
            post_code_editor.setSize(null, $(this).height()-40);
            description_editor.setSize(null, $(this).height()-40);
            onload_editor.setSize(null, $(this).height()-40);
        }
    }).draggable({cursor: "move", handle: "ul"});
};
/* Sets up what happens when various changes happened in various html elements.

called by zzz_doc_ready.js
*/
RUR.zz_dr_onchange = function () {

    $("#select_programming_language").change(function() {
        RUR.reset_programming_language($(this).val());
    });

    $("#select_world").change(function() {
        if (RUR.storage.appending_world_name_flag){
            RUR.storage.appending_world_name_flag = false;
            return;
        }
        if ($(this).val() !== null) {
            RUR.file_io.load_world_file($(this).val());
        }
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}
    });


    $("#python_choices").change(function() {
        if($(this).val() == "editor") {
            show_python_editor();
            hide_console();
            hide_blockly();
        } else if($(this).val() == "repl") {
            hide_python_editor();
            show_console();
            hide_blockly();
        } else {
            hide_python_editor();
            hide_console();
            show_blockly();
        }
    });

    $("#javascript_choices").change(function() {
        if($(this).val() == "editor") {
            show_javascript_editor();
            hide_blockly();
        } else {
            hide_python_editor();
            hide_console();
            show_blockly();
        }
    });

    $('#editor_visible_blockly').change(function() {
        if ($('#editor_visible_blockly')[0].checked) {
            if (RUR.programming_language == "python"){
                show_python_editor();
            } else {
                show_javascript_editor();
            }
        } else {
            if (RUR.programming_language == "python"){
                hide_python_editor();
            } else {
                hide_javascript_editor();
            }
        }
    });

    function show_blockly () {
        RUR.blockly.active = true;
        $("#blockly-wrapper").show();
        $("#visible_blockly").show();
        if ($("#special-keyboard-button").hasClass("reverse-blue-gradient")) {
            $("#special-keyboard-button").click();
        }
        $("#special-keyboard-button").hide();
        $("#Reeborg-watches").dialog("close");
        if ($('#editor_visible_blockly')[0].checked) {
            show_python_editor();
        }
        window.dispatchEvent(new Event('resize')); // important to ensure that blockly is visible
    }

    function hide_blockly () {
        $("#blockly-wrapper").hide();
        window.dispatchEvent(new Event('resize'));
        $("#visible_blockly").hide();
        RUR.blockly.active = false;
        $("#special-keyboard-button").show();
    }

    function show_javascript_editor () {
        $("#editor-panel").addClass("active");
        $("#kbd_javascript_btn").show();
        RUR.ui.reload();
        editor.refresh();
    }
    function hide_javascript_editor () {
        $("#editor-panel").removeClass("active");
        $("#kbd_javascript_btn").hide();
    }


    function show_python_editor () {
        $("#editor-panel").addClass("active");
        $("#kbd_python_btn").show();
        RUR._highlight = RUR._highlight || RUR._saved_highlight_value;
        RUR.ui.reload();
        editor.refresh();
    }
    function hide_python_editor () {
        $("#editor-panel").removeClass("active");
        $("#kbd_python_btn").hide();
        RUR._saved_highlight_value = RUR._highlight;
        RUR._highlight = false;
    }
    function show_console() {
        $("#py_console").show();
        $("#kbd_py_console_btn").show();
        RUR.ui.show_only_reload2(true);
        try {
            restart_repl();
        } catch (e) {
            console.log("trying to restart repl failure", e);
        }
        RUR._immediate_playback = true;
        RUR._active_console = true;
    }
    function hide_console() {
        $("#py_console").hide();
        $("#kbd_py_console_btn").hide();
        RUR.ui.show_only_reload2(false);
        RUR._immediate_playback = false;
        RUR._active_console = false;
    }

};
/* Sets up what happens when the user clicks on various html elements.

called by zzz_doc_ready.js
*/
RUR.zz_dr_onclick = function () {

    function load_file (obj) {
        $("#fileInput").click();
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                obj.setValue(reader.result);
                fileInput.value = '';
            };
            reader.readAsText(file);
        });
    }

    $("#load-world").on("click", function(evt) {
        $("#fileInput").click();
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    RUR.world.import_world(reader.result);
                } catch (e) {  // jshint ignore:line
                    console.log("invalid world", e);
                    RUR.cd.show_feedback("#Reeborg-shouts",
                                         RUR.translate("Invalid world file."));
                }
                fileInput.value = '';
            };
            reader.readAsText(file);
        });
    });

    $("#editor-tab").on("click", function (evt) {
        if (RUR.programming_language == "python" && !RUR.we.editing_world) {
            $("#highlight").show();
            $("#watch_variables_btn").show();
        } else {
            $("#highlight").hide();
            $("#watch_variables_btn").hide();
        }
    });

    $("#library-tab").on("click", function (evt) {
        $("#highlight").hide();
        $("#watch_variables_btn").hide();
    });

    $("#save-editor").on("click", function (evt) {
        var blob = new Blob([editor.getValue()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename"); // saveAs defined in src/libraries/filesaver.js
    });

    $("#save-library").on("click", function (evt) {
        var blob = new Blob([library.getValue()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename");
    });

    $("#save-permalink").on("click", function (evt) {
        var blob = new Blob([RUR.permalink.__create()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename");
    });

    $("#save-world").on("click", function (evt) {
        RUR.current_world = RUR.world.update_from_editors(RUR.current_world);
        var blob = new Blob([RUR.world.export_world()], {
            type: "text/javascript;charset=utf-8"
        });
        saveAs(blob, "filename.json", true);
    });

    $("#load-editor").on("click", function (evt) {
        load_file(editor);
    });

    $("#load-library").on("click", function (evt) {
        load_file(library);
    });

    $("#memorize-world").on("click", function (evt) {
        RUR.storage.memorize_world();
    });

    $("#classic-image").on("click", function (evt) {
        RUR.vis_robot.select_default_model(0);
    });

    $("#rover-type").on("click", function (evt) {
        RUR.vis_robot.select_default_model(1);
    });

    $("#3d-red-type").on("click", function (evt) {
        RUR.vis_robot.select_default_model(2);
    });

    $("#solar-panel-type").on("click", function (evt) {
        RUR.vis_robot.select_default_model(3);
    });

    $("#robot_canvas").on("click", function (evt) {
        RUR.we.mouse_x = evt.pageX;
        RUR.we.mouse_y = evt.pageY;
        if (RUR.we.editing_world) {
            RUR.we.edit_world();
        }
        RUR.we.show_world_info();
    });

    $("#add_editor_to_world").on("click", function(evt) {
        if ($(this).prop("checked")) {
            RUR.current_world.editor = editor.getValue();
        } else {
            RUR.current_world.editor = null;
        }
    });

    $("#add_library_to_world").on("click", function(evt) {
        if ($(this).prop("checked")) {
            RUR.current_world.library = library.getValue();
        } else {
            RUR.current_world.library = null;
        }
    });

    $("#update-editor-content-btn").on("click", function(evt) {
        editor.setValue(RUR.current_world.editor);
        $("#update-editor-content").hide();
        if (! $("#update-library-content").is(":visible")) {
            RUR.cd.dialog_update_editors_from_world.dialog("close");
        }
    });
    $("#update-library-content-btn").on("click", function(evt) {
        library.setValue(RUR.current_world.library);
        $("#update-library-content").hide();
        if (! $("#update-editor-content").is(":visible")) {
            RUR.cd.dialog_update_editors_from_world.dialog("close");
        }
    });
};
