/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, translate_python */

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
A world can be modified either by a graphical World Builder or
via a JSON string - only the second is currently implemented.
*/

var RUR = RUR || {};

RUR.Error = function (message) {
    this.name = "ReeborgError";
    this.message = message;
};


RUR.List = function(){
    this.container = [];
    this.length = function(){
        return this.container.length;
    };
    this.add_item = function(data) {
        this.container.push(data);
        if (this.length() > RUR.world.max_steps) {
            throw new RUR.Error("Too many steps: " + RUR.world.max_steps);
        }
    };
    this.shift = function() {
        return this.container.shift();
    }
};

RUR.World = function () {
    "use strict";
    this.EAST = 0;
    this.NORTH = 1;
    this.WEST = 2;
    this.SOUTH = 3;
    this.max_steps = 1000;

    this.think = function (delay) {
        if (delay >= 0  && delay <= 10){
            this.frames.add_item({delay: Math.round(delay*1000)});
        }
        else {
            alert("Reeborg's thinking time needs to be specified in seconds, between 0 and 10; this was: " + delay);
        }
    };

    this.pause = function() {
        this.frames.add_item({pause: true});
    };

    this.export_ = function (){
        var json_object;
        json_object = {"robots": this.robots, "walls": this.walls};
        return JSON.stringify(json_object, null, '   ');
    };

    this.import_ = function (json_string){
        this.imported_world = JSON.parse(json_string) || {};
    };

    this.parse_world = function() {
        var i, orientation;
        this.imported_world = this.imported_world || {};
        this.robots = [];
        this.walls = this.imported_world.walls || {};
        if (this.imported_world.robots !== undefined) {
            for (i = 0; i < this.imported_world.robots.length; i++){
                switch(this.imported_world.robots[i].orientation){
                case 0:
                    orientation = "e";
                    break;
                case 1:
                    orientation = "n";
                    break;
                case 2:
                    orientation = "w";
                    break;
                case 3:
                    orientation = "s";
                    break;
                }
                this.robots.push(new RUR.PrivateRobot(this.imported_world.robots[i].x,
                                 this.imported_world.robots[i].y,
                                 orientation, this.imported_world.robots[i].tokens));
            }
        }
    };

    this.reset = function (){
        this.parse_world();
        this.frames = new RUR.List();
    };
    this.reset();

    this.add_robot = function (robot) {
        this.robots.push(robot);
        this.add_frame();
    };

    this.is_wall_at = function (coords, orientation) {
        if (RUR.world.walls[coords] !== undefined){
            if (RUR.world.walls[coords].indexOf(orientation) !== -1) {
                return true;
            }
        }
        return false;
    };

    this.move_robot = function(robot){
        var coords;
        robot.prev_x = robot.x;
        robot.prev_y = robot.y;
        switch (robot.orientation){
        case this.EAST:
            coords = robot.x + "," + robot.y;
            if (this.is_wall_at(coords, "EAST")) {
                throw new RUR.Error("Ouch! I hit a wall!");
            }
            robot.x += 1;
            break;
        case this.NORTH:
            coords = robot.x + "," + robot.y;
            if (this.is_wall_at(coords, "NORTH")) {
                throw new RUR.Error("Ouch! I hit a wall!");
            }
            robot.y += 1;
            break;
        case this.WEST:
            if (robot.x===1){
                throw new RUR.Error("Ouch! I hit a wall!");
            } else {
                coords = robot.x-1 + "," + robot.y;
                if (this.is_wall_at(coords, "EAST")) {
                    throw new RUR.Error("Ouch! I hit a wall!");
                }
                robot.x -= 1;
            }
            break;
        case this.SOUTH:
            if (robot.y===1){
                throw new RUR.Error("Ouch! I hit a wall!");
            } else {
                coords = robot.x + "," + robot.y-1;
                if (this.is_wall_at(coords, "NORTH")) {
                    throw new RUR.Error("Ouch! I hit a wall!");
                }
                robot.y -= 1;
            }
            break;
        default:
            throw new Error("Should not happen: unhandled case in RUR.World.move_robot().");
        }
    };

    this.add_error_frame = function (message) {
        // bypass the verification for limit of frames
        this.frames.container.push({error: message});
    };

    this.add_output_frame = function (element, message) {
        this.frames.add_item({output: {element:element, message:message}});
    };

    this.add_frame = function () {
        var i, robot, robots = [];
        for (i = 0; i < this.robots.length; i++){
            robot = {};
            robot.x = RUR.world.robots[i].x;
            robot.y = RUR.world.robots[i].y;
            robot.prev_x = RUR.world.robots[i].prev_x;
            robot.prev_y = RUR.world.robots[i].prev_y;
            robot.orientation = RUR.world.robots[i].orientation;
            robot.prev_orientation = RUR.world.robots[i].prev_orientation;
            robot._is_leaky = RUR.world.robots[i]._is_leaky;
            robots.push(robot);
        }
        this.frames.add_item({robots: robots});
    };

    this.toggle_wall = function (x, y, orientation){
        var index, coords;
        coords = x + "," + y;
        if (this.walls[coords] === undefined){
            this.walls[coords] = [orientation];
        } else {
            index = this.walls[coords].indexOf(orientation);
            if (index === -1) {
                this.walls[coords].push(orientation);
            } else {
                this.walls[coords].remove(index);
                if (this.walls[coords].length === 0){
                    delete this.walls[coords];
                }
            }
        }
    };
};

