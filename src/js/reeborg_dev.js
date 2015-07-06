/* Author: André Roberge
   License: MIT  */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $, CodeMirror, ReeborgError, editor, library, removeHints, parseUri */

// aa_utils.js : name starting with aa so that it is loaded first :-/

RUR.ReeborgError = function (message) {
    if (RUR.programming_language == "python"){
        return ReeborgError(message);
    }
    this.name = "ReeborgError";
    this.message = message;
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
        default_instruction = RUR.translate("move");

    if (RUR.programming_language == "javascript") {
        editor_default = default_instruction + "();";
    } else if (RUR.programming_language == "python") {
        library_default = RUR.translate("# 'from library import *' in Python Code is required to use\n# the code in this library. \n\n");
        library_content = localStorage.getItem(RUR.settings.library);
        if (!library_content){
            library_content = library_default;
        }
        library.setValue(library_content);
        editor_default = default_instruction + "()";
    }  else if (RUR.programming_language == "coffee") {
        editor_default = default_instruction + "()";
    }
    editor_content = localStorage.getItem(RUR.settings.editor);
    if (!editor_content){
        editor_content = editor_default;
    }
    editor.setValue(editor_content);
};


RUR.create_permalink = function () {
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

    $("#url_input_textarea").val(permalink);
    $("#url_input").toggle();
    $("#ok-permalink").removeAttr("disabled");
    $("#cancel-permalink").removeAttr("disabled");

    return false;
};

RUR.reset_programming_language = function(choice){
    var human_language = document.documentElement.lang;
    RUR.removeHints();
    RUR.settings.current_language = choice;
    try {
        localStorage.setItem("last_programming_language_" + human_language, RUR.settings.current_language);
    } catch (e) {}
    $("#python-additional-menu p button").attr("disabled", "true");
    $("#coffeescript-additional-menu p button").attr("disabled", "true");
    $("#javascript-additional-menu p button").attr("disabled", "true");
    $("#library-link").parent().hide();
    $("#highlight").hide();
    switch(RUR.settings.current_language){
        case 'python-' + human_language :
            RUR.settings.editor = "editor_py_" + human_language;
            RUR.settings.library = "library_py_" + human_language;
            RUR.programming_language = "python";
            $("#editor-link").html(RUR.translate("Python Code"));
            editor.setOption("mode", {name: "python", version: 3});
            library.setOption("mode", {name: "python", version: 3});
            // show language specific
            $("#highlight").show();
            $("#library-link").parent().show();
            $("#python-additional-menu p button").removeAttr("disabled");
            break;
        case 'javascript-' + human_language :
            RUR.settings.editor = "editor_js_" + human_language;
            RUR.programming_language = "javascript";
            $("#editor-link").html(RUR.translate("Javascript Code"));
            $("#editor-link").click();
            editor.setOption("mode", "javascript");
            // show language specific
            $("#javascript-additional-menu p button").removeAttr("disabled");
            break;
        case 'coffeescript-' + human_language :
            RUR.settings.editor = "editor_coffee_" + human_language;
            RUR.programming_language = "coffee";
            $("#editor-link").html(RUR.translate("CoffeeScript Code"));
            $("#editor-link").click();
            editor.setOption("mode", "coffeescript");
            // show language specific
            $("#coffeescript-additional-menu p button").removeAttr("disabled");
            break;
    }
    try {
        RUR.reset_code_in_editors();
    } catch (e) {}
};

RUR.update_permalink = function (arg) {
    var url_query;
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
        var name = "PERMALINK";
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                  ).val("user_world:" + name).html(name));
        $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
        $("#select_world").change();
        $('#delete-world').show(); // so that user can remove PERMALINK from select if desired

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

RUR.cancel_permalink = function () {
    $('#url_input').hide();
    $("#permalink").removeClass('reverse-blue-gradient');
    $("#permalink").addClass('blue-gradient');
};

// from http://stackoverflow.com/questions/15005500/loading-cross-domain-html-page-with-jquery-ajax
$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});

RUR.load_permalink = function (filename) {
    "use strict";
    var url;
    if (filename.substring(0,4).toLowerCase() == "http") {
        url = filename
    } else {
        url = "src/worlds/permalinks/" + filename;
    }
    $.ajax({url: url,
        async: false,
        error: function(e){
            $("#Reeborg-shouts").html(RUR.translate("Could not find permalink")).dialog("open");
            RUR.ui.stop();
        },
        success: function(data){
            RUR.update_permalink(data);
            RUR.ui.reload();
        }
    }, "text");
};


RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.control._write(result);
};

RUR.view_source = function(fn) {
    $("#Reeborg-writes").dialog("open");
    $("#_write").before("<pre class='js_code view_source'>" + fn + "</pre>" );
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
};/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, white:false, plusplus:false */
/*globals $, CodeMirror, editor, library, parseUri */

var RUR = RUR || {};

RUR._at_goal_ = function () {
    return RUR.control.at_goal(RUR.current_world.robots[0]);
};

RUR._build_wall_ = function() {
    RUR.control.build_wall(RUR.current_world.robots[0]);
};

RUR._front_is_clear_ = function() {
  return RUR.control.front_is_clear(RUR.current_world.robots[0]);
};

RUR._is_facing_north_ = function () {
    return RUR.control.is_facing_north(RUR.current_world.robots[0]);
};

RUR._move_ = function () {
    RUR.control.move(RUR.current_world.robots[0]);
};

RUR._put_ = function(arg) {
    RUR.control.put(RUR.current_world.robots[0], arg);
};

RUR._right_is_clear_ = function() {
  return RUR.control.right_is_clear(RUR.current_world.robots[0]);
};

RUR._object_here_ = function (arg) {
    return RUR.control.object_here(RUR.current_world.robots[0], arg);
};

RUR._carries_object_ = function (arg) {
    return RUR.control.carries_object(RUR.current_world.robots[0], arg);
};


RUR._take_ = function(arg) {
    RUR.control.take(RUR.current_world.robots[0], arg);
};

RUR._turn_left_ = function () {
    RUR.control.turn_left(RUR.current_world.robots[0]);
};

RUR._repeat_ = function (f, n) {
  for (var i=0; i < n; i++){
      f();
  }
};

RUR._set_max_steps_ = function(n){
    RUR.MAX_STEPS_ = n;
};

RUR._set_max_nb_robots_ = function(n){
  RUR.control.set_max_nb_robots(n);
};

RUR._set_trace_color_ = function(color){
  RUR.current_world.robots[0].trace_color = color;
}/* Author: André Roberge
   License: MIT

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

RUR.DEFAULT_TRACE_COLOR = "seagreen";/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var tile, tiles, tilename, tile_beyond, solid_tile_beyond,
        top_tiles_beyond, solid_top_tile_beyond,
        pushable_object_here, pushable_object_beyond,
        wall_beyond, x_beyond, y_beyond;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.ReeborgError(RUR.translate("Ouch! I hit a wall!"));
    }

    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

    x_beyond = robot.x;  // if robot is moving vertically, it x coordinate does not change
    y_beyond = robot.y;

    switch (robot.orientation){
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

        top_tiles_beyond = RUR.control.get_top_tiles_at_position(x_beyond, y_beyond);
        solid_top_tile_beyond = false;
        if (top_tiles_beyond) {
            for (tilename in top_tiles_beyond) {
                if (RUR.top_tiles[tilename] !== undefined && RUR.top_tiles[tilename].solid) {
                    solid_top_tile_beyond = true;
                    break;
                }
            }
        }

        if (pushable_object_beyond || wall_beyond || solid_tile_beyond || solid_top_tile_beyond) {
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
            if (tile == RUR.tiles.water && RUR.control.top_tile_here(robot, RUR.translate("bridge"))) {
                RUR.control.write(RUR.translate("Useful bridge here!") + "\n");
            } else {
                throw new RUR.ReeborgError(tile.message);
            }
        }
        if (tile.slippery){
            RUR.control.write(tile.message + "\n");
            RUR.control.move(robot);
        }
    }

    tiles = RUR.control.get_top_tiles_at_position(robot.x, robot.y);
    if (tiles) {
        for (tilename in tiles) {
            if (RUR.top_tiles[tilename] !== undefined && RUR.top_tiles[tilename].fatal) {
                robot.x = robot._prev_x;
                robot.y = robot._prev_y;
                throw new RUR.ReeborgError(RUR.top_tiles[tilename].message);
            }
        }
    }
};

RUR.control.move_object = function(obj, x, y, to_x, to_y){
    "use strict";
    var bridge_already_there = false;
    if (RUR.control.get_top_tiles_at_position(to_x, to_y).bridge !== undefined){
        bridge_already_there = true;
    }


    RUR.we.add_object(obj, x, y, 0);
    if (RUR.objects[obj].in_water &&
        RUR.control.get_tile_at_position(to_x, to_y) == RUR.tiles.water &&
        !bridge_already_there){
        RUR.we.add_top_tile(RUR.objects[obj].in_water, to_x, to_y, 1);
    } else {
        RUR.we.add_object(obj, to_x, to_y, 1);
    }
};


RUR.control.turn_left = function(robot, no_frame){
    "use strict";
    robot._prev_orientation = robot.orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot.orientation += 1;  // could have used "++" instead of "+= 1"
    robot.orientation %= 4;
    if (no_frame) return;
    RUR.control.sound_id = "#turn-sound";
    RUR.rec.record_frame("debug", "RUR.control.turn_left");
};

RUR.control.__turn_right = function(robot, no_frame){
    "use strict";
    robot._prev_orientation = (robot.orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot.orientation += 3;
    robot.orientation %= 4;
    if (no_frame) return;
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
    if (robot.objects != "infinite") {
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
        if (objects_here.length === 0 || objects_here == false) {
            throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else {
            RUR.control._take_object_and_give_to_robot(robot, translated_arg);
        }
    }  else if (objects_here.length === 0 || objects_here == false){
        throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.ReeborgError(RUR.translate("Many objects are here; I do not know which one to take!"));
    } else {
        RUR.control._take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

RUR.control._take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    coords = robot.x + "," + robot.y;
    RUR.current_world.objects[coords][obj] -= 1;

    if (RUR.current_world.objects[coords][obj] == 0){
        delete RUR.current_world.objects[coords][obj];
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (RUR.control.object_here(robot) == false){
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
    if (!RUR.control.front_is_clear(robot)){
        throw new RUR.ReeborgError(RUR.translate("There is already a wall here!"));
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
    if (walls === undefined){
        walls = {};
        RUR.current_world.walls = {};
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
    switch (robot.orientation){
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

RUR.control.tile_in_front = function (robot) {
    // returns single tile
    switch (robot.orientation){
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


RUR.control.top_tiles_in_front = function (robot) {
    // returns list of tiles
    switch (robot.orientation){
    case RUR.EAST:
        return RUR.control.get_top_tiles_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.control.get_top_tiles_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.control.get_top_tiles_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.control.get_top_tiles_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.top_tiles_in_front().");
    }
};


RUR.control.front_is_clear = function(robot){
    var tile, tiles, tilename;
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

    tiles = RUR.control.top_tiles_in_front(robot);
    if (tiles) {
        for (tilename in tiles) {
            if (RUR.top_tiles[tilename] !== undefined &&
                RUR.top_tiles[tilename].detectable &&
                RUR.top_tiles[tilename].fatal) {
                return false
            }
        }
    }

    return true;
};


RUR.control._bridge_present = function(robot) {
    var tiles, tilename;
        tiles = RUR.control.top_tiles_in_front(robot);
    if (tiles) {
        for (tilename in tiles) {
            if (tilename == "bridge") {
                return true;
            }
        }
    }
    return false;
}


RUR.control.right_is_clear = function(robot){
    var result;
    RUR.control.__turn_right(robot, true);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot, true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    return robot.orientation === RUR.NORTH;
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

    var obj_here, obj_type, all_objects;
    var coords = robot.x + "," + robot.y;

    if (RUR.current_world.objects === undefined ||
        RUR.current_world.objects[coords] === undefined) {
        return [];
    }

    obj_here =  RUR.current_world.objects[coords];
    all_objects = [];


    for (obj_type in obj_here) {
        if (obj_here.hasOwnProperty(obj_type)) {
            if (obj !== undefined && obj_type == RUR.translate_to_english(obj)) {
                return [obj_type];
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

RUR.control.top_tile_here = function (robot, tile) {
    var tile_here, tile_type, all_top_tiles;
    var coords = robot.x + "," + robot.y;

    if (RUR.current_world.top_tiles === undefined ||
        RUR.current_world.top_tiles[coords] === undefined) {
        return false;
    }

    tile_here =  RUR.current_world.top_tiles[coords];

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

RUR.control.set_model = function(robot, model){
    robot.model = model;
    RUR.rec.record_frame();
 };

RUR.control.set_trace_color = function(robot, color){
    robot.trace_color = color;
 };


RUR.control.write = function () {
    var output_string = '';
    RUR.control.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        output_string += arguments[i].toString();
  }
    RUR.rec.record_frame("output", {"element": "#stdout", "message": output_string});
};

RUR.control._write = function () {
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        output_string += arguments[i].toString();
  }
    RUR.rec.record_frame("output", {"element": "#_write", "message": output_string});
};

RUR.control.narration = function (arg) {
    RUR.rec.record_frame("output", {"element": "#narrates", "message": arg, "html": true});
};

RUR.control.clear_print = function () {
    RUR.rec.record_frame("output", {"element": "#stdout", "message": '', "html": true, "other_element": "#narrates"});
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


RUR.control.get_tile_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.current_world.tiles === undefined) return false;
    if (RUR.current_world.tiles[coords] === undefined) return false;
    return RUR.tiles[RUR.current_world.tiles[coords]];
};

RUR.control.get_top_tiles_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.current_world.top_tiles === undefined) return false;
    if (RUR.current_world.top_tiles[coords] === undefined) return false;
    return RUR.current_world.top_tiles[coords];
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
    return JSON.stringify(RUR.current_world);
};
/* Author: André Roberge
   License: MIT

   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $*/

