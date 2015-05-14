/* Author: André Roberge
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

RUR._has_token_ = function () {
    return RUR.control.has_token(RUR.current_world.robots[0]);
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

RUR._token_here_ = function() {
    return RUR.control.token_here(RUR.current_world.robots[0]);
};

RUR._right_is_clear_ = function() {
  return RUR.control.right_is_clear(RUR.current_world.robots[0]);
};

RUR._object_here_ = function () {
    return RUR.control.object_here(RUR.current_world.robots[0]);
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
/* Author: André Roberge
   License: MIT

   Defining base name space and various constants.
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
var RUR = RUR || {};

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
RUR.LARGE_WORLD = false;

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

RUR.MUD_COLOR = "#794c13";

RUR.TOKEN_COLOR = "gold";
RUR.TEXT_COLOR = "black";
RUR.TOKEN_GOAL_COLOR = "#666";

RUR.ROBOT_INFO_COLOR = "blue";

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
        throw new RUR.ReeborgError(RUR.translate("Ouch! I hit a wall!"));
    }
    if ((robot.y === RUR.ROWS && robot.orientation === RUR.NORTH) ||
        (robot.x === RUR.COLS && robot.orientation === RUR.EAST)) {
        throw new RUR.ReeborgError(RUR.translate("I am afraid of the void!"));
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
    RUR.rec.record_frame("debug", "RUR.control.move");
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

RUR.control.say = function () {
    var message = '';
  for (var i = 0; i < arguments.length; i++) {
    message += arguments[i];
  }
    RUR.rec.record_frame("say", message);
};

RUR.control.token_here = function (robot, do_not_record) {
    // returns the number of tokens at the location where the robot is
    var coords = robot.x + "," + robot.y;
    if (!do_not_record) {
        RUR.rec.record_frame("debug", "RUR.control.token_here");
    }
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
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({shape: arg}));
    }
    if (robot[RUR.translate(arg)] === 0){
        throw new RUR.ReeborgError(RUR.translate("I don't have any shape to put down!").supplant({shape:arg}));
    } else if (RUR.control.object_here(robot, true) !== 0) {
        throw new RUR.ReeborgError(RUR.translate("There is already something here."));
    }
    robot[RUR.translate(arg)] -= 1;
    RUR.control._put_object(robot, RUR.translate(arg));
};

RUR.control._put_object = function (robot, obj) {
    RUR.we.ensure_key_exist(RUR.current_world, "shapes");
    RUR.current_world.shapes[robot.x + "," + robot.y] = obj;
    RUR.rec.record_frame("debug", "RUR.control._put_object");
};

RUR.control._put_token = function (robot) {
    var token;
    if (robot.tokens === 0){
        throw new RUR.ReeborgError(RUR.translate("I don't have any token to put down!"));
    }
    token = RUR.control.token_here(robot, true);
    RUR.we.ensure_key_exist(RUR.current_world, "tokens");
    RUR.current_world.tokens[robot.x + "," + robot.y] = token+1;
    if (typeof robot.tokens === typeof 42){  // robot could have "infinite" amount
        robot.tokens -= 1;
    }
    RUR.rec.record_frame("debug", "RUR.control._put_token");
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
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({shape: arg}));
    }
    if (RUR.control.object_here(robot, true) !== arg) {
        throw new RUR.ReeborgError(RUR.translate("No shape found here").supplant({shape: arg}));
    }
    robot[RUR.translate(arg)] += 1;
    RUR.control._take_object(robot, RUR.translate(arg));
};

RUR.control._take_object = function (robot, obj) {
    delete RUR.current_world.shapes[robot.x + "," + robot.y];
    RUR.rec.record_frame("debug", "RUR.control._take_object");
};

RUR.control._take_token = function (robot) {
    var token = RUR.control.token_here(robot, true);
    if (token === 0){
        throw new RUR.ReeborgError(RUR.translate("No token found here!"));
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
    RUR.rec.record_frame("debug", "RUR.control._take_token");
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

RUR.control.front_is_clear = function(robot, flag){
    var coords;
    if (!flag) {
        RUR.rec.record_frame("debug", "RUR.control.front_is_clear");
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
    RUR.rec.record_frame("debug", "RUR.control.is_facing_north");
    return robot.orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    RUR.rec.delay = delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.current_world.goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
             RUR.rec.record_frame("debug", "RUR.control.at_goal");
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};

RUR.control.object_here = function (robot, do_not_record) {
    var coords = robot.x + "," + robot.y;
    if (!do_not_record) {
        RUR.rec.record_frame("debug", "RUR.control.object_here");
    }
    if (RUR.control.token_here(robot, true) !== 0) {
        return RUR.translation.token;
    }

    if (RUR.current_world.shapes === undefined) {
        return 0;
    }
    return RUR.translate(RUR.current_world.shapes[coords]) || 0;
};

RUR.control.write = function () {
    RUR.control.sound_id = "#write-sound";
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        output_string += arguments[i].toString() + ' ';
  }
    RUR.rec.record_frame("output", {"element": "#output-pre", "message": output_string});
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
        }  else if (label === "output-panel"){
            $("#output-panel").toggleClass("active");
        }  else if (label === "editor-panel"){
            $("#editor-panel").toggleClass("active");
        }

        if ($("#output-panel").hasClass("active")) {
            if ( $("#world-panel").hasClass("active")) {
                RUR.reset_definitions();
                $("#run2").hide();
                $("#reload2").hide();
            } else {
                $("#run2").show();
                $("#reload2").show();
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
    $("#editor-panel").resizable({
        resize: function() {
            editor.setSize(null, $(this).height()-40);
            library.setSize(null, $(this).height()-40);
        }
    });
    $("#output-panel").resizable();

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


    $("#edit-world").on("click", function(evt) {
        toggle_editing_mode();
        $(this).toggleClass("blue-gradient");
        $(this).toggleClass("reverse-blue-gradient");
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
        var response = prompt(RUR.translate("Enter world name to save"));
        if (response !== null) {
            RUR.storage.save_world(response.trim());
            $('#delete-world').show();
        }
    });

    $("#delete-world").on("click", function(evt) {
        var response = prompt(RUR.translate("Enter world name to delete"));
        if (response !== null) {
            RUR.storage.delete_world(response.trim());
        }
    });

    $("#classic-image").on("click", function(evt) {
        RUR.vis_robot.select_style(0);
    });

    $("#rover-type").on("click", function(evt) {
        RUR.vis_robot.select_style(1);
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


    $("#about-div").dialog({autoOpen:false, width:800,  height:600, maximize: false, position:"top",
        beforeClose: function( event, ui ) {$("#about-button").addClass("blue-gradient").removeClass("reverse-blue-gradient");}});

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


    $("#Reeborg-concludes").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "concludes",
                                    position:{my: "top", at: "top", of: $("#editor-panel")}});
    $("#Reeborg-shouts").dialog({minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-says").dialog({minimize: false, maximize: false, autoOpen:false, width:500, position:{my: "top", at: "top", of: $("#robot_canvas")}});

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
        } else {
            $.get(val, function(data) {
                RUR.world.import_world(data);
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
        eval(new_css);
    }
    // for embedding
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.update_permalink(event.data);
    }
});

/*
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
    if (RUR.programming_language === "python" && RUR._highlight) {
        try {
           editor.removeLineClass(RUR._previous_line, 'background', 'editor-highlight');
        }catch (e) {}
    }
    RUR._previous_line = undefined;
};
RUR.rec.reset();

RUR.rec.record_frame = function (name, obj) {
    // clone current world and store the clone
    var frame = {}, min_time_sound;
    frame.world = RUR.world.clone_world();
    if (name !== undefined) {
        frame[name] = obj;
    }

    if (RUR.programming_language === "python" && RUR._highlight) {
            frame.delay = RUR.rec.delay/2;
            min_time_sound = RUR.MIN_TIME_SOUND/2;
    } else {
            frame.delay = RUR.rec.delay;
            min_time_sound = RUR.MIN_TIME_SOUND;
    }
    if (RUR.control.sound_id && RUR.control.sound_flag && frame.delay > min_time_sound) {
        frame.sound_id = RUR.control.sound_id;
    }


/*    Experimental code    */
   if (RUR.programming_language === "python" && RUR._highlight) {
       if (RUR.current_lineno !== undefined) {
           RUR.rec._line_numbers [RUR.rec.nb_frames] = RUR.current_lineno;
       } else{
           RUR.rec._line_numbers [RUR.rec.nb_frames] = 0;
       }
   }
