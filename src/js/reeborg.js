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
    };
};

RUR.World = function () {
    "use strict";
    this.EAST = 0;
    this.NORTH = 1;
    this.WEST = 2;
    this.SOUTH = 3;
    this.max_steps = 1000;
    this.frames = undefined;
    this.walls = undefined;
    this.robots = undefined;
    this.tokens = undefined;
    this.imported_world = undefined;
    this.json_world_string = undefined;

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
        json_object = {"robots": this.robots, "walls": this.walls, "tokens": this.tokens};
        return JSON.stringify(json_object, null, '   ');
    };

    this.import_ = function (json_string){
        if (json_string === undefined){
            return {};
        }
        this.json_world_string = json_string;
        return JSON.parse(json_string) || {};
    };

    this.parse_world = function() {
        var i, orientation;
        this.imported_world = this.import_(this.json_world_string);
        this.robots = [];
        this.walls = this.imported_world.walls || {};
        this.tokens = this.imported_world.tokens || {};
        this.shapes = this.imported_world.shapes || {};
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

    this.set_tokens = function (x, y, nb_tokens){
        if (nb_tokens > 0) {
            this.tokens[x + "," + y] = nb_tokens;
        } else {
            delete this.tokens[x + "," + y];
        }
    };

    this.get_tokens = function (x, y) {
        return this.tokens[x + "," + y] || 0;
    };

    this.robot_take_token  = function (robot) {
        var token = this.get_tokens(robot.x, robot.y);
        if (token === 0){
            throw new RUR.Error("No token found here!");
        } else {
            robot.tokens += 1;
            this.set_tokens(robot.x, robot.y, token-1);
        }
    };

    this.robot_put_token = function (robot) {
        var token;
        if (robot.tokens === 0){
            throw new RUR.Error("I don't have any token to put down!");
        }
        token = this.get_tokens(robot.x, robot.y);
        this.set_tokens(robot.x, robot.y, token+1);
        robot.tokens -= 1;
    };

    this.set_shape = function (x, y, shape){
        if (shape !== null) {
            this.shapes[x + "," + y] = shape;
        } else {
            delete this.shapes[x + "," + y];
        }
    };

    this.find_shape = function (x, y) {
        return this.shapes[x + "," + y] || 0;
    };

    this.robot_take  = function (robot, shape) {
        console.log("inside robot_take");
        var s;
        if (["triangle", "square", "star"].indexOf(shape) === -1){
            throw new RUR.Error("Unknown shape: " + shape);
        }
        s = this.find_shape(robot.x, robot.y);
        if (s === 0 || s !== shape) {
            throw new RUR.Error("No " + shape + " found here!");
        } else {
            robot[shape] += 1;
            this.set_shape(robot.x, robot.y, null);
        }
    };

    this.robot_put = function (robot, shape) {
        if (["triangle", "square", "star"].indexOf(shape) === -1){
            throw new RUR.Error("Unknown shape: " + shape);
        }
        if (robot[shape] === 0){
            throw new RUR.Error("I don't have any " + shape + "to put down!");
        } else if (this.find_shape(robot.x, robot.y) !== 0) {
            throw new RUR.Error("There is already something here.");
        }
        this.set_shape(robot.x, robot.y, shape);
        robot[shape] -= 1;
    };


    this.is_wall_at = function (coords, orientation) {
        if (this.walls[coords] !== undefined){
            if (this.walls[coords].indexOf(orientation) !== -1) {
                return true;
            }
        }
        return false;
    };

    this.wall_in_front = function(robot){
        var coords;
        switch (robot.orientation){
        case this.EAST:
            coords = robot.x + "," + robot.y;
            if (this.is_wall_at(coords, "east")) {
                return true;
            }
            break;
        case this.NORTH:
            coords = robot.x + "," + robot.y;
            if (this.is_wall_at(coords, "north")) {
                return true;
            }
            break;
        case this.WEST:
            if (robot.x===1){
                return true;
            } else {
                coords = robot.x-1 + "," + robot.y;
                if (this.is_wall_at(coords, "east")) {
                    return true;
                }
            }
            break;
        case this.SOUTH:
            if (robot.y===1){
                return true;
            } else {
                coords = robot.x + "," + robot.y-1;
                if (this.is_wall_at(coords, "north")) {
                    return true;
                }
            }
            break;
        default:
            throw new RUR.Error("Should not happen: unhandled case in RUR.World.move_robot().");
        }
        return false;
    };

    this.move_robot = function(robot){
        if (this.wall_in_front(robot)) {
            throw new RUR.Error("Ouch! I hit a wall!");
        }
        robot.prev_x = robot.x;
        robot.prev_y = robot.y;
        switch (robot.orientation){
        case this.EAST:
            robot.x += 1;
            break;
        case this.NORTH:
            robot.y += 1;
            break;
        case this.WEST:
            robot.x -= 1;
            break;
        case this.SOUTH:
            robot.y -= 1;
            break;
        default:
            throw new Error("Should not happen: unhandled case in RUR.World.move_robot().");
        }
    };

    this.add_error_frame = function (error) {
        // bypass the verification for limit of frames
        if (error.message === "Done!") {
            return;
        }
        this.frames.container.push({error: error});
    };

    this.add_output_frame = function (element, message) {
        this.frames.add_item({output: {element:element, message:message}});
    };

    this.add_frame = function () {
        var i, k, robot, robots = [], walls, tokens, shapes;
        for (i = 0; i < this.robots.length; i++){
            robot = {};
            robot.x = this.robots[i].x;
            robot.y = this.robots[i].y;
            robot.prev_x = this.robots[i].prev_x;
            robot.prev_y = this.robots[i].prev_y;
            robot.orientation = this.robots[i].orientation;
            robot.prev_orientation = this.robots[i].prev_orientation;
            robot._is_leaky = this.robots[i]._is_leaky;
            robot.tokens = this.robots[i].tokens;
            robots.push(robot);
        }
        tokens = {};
        k = Object.keys(this.tokens);
        for (i=0; i < k.length; i++){
            tokens[k[i]] = this.tokens[k[i]];
        }
        walls = {};
        k = Object.keys(this.walls);
        for (i=0; i < k.length; i++){
            walls[k[i]] = this.walls[k[i]];
        }
        shapes = {};
        k = Object.keys(this.shapes);
        for (i=0; i < k.length; i++){
            shapes[k[i]] = this.shapes[k[i]];
        }
        this.frames.add_item({"robots": robots, "walls": walls, "tokens": tokens, "shapes": shapes});
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
    // the following can only be found in the world
    this.triangles = 0;
    this.squares = 0;
    this.star = 0;

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
            throw new RUR.Error("Unknown orientation for robot.");
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

RUR.PrivateRobot.prototype.wall_in_front = function() {
    return RUR.world.wall_in_front(this);
};

RUR.PrivateRobot.prototype.is_facing_north = function () {
    return this.orientation === RUR.world.NORTH;
};

RUR.PrivateRobot.prototype.done = function() {
    throw new RUR.Error("Done!");
};

RUR.PrivateRobot.prototype.avance = RUR.PrivateRobot.prototype.move;

RUR.PrivateRobot.prototype.put_token = function () {
    RUR.world.robot_put_token(this);
    RUR.world.add_frame();
};

RUR.PrivateRobot.prototype.take_token = function () {
    RUR.world.robot_take_token(this);
    RUR.world.add_frame();
};

RUR.PrivateRobot.prototype.put = function (shape) {
    RUR.world.robot_put(this, shape);
    RUR.world.add_frame();
};

RUR.PrivateRobot.prototype.take = function (shape) {
    RUR.world.robot_take(this, shape);
    RUR.world.add_frame();
};


RUR.visible_world = {
    init: function () {
        "use strict";
        var that = this;
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
            that.reset();
        };
        this.robot_n_img = new Image();
        this.robot_n_img.src = '../images/robot_n.png';
        this.robot_w_img = new Image();
        this.robot_w_img.src = '../images/robot_w.png';
        this.robot_s_img = new Image();
        this.robot_s_img.src = '../images/robot_s.png';
        this.running = false;
    },
    wall_length: 40,
    wall_thickness: 5,
    robot_y_offset : 6,
    robot_x_offset : 9,
    wall_color: "brown",
    shawdow_wall_color: "#f0f0f0",
    ctx: null,
    draw : function (frame) {
        "use strict";
        this.draw_foreground_walls();
        if (frame.tokens !== undefined){
            this.draw_tokens(frame.tokens);
        }
        if (frame.shapes !== undefined){
            this.draw_shapes(frame.shapes);
        }
        this.draw_trace();
        if (frame.robots !== undefined) {
            this.draw_robots(frame.robots);
        }
    },
    set_trace_style : function (choice){
        "use strict";
        if (choice === "red") {
            this.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
            this.trace_color = "red";
            this.trace_thickness = 4;
        } else {
            this.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
            this.trace_color = "seagreen";
            this.trace_thickness = 1;
        }
    },
    draw_coordinates: function(){
        "use strict";
        var x, y;
        this.ctx = this.background_ctx;
        this.ctx.fillStyle = 'black';
        y = this.height-this.wall_length/2;
        for(x=1; x <= this.cols; x++){
            this.ctx.fillText(x, (x+0.5)*this.wall_length, y);
        }
        x = this.wall_length/2;
        for(y=1; y <= this.rows; y++){
            this.ctx.fillText(y, x, this.height - (y+0.3)*this.wall_length);
        }
    },
    draw_background_walls : function () {
        "use strict";
        var i, j;
        this.ctx = this.background_ctx;
        this.ctx.clearRect(0, 0, this.width, this.height);
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
        // todo : make more efficient by 1. splitting into two functions so as not
        // to redraw permanent walls and 2. do not loop over all possible combinations
        // but identify which walls need to be drawn the same way we do for tokens.
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
                        if ( RUR.world.walls[key].indexOf("north") !== -1) {
                            this.draw_north_wall(i, j);
                        }
                        if (RUR.world.walls[key].indexOf("east") !== -1) {
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
    draw_tokens : function(tokens) {
        "use strict";
        var i, j, k, t, toks;
        toks = Object.keys(tokens);
        for (t=0; t < toks.length; t++){
            k = toks[t].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            this.draw_token(i, j, tokens[toks[t]]);
        }
    },
    draw_token : function (i, j, num) {
        "use strict";
        var size = 12, scale = this.wall_length, Y = this.height;
        this.ctx = this.wall_ctx;
        this.ctx.fillStyle = "gold";
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc((i+0.6)*scale, Y - (j+0.4)*scale, size, 0 , 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.strokeText(num, (i+0.5)*scale, Y - (j+0.3)*scale);
    },
    draw_shapes : function(shapes) {
        "use strict";
        var i, j, k, t, sh;
        sh = Object.keys(shapes);
        for (t=0; t < sh.length; t++){
            k = sh[t].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            this.draw_shape(i, j, shapes[sh[t]]);
        }
    },
    draw_shape : function (i, j, shape) {
        "use strict";
        var size = 12, scale = this.wall_length, Y = this.height;
        this.ctx = this.wall_ctx;
        if (shape === "square") {
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
        } else if (shape === "triangle") { // triangle
            this.ctx.fillStyle = "green";
            this.ctx.beginPath();
            this.ctx.moveTo((i+0.6)*scale - size, Y - (j+0.4)*scale + size);
            this.ctx.lineTo((i+0.6)*scale, Y - (j+0.4)*scale - size);
            this.ctx.lineTo((i+0.6)*scale + size, Y - (j+0.4)*scale + size);
            this.ctx.lineTo((i+0.6)*scale - size, Y - (j+0.4)*scale + size);
            this.ctx.fill();
            this.ctx.closePath();
        } else {
            this.ctx.fillStyle = "red";
            this.draw_star(this.ctx, (i+0.6)*scale, Y-(j+0.4)*scale, 1.5*size);
        }
    },
    draw_star : function (ctx, x, y, r){
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
        ctx.fill();
        ctx.restore();
        ctx.restore();
    },
    draw_robot : function (robot) {
        "use strict";
        var x, y, img;
        this.ctx = this.robot_ctx;
        x = robot.x * this.wall_length + this.robot_x_offset;
        y = this.height - (robot.y +1) * this.wall_length + this.robot_y_offset;
        this.ctx.beginPath();
        switch(robot.orientation){
        case RUR.world.EAST:
            img = this.robot_e_img;
            break;
        case RUR.world.NORTH:
            img = this.robot_n_img;
            break;
        case RUR.world.WEST:
            img = this.robot_w_img;
            break;
        case RUR.world.SOUTH:
            img = this.robot_s_img;
            break;
        default:
            img = this.robot_e_img;
        }
        this.ctx.drawImage(img, x, y);
        this.draw_trace(robot);
    },
    draw_trace : function (robot) {
        "use strict";
        if (robot === undefined || robot._is_leaky === false) {
            return;
        }
        this.ctx = this.trace_ctx;
        this.ctx.strokeStyle = this.trace_color;
        this.ctx.lineWidth = this.trace_thickness;
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(robot.prev_x* this.wall_length + this.trace_offset[robot.prev_orientation][0],
                        this.height - (robot.prev_y +1) * this.wall_length + this.trace_offset[robot.prev_orientation][1]);
        this.ctx.lineTo(robot.x* this.wall_length + this.trace_offset[robot.orientation][0],
                        this.height - (robot.y +1) * this.wall_length + this.trace_offset[robot.orientation][1]);
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
        var frame, robot;
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
        RUR.visible_world.draw(frame);
    },

    draw_robots : function(robots) {
        var robot;
        this.robot_ctx.clearRect(0, 0, this.width, this.height);
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
        this.trace_ctx.clearRect(0, 0, this.width, this.height);
        this.draw(RUR.world);
        this.running = false;
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
                    RUR.visible_world.compiled = true;
                } else if (this.programming_language === "brython") {
                    RUR.compile_brython(src);
                    RUR.visible_world.compiled = true;
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

var wall_in_front = function() {
    "use strict";
    return RUR.world.wall_in_front(RUR.world.robots[0]);
};

var is_facing_north = function() {
    "use strict";
    return RUR.world.robots[0].is_facing_north();
};

var token_here = function () {
    "use strict";
    return RUR.world.get_tokens(RUR.world.robots[0].x, RUR.world.robots[0].y);
};

var done = function () {
    RUR.world.robots[0].done();
};

var put_token = function() {
    RUR.world.robots[0].put_token();
};

var take_token = function() {
    RUR.world.robots[0].take_token();
};

var put = function(arg) {
    RUR.world.robots[0].put(arg);
};

var take = function(arg) {
    RUR.world.robots[0].take(arg);
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