RUR.cd = {};

$(document).ready(function() {

    RUR.cd.input_add_number = $("#input-add-number");
    RUR.cd.maximum_number = $("#maximum-number");
    RUR.cd.input_give_number = $("#input-give-number");
    RUR.cd.unlimited_number = $("#unlimited-number");
    RUR.cd.input_goal_number = $("#input-goal-number");
    RUR.cd.all_objects = $("#all-objects");
    RUR.cd.input_max_x = $("#input-max-x");
    RUR.cd.input_max_y = $("#input-max-y");
    RUR.cd.use_small_tiles = $("#use-small-tiles");

    RUR.cd.add_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_add_number_result = parseInt(RUR.cd.input_add_number.val(), 10);
        RUR.cd.input_maximum_result = parseInt(RUR.cd.maximum_number.val(), 10);
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


    RUR.cd.give_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_give_number_result = parseInt(RUR.cd.input_give_number.val(), 10);
        RUR.cd.unlimited_number_result = RUR.cd.unlimited_number.prop("checked");
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


    RUR.cd.goal_objects = function () {
        "use strict";
        var query;
        RUR.cd.input_goal_number_result = parseInt(RUR.cd.input_goal_number.val(), 10);
        RUR.cd.all_objects_result = RUR.cd.all_objects.prop("checked");
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


    RUR.cd.set_dimensions = function () {
        "use strict";
        var max_x, max_y;
        max_x = parseInt(RUR.cd.input_max_x.val(), 10);
        max_y = parseInt(RUR.cd.input_max_y.val(), 10);
        RUR.current_world.small_tiles = RUR.cd.use_small_tiles.prop("checked");

        RUR.we._trim_world(max_x, max_y, RUR.COLS, RUR.ROWS);   // remove extra objects
        RUR.vis_world.compute_world_geometry(max_x, max_y);
        RUR.cd.dialog_set_dimensions.dialog("close");
        return true;
    };


    RUR.cd.dialog_add_object = $("#dialog-form").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            "OK": RUR.cd.add_objects,
            Cancel: function() {
                RUR.cd.dialog_add_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.add_number_form[0].reset();
        }
    });

    RUR.cd.add_number_form = RUR.cd.dialog_add_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.add_objects();
    });

    RUR.cd.dialog_give_object = $("#dialog-form2").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            "OK": RUR.cd.give_objects,
            Cancel: function() {
                RUR.cd.dialog_give_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.give_number_form[0].reset();
        }
    });

    RUR.cd.give_number_form = RUR.cd.dialog_give_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.give_objects();
    });

    RUR.cd.dialog_goal_object = $("#dialog-form3").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        modal: true,
        buttons: {
            "OK": RUR.cd.goal_objects,
            Cancel: function() {
                RUR.cd.dialog_goal_object.dialog("close");
            }
        },
        close: function() {
            RUR.cd.goal_number_form[0].reset();
        }
    });

    RUR.cd.goal_number_form = RUR.cd.dialog_goal_object.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.goal_objects();
    });


    RUR.cd.dialog_set_dimensions = $("#dialog-form4").dialog({
        autoOpen: false,
        height: 400,
        width: 500,
        //modal: true,
        buttons: {
            "OK": RUR.cd.set_dimensions,
            Cancel: function() {
                RUR.cd.dialog_set_dimensions.dialog("close");
            }
        },
        close: function() {
            RUR.cd.set_dimensions_form[0].reset();
        }
    });

    RUR.cd.set_dimensions_form = RUR.cd.dialog_set_dimensions.find("form").on("submit", function( event ) {
        event.preventDefault();
        RUR.cd.set_dimensions();
    });

});
/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.custom_menu = {};

RUR.custom_menu.make = function (contents) {
    "use strict";
    var i;
    $("#custom-world-menu").remove();
    $("#header-child").append('<select id="custom-world-menu"></select>');
    $("#custom-world-menu").css("margin-top", "10px").css("margin-left", "20px");
    for(i=0; i<contents.length; i++){
        $('#custom-world-menu').append( $('<option></option>').val(contents[i][0]).html(contents[i][1]));
    }

    $("#custom-world-menu").change(function() {
        RUR.custom_menu.load_file($(this).val());
    });
    $("#custom-world-menu").change();
};

RUR.custom_menu.load_file = function (url) {
    "use strict";
    $.ajax({url: url,
        async: false,
        error: function(e){
            $("#Reeborg-shouts").html(RUR.translate("Could not find link")).dialog("open");
            RUR.ui.stop();
        },
        success: function(data){
            if (typeof data == "string"){
                RUR.update_permalink(data);
                RUR.ui.reload();
            } else {
                RUR.world.import_world(data, true);
                RUR.we.show_pre_post_code();
            }
        }
    });
};/* Author: André Roberge
   License: MIT
 */