/*=====================*/

    RUR.previous_lineno = RUR.current_lineno;

    RUR.rec.frames[RUR.rec.nb_frames] = frame;
    RUR.rec.nb_frames++;

    RUR.control.sound_id = undefined;
    if (name === "error"){
        return;
    }
    if(RUR.rec.check_mud(frame)){
        throw new RUR.ReeborgError(RUR.translate("I'm stuck in mud."));
    }
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

/* Experimental code  */

    //track line number and highlight line to be executed
    if (RUR.programming_language === "python" && RUR._highlight) {
        try {
           editor.removeLineClass(RUR._previous_line, 'background', 'editor-highlight');
        }catch (e) {}
        try {
           editor.addLineClass(RUR.rec._line_numbers [RUR.rec.current_frame+1], 'background', 'editor-highlight');
           RUR._previous_line = RUR.rec._line_numbers [RUR.rec.current_frame+1];
        } catch (e) {}
    }

/*=====================*/

    if (RUR.rec.current_frame >= RUR.rec.nb_frames) {
        return RUR.rec.conclude();
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
    /*if (frame.delay !== undefined) {
        RUR.visible_world.delay = frame.delay;   // FIXME
        return "immediate";
    } else */ if (frame.pause) {
        RUR.ui.pause(frame.pause.pause_time);
        return "pause";
    } else if (frame.error !== undefined) {
        return RUR.rec.handle_error(frame);
    } else if (frame.output !== undefined) {
        $(frame.output.element).append(frame.output.message);
    } else if (frame.say !== undefined) {
        $("#Reeborg-says").html(frame.say.toString()).dialog("open").effect("highlight", {color: "cornsilk"}, 300);
    }
    RUR.current_world = frame.world;
    if (frame.sound_id !== undefined){
        RUR.control.play_sound(frame.sound_id);
    }
    RUR.vis_world.refresh();
};