RUR.world = new RUR.World();

RUR.PrivateRobot = function(x, y, orientation, tokens) {
    "use strict";
    this.x = x || 1;
    this.y = y || 1;
    this.prev_x = this.x;
    this.prev_y = this.y;
    this.tokens = tokens || 0;
    this._is_leaky = true;

    if (orientation === undefined){
        this.orientation = RUR.world.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case "east":
        case "est":
            this.orientation = RUR.world.EAST;
            break;
        case "n":
        case "north":
        case "nord":
            this.orientation = RUR.world.NORTH;
            break;
        case "w":
        case "o":
        case "west":
        case "ouest":
            this.orientation = RUR.world.WEST;
            break;
        case "s":
        case "south":
        case "sud":
            this.orientation = RUR.world.SOUTH;
            break;
        default:
            throw "Should not happen: unknown orientation";
            // TODO: turn this into a warning
        }
    }
    this.prev_orientation = this.orientation;
};

RUR.PrivateRobot.prototype.turn_left = function(){
    "use strict";
    this.prev_orientation = this.orientation;
    this.prev_x = this.x;
    this.prev_y = this.y;
    this.orientation += 1;
    this.orientation %= 4;
    RUR.world.add_frame();
};

RUR.PrivateRobot.prototype.is_leaky = function (leak) {
    this._is_leaky = leak;
};

RUR.PrivateRobot.prototype.a_une_fuite = RUR.PrivateRobot.prototype.is_leaky;

RUR.PrivateRobot.prototype.tourne_à_gauche = RUR.PrivateRobot.prototype.turn_left;

RUR.PrivateRobot.prototype.move = function(){
    "use strict";
    this.prev_orientation = this.orientation;
    RUR.world.move_robot(this);
    RUR.world.add_frame();
};

RUR.PrivateRobot.prototype.avance = RUR.PrivateRobot.prototype.move;