/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world, parseUri*/

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
        }  else if (label === "editor-panel"){
            $("#editor-panel").toggleClass("active");
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

    $("#editor-panel").resizable({
        resize: function() {
            editor.setSize(null, $(this).height()-40);
            library.setSize(null, $(this).height()-40);
        }
    }).draggable({cursor: "move", handle: "ul"});

    $("#editor-link").on("click", function(){
        if (RUR.programming_language == "python"){
            $("#highlight").show();
        }
    });
    $("#library-link").on("click", function(){
        $("#highlight").hide();
    });

    var FILENAME = "filename";

    var load_file = function(obj) {
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
    };

    $("#load-editor").on("click", function(evt) {
        load_file(editor);
    });

    $("#load-library").on("click", function(evt) {
        load_file(library);
    });

    $("#save-editor").on("click", function(evt) {
        var blob = new Blob([editor.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, FILENAME);
    });

    $("#save-library").on("click", function(evt) {
        var blob = new Blob([library.getValue()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, FILENAME);
    });


    $("#save-world").on("click", function(evt) {
        var blob = new Blob([RUR.world.export_world()], {type: "text/javascript;charset=utf-8"});
        saveAs(blob, FILENAME);
    });


    $("#load-world").on("click", function(evt) {
        $("#fileInput").click();
        var fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    RUR.world.import_world(reader.result);
                } catch (e) {
                    alert(RUR.translate("Invalid world file."));
                }
                fileInput.value = '';
            };
            reader.readAsText(file);
        });
    });

    $("#memorize-world").on("click", function(evt) {
        var existing_names, i, key, response;
        existing_names = ' [';

        for (i = 0; i <= localStorage.length - 1; i++) {
            key = localStorage.key(i);
            if (key.slice(0, 11) === "user_world:") {
                existing_names += key.substring(11) + ", ";
            }
        }
        existing_names += "]";
        response = prompt(RUR.translate("Enter world name to save") + existing_names);
        if (response !== null) {
            RUR.storage._save_world(response.trim());
            $('#delete-world').show();
        }
    });

    $("#delete-world").on("click", function(evt) {
        var existing_names, i, key, response;
        existing_names = ' [';

        for (i = 0; i <= localStorage.length - 1; i++) {
            key = localStorage.key(i);
            if (key.slice(0, 11) === "user_world:") {
                existing_names += key.substring(11) + ", ";
            }
        }
        existing_names += "]";
        response = prompt(RUR.translate("Enter world name to delete") + existing_names);
        if (response !== null) {
            RUR.storage.delete_world(response.trim());
        }
    });

    $("#classic-image").on("click", function(evt) {
        RUR.vis_robot.select_default_model(0);
    });

    $("#rover-type").on("click", function(evt) {
        RUR.vis_robot.select_default_model(1);
    });

    $("#3d-red-type").on("click", function(evt) {
        RUR.vis_robot.select_default_model(2);
    });

    $("#solar-panel-type").on("click", function(evt) {
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

    $("#edit-world").on("click", function(evt) {
        if ($("#edit-world").hasClass("blue-gradient")) {
            $("#edit-world-panel").dialog("open");
            $("#edit-world").addClass("reverse-blue-gradient").removeClass("blue-gradient");
            toggle_editing_mode();
        } else {
            $("#edit-world-panel").dialog("close");
            $("#edit-world-panel").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:800,  height:700, position:"top"});
        }
    });
    $("#edit-world-panel").dialog({minimize: false, maximize: false, autoOpen:false, width:800,  height:700, position:"top",
        beforeClose: function( event, ui ) {$("#edit-world").addClass("blue-gradient").removeClass("reverse-blue-gradient");
                                              toggle_editing_mode();}});

    $("#about-div").dialog({autoOpen:false, width:800,  height:600, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#about-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});


    $("#world-edit-buttons").dialog({autoOpen:false, width:550,  height:180, maximize: false, position:"center",
        beforeClose: function( event, ui ) {$("#world-select").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});

    $("#world-select").on("click", function() {
        if ($("#world-select").hasClass("reverse-blue-gradient")) {
            $("#world-edit-buttons").dialog("open");
        } else {
            $("#world-edit-buttons").dialog("close");
        }
        return;
    });



    $("#about-button").on("click", function() {
        if ($("#about-button").hasClass("reverse-blue-gradient")) {
            $("#about-div").dialog("open");
        } else {
            $("#about-div").dialog("close");
        }
        return;
    });

    $("#more-menus").dialog({autoOpen:false, width:800,  height:600, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#more-menus-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});

    $("#more-menus-button").on("click", function() {
        if ($("#more-menus-button").hasClass("reverse-blue-gradient")) {
            $("#more-menus").dialog("open");
        } else {
            $("#more-menus").dialog("close");
        }
        return;
    });


    $("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-writes").dialog({minimize: false, maximize: false, autoOpen:false, width:600, height:250,
                                 position:{my: "bottom", at: "bottom-20", of: window}});

    $("#World-info").dialog({autoOpen:false, width:600,  height:300, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#world-info-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});

    $("#world-info-button").on("click", function() {
        if ($("#world-info-button").hasClass("reverse-blue-gradient")) {
            $("#World-info").dialog("open");
        } else {
            $("#World-info").dialog("close");
        }
        return;
    });


    editor.widgets = [];
    library.widgets = [];

    $("#select_world").change(function() {
        var data, val = $(this).val();
        RUR.settings.world_name = $(this).find(':selected').text();
        try {
            localStorage.setItem(RUR.settings.world, $(this).find(':selected').text());
        } catch (e) {}

        if (val.substring(0,11) === "user_world:"){
            data = localStorage.getItem(val);
            RUR.world.import_world(data);
            RUR.we.show_pre_post_code();
        } else {
            $.get(val, function(data) {
                RUR.world.import_world(data);
                RUR.we.show_pre_post_code();
                // jquery is sometimes too intelligent; it can guess
                // if the imported object is a string ... or a json object
                // I need a string here;  so make sure to prevent it from identifying.
            }, "text");
        }
    });


    try {
        RUR.reset_code_in_editors();
    } catch (e){ console.log(e);alert("Your browser does not support localStorage; you will not be able to save your functions in the library.");
                }

    RUR.ui.set_ready_to_run();

});



$(document).ready(function() {
    var prog_lang, url_query, name;
    var human_language = document.documentElement.lang;
    RUR._highlight = true;
    $('input[type=radio][name=programming_language]').on('change', function(){
        RUR.reset_programming_language($(this).val());
        if ($(this).val() == "python-"+human_language){
            $("#highlight").show();
        } else {
            $("#highlight").hide();
        }
    });
    url_query = parseUri(window.location.href);
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined &&
       url_query.queryKey.library !== undefined) {
        prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        name = "PERMALINK";
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                  ).val("user_world:" + name).html(name));
        $('#select_world').val("user_world:" + name);  // reload as updating select choices blanks the world.
        $("#select_world").change();
        $('#delete-world').show(); // so that user can remove PERMALINK from select if desired

        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    } else {
        prog_lang = localStorage.getItem("last_programming_language_" + human_language);
        switch (prog_lang) {
            case 'python-' + human_language:
            case 'javascript-' + human_language:
            case 'coffeescript-' + human_language:
                $('input[type=radio][name=programming_language]').val([prog_lang]);
                RUR.reset_programming_language(prog_lang);
                break;
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
    // for embedding
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.update_permalink(event.data);
    }
});

/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.objects = {};
RUR.objects.known_objects = [];
RUR.tiles = {};
RUR.top_tiles = {};
RUR.home_images = {};

RUR.objects.token = {};
RUR.objects.token.image = new Image();
RUR.objects.token.image.src = 'src/images/token.png';  // adapted from openclipart
RUR.objects.token.image_goal = new Image();
RUR.objects.token.image_goal.src = 'src/images/token_goal.png';  // modified from above
RUR.objects.token.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.token.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("token");


RUR.objects.star = {};
RUR.objects.star.image = new Image();
RUR.objects.star.image.src = 'src/images/star.png';  // adapted from openclipart
RUR.objects.star.image_goal = new Image();
RUR.objects.star.image_goal.src = 'src/images/star_goal.png';  // modified from above
RUR.objects.star.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.star.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("star");

RUR.objects.triangle = {};
RUR.objects.triangle.image = new Image();
RUR.objects.triangle.image.src = 'src/images/triangle.png';  // adapted from openclipart
RUR.objects.triangle.image_goal = new Image();
RUR.objects.triangle.image_goal.src = 'src/images/triangle_goal.png';  // modified from above
RUR.objects.triangle.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.triangle.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("triangle");


RUR.objects.square = {};
RUR.objects.square.image = new Image();
RUR.objects.square.image.src = 'src/images/square.png';
RUR.objects.square.image_goal = new Image();
RUR.objects.square.image_goal.src = 'src/images/square_goal.png';  // modified from above
RUR.objects.square.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.square.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("square");


RUR.objects.strawberry = {};
RUR.objects.strawberry.image = new Image();
RUR.objects.strawberry.image.src = 'src/images/strawberry.png';
RUR.objects.strawberry.image_goal = new Image();
RUR.objects.strawberry.image_goal.src = 'src/images/strawberry_goal.png';  // modified from above
RUR.objects.strawberry.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.strawberry.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("strawberry");

RUR.objects.banana = {};
RUR.objects.banana.image = new Image();
RUR.objects.banana.image.src = 'src/images/banana.png';
RUR.objects.banana.image_goal = new Image();
RUR.objects.banana.image_goal.src = 'src/images/banana_goal.png';  // modified from above
RUR.objects.banana.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.banana.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("banana");


RUR.objects.apple = {};
RUR.objects.apple.image = new Image();
RUR.objects.apple.image.src = 'src/images/apple.png';
RUR.objects.apple.image_goal = new Image();
RUR.objects.apple.image_goal.src = 'src/images/apple_goal.png';  // modified from above
RUR.objects.apple.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.apple.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("apple");


RUR.objects.leaf = {};
RUR.objects.leaf.image = new Image();
RUR.objects.leaf.image.src = 'src/images/leaf.png';
RUR.objects.leaf.image_goal = new Image();
RUR.objects.leaf.image_goal.src = 'src/images/leaf_goal.png';  // modified from above
RUR.objects.leaf.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.leaf.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("leaf");

RUR.objects.carrot = {};
RUR.objects.carrot.image = new Image();
RUR.objects.carrot.image.src = 'src/images/carrot.png';
RUR.objects.carrot.image_goal = new Image();
RUR.objects.carrot.image_goal.src = 'src/images/carrot_goal.png';  // modified from above
RUR.objects.carrot.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.carrot.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("carrot");

RUR.objects.dandelion = {};
RUR.objects.dandelion.image = new Image();
RUR.objects.dandelion.image.src = 'src/images/dandelion.png';
RUR.objects.dandelion.image_goal = new Image();
RUR.objects.dandelion.image_goal.src = 'src/images/dandelion_goal.png';  // modified from above
RUR.objects.dandelion.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.dandelion.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("dandelion");


RUR.objects.orange = {};
RUR.objects.orange.image = new Image();
RUR.objects.orange.image.src = 'src/images/orange.png';
RUR.objects.orange.image_goal = new Image();
RUR.objects.orange.image_goal.src = 'src/images/orange_goal.png';  // modified from above
RUR.objects.orange.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.orange.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("orange");

RUR.objects.daisy = {};
RUR.objects.daisy.image = new Image();
RUR.objects.daisy.image.src = 'src/images/daisy.png';
RUR.objects.daisy.image_goal = new Image();
RUR.objects.daisy.image_goal.src = 'src/images/daisy_goal.png';  // modified from above
RUR.objects.daisy.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.daisy.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("daisy");

RUR.objects.tulip = {};
RUR.objects.tulip.image = new Image();
RUR.objects.tulip.image.src = 'src/images/tulip.png';
RUR.objects.tulip.image_goal = new Image();
RUR.objects.tulip.image_goal.src = 'src/images/tulip_goal.png';  // modified from above
RUR.objects.tulip.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.tulip.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("tulip");

RUR.objects.box = {};
RUR.objects.box.pushable = true;
RUR.objects.box.in_water = "bridge";
RUR.objects.box.ctx = RUR.ROBOT_CTX;
RUR.objects.box.image = new Image();
RUR.objects.box.image.src = 'src/images/box.png';
RUR.objects.box.image_goal = new Image();
RUR.objects.box.image_goal.src = 'src/images/box_goal.png';
RUR.objects.box.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};
RUR.objects.box.image_goal.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};
RUR.objects.known_objects.push("box");


RUR.tiles.mud = {};
RUR.tiles.mud.fatal = true;
RUR.tiles.mud.message = RUR.translate("I'm stuck in mud.");
RUR.tiles.mud.info = RUR.translate("Mud: Reeborg <b>cannot</b> detect this and will get stuck if it moves to this location.");
RUR.tiles.mud.image = new Image();
RUR.tiles.mud.image.src = 'src/images/mud.png';
RUR.tiles.mud.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.ice = {};
RUR.tiles.ice.slippery = true;
RUR.tiles.ice.message = RUR.translate("I'm slipping on ice!");
RUR.tiles.ice.info = RUR.translate("Ice: Reeborg <b>cannot</b> detect this and will slide and move to the next location if it moves to this location.");
RUR.tiles.ice.image = new Image();
RUR.tiles.ice.image.src = 'src/images/ice.png';
RUR.tiles.ice.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.grass = {};
RUR.tiles.grass.image = new Image();
RUR.tiles.grass.image.src = 'src/images/grass.png';
RUR.tiles.grass.info = RUR.translate("Grass: usually safe.");
RUR.tiles.grass.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.gravel = {};
RUR.tiles.gravel.image = new Image();
RUR.tiles.gravel.image.src = 'src/images/gravel.png';
RUR.tiles.gravel.info = RUR.translate("Gravel: usually safe.");
RUR.tiles.gravel.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.water = {};
RUR.tiles.water.fatal = true;
RUR.tiles.water.detectable = true;
RUR.tiles.water.message = RUR.translate("I'm in water!");
RUR.tiles.water.info = RUR.translate("Water: Reeborg <b>can</b> detect this but will drown if it moves to this location.");
RUR.tiles.water.image = new Image();
RUR.tiles.water.image.src = 'src/images/water.png';
RUR.tiles.water.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.tiles.bricks = {};
RUR.tiles.bricks.fatal = true;
RUR.tiles.bricks.solid = true;
RUR.tiles.bricks.detectable = true;
RUR.tiles.bricks.message = RUR.translate("Crash!");
RUR.tiles.bricks.info = RUR.translate("brick wall: Reeborg <b>can</b> detect this but will hurt himself if he attemps to move through it.");
RUR.tiles.bricks.image = new Image();
RUR.tiles.bricks.image.src = 'src/images/bricks.png';
RUR.tiles.bricks.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.home_images.green_home_tile = {};
RUR.home_images.green_home_tile.fatal = true;
RUR.home_images.green_home_tile.detectable = true;
RUR.home_images.green_home_tile.info = RUR.translate("green home tile:") + RUR.translate("Reeborg <b>can</b> detect this tile using at_goal().");
RUR.home_images.green_home_tile.image = new Image();
RUR.home_images.green_home_tile.image.src = 'src/images/green_home_tile.png';
RUR.home_images.green_home_tile.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};

RUR.home_images.house = {};
RUR.home_images.house.fatal = true;
RUR.home_images.house.detectable = true;
RUR.home_images.house.info = RUR.translate("house:") + RUR.translate("Reeborg <b>can</b> detect this tile using at_goal().");
RUR.home_images.house.image = new Image();
RUR.home_images.house.image.src = 'src/images/house.png';
RUR.home_images.house.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};

RUR.home_images.racing_flag = {};
RUR.home_images.racing_flag.fatal = true;
RUR.home_images.racing_flag.detectable = true;
RUR.home_images.racing_flag.info = RUR.translate("racing flag:") + RUR.translate("Reeborg <b>can</b> detect this tile using at_goal().");
RUR.home_images.racing_flag.image = new Image();
RUR.home_images.racing_flag.image.src = 'src/images/racing_flag.png';
RUR.home_images.racing_flag.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.draw_goal();
    }
};


RUR.top_tiles.bridge = {};
RUR.top_tiles.bridge.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.bridge.image = new Image();
RUR.top_tiles.bridge.image.src = 'src/images/bridge.png';
RUR.top_tiles.bridge.info = RUR.translate("Bridge:") + RUR.translate("Reeborg <b>can</b> detect this and will know that it allows safe passage over water.");
RUR.top_tiles.bridge.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.top_tiles.fence4 = {};
RUR.top_tiles.fence4.name = "fence";
RUR.top_tiles.fence4.fatal = true;
RUR.top_tiles.fence4.solid = true;
RUR.top_tiles.fence4.detectable = true;
RUR.top_tiles.fence4.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence4.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence4.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.fence4.image = new Image();
RUR.top_tiles.fence4.image.src = 'src/images/fence4.png';
RUR.top_tiles.fence4.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.top_tiles.fence5 = {};
RUR.top_tiles.fence5.name = "fence";
RUR.top_tiles.fence5.fatal = true;
RUR.top_tiles.fence5.solid = true;
RUR.top_tiles.fence5.detectable = true;
RUR.top_tiles.fence5.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence5.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence5.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.fence5.image = new Image();
RUR.top_tiles.fence5.image.src = 'src/images/fence5.png';
RUR.top_tiles.fence5.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.top_tiles.fence6 = {};
RUR.top_tiles.fence6.name = "fence";
RUR.top_tiles.fence6.fatal = true;
RUR.top_tiles.fence6.solid = true;
RUR.top_tiles.fence6.detectable = true;
RUR.top_tiles.fence6.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence6.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence6.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.fence6.image = new Image();
RUR.top_tiles.fence6.image.src = 'src/images/fence6.png';
RUR.top_tiles.fence6.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};