RUR.rec.conclude = function () {

/*  Experimental code */
    if (RUR.programming_language === "python" && RUR._highlight) {
        try{
            editor.removeLineClass(RUR._previous_line, 'background', 'editor-highlight');
        } catch(e) {}
   }
/* ===================== */
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
    if (frame.error.message.split("\n")[0] === RUR.translate("Done!").split("\n")[0]){
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

RUR.rec.check_mud = function(frame) {
    var mud, robots, robot, coords;
    if(frame.world.other !== undefined) {
        if(frame.world.other.mud !== undefined){
            mud = frame.world.other.mud;
        } else {
            return false;
        }
    } else {
        return false;
    }
    if (frame.world.robots !== undefined) {
        robots = frame.world.robots;
    } else {
        return false;
    }

    for (robot=0; robot < frame.world.robots.length; robot++){
        coords = robots[robot].x + "," + robots[robot].y;
        if(mud.indexOf(coords) !== -1){
            return true;
        }
    }
    return false;
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
    if (g.orientation !== undefined){
        if (g.orientation === world.robots[0].orientation){
            goal_status.message += RUR.translate("<li class='success'>Reeborg has the correct orientation.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>Reeborg has the wrong orientation.</li>");
            goal_status.success = false;
        }
    }
    if (g.shapes !== undefined) {
        result = Object.identical(g.shapes, world.shapes, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All shapes are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more shapes are not at the correct location.</li>");
            goal_status.success = false;
        }
    }
    if (g.tokens !== undefined) {
        result = Object.identical(g.tokens, world.tokens, true);
        if (result){
            goal_status.message += RUR.translate("<li class='success'>All tokens are at the correct location.</li>");
        } else {
            goal_status.message += RUR.translate("<li class='failure'>One or more tokens are not at the correct location.</li>");
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
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
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

RUR.runner.run = function (playback) {
    var src, fatal_error_found = false;
    if (!RUR.runner.interpreted) {
        RUR.vis_world.select_initial_values();
        src = editor.getValue();
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
    var error_name, info;
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
        if (RUR.programming_language === "python") {
            error_name = e.__name__;
            if (e.reeborg_says === undefined) {
                e.message = e.message.replace("\n", "<br>");
                if (e.info){
                    info = RUR.simplify_python_traceback(e.info);
                    if (info == "Highlight Problem"){
                        error_name = RUR.translate("Unexplained Error");
                        e.message = RUR.translate("Please turn highlighting off") +
                            "<img src='src/images/highlight.png'>" +
                            "<img src='src/images/not_ok.png'><br>" +
                            RUR.translate("and try running your program again.");
                    } else {
                        e.message += "<br>&#8594;" + info;
                    }
                }
                e.message = e.message.replace(/module '*__main__'* line \d+\s/,"" ); // TODO: might not be needed
            } else {
                e.message = e.reeborg_says;
            }
        } else {
            error_name = e.name;
        }
        if (error_name === "ReeborgError"){
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

RUR.simplify_python_traceback = function(info) {
    if (info.indexOf("RUR.set_lineno_highlight") !== -1){
        return "Highlight Problem";
    }
    info = info.replace("undefined", "undefined:");
    info = info.replace("\n", "<br>");
    info = info.replace("Traceback (most recent call last):<br>", '');
    info = info.replace(/module '*__main__'* line \d+\s/,"" );
    info = info.replace(/\s*RUR.set_lineno_highlight\(\d+\)/, "");
    info = info.replace(/\s*\^$/, "");
    return info;
};

RUR.runner.eval_javascript = function (src) {
    // do not "use strict"
    RUR.reset_definitions();
    eval(src); // jshint ignore:line
};

RUR.runner.eval_python = function (src) {
    // do not  "use strict"
    RUR.reset_definitions();
    translate_python(src, RUR._highlight);
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
    $("#output-pre").html(js_code);
};/* Author: André Roberge
   License: MIT  */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $, CodeMirror, ReeborgError, editor, library, removeHints, parseUri */

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
        return s;
    }
};

RUR.reset_code_in_editors = function () {
    var library_default, library_content, editor_content, editor_default,
        default_instruction = RUR.translate("move");

    if (RUR.programming_language == "javascript") {
        editor_default = default_instruction + "();";
    } else if (RUR.programming_language == "python") {
        library_default = RUR.translate("# 'import my_lib' in Python Code is required to use\n# the code in this library. \n\n");
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
    $("#load-library").attr("disabled", "true");
    $("#save-library").attr("disabled", "true");
    $("#compile-coffee").attr("disabled", "true");
    $("#lint-js").attr("disabled", "true");
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
            $("#load-library").removeAttr("disabled");
            $("#save-library").removeAttr("disabled");
            break;
        case 'javascript-' + human_language :
            RUR.settings.editor = "editor_js_" + human_language;
            RUR.programming_language = "javascript";
            $("#editor-link").html(RUR.translate("Javascript Code"));
            $("#editor-link").click();
            editor.setOption("mode", "javascript");
            // show language specific
            $("#lint-js").removeAttr("disabled");
            break;
        case 'coffeescript-' + human_language :
            RUR.settings.editor = "editor_coffee_" + human_language;
            RUR.programming_language = "coffee";
            $("#editor-link").html(RUR.translate("CoffeeScript Code"));
            $("#editor-link").click();
            editor.setOption("mode", "coffeescript");
            // show language specific
            $("#compile-coffee").removeAttr("disabled");
            break;
    }
    try {
        RUR.reset_code_in_editors();
    } catch (e) {}
};

RUR.update_permalink = function (arg) {
    var url_query;
    if (arg != undefined) {
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
        eval(new_css);
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


RUR.inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] === "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    RUR.control.write(result);
};

RUR.view_source = function(fn) {
    $("#last-pre").before("<pre class='js_code'>" + fn + "</pre>" );
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
        RUR.rec.extra_highlighting_frames++;
        return true;
    }
};/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.storage = {};

RUR.storage.save_world = function (name){
    "use strict";
    if (localStorage.getItem("user_world:" + name) !== null){
        if (!window.confirm(RUR.translate("Name already exist; confirm that you want to replace its content."))){
            return;
        }
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

    $("#stop2").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    $("#run2").removeAttr("disabled");
    $("#step2").removeAttr("disabled");
    $("#reload2").attr("disabled", "true");
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

    $("#stop2").removeAttr("disabled");
    $("#pause2").removeAttr("disabled");
    $("#run2").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reload2").attr("disabled", "true");
    clearTimeout(RUR.rec.timer);
    RUR.runner.run(RUR.rec.play);
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
        $("#reverse-step").removeAttr("disabled");
        $("#run2").removeAttr("disabled");
        $("#step2").removeAttr("disabled");
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

    $("#stop2").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    $("#run2").removeAttr("disabled");
    $("#step2").attr("disabled", "true");
    $("#reload2").removeAttr("disabled");
    RUR.ui.stop_called = true;
};

RUR.ui.reload = function() {
    RUR.ui.set_ready_to_run();
    $("#output-pre").html("");
    $("#output-panel pre").remove(".jscode");
    $("#Reeborg-concludes").dialog("close");
    $("#Reeborg-shouts").dialog("close");
    $("#Reeborg-says").dialog("close");
    // reset the options in case the user has dragged the window.
    $("#Reeborg-concludes").dialog("option", {minimize: false, maximize: false,
                                              autoOpen:false, width:500,
                                              position:{my: "top", at: "top", of: $("#editor-panel")}});
    $("#Reeborg-shouts").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-says").dialog("option", {minimize: false, maximize: false, autoOpen:false, width:500, dialogClass: "say", position:{my: "top", at: "top", of: $("#robot_canvas")}});
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
            throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: s}));
        }
    }
    if (silent) {
        return;
    }
    throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: s}));
};