RUR.visible_world = {
    init: function () {
        "use strict";
        this.background_canvas = document.getElementById("background_canvas");
        this.background_ctx = this.background_canvas.getContext("2d");
        this.height = this.background_canvas.height;
        this.width = this.background_canvas.width;
        this.wall_ctx = document.getElementById("wall_canvas").getContext("2d");
        this.trace_ctx = document.getElementById("trace_canvas").getContext("2d");
        this.set_trace_style();
        this.robot_ctx = document.getElementById("robot_canvas").getContext("2d");
        this.rows = Math.floor(this.height / this.wall_length) - 1;
        this.cols = Math.floor(this.width / this.wall_length) - 2;
        this.delay = 50;   // milliseconds
        this.robot_e_img = new Image();
        this.robot_e_img.src = '../images/robot_e.png';
        // the following ensures that we won't attempt drawing until the default image is available
        this.robot_e_img.onload = function () {
            RUR.visible_world.reset();
        };
        this.robot_n_img = new Image();
        this.robot_n_img.src = '../images/robot_n.png';
        this.robot_w_img = new Image();
        this.robot_w_img.src = '../images/robot_w.png';
        this.robot_s_img = new Image();
        this.robot_s_img.src = '../images/robot_s.png';
        this.draw();
        this.running = false;
    },
    wall_length: 40,
    wall_thickness: 5,
    robot_y_offset : 6,
    robot_x_offset : 9,
    wall_color: "brown",
    shawdow_wall_color: "#f0f0f0",
    ctx: null,
    draw : function () {
        "use strict";
        this.draw_foreground_walls();
    },
    set_trace_style : function (choice){
        "use strict";
        if (choice === "red") {
            RUR.visible_world.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
            RUR.visible_world.trace_color = "red";
            RUR.visible_world.trace_thickness = 4;
        } else {
            RUR.visible_world.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
            RUR.visible_world.trace_color = "seagreen";
            RUR.visible_world.trace_thickness = 1;
        }
    },
    draw_coordinates: function(){
        "use strict";
        var x, y;
        this.ctx = this.background_ctx;
        this.ctx.fillStyle = 'black';
        y = this.height-this.wall_length/2;
        for(x=1; x <= this.cols; x++){
            this.ctx.fillText(""+x, (x+0.5)*this.wall_length, y);
        }
        x = this.wall_length/2;
        for(y=1; y <= this.rows; y++){
            this.ctx.fillText(""+y, x, this.height - (y+0.3)*this.wall_length);
        }
    },
    draw_background_walls : function () {
        "use strict";
        var i, j;
        this.ctx = this.background_ctx;
        this.ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
        this.ctx.fillStyle = this.shawdow_wall_color;
        for (i = 1; i <= this.cols; i++) {
            for (j = 1; j <= this.rows; j++) {
                this.draw_north_wall(i, j);
                this.draw_east_wall(i, j);
            }
        }
    },
    draw_foreground_walls : function () {
        "use strict";
        var key, i, j;
        this.ctx = this.wall_ctx;
        this.ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
        this.ctx.fillStyle = this.wall_color;
        for (i = 0; i <= this.cols; i++) {
            for (j = 0; j <= this.rows; j++) {
                if (i === 0 && j !== 0) {
                    this.draw_east_wall(i, j);
                } else if (i !== 0 && j === 0) {
                    this.draw_north_wall(i, j);
                } else if (i === 0 && j === 0) {
                    continue;
                } else {
                    key = i + "," + j;
                    if ( key in RUR.world.walls ) {
                        if ( RUR.world.walls[key].indexOf("NORTH") !== -1) {
                            this.draw_north_wall(i, j);
                        }
                        if (RUR.world.walls[key].indexOf("EAST") !== -1) {
                            this.draw_east_wall(i, j);
                        }
                    }
                }
            }
        }
    },
    draw_north_wall : function(i, j) {
        "use strict";
        this.ctx.fillRect(i*this.wall_length, this.height - (j+1)*this.wall_length,
                          this.wall_length + this.wall_thickness, this.wall_thickness);
    },
    draw_east_wall : function(i, j) {
        "use strict";
        this.ctx.fillRect((i+1)*this.wall_length, this.height - (j+1)*this.wall_length,
                          this.wall_thickness, this.wall_length + this.wall_thickness);
    },
    draw_robot : function (robot) {
        "use strict";
        var x, y, img;
        this.ctx = RUR.visible_world.robot_ctx;
        x = robot.x * this.wall_length + this.robot_x_offset;
        y = this.height - (robot.y +1) * this.wall_length + this.robot_y_offset;
        this.ctx.beginPath();
        switch(robot.orientation){
        case RUR.world.EAST:
            img = RUR.visible_world.robot_e_img;
            break;
        case RUR.world.NORTH:
            img = RUR.visible_world.robot_n_img;
            break;
        case RUR.world.WEST:
            img = RUR.visible_world.robot_w_img;
            break;
        case RUR.world.SOUTH:
            img = RUR.visible_world.robot_s_img;
            break;
        default:
            img = RUR.visible_world.robot_e_img;
        }
        this.ctx.drawImage(img, x, y);
        this.draw_trace(robot);
    },
    draw_trace : function (robot) {
        "use strict";
        if (robot._is_leaky === false) {
            return;
        }
        this.ctx = this.trace_ctx;
        this.ctx.strokeStyle = this.trace_color;
        this.ctx.lineWidth = this.trace_thickness;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(robot.prev_x* this.wall_length + RUR.visible_world.trace_offset[robot.prev_orientation][0],
                        this.height - (robot.prev_y +1) * this.wall_length + RUR.visible_world.trace_offset[robot.prev_orientation][1]);
        this.ctx.lineTo(robot.x* this.wall_length + RUR.visible_world.trace_offset[robot.orientation][0],
                        this.height - (robot.y +1) * this.wall_length + RUR.visible_world.trace_offset[robot.orientation][1]);
        this.ctx.stroke();
    },
    play_frames : function () {
        "use strict";
        if (RUR.visible_world.running){
            RUR.visible_world.running = false;
            return;
        }
        RUR.visible_world.running = true;
        RUR.visible_world.update();
    },
    update : function () {
        "use strict";
        var frame_info;
        if (!RUR.visible_world.running){
            return;
        }
        frame_info = RUR.visible_world.play_single_frame();

        if (frame_info === "immediate") {
            clearTimeout(RUR.timer);
            RUR.visible_world.update();
            return;
        } else if (frame_info === "pause" || frame_info === "stopped") {
            return;
        }

        RUR.timer = setTimeout(RUR.visible_world.update, RUR.visible_world.delay);
    },
    play_single_frame : function () {
        "use strict";
        var frame, robot, ctx;
        ctx = RUR.visible_world.robot_ctx;
        if (RUR.world.frames.length() !== 0) {
            frame = RUR.world.frames.shift();
        } else {
            $("#Reeborg-says").html("All done!").dialog("open").fadeOut(2000);
            setTimeout(function(){$("#Reeborg-says").dialog("close");}, 1500);
            RUR.controls.stop();
            return "stopped";
        }
        if (frame.delay !== undefined) {
            RUR.visible_world.delay = frame.delay;
            return "immediate";
        }
        if (frame.pause) {
            RUR.controls.pause();
            return "pause";
        }
        if (frame.error !== undefined) {
            RUR.controls.stop();
            $("#Reeborg-shouts").html(frame.error.message).dialog("open");
            return "stopped";
        }
        if (frame.output !== undefined) {
            $(frame.output.element).append(frame.output.message + "\n");
            return;
        }
        RUR.visible_world.draw_robots(frame.robots);
    },

    draw_robots : function(robots) {
        var robot;
        this.robot_ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
        for (robot=0; robot < robots.length; robot++){
            this.draw_robot(robots[robot]);
        }
    },

    reset : function () {
        "use strict";
        RUR.world.reset();
        this.compiled = false;
        this.draw_background_walls();
        this.draw_coordinates();
        this.draw_foreground_walls();
        this.trace_ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
        this.robot_ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
        this.draw_robots(RUR.world.robots);
        RUR.visible_world.running = false;
    }
};