RUR.top_tiles.fence7 = {};
RUR.top_tiles.fence7.name = "fence";
RUR.top_tiles.fence7.fatal = true;
RUR.top_tiles.fence7.solid = true;
RUR.top_tiles.fence7.detectable = true;
RUR.top_tiles.fence7.message = RUR.translate("I hit a fence!");
RUR.top_tiles.fence7.info = RUR.translate("Fence: Reeborg <b>can</b> detect this but will be stopped by it.");
RUR.top_tiles.fence7.ctx = RUR.SECOND_LAYER_CTX;
RUR.top_tiles.fence7.image = new Image();
RUR.top_tiles.fence7.image.src = 'src/images/fence7.png';
RUR.top_tiles.fence7.image.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};/*
 * jQuery UI Dialog 1.8.16
 * w/ Minimize & Maximize Support
 * by Elijah Horton (fieryprophet@yahoo.com)
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 *
 * Modified by André Roberge to remove some IE support which is irrelevant for me.
 */
(function( $, undefined ) {

var uiDialogClasses =
		'ui-dialog ' +
		'ui-widget ' +
		'ui-widget-content ' +
		'ui-corner-all ',
	sizeRelatedOptions = {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},
	resizableRelatedOptions = {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	},
	// support for jQuery 1.3.2 - handle common attrFn methods for dialog
	attrFn = $.attrFn || {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true,
		click: true
	};

$.widget("ui.dialog", {
	options: {
		autoOpen: true,
		buttons: {},
		closeOnEscape: true,
		closeText: 'close',
		dialogClass: '',
		draggable: true,
		hide: null,
		height: 'auto',
		maxHeight: false,
		maxWidth: false,
		minHeight: 150,
		minWidth: 300,
		minimizeText: 'minimize',
		maximizeText: 'maximize',
		minimize: true,
		maximize: true,
		modal: false,
		position: {
			my: 'center',
			at: 'center',
			collision: 'fit',
			// ensure that the titlebar is never outside the document
			using: function(pos) {
				var topOffset = $(this).css(pos).offset().top;
				if (topOffset < 0) {
					$(this).css('top', pos.top - topOffset);
				}
			}
		},
		resizable: true,
		show: null,
		stack: true,
		title: '',
		width: 300,
		zIndex: 1000
	},

	_create: function() {
		this.originalTitle = this.element.attr('title');
		// #5742 - .attr() might return a DOMElement
		if ( typeof this.originalTitle !== "string" ) {
			this.originalTitle = "";
		}

		this.options.title = this.options.title || this.originalTitle;
		var self = this,
			options = self.options,

			title = options.title || '&#160;',
			titleId = $.ui.dialog.getTitleId(self.element),

			uiDialog = (self.uiDialog = $('<div></div>'))
				.appendTo(document.body)
				.hide()
				.addClass(uiDialogClasses + options.dialogClass)
				.css({
					zIndex: options.zIndex
				})
				// setting tabIndex makes the div focusable
				// setting outline to 0 prevents a border on focus in Mozilla
				.attr('tabIndex', -1).css('outline', 0).keydown(function(event) {
					if (options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE) {

						self.close(event);
						event.preventDefault();
					}
				})
				.attr({
					role: 'dialog',
					'aria-labelledby': titleId
				})
				.mousedown(function(event) {
					self.moveToTop(false, event);
				}),

			uiDialogContent = self.element
				.show()
				.removeAttr('title')
				.addClass(
					'ui-dialog-content ' +
					'ui-widget-content')
				.appendTo(uiDialog),

			uiDialogTitlebar = (self.uiDialogTitlebar = $('<div></div>'))
				.addClass(
					'ui-dialog-titlebar ' +
					'ui-widget-header ' +
					'ui-corner-all ' +
					'ui-helper-clearfix'
				)
				.prependTo(uiDialog);
			if(options.minimize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMinimize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-minimize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMinimize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMinimize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMinimize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMinimize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.minimize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMinimizeText = (self.uiDialogTitlebarMinimizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-minusthick'
					)
					.text(options.minimizeText)
					.appendTo(uiDialogTitlebarMinimize);
			}
			if(options.maximize && !options.modal){ //cannot use this option with modal
				var uiDialogTitlebarMaximize = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-maximize ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarMaximize.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarMaximize.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarMaximize.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarMaximize.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.maximize(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarMaximizeText = (self.uiDialogTitlebarMaximizeText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-plusthick'
					)
					.text(options.maximizeText)
					.appendTo(uiDialogTitlebarMaximize);
					$(uiDialogTitlebar).dblclick(function(event) {
						self.maximize(event);
						return false;
					});
			}
			if(options.close !== false){
				var uiDialogTitlebarClose = $('<a href="#"></a>')
					.addClass(
						'ui-dialog-titlebar-close ' +
						'ui-corner-all'
					)
					.attr('role', 'button')
					.hover(
						function() {
							uiDialogTitlebarClose.addClass('ui-state-hover');
						},
						function() {
							uiDialogTitlebarClose.removeClass('ui-state-hover');
						}
					)
					.focus(function() {
						uiDialogTitlebarClose.addClass('ui-state-focus');
					})
					.blur(function() {
						uiDialogTitlebarClose.removeClass('ui-state-focus');
					})
					.click(function(event) {
						self.close(event);
						return false;
					})
					.appendTo(uiDialogTitlebar),

				uiDialogTitlebarCloseText = (self.uiDialogTitlebarCloseText = $('<span></span>'))
					.addClass(
						'ui-icon ' +
						'ui-icon-closethick'
					)
					.text(options.closeText)
					.appendTo(uiDialogTitlebarClose);
			}

			uiDialogTitle = $('<span></span>')
				.addClass('ui-dialog-title')
				.attr('id', titleId)
				.html(title)
				.prependTo(uiDialogTitlebar);

		//handling of deprecated beforeclose (vs beforeClose) option
		//Ticket #4669 http://dev.jqueryui.com/ticket/4669
		//TODO: remove in 1.9pre
		if ($.isFunction(options.beforeclose) && !$.isFunction(options.beforeClose)) {
			options.beforeClose = options.beforeclose;
		}

		uiDialogTitlebar.find("*").add(uiDialogTitlebar).disableSelection();

		if (options.draggable && $.fn.draggable) {
			self._makeDraggable();
		}
		if (options.resizable && $.fn.resizable) {
			self._makeResizable();
		}

		self._createButtons(options.buttons);
		self._isOpen = false;
		self._min = false;

		if ($.fn.bgiframe) {
			uiDialog.bgiframe();
		}
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	destroy: function() {
		var self = this;

		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.hide();
		self.element
			.unbind('.dialog')
			.removeData('dialog')
			.removeClass('ui-dialog-content ui-widget-content')
			.hide().appendTo('body');
		self.uiDialog.remove();

		if (self.originalTitle) {
			self.element.attr('title', self.originalTitle);
		}

		return self;
	},

	widget: function() {
		return this.uiDialog;
	},

	minimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeMinimize', event)) {
			return;
		}
		if(!ui.data('is-minimized')){
			if(self.options.minimize && typeof self.options.minimize !== "boolean" && $(self.options.minimize).length > 0){
				self._min = $('<a>' + (ui.find('span.ui-dialog-title').html().replace(/&nbsp;/, '') || 'Untitled Dialog') + '</a>')
					.attr('title', 'Click to restore dialog').addClass('ui-corner-all ui-button').click(function(event){self.unminimize(event);});
				$(self.options.minimize).append(self._min);
				ui.data('is-minimized', true).hide();
			} else {
				if(ui.is( ":data(resizable)" )) {
					ui.data('was-resizable', true).resizable('destroy');
				} else {
					ui.data('was-resizable', false)
				}
				ui.data('minimized-height', ui.height());
				ui.find('.ui-dialog-content').hide();
				ui.find('.ui-dialog-titlebar-maximize').hide();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '1.8em').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s')
					.find('span').removeClass('ui-icon-minusthick').addClass('ui-icon-arrowthickstop-1-s').click(function(event){self.unminimize(event); return false;});;
				ui.data('is-minimized', true).height('auto');
			}
		}
		return self;
	},

	unminimize: function(event) {
		var self = this,
			ui = self.uiDialog;
		if(false === self._trigger('beforeUnminimize', event)) {
			return;
		}
		if(ui.data('is-minimized')){
			if(self._min){
				self._min.unbind().remove();
				self._min = false;
				ui.data('is-minimized', false).show();
				self.moveToTop();
			} else {
				ui.height(ui.data('minimized-height')).data('is-minimized', false).removeData('minimized-height').find('.ui-dialog-content').show();
				ui.find('.ui-dialog-titlebar-maximize').show();
				ui.find('.ui-dialog-titlebar-minimize').css('right', '3.3em').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick')
					.find('span').removeClass('ui-icon-arrowthickstop-1-s').addClass('ui-icon-minusthick').click(function(event){self.minimize(event); return false;});
				if(ui.data('was-resizable') == true) {
					self._makeResizable(true);
				}
			}
		}
		return self;
	},

	maximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeMaximize', event)) {
			return;
		}
		if(!ui.data('is-maximized')){
			if(ui.is( ":data(draggable)" )) {
				ui.data('was-draggable', true).draggable('destroy');
			} else {
				ui.data('was-draggable', false)
			}
			if(ui.is( ":data(resizable)" )) {
				ui.data('was-resizable', true).resizable('destroy');
			} else {
				ui.data('was-resizable', false)
			}
			ui.data('maximized-height', ui.height()).data('maximized-width', ui.width()).data('maximized-top', ui.css('top')).data('maximized-left', ui.css('left'))
				.data('is-maximized', true).height($(window).height()-8).width($(window).width()+9).css({"top":0, "left": 0}).find('.ui-dialog-titlebar-minimize').hide();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw')
				.find('span').removeClass('ui-icon-plusthick').addClass('ui-icon-arrowthick-1-sw').click(function(event){self.unmaximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.unmaximize(event); return false;});
		}
		return self;
	},

	unmaximize: function(event) {
		var self = this,
			ui = self.uiDialog;

		if(false === self._trigger('beforeUnmaximize', event)) {
			return;
		}
		if(ui.data('is-maximized')){
			ui.height(ui.data('maximized-height')).width(ui.data('maximized-width')).css({"top":ui.data('maximized-top'), "left":ui.data('maximized-left')})
				.data('is-maximized', false).removeData('maximized-height').removeData('maximized-width').removeData('maximized-top').removeData('maximized-left').find('.ui-dialog-titlebar-minimize').show();
			ui.find('.ui-dialog-titlebar-maximize').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick')
				.find('span').removeClass('ui-icon-arrowthick-1-sw').addClass('ui-icon-plusthick').click(function(){self.maximize(event); return false;});
			ui.find('.ui-dialog-titlebar').dblclick(function(event){self.maximize(event); return false;});
			if(ui.data('was-draggable') == true) {
				self._makeDraggable(true);
			}
			if(ui.data('was-resizable') == true) {
				self._makeResizable(true);
			}
		}
		return self;
	},

	close: function(event) {
		var self = this,
			maxZ, thisZ;

		if (false === self._trigger('beforeClose', event)) {
			return;
		}
		if (self.overlay) {
			self.overlay.destroy();
		}
		self.uiDialog.unbind('keypress.ui-dialog');

		self._isOpen = false;

		if (self.options.hide) {
			self.uiDialog.hide(self.options.hide, function() {
				self._trigger('close', event);
			});
		} else {
			self.uiDialog.hide();
			self._trigger('close', event);
		}

		$.ui.dialog.overlay.resize();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		if (self.options.modal) {
			maxZ = 0;
			$('.ui-dialog').each(function() {
				if (this !== self.uiDialog[0]) {
					thisZ = $(this).css('z-index');
					if(!isNaN(thisZ)) {
						maxZ = Math.max(maxZ, thisZ);
					}
				}
			});
			$.ui.dialog.maxZ = maxZ;
		}
		return self;
	},

	isOpen: function() {
		return this._isOpen;
	},

	// the force parameter allows us to move modal dialogs to their correct
	// position on open
	moveToTop: function(force, event) {
		var self = this,
			options = self.options,
			saveScroll;

		if ((options.modal && !force) ||
			(!options.stack && !options.modal)) {
			return self._trigger('focus', event);
		}

		if (options.zIndex > $.ui.dialog.maxZ) {
			$.ui.dialog.maxZ = options.zIndex;
		}
		if (self.overlay) {
			$.ui.dialog.maxZ += 1;
			self.overlay.$el.css('z-index', $.ui.dialog.overlay.maxZ = $.ui.dialog.maxZ);
		}

		//Save and then restore scroll since Opera 9.5+ resets when parent z-Index is changed.
		//  http://ui.jquery.com/bugs/ticket/3193
		saveScroll = { scrollTop: self.element.scrollTop(), scrollLeft: self.element.scrollLeft() };
		$.ui.dialog.maxZ += 1;
		self.uiDialog.css('z-index', $.ui.dialog.maxZ);
		self.element.attr(saveScroll);
		self._trigger('focus', event);

		return self;
	},

	open: function() {
		if (this._isOpen) { return; }

		var self = this,
			options = self.options,
			uiDialog = self.uiDialog;

		self.overlay = options.modal ? new $.ui.dialog.overlay(self) : null;
		self._size();
		self._position(options.position);
		uiDialog.show(options.show);
		self.moveToTop(true);

		// prevent tabbing out of modal dialogs
		if (options.modal) {
			uiDialog.bind('keypress.ui-dialog', function(event) {
				if (event.keyCode !== $.ui.keyCode.TAB) {
					return;
				}

				var tabbables = $(':tabbable', this),
					first = tabbables.filter(':first'),
					last  = tabbables.filter(':last');

				if (event.target === last[0] && !event.shiftKey) {
					first.focus(1);
					return false;
				} else if (event.target === first[0] && event.shiftKey) {
					last.focus(1);
					return false;
				}
			});
		}

		// set focus to the first tabbable element in the content area or the first button
		// if there are no tabbable elements, set focus on the dialog itself
		$(self.element.find(':tabbable').get().concat(
			uiDialog.find('.ui-dialog-buttonpane :tabbable').get().concat(
				uiDialog.get()))).eq(0).focus();

		self._isOpen = true;
		self._trigger('open');

		return self;
	},

	_createButtons: function(buttons) {
		var self = this,
			hasButtons = false,
			uiDialogButtonPane = $('<div></div>')
				.addClass(
					'ui-dialog-buttonpane ' +
					'ui-widget-content ' +
					'ui-helper-clearfix'
				),
			uiButtonSet = $( "<div></div>" )
				.addClass( "ui-dialog-buttonset" )
				.appendTo( uiDialogButtonPane );

		// if we already have a button pane, remove it
		self.uiDialog.find('.ui-dialog-buttonpane').remove();

		if (typeof buttons === 'object' && buttons !== null) {
			$.each(buttons, function() {
				return !(hasButtons = true);
			});
		}
		if (hasButtons) {
			$.each(buttons, function(name, props) {
				props = $.isFunction( props ) ?
					{ click: props, text: name } :
					props;
				var button = $('<button type="button"></button>')
					.click(function() {
						props.click.apply(self.element[0], arguments);
					})
					.appendTo(uiButtonSet);
				// can't use .attr( props, true ) with jQuery 1.3.2.
				$.each( props, function( key, value ) {
					if ( key === "click" ) {
						return;
					}
					if ( key in attrFn ) {
						button[ key ]( value );
					} else {
						button.attr( key, value );
					}
				});
				if ($.fn.button) {
					button.button();
				}
			});
			uiDialogButtonPane.appendTo(self.uiDialog);
		}
	},

	_makeDraggable: function() {
		var self = this,
			options = self.options,
			doc = $(document),
			heightBeforeDrag;

		function filteredUi(ui) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		self.uiDialog.draggable({
			cancel: '.ui-dialog-content, .ui-dialog-titlebar-close',
			handle: '.ui-dialog-titlebar',
			containment: 'document',
			start: function(event, ui) {
				heightBeforeDrag = options.height === "auto" ? "auto" : $(this).height();
				$(this).height($(this).height()).addClass("ui-dialog-dragging");
				self._trigger('dragStart', event, filteredUi(ui));
			},
			drag: function(event, ui) {
				self._trigger('drag', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				options.position = [ui.position.left - doc.scrollLeft(),
					ui.position.top - doc.scrollTop()];
				$(this).removeClass("ui-dialog-dragging").height(heightBeforeDrag);
				self._trigger('dragStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		});
	},

	_makeResizable: function(handles) {
		handles = (handles === undefined ? this.options.resizable : handles);
		var self = this,
			options = self.options,
			// .ui-resizable has position: relative defined in the stylesheet
			// but dialogs have to use absolute or fixed positioning
			position = self.uiDialog.css('position'),
			resizeHandles = (typeof handles === 'string' ?
				handles	:
				'n,e,s,w,se,sw,ne,nw'
			);

		function filteredUi(ui) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}
		self.uiDialog.resizable({
			cancel: '.ui-dialog-content',
			containment: 'document',
			alsoResize: self.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: self._minHeight(),
			handles: resizeHandles,
			start: function(event, ui) {
				$(this).addClass("ui-dialog-resizing");
				self._trigger('resizeStart', event, filteredUi(ui));
			},
			resize: function(event, ui){
				self._trigger('resize', event, filteredUi(ui));
			},
			stop: function(event, ui) {
				$(this).removeClass("ui-dialog-resizing");
				options.height = $(this).height();
				options.width = $(this).width();
				self._trigger('resizeStop', event, filteredUi(ui));
				$.ui.dialog.overlay.resize();
			}
		})
		.css('position', position)
		.find('.ui-resizable-se').addClass('ui-icon ui-icon-grip-diagonal-se');
	},

	_minHeight: function() {
		var options = this.options;

		if (options.height === 'auto') {
			return options.minHeight;
		} else {
			return Math.min(options.minHeight, options.height);
		}
	},

	_position: function(position) {
		var myAt = [],
			offset = [0, 0],
			isVisible;

		if (position) {
			// deep extending converts arrays to objects in jQuery <= 1.3.2 :-(
	//		if (typeof position == 'string' || $.isArray(position)) {
	//			myAt = $.isArray(position) ? position : position.split(' ');

			if (typeof position === 'string' || (typeof position === 'object' && '0' in position)) {
				myAt = position.split ? position.split(' ') : [position[0], position[1]];
				if (myAt.length === 1) {
					myAt[1] = myAt[0];
				}

				$.each(['left', 'top'], function(i, offsetPosition) {
					if (+myAt[i] === myAt[i]) {
						offset[i] = myAt[i];
						myAt[i] = offsetPosition;
					}
				});

				position = {
					my: myAt.join(" "),
					at: myAt.join(" "),
					offset: offset.join(" ")
				};
			}

			position = $.extend({}, $.ui.dialog.prototype.options.position, position);
		} else {
			position = $.ui.dialog.prototype.options.position;
		}

		// need to show the dialog to get the actual offset in the position plugin
		isVisible = this.uiDialog.is(':visible');
		if (!isVisible) {
			this.uiDialog.show();
		}
		this.uiDialog
			// workaround for jQuery bug #5781 http://dev.jquery.com/ticket/5781
			//.css({ top: 0, left: 0 })
			.position($.extend({ of: window }, position));
		if (!isVisible) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var self = this,
			resizableOptions = {},
			resize = false;

		$.each( options, function( key, value ) {
			self._setOption( key, value );

			if ( key in sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
		}
		if ( this.uiDialog.is( ":data(resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function(key, value){
		var self = this,
			uiDialog = self.uiDialog;

		switch (key) {
			//handling of deprecated beforeclose (vs beforeClose) option
			//Ticket #4669 http://dev.jqueryui.com/ticket/4669
			//TODO: remove in 1.9pre
			case "beforeclose":
				key = "beforeClose";
				break;
			case "buttons":
				self._createButtons(value);
				break;
			case "closeText":
				// ensure that we always pass a string
				self.uiDialogTitlebarCloseText.text("" + value);
				break;
			case "dialogClass":
				uiDialog
					.removeClass(self.options.dialogClass)
					.addClass(uiDialogClasses + value);
				break;
			case "disabled":
				if (value) {
					uiDialog.addClass('ui-dialog-disabled');
				} else {
					uiDialog.removeClass('ui-dialog-disabled');
				}
				break;
			case "draggable":
				var isDraggable = uiDialog.is( ":data(draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}

				if ( !isDraggable && value ) {
					self._makeDraggable();
				}
				break;
			case "position":
				self._position(value);
				break;
			case "resizable":
				// currently resizable, becoming non-resizable
				var isResizable = uiDialog.is( ":data(resizable)" );
				if (isResizable && !value) {
					uiDialog.resizable('destroy');
				}

				// currently resizable, changing handles
				if (isResizable && typeof value === 'string') {
					uiDialog.resizable('option', 'handles', value);
				}

				// currently non-resizable, becoming resizable
				if (!isResizable && value !== false) {
					self._makeResizable(value);
				}
				break;
			case "title":
				// convert whatever was passed in o a string, for html() to not throw up
				$(".ui-dialog-title", self.uiDialogTitlebar).html("" + (value || '&#160;'));
				break;
		}

		$.Widget.prototype._setOption.apply(self, arguments);
	},

	_size: function() {
		/* If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		 * divs will both have width and height set, so we need to reset them
		 */
		var options = this.options,
			nonContentHeight,
			minContentHeight,
			isVisible = this.uiDialog.is( ":visible" );

		// reset content sizing
		this.element.show().css({
			width: 'auto',
			minHeight: 0,
			height: 0
		});

		if (options.minWidth > options.width) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: 'auto',
				width: options.width
			})
			.height();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );

		if ( options.height === "auto" ) {
			// only needed for IE6 support
			if ( $.support.minHeight ) {
				this.element.css({
					minHeight: minContentHeight,
					height: "auto"
				});
			} else {
				this.uiDialog.show();
				var autoHeight = this.element.css( "height", "auto" ).height();
				if ( !isVisible ) {
					this.uiDialog.hide();
				}
				this.element.height( Math.max( autoHeight, minContentHeight ) );
			}
		} else {
			this.element.height( Math.max( options.height - nonContentHeight, 0 ) );
		}

		if (this.uiDialog.is(':data(resizable)')) {
			this.uiDialog.resizable('option', 'minHeight', this._minHeight());
		}
	}
});

$.extend($.ui.dialog, {
	version: "1.8.16",

	uuid: 0,
	maxZ: 0,

	getTitleId: function($el) {
		var id = $el.attr('id');
		if (!id) {
			this.uuid += 1;
			id = this.uuid;
		}
		return 'ui-dialog-title-' + id;
	},

	overlay: function(dialog) {
		this.$el = $.ui.dialog.overlay.create(dialog);
	}
});

$.extend($.ui.dialog.overlay, {
	instances: [],
	// reuse old instances due to IE memory leak with alpha transparency (see #5185)
	oldInstances: [],
	maxZ: 0,
	events: $.map('focus,mousedown,mouseup,keydown,keypress,click'.split(','),
		function(event) { return event + '.dialog-overlay'; }).join(' '),
	create: function(dialog) {
		if (this.instances.length === 0) {
			// prevent use of anchors and inputs
			// we use a setTimeout in case the overlay is created from an
			// event that we're going to be cancelling (see #2804)
			setTimeout(function() {
				// handle $(el).dialog().dialog('close') (see #4065)
				if ($.ui.dialog.overlay.instances.length) {
					$(document).bind($.ui.dialog.overlay.events, function(event) {
						// stop events if the z-index of the target is < the z-index of the overlay
						// we cannot return true when we don't want to cancel the event (#3523)
						if ($(event.target).zIndex() < $.ui.dialog.overlay.maxZ) {
							return false;
						}
					});
				}
			}, 1);

			// allow closing by pressing the escape key
			$(document).bind('keydown.dialog-overlay', function(event) {
				if (dialog.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
					event.keyCode === $.ui.keyCode.ESCAPE) {

					dialog.close(event);
					event.preventDefault();
				}
			});

			// handle window resize
			$(window).bind('resize.dialog-overlay', $.ui.dialog.overlay.resize);
		}

		var $el = (this.oldInstances.pop() || $('<div></div>').addClass('ui-widget-overlay'))
			.appendTo(document.body)
			.css({
				width: this.width(),
				height: this.height()
			});

		if ($.fn.bgiframe) {
			$el.bgiframe();
		}

		this.instances.push($el);
		return $el;
	},

	destroy: function($el) {
		var indexOf = $.inArray($el, this.instances);
		if (indexOf != -1){
			this.oldInstances.push(this.instances.splice(indexOf, 1)[0]);
		}

		if (this.instances.length === 0) {
			$([document, window]).unbind('.dialog-overlay');
		}

		$el.remove();

		// adjust the maxZ to allow other modal dialogs to continue to work (see #4309)
		var maxZ = 0;
		$.each(this.instances, function() {
			maxZ = Math.max(maxZ, this.css('z-index'));
		});
		this.maxZ = maxZ;
	},

	height: function() {
		return $(document).height() + 'px';
	},

	width: function() {
		return $(document).width() + 'px';
	},

	resize: function() {
		/* If the dialog is draggable and the user drags it past the
		 * right edge of the window, the document becomes wider so we
		 * need to stretch the overlay. If the user then drags the
		 * dialog back to the left, the document will become narrower,
		 * so we need to shrink the overlay to the appropriate size.
		 * This is handled by shrinking the overlay before setting it
		 * to the full document size.
		 */
		var $overlays = $([]);
		$.each($.ui.dialog.overlay.instances, function() {
			$overlays = $overlays.add(this);
		});

		$overlays.css({
			width: 0,
			height: 0
		}).css({
			width: $.ui.dialog.overlay.width(),
			height: $.ui.dialog.overlay.height()
		});
	}
});

$.extend($.ui.dialog.overlay.prototype, {
	destroy: function() {
		$.ui.dialog.overlay.destroy(this.$el);
	}
});

}(jQuery));/* Author: André Roberge
   License: MIT
 */

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
};/* Author: André Roberge
   License: MIT

   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR , editor, __BRYTHON__*/

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
RUR.rec.reset();

RUR.rec.record_frame = function (name, obj) {
    // clone current world and store the clone
    var frame = {};
    frame.world = RUR.world.clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }

    frame.delay = RUR.rec.delay;
    if (RUR.control.sound_id && RUR.control.sound_flag && frame.delay > RUR.MIN_TIME_SOUND) {
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
    if (frame.delay !== undefined){
        RUR.rec.delay = frame.delay;
    }
    if (frame.pause) {
        RUR.ui.pause(frame.pause.pause_time);
        return "pause";
    } else if (frame.error !== undefined) {
        return RUR.rec.handle_error(frame);
    } else if (frame.output !== undefined) {
        if (frame.output.other_element && frame.output.html){  // for clear_print
            $(frame.output.element).html(frame.output.message);
            $(frame.output.other_element).html(frame.output.message);
        }
        if (frame.output.html){
            $(frame.output.element).html(frame.output.message);
        } else {
            $(frame.output.element).append(frame.output.message);
        }
        $("#Reeborg-writes").dialog("open");
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
            $("#Reeborg-concludes").html(goal_status.message).dialog("open");
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
        $("#Reeborg-concludes").html("<p class='center'>" + RUR.translate("Last instruction completed!") + "</p>").dialog("open");
    }
    return "stopped";
};

RUR.rec.handle_error = function (frame) {
    var goal_status;
    //Brython adds information to error messages; we want to remove it from the following comparison
    if (frame.error.message !== undefined &&
        frame.error.message.split("\n")[0] === RUR.translate("Done!").split("\n")[0]){
        if (frame.world.goal !== undefined){
            return RUR.rec.conclude();
        } else {
            if (RUR.control.sound_flag) {
                RUR.control.play_sound("#success-sound");
            }
            $("#Reeborg-concludes").html(RUR.translate("<p class='center'>Instruction <code>done()</code> executed.</p>")).dialog("open");
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
    robot.objects = {};
    if (tokens !== undefined){
        robot.objects.token = tokens;
    }

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
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
        }
    }

    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot.orientation;

    return robot;
};

 /* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, editorUpdateHints,
  translate_python, CoffeeScript */

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
                            if (nb != 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) != 0) {
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
        if (robot.orientation == -1){
            RUR.current_world.robots[0].orientation = RUR.randint(0, 3);
            RUR.current_world.robots[0]._prev_orientation = RUR.current_world.robots[0].orientation;
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
};


RUR.runner.run = function (playback) {
    var src, fatal_error_found = false;
    if (!RUR.runner.interpreted) {
        RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
        RUR.runner.assign_initial_values();
        src = editor.getValue();
        fatal_error_found = RUR.runner.eval(src); // jshint ignore:line
    }
    if (!fatal_error_found) {
        try {
            localStorage.setItem(RUR.settings.editor, editor.getValue());
            localStorage.setItem(RUR.settings.library, library.getValue());
        } catch (e) {}
        // "playback" is a function called to play back the code in a sequence of frames
        // or a "null function", f(){} can be passed if the code is not
        // dependent on the robot world.
        if (playback() === "stopped") {
            RUR.ui.stop();
        }
    }
};

RUR.runner.eval = function(src) {  // jshint ignore:line
    var error_name, message, response, other_info;
    other_info = '';
    try {
        if (RUR.programming_language === "javascript") {
            RUR.runner.eval_javascript(src);
        } else if (RUR.programming_language === "python") {
            RUR.runner.eval_python(src);
        } else if (RUR.programming_language === "coffee") {
            RUR.runner.eval_coffee(src);
        } else {
            alert("Unrecognized programming language.");
            return true;
        }
    } catch (e) {
        if (RUR.__debug){
            console.dir(e);
        }
        if (RUR.programming_language === "python") {
            response = RUR.runner.simplify_python_traceback(e);
            message = response.message;
            other_info = response.other_info;
            error_name = response.error_name;
        } else {
            error_name = e.name;
            message = e.message;
        }

        if (error_name === "ReeborgError"){
            if (e.reeborg_shouts !== undefined) {
                e.message = e.reeborg_shouts;
            }
            RUR.rec.record_frame("error", e);
        } else {
            $("#Reeborg-shouts").html("<h3>" + error_name + "</h3><h4>" +
                                      message + "</h4><p>" + other_info +
                                      '</p>').dialog("open");
            RUR.ui.stop();
            return true;
        }
    }
    RUR.runner.interpreted = true;
    return false;
};


RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};


RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    var pre_code = '', post_code = '';
    RUR.reset_definitions();
    if (RUR.current_world.pre_code){
        pre_code = RUR.current_world.pre_code;
    }
    if (RUR.current_world.post_code){
        post_code = RUR.current_world.post_code;
    }
    translate_python(src, RUR._highlight, pre_code, post_code);
};