RUR.ui.load_file = function (filename, name, replace, elt, i) {
    $.ajax({url: "src/json/" + filename + ".json",
        async: false,
        error: function(e){
            RUR.ui.load_file_error = true;
        },
        success: function(data){
            RUR.world.import_world(data);
            if (replace) {
                elt.options[i].value = "src/json/" + filename + ".json";
                elt.value = elt.options[i].value;
            } else {
                $('#select_world').append( $('<option style="background-color:#ff9" selected="true"></option>'
                                      ).val("src/json/" + filename + ".json").html(name));
                $('#select_world').val("src/json/" + filename + ".json");
            }
            $("#select_world").change();
        }
    }, "text");
};

RUR.ui.select_challenge = function (filename) {
    // this is for worlds that are defined in a file not available from the
    // drop-down menu.
    var name = "Challenge", elt = document.getElementById("select_world");
    RUR.ui.load_file_error = false;
    for (var i=0; i < elt.options.length; i++){
        if (elt.options[i].text === name) {
            if (elt.options[i].selected) {
                if (elt.options[i].value === "src/json/" + filename + ".json") {
                    return;   // already selected, can run program
                } else {
                    RUR.ui.load_file(filename, name, true, elt, i);
                    if (RUR.ui.load_file_error) {
                        throw new RUR.ReeborgError(RUR.translate("Could not find world").supplant({world: filename}));
                    }
                    throw new RUR.ReeborgError(RUR.translate("World selected").supplant({world: filename}));
                }
            }
        }
    }
    RUR.ui.load_file(filename, name, false);
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


RUR.ui.resize = function () {
    RUR.LARGE_WORLD = !RUR.LARGE_WORLD;
    RUR.current_world.large_world = RUR.LARGE_WORLD;
    RUR.vis_world.draw_all();
};

RUR.ui.highlight = function () {
    if (RUR._highlight) {
        RUR._highlight = false;
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

RUR.vis_robot.x_offset = 10;
RUR.vis_robot.y_offset = 8;

RUR.vis_robot.select_style = function (arg) {
    var style;
    style = parseInt(arg, 10);
    if (!(style === 0 || style === 1)) {
        style = 1;     // rover, which used to be style 2, is chosen as default
                       // so that users that had it chosen still see
    }
    RUR.vis_robot.e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[style].robot_s_img;
    RUR.vis_robot.random_img = RUR.vis_robot.images[style].robot_random_img;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
    }

    localStorage.setItem("robot_style", arg);
};
RUR.vis_robot.select_style(localStorage.getItem("robot_style"));

// the following is to try to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
    }
};
RUR.vis_robot.w_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
    }
};
RUR.vis_robot.n_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
    }
};
RUR.vis_robot.s_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
    }
};
RUR.vis_robot.random_img.onload = function () {
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh("initial");
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
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.e_img, x, y, RUR.vis_robot.e_img.width*RUR.SCALE, RUR.vis_robot.e_img.height*RUR.SCALE);
        break;
    case RUR.NORTH:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.n_img, x, y, RUR.vis_robot.n_img.width*RUR.SCALE, RUR.vis_robot.n_img.height*RUR.SCALE);
        break;
    case RUR.WEST:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.w_img, x, y, RUR.vis_robot.w_img.width*RUR.SCALE, RUR.vis_robot.w_img.height*RUR.SCALE);
        break;
    case RUR.SOUTH:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.s_img, x, y, RUR.vis_robot.s_img.width*RUR.SCALE, RUR.vis_robot.s_img.height*RUR.SCALE);
        break;
    case -1:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.random_img, x, y, RUR.vis_robot.random_img.width*RUR.SCALE,
                                RUR.vis_robot.random_img.height*RUR.SCALE);
        break;
    default:
        RUR.ROBOT_CTX.drawImage(RUR.vis_robot.e_img, x, y, RUR.vis_robot.e_img.width*RUR.SCALE, RUR.vis_robot.e_img.height*RUR.SCALE);
    }
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
    var ctx = RUR.TRACE_CTX;
    ctx.strokeStyle = RUR.vis_robot.trace_color;
    ctx.lineWidth = RUR.vis_robot.trace_thickness;
    ctx.lineCap = "round";
    // overrides user choice for large world (small grid size)
    if(RUR.LARGE_WORLD) {
        RUR.vis_robot.trace_offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        // RUR.vis_robot.trace_color = "seagreen";
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
        RUR.vis_robot.trace_color = "seagreen";
        RUR.vis_robot.trace_thickness = 4;
    } else if (choice === "none") {
        RUR.vis_robot.trace_color = "rgba(0,0,0,0)";
    } else if (choice === "default") {
        RUR.vis_robot.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
        RUR.vis_robot.trace_color = "seagreen";
        RUR.vis_robot.trace_thickness = 1;
    }
};