RUR.compile_javascript = function (src) {
    // Note: by having "use strict;" here, it has the interesting effect of requiring user
    // programs to conform to "strict" usage, meaning that all variables have to be declared,
    // etc.
    "use strict";  // will propagate to user's code, enforcing good programming habits.
    eval(src);
};


RUR.compile_brython = function (src) {
    // do not  "use strict" as we do not control the output produced by Brython
    // translate_python needs to be included in the html page in a Python script
    eval(translate_python(src));
};

RUR.Controls = function (programming_language) {
    "use strict";
    this.programming_language = programming_language;
    this.compile_and_run = function (func) {
        var src, fatal_error_found = false;
        if (!RUR.visible_world.compiled) {
            src = library.getValue() + ";\n";
            src += editor.getValue();
        }
        if (!RUR.visible_world.compiled) {
            try {
                if (this.programming_language === "javascript") {
                    RUR.compile_javascript(src);
                } else if (this.programming_language === "brython") {
                    RUR.compile_brython(src);
                } else {
                    alert("Unrecognized programming language.");
                    fatal_error_found = true;
                }
            } catch (e) {
                if (e.name === "ReeborgError"){
                    RUR.world.add_error_frame(e);
                } else {
                    alert(e.name + "\n" + e.message);
                    fatal_error_found = true;
                    this.stop();
                }
            }
        }

        RUR.visible_world.compiled = true;
        if (!fatal_error_found) {
            func();
        }
    };

    this.run = function () {
        $("#stop").removeAttr("disabled");
        $("#pause").removeAttr("disabled");
        $("#run").attr("disabled", "true");
        $("#step").attr("disabled", "true");
        $("#reload").attr("disabled", "true");
        clearTimeout(RUR.timer);
        RUR.controls.compile_and_run(RUR.visible_world.play_frames);
    };

    this.pause = function () {
        RUR.visible_world.running = false;
        clearTimeout(RUR.timer);
        $("#pause").attr("disabled", "true");
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
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
    };

    this.reload = function() {
        RUR.visible_world.reset();
        $("#stop").attr("disabled", "true");
        $("#pause").attr("disabled", "true");
        $("#run").removeAttr("disabled");
        $("#step").removeAttr("disabled");
        $("#reload").attr("disabled", "true");
        $("#output-pre").html("");
    };
};