RUR.runner.eval_coffee = function (src) {
    // do not  "use strict"
    RUR.reset_definitions();
    eval(CoffeeScript.compile(src)); // jshint ignore:line
};

RUR.runner.compile_coffee = function() {
    if (RUR.programming_language !== "coffee") {
        return;
    }
    var js_code = CoffeeScript.compile(editor.getValue());
    $("#stdout").html(js_code);
    $("#Reeborg-writes").dialog("open");
};

RUR.runner.simplify_python_traceback = function(e) {
    "use strict";
    var message, error_name, other_info, diagnostic;
    other_info = '';
    if (e.reeborg_shouts === undefined) {  // src/brython/Lib/site-packages/reeborg_common.py
        if (RUR._automatic_highlight_off) {
            RUR._automatic_highlight_off = false;
            $("#highlight-impossible").hide();
            RUR.ui.highlight(); // turn it back on - we found another problem.
        }
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
                error_name = "Invalid Python Code";
                message = '';
                other_info = RUR.translate("I cannot help you with this problem.");
                break;
            default:
                other_info = "";
        }
    } else {
        message = e.reeborg_shouts;
        error_name = "ReeborgError";
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
/* Author: André Roberge
   License: MIT

   Utilities for dealing with html LocalStorage.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.storage = {};

RUR.storage._save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
        RUR.storage.delete_world(name);
    }
    RUR.storage.save_world(name);
};

RUR.storage.save_world = function (name){
    "use strict";
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
        $("#Reeborg-shouts").html(RUR.translate("No such world!")).dialog("open");
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

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, editor */

RUR.testing = {};

RUR.testing.test_permalink = function (permalink){
    editor.setValue('Permalink("' + permalink + '")');
    RUR.testing.run_test();
};

RUR.testing.test_permalien = function (permalink){
    editor.setValue('Permalien("' + permalink + '")');
    RUR.testing.run_test();
};

RUR.testing.run_test = function() {
    RUR.ui.run();  // runs the permalink instruction, thus loading the appropriate test
    RUR.ui.reload();
    RUR.ui.run();
};
/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.ui = {};

RUR.ui.stop_called = false;

RUR.ui.set_ready_to_run = function () {
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
    $("#highlight-impossible").hide();
    $("#stdout").html("");
    $("#_write").html("");
    $(".view_source").remove();
    $("#narrates").html("");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    // reset the options in case the user has dragged the dialogs as it would
    // then open at the top left of the window
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    RUR.world.reset();
    RUR.runner.interpreted = false;
    RUR.control.sound_flag = false;
    RUR.rec.reset();
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

RUR.ui.load_file = function (filename, replace, elt, i) {
    "use strict";
    $.ajax({url: "src/worlds/" + filename + ".json",
        async: false,
        error: function(e){
            RUR.ui.load_file_error = true;
        },
        success: function(data){
            RUR.world.import_world(data);
            if (replace) {
                elt.options[i].value = "src/worlds/" + filename + ".json";
                elt.value = elt.options[i].value;
            } else {
                $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                      ).val("src/worlds/" + filename + ".json").html(filename));
                $('#select_world').val("src/worlds/" + filename + ".json");
            }
            $("#select_world").change();
        }
    }, "text");
};