RUR.vis_robot.set_trace_style("default");
/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR*/

RUR.vis_world = {};

RUR.vis_world.draw_coordinates = function(ctx) {
    "use strict";
    var x, y;
    if (RUR.current_world.blank_canvas) {
        return;
    }

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
    if (!robots || robots[0] === undefined) {
        return;
    }

    // take care of case where number of tokens carried by robot could be random
    // this will be before the programm is run

    if (typeof robots[0].tokens === "string" && robots[0].tokens.indexOf("-") != -1){
        for (robot=0; robot < robots.length; robot++){
            RUR.vis_robot.draw(robots[robot]); // draws trace automatically
            info = RUR.translate("robot")+ "_" + robot + ": x=" + robots[0].x +
                    ", y=" + robots[0].y + RUR.translate(", tokens=");
            RUR.ROBOT_CTX.fillStyle = RUR.ROBOT_INFO_COLOR;
            RUR.ROBOT_CTX.fillText(info, 5, 10);
            RUR.ROBOT_CTX.fillStyle = "red";
            RUR.ROBOT_CTX.fillText(robots[0].tokens, 5 + RUR.ROBOT_CTX.measureText(info).width, 10);
        }
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        info += RUR.translate("robot")+ "_" + robot + ": x=" + robots[robot].x +
                ", y=" + robots[robot].y + RUR.translate(", tokens=") + robots[robot].tokens + ".  ";
    }
    RUR.ROBOT_CTX.fillStyle = RUR.ROBOT_INFO_COLOR;
    RUR.ROBOT_CTX.fillText(info, 5, 10);
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
    var size = 12*RUR.SCALE, scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;
    var ctx;
    if (goal) {
        ctx = RUR.BACKGROUND_CTX;
    } else {
        ctx = RUR.WALL_CTX;
    }
    ctx.beginPath();

    text_width = ctx.measureText(num).width/2;
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
        ctx.fillText(num, (i+0.6)*scale - text_width, Y - (j+0.3)*scale);
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
        RUR.vis_world.draw_home_tile(goal.position.x, goal.position.y, goal.orientation);
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

RUR.vis_world.draw_mud = function (i, j) {
    var size = RUR.WALL_THICKNESS, ctx = RUR.BACKGROUND_CTX;
    ctx.fillStyle = RUR.MUD_COLOR;
    ctx.fillRect(i*RUR.WALL_LENGTH + size, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + size,
                      RUR.WALL_LENGTH - size, RUR.WALL_LENGTH - size);
};

RUR.vis_world.draw_home_tile = function (i, j, orientation) {
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
    var ctx, size = 12*RUR.SCALE, scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT;
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
    if (RUR.LARGE_WORLD) {
        RUR.WALL_LENGTH = 20;
        RUR.WALL_THICKNESS = 3;
        RUR.SCALE = 0.5;
        RUR.vis_robot.x_offset = 4;
        RUR.vis_robot.y_offset = 4;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = 40;
        RUR.WALL_THICKNESS = 5;
        RUR.SCALE = 1;
        RUR.vis_robot.x_offset = 10;
        RUR.vis_robot.y_offset = 8;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }
    RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
    RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 2;

    RUR.vis_world.draw_background();
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.draw_goal();
    RUR.vis_world.refresh("initial");
};

RUR.vis_world.clear_trace = function(){
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
};

RUR.vis_world.draw_other = function (other){
    "use strict";
    var obj, mud, i, j, k, t;
    if (other === undefined) {
        return;
    }
    if (other.mud !== undefined){
        mud = other.mud;
        for (t=0; t < mud.length; t++){
            k = mud[t].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            RUR.vis_world.draw_mud(i, j);
        }
    }
};

RUR.vis_world.refresh = function (initial) {
    "use strict";
    var i, t, toks, min_, max_, goal, robot, clone, clones=[], color1_temp, color2_temp, position;
    if (initial !== undefined && RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.possible_positions !== undefined) {
        goal = RUR.current_world.goal;
        for (i=0; i < goal.possible_positions.length; i++){
            goal.position.x = goal.possible_positions[i][0];
            goal.position.y = goal.possible_positions[i][1];
            RUR.vis_world.draw_goal();
            //RUR.vis_world.draw_home_tile(goal.position.x, goal.position.y, goal.orientation);
        }
    } else {
        if ( RUR.current_world.goal !== undefined && RUR.current_world.goal.possible_positions !== undefined &&
            RUR.current_world.goal.possible_positions.length > 1) {
            // erase all possible tiles for goal position by drawing them all white
            // if needed this could be made more efficient by setting up a flag and not redoing while
            // the program is running i.e. after the first frame ...
            color1_temp = RUR.TARGET_TILE_COLOR;
            color2_temp = RUR.ORIENTATION_TILE_COLOR;
            RUR.TARGET_TILE_COLOR = "white";
            RUR.ORIENTATION_TILE_COLOR = "white";
            goal = RUR.current_world.goal;
            position = {'x': goal.position.x, 'y': goal.position.y};
            for (i=0; i < goal.possible_positions.length; i++){
                goal.position.x = goal.possible_positions[i][0];
                goal.position.y = goal.possible_positions[i][1];
                RUR.vis_world.draw_home_tile(goal.position.x, goal.position.y, goal.orientation);
            }
            // restore colour and position, and then redraw all.
            // note that some goal shapes might have been placed on the possible positions,
            // hence we must make sure to draw all the goals.
            RUR.TARGET_TILE_COLOR = color1_temp;
            RUR.ORIENTATION_TILE_COLOR = color2_temp;
            goal.position = position;
            RUR.vis_world.draw_goal();
        }
    }

    RUR.vis_world.draw_foreground_walls(RUR.current_world.walls);
    RUR.vis_world.draw_other(RUR.current_world.other);
    if (initial !== undefined && RUR.current_world.robots !== undefined &&
            RUR.current_world.robots[0] !== undefined &&
            RUR.current_world.robots[0].start_positions !== undefined &&
            RUR.current_world.robots[0].start_positions.length > 1) {
            robot = RUR.current_world.robots[0];
        for (i=0; i < robot.start_positions.length; i++){
            clone = JSON.parse(JSON.stringify(robot));
            clone.x = robot.start_positions[i][0];
            clone.y = robot.start_positions[i][1];
            clone._prev_x = clone.x;
            clone._prev_y = clone.y;
            clones.push(clone);
        }
        RUR.ROBOT_CTX.save();
        RUR.ROBOT_CTX.globalAlpha = 0.4;
        RUR.vis_world.draw_robots(clones);
        RUR.ROBOT_CTX.restore();
    } else {
        RUR.vis_world.draw_robots(RUR.current_world.robots);
    }

    RUR.vis_world.draw_tokens(RUR.current_world.tokens);
    if (initial !== undefined){
        if (RUR.current_world.tokens_range !== undefined) {
            RUR.vis_world.draw_tokens(RUR.current_world.tokens_range);
        }
    }
    RUR.vis_world.draw_shapes(RUR.current_world.shapes);
};

RUR.vis_world.select_initial_values = function() {
    // select initial values if required i.e. when some are specified as
    // being chosen randomly
    "use strict";
    var k, keys, min_, max_, robot, position, goal;
    if (RUR.current_world.tokens_range !== undefined) {
        RUR.vis_world.draw_tokens(RUR.current_world.tokens_range);
        keys = Object.keys(RUR.current_world.tokens_range);
        for (k=0; k < keys.length; k++){
            min_ = RUR.current_world.min_tokens[keys[k]];
            max_ = RUR.current_world.max_tokens[keys[k]];
            RUR.current_world.tokens[keys[k]] = RUR.randint(min_, max_);
            if (RUR.current_world.tokens[keys[k]] === 0) {
                delete RUR.current_world.tokens[keys[k]];
            }
        }
    }

    if (RUR.current_world.goal !== undefined){
        goal = RUR.current_world.goal;
        if (goal.possible_positions !== undefined && goal.possible_positions.length > 1) {
            position = goal.possible_positions[RUR.randint(0, goal.possible_positions.length-1)];
            goal.position.x = position[0];
            goal.position.y = position[1];
        }
    }

    robot = RUR.current_world.robots[0];
    if (robot === undefined){
        RUR.rec.record_frame();
        return;
    }
    if (robot.orientation == -1){
        RUR.current_world.robots[0].orientation = RUR.randint(0, 3);
        RUR.current_world.robots[0]._prev_orientation = RUR.current_world.robots[0].orientation;
    }
    if (robot.tokens_range !== undefined){
        RUR.current_world.robots[0].tokens = RUR.randint(robot.min_tokens, robot.max_tokens);
    }
    if (robot.start_positions !== undefined && robot.start_positions.length > 1) {
        position = robot.start_positions[RUR.randint(0, robot.start_positions.length-1)];
        RUR.current_world.robots[0].x = position[0];
        RUR.current_world.robots[0].y = position[1];
        RUR.current_world.robots[0]._prev_x = RUR.current_world.robots[0].x;
        RUR.current_world.robots[0]._prev_y = RUR.current_world.robots[0].y;
    }
    RUR.rec.record_frame();
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
    world.other = {};
    return world;
};
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, '');
};