var write = function (s) {
    RUR.world.add_output_frame("#output-pre", s);
};

var inspect = function (obj){
    var props, result = "";
    for (props in obj) {
        if (typeof obj[props] == "function") {
            result += props + "()\n";
        } else{
            result += props + "\n";
        }
    }
    write(result);
};


var move = function() {
    "use strict";
    RUR.world.robots[0].move();
};
var avance = move;

var turn_left = function() {
    "use strict";
    RUR.world.robots[0].turn_left();
};
var tourne_à_gauche = turn_left;

var think = function(delay) {
    "use strict";
    RUR.world.think(delay);
};
var pense = think;

var pause = function () {
    "use strict";
    RUR.world.pause();
};

UsedRobot.prototype = Object.create(RUR.PrivateRobot.prototype);
UsedRobot.prototype.constructor = UsedRobot;

function UsedRobot(x, y, orientation, tokens)  {
    "use strict";
    RUR.PrivateRobot.call(this, x, y, orientation, tokens);
    RUR.world.add_robot(this);
}
var RobotUsagé = UsedRobot;



/*==================================================
UI : panels, tabs and what not...
================================*/
var MAX_WIDTH, MIN_WIDTH = 200;

function reset_widths () {
    var all_active_panels, children, index, child;
    all_active_panels = [];
    children = $("#panels").children();
    for (index = 0; index < children.length; index++){
        child = $(children[index]);
        if (child.hasClass("active")) {
            all_active_panels.push(child);
        }
    }
    MAX_WIDTH = $("#panels").width() - all_active_panels.length * MIN_WIDTH;
    for (index = 0; index < all_active_panels.length; index++){
        // WHY do I need to subtract 8 ??    2 x padding + 1 for border perhaps?...
        all_active_panels[index].width($("#panels").width()/all_active_panels.length - 8);
    }
    for (index = 0; index < all_active_panels.length-1; index++) {
        set_resizable(all_active_panels, index);
    }
    return all_active_panels;
}


function set_resizable(all_active_panels, index){
    var this_panel, next_panel;
    this_panel = all_active_panels[index];
    next_panel = all_active_panels[index+1];
    this_panel.resizable({
        handles: 'e',
        maxWidth: MAX_WIDTH,
        minWidth: MIN_WIDTH,
        helper: "resizable-helper",
        stop: function(event, ui){
            var remaining = next_panel.width() - (ui.size.width - ui.originalSize.width);
            next_panel.width(remaining);
        }
    });
}

/*******   User notes

****************************/

var deleted_notes = [];

function doShowAll() {
    var key = "";
    var pairs = "<tr><th>Key</th><th>Value</th></tr>\n";
    var i = 0;
    for (i = 0; i <= localStorage.length - 1; i++) {
        key = localStorage.key(i);
        pairs += "<tr><td>" + key + "</td>\n<td>" + localStorage.getItem(key) + "</td></tr>\n";
    }
    if (pairs == "<tr><th>Name</th><th>Value</th></tr>\n") {
        pairs += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
    }
    for (i = 0; i <= deleted_notes.length - 1; i++) {
        pairs += "<tr><td>Deleted Note:</td>\n<td>" + deleted_notes[i] + "</td></tr>\n";
    }
}