RUR.ui.load_world = function (filename) {
    // this is for worlds that are defined in a file not available from the
    // drop-down menu.
    "use strict";
    var elt = document.getElementById("select_world");
    RUR.ui.load_file_error = false;

    // first look within already known worlds, either pre-defined or
    // loaded and saved in local storage
    for (var i=0; i < elt.options.length; i++){
        if (elt.options[i].text === filename) {
            if (elt.options[i].selected) {
                if (elt.options[i].value === "src/worlds/" + filename + ".json") {
                    /* A new world can be selected via a user program using the
                      world() function. When this is done, and if the
                      world is changed by this selection, an alert is first
                      shown and the program is otherwise not run. Executing the
                      program a second time will work as the correct world will
                      be displayed.
                    */
                    return;   // already selected, can run program
                } else {
                    RUR.ui.load_file(filename, true, elt, i);
                    if (RUR.ui.load_file_error) {
                        throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: filename}));
                    }
                    throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: filename}));
                }
            }
        }
    }
    // the requested world was not previously known.
    RUR.ui.load_file(filename, false);
    if (RUR.ui.load_file_error) {
        throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: filename}));
    }
    throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: filename}));
};

RUR.ui.load_user_worlds = function () {
    var key, name, i, user_world_present;
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 11) === "user_world:") {
            name = key.slice(11);
            if (name !== "PERMALINK") {
                $('#select_world').append( $('<option style="background-color:#ff9"></option>'
                              ).val("user_world:" + name).html(name));
                user_world_present = true;
            }
        }
    }
    if (user_world_present){
        $('#delete-world').show();
    }
};