RUR.world.import_world = function (json_string) {
    var body;
    if (json_string === undefined){
        return {};
    }
    try {
        RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
    } catch (e) {
        console.log("exception caught in import_world");
        console.log(json_string);
        console.log(e);
        return;
    }
    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            body = RUR.current_world.robots[0];
            body._prev_x = body.x;
            body._prev_y = body.y;
            body._prev_orientation = body.orientation;
        }
    }
    if (RUR.current_world.large_world !== undefined) {
        RUR.LARGE_WORLD = RUR.current_world.large_world;
    } else {
        RUR.LARGE_WORLD = false;
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
    RUR.vis_world.refresh("initial");
};

RUR.world.add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    RUR.current_world.robots.push(robot);
    RUR.rec.record_frame();
};


RUR.world.__remove_default_robot = function () {
    RUR.current_world.robots = [];
};/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.we = {};   // we == World Editor

RUR.we.edit_world = function  () {
    // usually triggered when canvas is clicked if editing world;
    // call explicitly if needed.
    switch (RUR.we.edit_world_flag) {
        case "robot-place":
            RUR.we.place_robot();
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
        case "world-mud":
            RUR.we.toggle_mud();
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
        case "goal-no-tokens":
            RUR.we.set_goal_no_tokens();
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
        case "robot-tokens":
            RUR.we.give_tokens_to_robot();
            RUR.we.edit_world();
            $("#cmd-result").html(RUR.translate("Robot now has tokens.").supplant({x_tokens: RUR.current_world.robots[0].tokens})).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-tokens":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to set number of tokens.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-objects":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on desired object below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-star":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle star.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-triangle":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle triangle.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-square":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle square.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-mud":
            $(".edit-world-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle mud tile.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "world-walls":
            $("#cmd-result").html(RUR.translate("Click on world to toggle walls.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-robot":
            $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);
            if (RUR.current_world.goal !== undefined && RUR.current_world.goal.position !== undefined){
                $("#edit-world-turn").show();
                $("#random-orientation").hide();
            } else {
                $("#edit-world-turn").hide();
            }
            break;
        case "goal-wall":
            $("#cmd-result").html(RUR.translate("Click on world to toggle additional walls to build.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-objects":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on desired goal object below.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-tokens":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to set number of goal tokens.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-star":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle star goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-triangle":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle triangle goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-square":
            $(".edit-goal-canvas").show();
            $("#cmd-result").html(RUR.translate("Click on world to toggle square goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-no-objects":
            $("#cmd-result").html(RUR.translate("Click on world at x=1, y=1 to have no object left as a goal.")).effect("highlight", {color: "gold"}, 1500);
            break;
        case "goal-no-tokens":
            $("#cmd-result").html(RUR.translate("Click on world at x=1, y=1 to have no tokens left as a goal.")).effect("highlight", {color: "gold"}, 1500);
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
        if (!Object.identical(RUR.current_world, RUR.world.saved_world)) {
            $("#memorize-world").trigger('click');
        }
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
    RUR.vis_world.draw_all();
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

RUR.we.give_tokens_to_robot = function () {
    var _tok, tokens, max_tokens;
    var response = prompt(RUR.translate("Enter number of tokens for robot to carry (use inf for infinite number)"));
    if (response !== null) {
        _tok = response.split("-");
        if (response === "inf"){
            RUR.current_world.robots[0].tokens = "infinite";
        } else if (RUR.filterInt(_tok[0]) >= 0) {
            tokens = RUR.filterInt(_tok[0]);
            if (_tok[1] !== undefined) {
                max_tokens = RUR.filterInt(_tok[1]);
                if (max_tokens <= tokens) {
                    $("#Reeborg-shouts").html(response + RUR.translate(" is not a valid value!")).dialog("open");
                    delete RUR.current_world.robots[0].tokens_range;
                    delete RUR.current_world.robots[0].max_tokens;
                    delete RUR.current_world.robots[0].min_tokens;
                    RUR.current_world.robots[0].tokens = "infinite";
                } else {
                    RUR.current_world.robots[0].max_tokens = max_tokens;
                    RUR.current_world.robots[0].min_tokens = tokens;
                    RUR.current_world.robots[0].tokens_range = tokens+"-"+max_tokens;
                    RUR.current_world.robots[0].tokens = tokens+"-"+max_tokens;
                }
            } else {
                RUR.current_world.robots[0].tokens = tokens;
            }
        } else {
            $("#Reeborg-shouts").html(response + RUR.translate(" is not a valid value!")).dialog("open");
        }
    }
};

RUR.we.set_token_number = function () {
    var position, response, x, y, tokens, _tok, max_tokens;
    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];

    if (RUR.current_world.shapes !== undefined && RUR.current_world.shapes[x + "," + y] !== undefined){
        $("#cmd-result").html(RUR.translate("Other object here; can't put tokens")).effect("highlight", {color: "gold"}, 1500);
        $("#Reeborg-shouts").html(RUR.translate("Other object here; can't put tokens")).dialog("open");
        return;
    }

    response = prompt(RUR.translate("Enter number of tokens for at that location."));
    if (response !== null) {
        _tok = response.split("-");
        tokens = RUR.filterInt(_tok[0]);
        if (_tok[1] !== undefined) {
            max_tokens = RUR.filterInt(_tok[1]);
            if (max_tokens <= tokens) {
                tokens = -1;
            }
        }
        if (tokens >= 0) {
            RUR.we.ensure_key_exist(RUR.current_world, "tokens");
            if (max_tokens !== undefined) {
                RUR.we.ensure_key_exist(RUR.current_world, "min_tokens");
                RUR.we.ensure_key_exist(RUR.current_world, "max_tokens");
                RUR.we.ensure_key_exist(RUR.current_world, "tokens_range");
            }
            if (tokens > 0 || (max_tokens !== undefined && max_tokens > tokens)) {
                RUR.current_world.tokens[x + "," + y] = tokens;
                if (max_tokens !== undefined) {
                    RUR.current_world.max_tokens[x + "," + y] = max_tokens;
                    RUR.current_world.min_tokens[x + "," + y] = tokens;
                    RUR.current_world.tokens_range[x + "," + y] = tokens+"-"+max_tokens;
                } else {
                    delete RUR.current_world.min_tokens[x + "," + y];
                    delete RUR.current_world.max_tokens[x + "," + y];
                    delete RUR.current_world.tokens_range[x + "," + y];
                }
            } else {
                delete RUR.current_world.tokens[x + "," + y];
                if (RUR.current_world.max_tokens !== undefined) {
                    delete RUR.current_world.min_tokens[x + "," + y];
                    delete RUR.current_world.max_tokens[x + "," + y];
                    delete RUR.current_world.tokens_range[x + "," + y];
                }
            }
        } else {
            $("#Reeborg-shouts").html(response + RUR.translate(" is not a valid value!")).dialog("open");
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
        $("#cmd-result").html(RUR.translate("Other object goal here; can't put tokens")).effect("highlight", {color: "gold"}, 1500);
        $("#Reeborg-shouts").html(RUR.translate("Other object goal here; can't put tokens")).dialog("open");
        return;
    }

    response = prompt(RUR.translate("Enter number of tokens for at that location."));
    if (response !== null) {
        tokens = RUR.filterInt(response);
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
            $("#Reeborg-shouts").html(response + RUR.translate(" is not a valid value!")).dialog("open");
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
        $("#cmd-result").html(RUR.translate("tokens here; can't put another object")).effect("highlight", {color: "gold"}, 1500);
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
        $("#cmd-result").html(RUR.translate("tokens as a goal here; can't set another object as goal."));
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
    var position, world=RUR.current_world, robot, arr=[], pos, present=false, goal;

    $("#cmd-result").html(RUR.translate("Click on world to set home position for robot.")).effect("highlight", {color: "gold"}, 1500);
    $("#edit-world-turn").show();
    $("#random-orientation").hide();

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

    position = RUR.we.calculate_grid_position();
    goal.position.x = position[0];
    goal.position.y = position[1];

    for(var i=0; i<goal.possible_positions.length; i++) {
        pos = goal.possible_positions[i];
        if(pos[0]==position[0] && pos[1]==position[1]){
            present = true;
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
        if (RUR.current_world.goal.orientation !== undefined) {
            delete RUR.current_world.goal.orientation;
        }
        if (Object.keys(RUR.current_world.goal).length === 0) {
            delete RUR.current_world.goal;
        }
        $("#edit-world-turn").hide();
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
        $("#cmd-result").html(RUR.translate("No effect.")).effect("highlight", {color: "gold"}, 1500);
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.current_world.goal.shapes = {};
    $("#cmd-result").html(RUR.translate("Goal: no object left in world.")).effect("highlight", {color: "gold"}, 1500);
};

RUR.we.set_goal_no_tokens = function(){
    "use strict";
    var position;
    position = RUR.we.calculate_grid_position();
    if (position[0] !== 1 || position[1] !== 1) {
        $("#cmd-result").html(RUR.translate("No effect.")).effect("highlight", {color: "gold"}, 1500);
        return;
    }
    RUR.we.ensure_key_exist(RUR.current_world, "goal");
    RUR.current_world.goal.tokens = {};
    $("#cmd-result").html(RUR.translate("Goal: no tokens left in world.")).effect("highlight", {color: "gold"}, 1500);
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

RUR.we.draw_mud = function () {
    "use strict";
    var ctx, size=12;
    ctx = document.getElementById("canvas-mud").getContext("2d");
    ctx.fillStyle = RUR.MUD_COLOR;
    ctx.fillRect(0, 0, 40, 40);
};
RUR.we.draw_mud();

RUR.we.toggle_mud = function (){
    // will remove the position if clicked again.
    "use strict";
    var x, y, position, coords, index;

    position = RUR.we.calculate_grid_position();
    x = position[0];
    y = position[1];
    coords = x + "," + y;

    RUR.we.ensure_key_exist(RUR.current_world, "other");
    if (RUR.current_world.other.mud === undefined) {
        RUR.current_world.other.mud = [];
    }
    index = RUR.current_world.other.mud.indexOf(coords);
    if (index === -1) {
        RUR.current_world.other.mud.push(coords);
    } else {
        RUR.current_world.other.mud.remove(index);
    }
};