function doShowNotes() {
    var key = "";
    var _notes = "";
    var _note;
    var i = 0;

    if (deleted_notes.length > 0){
        document.getElementById('undo_delete').innerHTML = '<a href="javascript:doUndoDelete()" class=" float_left fake_button blue-gradient">Undo Delete</a>';
    }
    else{
        document.getElementById('undo_delete').innerHTML = '';
    }
    for (i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.slice(0, 9) == "user_note") {
            _note = localStorage.getItem(key);
            _notes += "<hr><div class='user_note'>" + _note + '</div><a href="javascript:doDeleteNote(' + "'" + key + "'" + ');" class="fake_button blue-gradient">Delete</a>';
        }
    }
    document.getElementById('notes_list').innerHTML = _notes;
    doShowAll();
}

function addNote() {
    var user_note;
    var key = "user_note" + (new Date()).getTime();
    user_note = document.forms.notes_editor.data.value;
    if(!document.forms.notes_editor.check_html.checked) {
        user_note = "<pre>" + user_note + "</pre>";
    }
    localStorage.setItem(key, user_note);
    doShowNotes();
}

function doDeleteNote(key) {
    deleted_notes.push(localStorage.getItem(key));
    localStorage.removeItem(key);
    doShowNotes();
}

function doUndoDelete(){
    var user_note = deleted_notes.pop();
    var key = "user_note" + (new Date()).getTime();
    localStorage.setItem(key, user_note);
    doShowNotes();
}


RUR.ajax_requests = {};

var load_page = function(page) {
    $("#content").load(page+".html");
    location.hash = page;
};


$(document).ready(function() {
// init
    var all_active_panels, child;
    all_active_panels = reset_widths();

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
        reset_widths();
    });

    $(function() {
        $("#tabs").tabs({heightStyle: "auto"});
    });

    $("#editor-link").on("click", function(){
        $("#lint").show();
        $("#save-library").hide();
    });
    $("#library-link").on("click", function(){
        $("#lint").hide();
        $("#save-library").show();
    });
    $("#notes-link").on("click", function(){
        $("#lint").hide();
        $("#save-library").hide();
    });

    $("#save-library").on("click", function() {
        localStorage.setItem("library", library.getValue());
        $('#saved').show().fadeOut(2000);
    });


    try{
        var library_content = localStorage.getItem("library") || "/* Your special code goes here */\n\n";
        library.setValue(library_content + "\n");
    } catch (e){ alert("Your browser does not support localStorage; you will not be able to save your functions in the library or your notes.");}


    var hash = location.hash;
    if (hash === ''){
        load_page("test1");
    } else {
        hash = hash.slice(1) + ".html";
        $.ajax({
            url: hash,
            context: $("#content"),
            statusCode: {
                404: function() {
                    alert("page not found");
                    load_page("test1");
                }
            },
            type: 'POST'
        }).done(function(data){$("#content").html(data);});
    }

    $("#help").dialog({autoOpen:false, width:600, position:"top"});
    $("#help-button").on("click", function() {
        if (RUR.ajax_requests.help !== undefined){
            $("#help").dialog( "open");
            return;
        }
        $('#help').load("../xml/help.xml");
        RUR.ajax_requests.help = true;
        $("#help").dialog("open");
        return false;
    });

    $("#about").dialog({autoOpen:false, width:600, position:"top"});
    $("#about-button").on("click", function() {
        if (RUR.ajax_requests.about !== undefined){
            $("#about").dialog("open");
            return;
        }
        $('#about').load("../xml/about.xml");
        RUR.ajax_requests.about = true;
        $("#about").dialog("open");
        return false;
    });

    $("#contribute").dialog({autoOpen:false, width:600, position:"top"});
    $("#contribute-button").on("click", function() {
        if (RUR.ajax_requests.contribute !== undefined){
            $("#contribute").dialog( "open");
            return;
        }
        $('#contribute').load("../xml/contribute.xml");
        RUR.ajax_requests.contribute = true;
        $("#contribute").dialog( "open");
        return false;
    });

    $("#Reeborg-says").dialog({autoOpen:false, position:{my: "center", at: "center", of: $("#robot_canvas")}});
    $("#Reeborg-shouts").dialog({autoOpen:false, dialogClass: "alert", position:{my: "center", at: "center", of: $("#robot_canvas")}});
    try{
        doShowNotes();
    }catch (e) {console.log(e);} // Do not alert the user as we've already caught similar errors
});