RUR.ui.highlight = function (arg) {
    if (RUR._highlight) {
        RUR._highlight = false;
        if (arg){
            RUR._automatic_highlight_off = true;
        }
        $("#not-ok-image").show();
        $("#ok-image").hide();
    } else {
        RUR._highlight = true;
        $("#not-ok-image").hide();
        $("#ok-image").show();
    }
};

RUR.ui.buttons = {execute_button: '<img src="src/images/play.png" class="blue-gradient" alt="run"/>',
    reload_button: '<img src="src/images/reload.png" class="blue-gradient" alt="reload"/>',
    step_button: '<img src="src/images/step.png" class="blue-gradient" alt="step"/>',
    pause_button: '<img src="src/images/pause.png" class="blue-gradient" alt="pause"/>',
    stop_button: '<img src="src/images/stop.png" class="blue-gradient" alt="stop"/>'};

RUR.ui.add_help = function(usage, _id, lang, warning){

    if (RUR.ui._added_lang === undefined) {
        RUR.ui._added_lang = [lang];
    } else if (RUR.ui._added_lang.indexOf(lang)== -1) {
        RUR.ui._added_lang.push(lang);
    } else {
        return;
    }
    if (document.documentElement.lang != _id){
        $("#help").prepend('<span style="color:darkred">' + warning + RUR.translate("Object names") + "</span><br>");
    }
    $("#toc").after(usage);
    $("#toc").prepend('<li><a href="#basic-commands-' + _id + '">' + lang + "</a></li>");
};/* Author: André Roberge
   License: MIT  */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

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
};/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.vis_robot = {};
RUR.vis_robot.images = [{}, {}, {}, {}];

// classic
RUR.vis_robot.images[0].robot_e_img = new Image();
RUR.vis_robot.images[0].robot_e_img.src = 'src/images/robot_e.png';
RUR.vis_robot.images[0].robot_n_img = new Image();
RUR.vis_robot.images[0].robot_n_img.src = 'src/images/robot_n.png';
RUR.vis_robot.images[0].robot_w_img = new Image();
RUR.vis_robot.images[0].robot_w_img.src = 'src/images/robot_w.png';
RUR.vis_robot.images[0].robot_s_img = new Image();
RUR.vis_robot.images[0].robot_s_img.src = 'src/images/robot_s.png';
RUR.vis_robot.images[0].robot_random_img = new Image();
RUR.vis_robot.images[0].robot_random_img.src = 'src/images/robot_random.png';

// rover type
RUR.vis_robot.images[1].robot_e_img = new Image();
RUR.vis_robot.images[1].robot_e_img.src = 'src/images/rover_e.png';
RUR.vis_robot.images[1].robot_n_img = new Image();
RUR.vis_robot.images[1].robot_n_img.src = 'src/images/rover_n.png';
RUR.vis_robot.images[1].robot_w_img = new Image();
RUR.vis_robot.images[1].robot_w_img.src = 'src/images/rover_w.png';
RUR.vis_robot.images[1].robot_s_img = new Image();
RUR.vis_robot.images[1].robot_s_img.src = 'src/images/rover_s.png';
RUR.vis_robot.images[1].robot_random_img = new Image();
RUR.vis_robot.images[1].robot_random_img.src = 'src/images/rover_random.png';

// 3d red type
RUR.vis_robot.images[2].robot_e_img = new Image();
RUR.vis_robot.images[2].robot_e_img.src = 'src/images/plain_e.png';
RUR.vis_robot.images[2].robot_n_img = new Image();
RUR.vis_robot.images[2].robot_n_img.src = 'src/images/plain_n.png';
RUR.vis_robot.images[2].robot_w_img = new Image();
RUR.vis_robot.images[2].robot_w_img.src = 'src/images/plain_w.png';
RUR.vis_robot.images[2].robot_s_img = new Image();
RUR.vis_robot.images[2].robot_s_img.src = 'src/images/plain_s.png';
RUR.vis_robot.images[2].robot_random_img = new Image();
RUR.vis_robot.images[2].robot_random_img.src = 'src/images/robot_random.png';

// solar panel type
RUR.vis_robot.images[3].robot_e_img = new Image();
RUR.vis_robot.images[3].robot_e_img.src = 'src/images/sp_e.png';
RUR.vis_robot.images[3].robot_n_img = new Image();
RUR.vis_robot.images[3].robot_n_img.src = 'src/images/sp_n.png';
RUR.vis_robot.images[3].robot_w_img = new Image();
RUR.vis_robot.images[3].robot_w_img.src = 'src/images/sp_w.png';
RUR.vis_robot.images[3].robot_s_img = new Image();
RUR.vis_robot.images[3].robot_s_img.src = 'src/images/sp_s.png';
RUR.vis_robot.images[3].robot_random_img = new Image();
RUR.vis_robot.images[3].robot_random_img.src = 'src/images/robot_random.png';

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
RUR.vis_robot.random_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
};



RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image;
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

    switch(robot.orientation){
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
    if (robot === undefined || robot._is_leaky === false || robot.orientation === -1) {
        return;
    }
    if (robot.x > RUR.COLS || robot.y > RUR.ROWS) {
        return;
    }
    var ctx = RUR.TRACE_CTX;
    if (robot.trace_color != undefined){
        ctx.strokeStyle = robot.trace_color;
    } else {
        ctx.strokeStyle = RUR.vis_robot.trace_color;
    }
    ctx.lineWidth = RUR.vis_robot.trace_thickness;
    ctx.lineCap = "round";
    // overrides user choice for large world (small grid size)
    if(RUR.current_world.small_tiles) {
        RUR.vis_robot.trace_offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        RUR.vis_robot.trace_thickness = 2;
    } else {
        RUR.vis_robot.set_trace_style(RUR.TRACE_STYLE);
    }

    ctx.beginPath();
    // ensure that _prev_orientation and orientation are within bounds as these could be messed
    // up by a user program and crash the robot program with a message sent to the console and nothing else.
    ctx.moveTo(robot._prev_x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation%4][0],
                    RUR.HEIGHT - (robot._prev_y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation%4][1]);
    ctx.lineTo(robot.x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot.orientation%4][0],
                    RUR.HEIGHT - (robot.y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot.orientation%4][1]);
    ctx.stroke();
};

RUR.vis_robot.set_trace_style = function (choice){
    "use strict";
    if (choice === undefined) {
        return;
    }
    RUR.TRACE_STYLE = choice;
    if (choice === "thick") {
        RUR.vis_robot.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        RUR.vis_robot.trace_color = RUR.DEFAULT_TRACE_COLOR;
        RUR.vis_robot.trace_thickness = 4;
    } else if (choice === "none") {
        RUR.vis_robot.trace_color = "rgba(0,0,0,0)";
    } else if (choice === "default") {
        RUR.vis_robot.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
        RUR.vis_robot.trace_color = RUR.DEFAULT_TRACE_COLOR;
        RUR.vis_robot.trace_thickness = 1;
    }
};

RUR.vis_robot.set_trace_style("default");
/* Author: André Roberge
   License: MIT
 */

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
            alert("Editing of blank canvas is not supported.");
            return;
         }
        RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.SECOND_LAYER_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        return;
    }

    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.draw_grid_walls();  // on BACKGROUND_CTX
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

    if (RUR.__debug) {
        RUR.vis_world.sanity_check(0);
    }
    RUR.vis_world.draw_foreground_walls(RUR.current_world.walls); // on OBJECTS_CTX
    RUR.vis_world.draw_all_objects(RUR.current_world.objects);  // on OBJECTS_CTX
        // RUR.vis_world.draw_all_objects also called by draw_goal, and draws on GOAL_CTX
        // and, draws some objects on ROBOT_CTX

    // top tiles: goal is false, tile is true
    RUR.vis_world.draw_all_objects(RUR.current_world.top_tiles, false, true); // likely on RUR.SECOND_LAYER_CTX

    // do not clear BACKGROUND_CTX here
    RUR.vis_world.draw_tiles(RUR.current_world.tiles); // on BACKGROUND_CTX
    RUR.vis_world.draw_robots(RUR.current_world.robots);  // on ROBOT_CTX
    RUR.vis_world.compile_info();  // on ROBOT_CTX
    RUR.vis_world.draw_info();     // on ROBOT_CTX
    if (RUR.__debug) {
        RUR.vis_world.sanity_check(100);
    }
};

RUR.vis_world.sanity_check = function(offset) {
    // An intermittent bug sometimes  causes the robot NOT to be drawn.
    // This sanity check is performed so as to see if any unexpected
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
    var i, j, k, keys, key, image;
    if (tiles === undefined) {
        return;
    }
    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        image = RUR.tiles[tiles[keys[key]]].image;
        RUR.vis_world.draw_single_object(image, i, j, RUR.BACKGROUND_CTX);
    }
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
                            specific_object = RUR.top_tiles[obj_name];
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
    ctx.drawImage(image, x, y, image.width*RUR.SCALE, image.height*RUR.SCALE);
};



RUR.vis_world.compile_info = function() {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drown - if anything.
    var coords, obj, quantity;
    RUR.vis_world.information = {};
    if (RUR.current_world.objects !== undefined) {
        RUR.vis_world.compile_partial_info(RUR.current_world.objects, 'black');
    }
    if (RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.objects !== undefined) {
        RUR.vis_world.compile_partial_info(RUR.current_world.goal.objects, 'blue');
    }
};

RUR.vis_world.compile_partial_info = function(objects, color){
    "use strict";
    var coords, obj, quantity;
    for (coords in objects) {
        if (objects.hasOwnProperty(coords)){
            // objects found here
            for(obj in objects[coords]){
                if (objects[coords].hasOwnProperty(obj)){
                    if (RUR.vis_world.information[coords] !== undefined){
                        if (RUR.vis_world.information[coords][0] != obj) { // already at least one other object there
                            RUR.vis_world.information[coords] = [undefined, "?"];  // assign impossible object
                        } else if (RUR.vis_world.information[coords][1] == objects[coords][obj]) { // same object, same quantity
                               if (objects[coords][obj] == 1){
                                    RUR.vis_world.information[coords] = [obj, '', 'black'];  // don't show number for 1
                               } else {
                                    RUR.vis_world.information[coords] = [obj, objects[coords][obj], 'green'];
                               }
                        } else {  // same object, different quantities
                            RUR.vis_world.information[coords] = [obj, 'X', 'red'];
                        }

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
                        RUR.vis_world.information[coords] = [obj, quantity, color];
                    }
                }
            }
        }
    }
};

RUR.vis_world.draw_info = function() {
    var i, j, coords, keys, key, info, ctx;
    var size = 12*RUR.SCALE, scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;
    if (RUR.vis_world.information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;

    keys = Object.keys(RUR.vis_world.information);
    for (key=0; key < keys.length; key++){
        coords = keys[key].split(",");
        i = parseInt(coords[0], 10);
        j = parseInt(coords[1], 10);
        info = RUR.vis_world.information[coords][1];
        if (info != 1 && i <= RUR.COLS && j <= RUR.ROWS){
            text_width = ctx.measureText(info).width/2;
            ctx.font = RUR.BACKGROUND_CTX.font;
            ctx.fillStyle = RUR.vis_world.information[coords][2];
            ctx.fillText(info, (i+0.2)*scale, Y - (j)*scale);
        }
    }
};
/* Author: André Roberge
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
    world.objects = {};
    // allow teacher to insert code to be run before and after the
    // code entered by the student
    world.pre_code = '';
    world.post_code = '';
    return world;
};
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, 2);
};

RUR.world.import_world = function (json_string, already_parsed) {
    var body;
    if (json_string === undefined){
        return {};
    }
    if (already_parsed === undefined){
        try {
            RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
        } catch (e) {
            console.log("exception caught in import_world");
            console.log(json_string);
            console.log(e);
            return;
        }
    } else {
        RUR.current_world = json_string;
    }

    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            body = RUR.current_world.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body.orientation;
        }
    }

    RUR.current_world.small_tiles = RUR.current_world.small_tiles || false;
    RUR.current_world.rows = RUR.current_world.rows || RUR.MAX_Y;
    RUR.current_world.cols = RUR.current_world.cols || RUR.MAX_X;
    RUR.vis_world.compute_world_geometry(RUR.current_world.cols, RUR.current_world.rows);

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
        RUR.MAX_NB_ROBOTS == RUR.current_world.robots.length){
        throw new RUR.ReeborgError(RUR.translate("You cannot create another robot!"));
    }
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


RUR.world.__remove_default_robot = function () {
    if (RUR.MAX_NB_ROBOTS !== undefined){
        throw new RUR.ReeborgError(RUR.translate("Cheater! You are not allowed to change the number of robots this way!"));
    } else {
        RUR.current_world.robots = [];
    }
};
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.we = {};   // we == World Editor

RUR.we.__give_to_robot = false;

RUR.we.edit_world = function  () {
    "use strict";
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    var value;
    switch (RUR.we.edit_world_flag) {
        case "robot-place":
            RUR.we.place_robot();
            break;
        case "object-token":
        case "object-star":
        case "object-triangle":
        case "object-square":
        case "object-strawberry":
        case "object-banana":
        case "object-apple":
        case "object-orange":
        case "object-leaf":
        case "object-dandelion":
        case "object-carrot":
        case "object-tulip":
        case "object-daisy":
        case "object-box":
            value = RUR.we.edit_world_flag.substring(7);
            RUR.we._add_object(value);
            break;
        case "tile-mud":
        case "tile-water":
        case "tile-gravel":
        case "tile-ice":
        case "tile-grass":
        case "tile-bricks":
            value = RUR.we.edit_world_flag.substring(5);
            RUR.we.toggle_tile(value);
            break;
        case "fill-mud":
        case "fill-water":
        case "fill-gravel":
        case "fill-ice":
        case "fill-grass":
        case "fill-bricks":
            value = RUR.we.edit_world_flag.substring(5);
            RUR.we.fill_with_tile(value);
            break;
        case "toptile-bridge":
        case "toptile-fence4":
        case "toptile-fence5":
        case "toptile-fence6":
        case "toptile-fence7":
            value = RUR.we.edit_world_flag.substring(8);
            RUR.we.toggle_toptile(value);
            break;
        case "world-walls":
            RUR.we._toggle_wall();
            break;
        case "position-green_home_tile":
        case "position-house":
        case "position-racing_flag":
            value = RUR.we.edit_world_flag.substring(9);
            RUR.we.set_goal_position(value);
            break;
        case "goal-wall":
            RUR.we.toggle_goal_wall();
            break;
        case "goal-token":
        case "goal-star":
        case "goal-triangle":
        case "goal-square":
        case "goal-strawberry":
        case "goal-banana":
        case "goal-apple":
        case "goal-orange":
        case "goal-leaf":
        case "goal-dandelion":
        case "goal-carrot":
        case "goal-tulip":
        case "goal-daisy":
        case "goal-box":
            value = RUR.we.edit_world_flag.substring(5);
            RUR.we._add_goal_objects(value);
            break;
        default:
            break;
    }
    RUR.we.refresh_world_edited();
};

RUR.we.select = function (choice) {
    "use strict";
    var value;
    $(".edit-world-canvas").hide();
    $(".edit-goal-canvas").hide();
    $("#edit-goal-position").hide();
    $("#edit-world-objects").hide();
    $(".not-for-robot").hide();
    RUR.we.edit_world_flag = choice;
    switch (choice) {
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
        case "robot-objects":
            RUR.we.__give_to_robot = true;
            $("#edit-world-objects").show();
            $(".not-for-robot").hide();
            $("#cmd-result").html(RUR.translate("Click on desired object below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-objects":
            $("#edit-world-objects").show();
            $(".not-for-robot").show();
            RUR.we.__give_to_robot = false;
            $("#cmd-result").html(RUR.translate("Click on desired object below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-tiles":
            $("#edit-tile").show();
            $("#cmd-result").html(RUR.translate("Click on desired tile below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-fill-tiles":
            $("#fill-tile").show();
            $("#cmd-result").html(RUR.translate("Click on desired tile below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-toptiles":
            $("#edit-top-tile").show();
            $("#cmd-result").html(RUR.translate("Click on desired top tile below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "object-token":
        case "object-star":
        case "object-triangle":
        case "object-square":
        case "object-strawberry":
        case "object-banana":
        case "object-apple":
        case "object-orange":
        case "object-leaf":
        case "object-dandelion":
        case "object-carrot":
        case "object-tulip":
        case "object-daisy":
        case "object-box":
            value = choice.substring(7);
            $("#edit-world-objects").show();
            if (RUR.we.__give_to_robot) {
                $(".not-for-robot").hide();
                RUR.we._give_objects_to_robot(value);
                RUR.we.edit_world_flag = '';
            } else {
                $(".not-for-robot").show();
                if (value == "box"){
                    $("#cmd-result").html(RUR.translate("Click on world to add single object.").supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
                } else {
                    $("#cmd-result").html(RUR.translate("Click on world to add object.").supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
                }
            }
            break;
        case "tile-mud":
        case "tile-water":
        case "tile-ice":
        case "tile-gravel":
        case "tile-grass":
        case "tile-bricks":
            value = choice.substring(5);
            $("#edit-tile").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle tile.").supplant({tile: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
            break;
        case "fill-mud":
        case "fill-water":
        case "fill-ice":
        case "fill-gravel":
        case "fill-grass":
        case "fill-bricks":
            value = choice.substring(5);
            $("#fill-tile").show();
            $("#cmd-result").html(RUR.translate("Click on world to fill with given tile.").supplant({tile: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
            break;
        case "toptile-bridge":
        case "toptile-fence4":
        case "toptile-fence5":
        case "toptile-fence6":
        case "toptile-fence7":
            value = choice.substring(8);
            $("#edit-top-tile").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle top tile.").supplant({tile: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-walls":
            $("#cmd-result").html(RUR.translate("Click on world to toggle walls.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-robot":
            $("#edit-goal-position").show();
            $("#cmd-result").html(RUR.translate("Click on image desired to indicate the final position of the robot.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "position-green_home_tile":
        case "position-house":
        case "position-racing_flag":
            $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-wall":
            $("#cmd-result").html(RUR.translate("Click on world to toggle additional walls to build.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-objects":
            $("#edit-goal-objects").show();
            $("#cmd-result").html(RUR.translate("Click on desired goal object below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-token":
        case "goal-star":
        case "goal-triangle":
        case "goal-square":
        case "goal-strawberry":
        case "goal-banana":
        case "goal-apple":
        case "goal-orange":
        case "goal-leaf":
        case "goal-dandelion":
        case "goal-carrot":
        case "goal-tulip":
        case "goal-daisy":
        case "goal-box":
            value = choice.substring(5);
            $("#edit-goal-objects").show();
            if (value == "box"){
            $("#cmd-result").html(RUR.translate("Click on world to set number of single goal objects.").supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
            } else {
            $("#cmd-result").html(RUR.translate("Click on world to set number of goal objects.").supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
            }

            $("#cmd-result").html(RUR.translate("Click on world to set number of goal objects.").supplant({obj: RUR.translate(value)})).effect("highlight", {color: "gold"}, 1500);
            break;
        case "set-dimensions":
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
    if (RUR.we.editing_world) {
        RUR.we.editing_world = false;
        editing_world_enable_run();
        RUR.WALL_COLOR = "brown";
        RUR.SHADOW_WALL_COLOR = "#f0f0f0";
        RUR.vis_world.draw_all();
        if (!Object.identical(RUR.current_world, RUR.world.saved_world)) {
            $("#memorize-world").trigger('click');
        }
    } else {
        RUR.we.change_edit_robot_menu();
        RUR.we.editing_world = true;
        RUR.WALL_COLOR = "black";
        RUR.SHADOW_WALL_COLOR = "#ccd";
        RUR.vis_world.draw_all();
        editing_world_disable_run();
        RUR.we.show_pre_post_code();
    }
}

RUR.we.show_pre_post_code = function () {
    if (RUR.current_world.pre_code !== undefined) {
        $("#pre-code").val(RUR.current_world.pre_code);
    } else {
        $("#pre-code").val("pre-code");
    }
    if (RUR.current_world.post_code !== undefined) {
        $("#post-code").val(RUR.current_world.post_code);
    } else {
        $("#post-code").val("post-code");
    }
    if (RUR.current_world.description !== undefined) {
        $("#description").val(RUR.current_world.description);
    } else {
        $("#description").val("Description");
    }
};

RUR.we.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.we.show_world_info();
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

RUR.we.show_world_info = function (no_grid) {
    "use strict";
    // shows the information about a given grid position
    // when the user clicks on the canvas at that grid position.
    // enabled in doc_ready.js
    var position, tile, obj, information, x, y, coords, obj_here, obj_type, goals;
    var topic, no_object, r, robot, robots;
    var tiles, tilename, fence_noted = false;

    information = "";
    if (!no_grid) {
        position = RUR.we.calculate_grid_position();
        x = position[0];
        y = position[1];
        coords = x + "," + y;
        if (!isNaN(x)){
            information = "x = " + x + ", y = " + y;
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
                    information +=  "<br>" + tile.info;;
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

    if (RUR.current_world.description) {
        information += "<br><br><b>" + RUR.translate("Description") + "</b><br>" + RUR.current_world.description;
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
    $("#give-object-name").html(RUR.we.specific_object);
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
        if (nb === 0 && robot.objects[obj] !== undefined) {
            delete robot.objects[obj];
        } else {
            robot.objects[obj] = nb;
        }
    } else {
        $("#Reeborg-shouts").html(nb + RUR.translate(" is not a valid value!")).dialog("open");
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

RUR.we.insert_pre_code = function() {
    RUR.current_world.pre_code = $("#pre-code").val();
    RUR.we.confirm_update();
};

RUR.we.insert_post_code = function() {
    RUR.current_world.post_code = $("#post-code").val();
    RUR.we.confirm_update();
};

RUR.we.add_description = function() {
    RUR.current_world.description = $("#description").val();
    RUR.we.confirm_update();
    RUR.we.show_world_info();
};

RUR.we.confirm_update = function() {
    $("#code-copied").html("updated").effect("highlight", {color: "gold"}, 1500);
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
    $("#add-object-name").html(RUR.we.specific_object);
    RUR.cd.dialog_add_object.dialog("open");
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
    $("#goal-object-name").html(RUR.we.specific_object);
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
}

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
            alert(RUR.translate("WARNING: deleted final positions choices while resizing world!"))
        }
    }
};

RUR.we._remove_all_at_location = function(coords) {
    // trading efficiency for clarity
    if (RUR.current_world.tiles !== undefined) {
        if (RUR.current_world.tiles[coords] != undefined){
            delete RUR.current_world.tiles[coords];
        }
    }
    if (RUR.current_world.top_tiles !== undefined) {
        if (RUR.current_world.top_tiles[coords] != undefined){
            delete RUR.current_world.top_tiles[coords];
        }
    }
    if (RUR.current_world.objects !== undefined) {
        if (RUR.current_world.objects[coords] != undefined){
            delete RUR.current_world.objects[coords];
        }
    }
    if (RUR.current_world.walls !== undefined) {
        if (RUR.current_world.walls[coords] != undefined){
            delete RUR.current_world.walls[coords];
        }
    }
    if (RUR.current_world.goal !== undefined) {
        if (RUR.current_world.goal.objects !== undefined) {
            if (RUR.current_world.goal.objects[coords] != undefined){
                delete RUR.current_world.goal.objects[coords];
            }
        }
    }
    if (RUR.current_world.goal !== undefined) {
        if (RUR.current_world.goal.walls !== undefined) {
            if (RUR.current_world.goal.walls[coords] != undefined){
                delete RUR.current_world.goal.walls[coords];
            }
        }
    }
}