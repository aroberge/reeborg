/* Author: André Roberge
   License: MIT
 */

/*jshint browser:true, -W069:false, devel:true, indent:4, white:false, plusplus:false */
/*globals $, editor, library, translate_python, JSHINT, CodeMirror */

var RUR = RUR || {};
var DEBUG = {};
DEBUG.ON = false;

RUR.World = function () {
    "use strict";
    this.EAST = 0;
    this.NORTH = 1;
    this.WEST = 2;
    this.SOUTH = 3;
    this.max_steps = 1000;
    this.frames = undefined;
    this.prev_frame = undefined;
    this.walls = undefined;
    this.robots = undefined;
    this.tokens = undefined;
    this.imported_world = undefined;
    this.json_world_string = undefined;
    this.robot_world_active = undefined;

    this.think = function (delay) {
        if (delay >= 0  && delay <= 10000){
            this.add_frame("delay", delay);
        }
        else {
            throw new RUR.Error(RUR.translation["Reeborg's thinking time needs to be specified in milliseconds, between 0 and 10000; this was: "].supplant({delay: delay}));
        }
    };

    this.pause = function(ms) {
        this.frames.add_item({pause: true, pause_time:ms});
    };

    this.export_ = function (){
        var json_object;
        json_object = {"robots": this.robots, "walls": this.walls, "tokens": this.tokens,
                        "shapes": this.shapes};
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
        this.goal = this.imported_world.goal;
        this.blank_canvas = this.imported_world.blank;
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
                this.robots.push(new RUR.Robot(this.imported_world.robots[i].x,
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

    this.remove_robot = function () {
        this.robots.remove(0);
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
            throw new RUR.Error(RUR.translation["No token found here!"]);
        } else {
            if (typeof robot.tokens === typeof 42){
                robot.tokens += 1;
            }
            this.set_tokens(robot.x, robot.y, token-1);
        }
    };

    this.robot_put_token = function (robot) {
        var token;
        if (robot.tokens === 0){
            throw new RUR.Error(RUR.translation["I don't have any token to put down!"]);
        }
        token = this.get_tokens(robot.x, robot.y);
        this.set_tokens(robot.x, robot.y, token+1);
        if (typeof robot.tokens === typeof 42){
            robot.tokens -= 1;
        }
    };

    this.set_shape = function (x, y, shape){
        if (shape !== null) {
            this.shapes[x + "," + y] = RUR.translation[shape];
        } else {
            delete this.shapes[x + "," + y];
        }
    };

    this.find_shape = function (x, y) {
        return RUR.translation[this.shapes[x + "," + y]] || 0;
    };

    this.robot_take  = function (robot, shape) {
        var s;
        if (RUR.translation["token"] === shape || shape === undefined){
            this.robot_take_token(robot);
            return;
        }
        else if ([RUR.translation["triangle"], RUR.translation["square"], RUR.translation["star"]].indexOf(shape) === -1){
            throw new RUR.Error(RUR.translation["Unknown shape"].supplant({shape: shape}));
        }
        s = this.find_shape(robot.x, robot.y);
        if (s === 0 || s !== shape) {
            throw new RUR.Error(RUR.translation["No shape found here"].supplant({shape: shape}));
        } else {
            robot[shape] += 1;
            this.set_shape(robot.x, robot.y, null);
        }
    };

    this.robot_put = function (robot, shape) {
        if (RUR.translation["token"] === shape || shape === undefined){
            this.robot_put_token(robot);
            return;
        }
        else if ([RUR.translation["triangle"], RUR.translation["square"], RUR.translation["star"]].indexOf(shape) === -1){
            throw new RUR.Error(RUR.translation["Unknown shape"].supplant({shape: shape}));
        }
        if (robot[shape] === 0){
            throw new RUR.Error(RUR.translation["I don't have any shape to put down!"].supplant({shape:shape}));
        } else if (this.find_shape(robot.x, robot.y) !== 0) {
            throw new RUR.Error(RUR.translation["There is already something here."]);
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

    this.front_is_clear = function(robot){
        var coords;
        switch (robot.orientation){
        case this.EAST:
            coords = robot.x + "," + robot.y;
            if (this.is_wall_at(coords, "east")) {
                return false;
            }
            break;
        case this.NORTH:
            coords = robot.x + "," + robot.y;
            if (this.is_wall_at(coords, "north")) {
                return false;
            }
            break;
        case this.WEST:
            if (robot.x===1){
                return false;
            } else {
                coords = (robot.x-1) + "," + robot.y; // do math first before building strings
                if (this.is_wall_at(coords, "east")) {
                    return false;
                }
            }
            break;
        case this.SOUTH:
            if (robot.y===1){
                return false;
            } else {
                coords = robot.x + "," + (robot.y-1);  // do math first before building strings
                if (this.is_wall_at(coords, "north")) {
                    return false;
                }
            }
            break;
        default:
            throw new RUR.Error("Should not happen: unhandled case in RUR.World.front_is_clear().");
        }
        return true;
    };

    this.right_is_clear = function(robot){
        var result;
        robot.__turn_right(true);
        result = this.front_is_clear(robot);
        robot.turn_left(true);
        return result;
    };

    this.build_wall = function(robot){
        var coords, orientation, x, y;
        switch (robot.orientation){
        case this.EAST:
            coords = robot.x + "," + robot.y;
            if (this.is_wall_at(coords, "east")) {
                throw new RUR.Error(RUR.translation["There is already a wall here!"]);
            }
            orientation = "east";
            x = robot.x;
            y = robot.y;
            break;
        case this.NORTH:
            coords = robot.x + "," + robot.y;
            if (this.is_wall_at(coords, "north")) {
                throw new RUR.Error(RUR.translation["There is already a wall here!"]);
            }
            orientation = "north";
            x = robot.x;
            y = robot.y;
            break;
        case this.WEST:
            if (robot.x===1){
                throw new RUR.Error(RUR.translation["There is already a wall here!"]);
            } else {
                coords = robot.x-1 + "," + robot.y;
                if (this.is_wall_at(coords, "east")) {
                    throw new RUR.Error(RUR.translation["There is already a wall here!"]);
                }
            }
            orientation = "east";
            x = robot.x-1;
            y = robot.y;
            break;
        case this.SOUTH:
            if (robot.y===1){
                throw new RUR.Error(RUR.translation["There is already a wall here!"]);
            } else {
                coords = robot.x + "," + robot.y-1;
                if (this.is_wall_at(coords, "north")) {
                    throw new RUR.Error(RUR.translation["There is already a wall here!"]);
                }
            }
            orientation = "north";
            x = robot.x;
            y = robot.y-1;
            break;
        default:
            throw new RUR.Error("Should not happen: unhandled case in RUR.World.build_wall().");
        }
        RUR.world.toggle_wall(x, y, orientation);
    };

    this.move_robot = function(robot){
        if (!this.front_is_clear(robot)) {
            throw new RUR.Error(RUR.translation["Ouch! I hit a wall!"]);
        }
        if ((robot.y === RUR.visible_world.rows && robot.orientation === this.NORTH) ||
            (robot.x === RUR.visible_world.cols && robot.orientation === this.EAST)) {
            throw new RUR.Error(RUR.translation["I am afraid of the void!"]);
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


    this.add_frame = function (first, second, third) {
        var i, j, k, robot, robots = [], walls, tokens, shapes;
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
            walls[k[i]] = [];
            for(j = 0; j < this.walls[k[i]].length; j++){
                walls[k[i]].push(this.walls[k[i]][j]);
            }
        }
        shapes = {};
        k = Object.keys(this.shapes);
        for (i=0; i < k.length; i++){
            shapes[k[i]] = this.shapes[k[i]];
        }
        if (first === undefined) {
            this.frames.add_item({"robots": robots, "walls": walls, "tokens": tokens, "shapes": shapes});
        } else if (first === "output") {
            this.frames.add_item({"robots": robots, "walls": walls, "tokens": tokens, "shapes": shapes, output: {element:second, message:third}});
        } else if (first === "delay") {
            this.frames.add_item({"robots": robots, "walls": walls, "tokens": tokens, "shapes": shapes, delay: Math.round(second)}); 
        } else if (first === "error") {
            this.frames.add_item({"robots": robots, "walls": walls, "tokens": tokens, "shapes": shapes, error: second});
        }
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

RUR.visible_world = {
    init: function () {
        "use strict";
        var that = this;
        this.background_canvas = document.getElementById("background_canvas");
        this.background_ctx = this.background_canvas.getContext("2d");
        this.background_ctx.font = "bold 12px sans-serif";
        this.height = this.background_canvas.height;
        this.width = this.background_canvas.width;
        this.wall_ctx = document.getElementById("wall_canvas").getContext("2d");
        this.trace_ctx = document.getElementById("trace_canvas").getContext("2d");
        this.set_trace_style();
        this.robot_ctx = document.getElementById("robot_canvas").getContext("2d");
        this.rows = Math.floor(this.height / this.wall_length) - 1;
        this.cols = Math.floor(this.width / this.wall_length) - 2;
        this.delay = 300;   // milliseconds
        this.robot_e_img = new Image();
        this.robot_e_img.src = 'src/images/robot_e.png';
        // the following ensures that we won't attempt drawing until the default image is available
        this.robot_e_img.onload = function () {
            that.reset();
        };
        this.robot_top_e_img = new Image();
        this.robot_top_e_img.src = 'src/images/top_e.png';
        this.robot_n_img = new Image();
        this.robot_n_img.src = 'src/images/robot_n.png';
        this.robot_top_n_img = new Image();
        this.robot_top_n_img.src = 'src/images/top_n.png';
        this.robot_w_img = new Image();
        this.robot_w_img.src = 'src/images/robot_w.png';
        this.robot_top_w_img = new Image();
        this.robot_top_w_img.src = 'src/images/top_w.png';
        this.robot_s_img = new Image();
        this.robot_s_img.src = 'src/images/robot_s.png';
        this.robot_top_s_img = new Image();
        this.robot_top_s_img.src = 'src/images/top_s.png';
        this.running = false;
        if (localStorage.getItem("top_view") === "true") {
            this.top_view = true;
        } else {
            this.top_view = false;
        }
    },
    wall_length: 40,
    wall_thickness: 5,
    robot_y_offset : 8,
    robot_x_offset : 10,
    wall_color: "brown",
    shadow_wall_color: "#f0f0f0",
    ctx: null,
    draw : function (frame) {
        "use strict";
        this.draw_foreground_walls(frame.walls);
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
        if (choice === "thick") {
            this.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
            this.trace_color = "seagreen";
            this.trace_thickness = 4;
        } else {
            this.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
            this.trace_color = "seagreen";
            this.trace_thickness = 1;
        }
    },
    draw_coordinates: function(){
        "use strict";
        if (RUR.world.blank_canvas) return;
        var x, y;
        var ctx = this.background_ctx;
        ctx.fillStyle = 'black';
        y = this.height-this.wall_length/2;
        for(x=1; x <= this.cols; x++){
            ctx.fillText(x, (x+0.5)*this.wall_length, y);
        }
        x = this.wall_length/2;
        for(y=1; y <= this.rows; y++){
            ctx.fillText(y, x, this.height - (y+0.3)*this.wall_length);
        }
        // axis labels
        ctx.fillStyle = this.wall_color;
        ctx.fillText("x", this.width/2, this.height - 10);
        ctx.fillText("y", 5, this.height/2 );
    },
    draw_background_walls : function () {
        "use strict";
        var i, j;
        var ctx = this.background_ctx;
        this.ctx = ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        if (RUR.world.blank_canvas) return;
        ctx.fillStyle = this.shadow_wall_color;
        for (i = 1; i <= this.cols; i++) {
            for (j = 1; j <= this.rows; j++) {
                this.draw_north_wall(i, j);
                this.draw_east_wall(i, j);
            }
        }
    },
    draw_goal : function () {
        "use strict";
        if (RUR.world.goal === undefined) return;
        var goal = RUR.world.goal;
        if (goal.position !== undefined) {
            this.draw_coloured_tile(goal.position.x, goal.position.y, goal.orientation);
        }
        if (goal.shapes !== undefined){
            this.draw_shapes(goal.shapes, true);
        }
        if (goal.tokens !== undefined) {
            this.draw_tokens(goal.tokens, true);
        }
        if (goal.walls !== undefined){
            this.draw_foreground_walls(goal.walls, goal);
            var key, i, j;
            var ctx = this.background_ctx;
            this.ctx = ctx;
            // todo : make more efficient by 1. splitting into two functions so as not
            // to redraw permanent walls and 2. do not loop over all possible combinations
            // but identify which walls need to be drawn the same way we do for tokens.
            for (i = 0; i <= this.cols; i++) {
                for (j = 0; j <= this.rows; j++) {
                    key = i + "," + j;
                    if ( key in goal.walls ) {
                        if ( goal.walls[key].indexOf("north") !== -1) {
                            this.draw_north_wall(i, j, true);
                        }
                        if (goal.walls[key].indexOf("east") !== -1) {
                            this.draw_east_wall(i, j, true);
                        }
                    }
                }
            }
        }
    },
    draw_coloured_tile : function (i, j, orientation) {
        var size = this.wall_thickness, ctx = this.background_ctx;
        ctx.fillStyle = "#99ffcc";
        ctx.fillRect(i*this.wall_length + size, this.height - (j+1)*this.wall_length + size,
                          this.wall_length - size, this.wall_length - size);
        if (orientation === undefined) return;

        ctx.fillStyle = "black";
        switch(orientation){
        case 0:
            ctx.fillRect((i+1)*this.wall_length - size, this.height - (j+0.5)*this.wall_length,
                          size, size);
            break;
        case 1:
            ctx.fillRect((i+0.5)*this.wall_length, this.height - (j+1)*this.wall_length + size,
                          size, size);
            break;
        case 2:
            ctx.fillRect((i)*this.wall_length + size, this.height - (j+0.5)*this.wall_length,
                          size, size);
            break;
        case 3:
            ctx.fillRect((i+0.5)*this.wall_length , this.height - (j)*this.wall_length - size,
                          size, size);
            break;
        }
    },
    draw_foreground_walls : function (walls) {
        "use strict";
        var key, i, j;
        var ctx = this.wall_ctx;
        this.ctx = ctx;
        ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
        if (RUR.world.blank_canvas) return;
        ctx.fillStyle = this.wall_color;
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
                    if ( key in walls ) {
                        if ( walls[key].indexOf("north") !== -1) {
                            this.draw_north_wall(i, j);
                        }
                        if (walls[key].indexOf("east") !== -1) {
                            this.draw_east_wall(i, j);
                        }
                    }
                }
            }
        }
    },
    draw_north_wall : function(i, j, goal) {
        "use strict";
        if (goal){
            this.ctx.strokeStyle = "black";
            this.ctx.beginPath();
            this.ctx.rect(i*this.wall_length, this.height - (j+1)*this.wall_length,
                          this.wall_length + this.wall_thickness, this.wall_thickness);
            this.ctx.stroke();
            return;
        }
        this.ctx.fillRect(i*this.wall_length, this.height - (j+1)*this.wall_length,
                          this.wall_length + this.wall_thickness, this.wall_thickness);
    },
    draw_east_wall : function(i, j, goal) {
        "use strict";
        if (goal){
            this.ctx.strokeStyle = "black";
            this.ctx.beginPath();
            this.ctx.rect((i+1)*this.wall_length, this.height - (j+1)*this.wall_length,
                          this.wall_thickness, this.wall_length + this.wall_thickness);
            this.ctx.stroke();
            return;
        }
        this.ctx.fillRect((i+1)*this.wall_length, this.height - (j+1)*this.wall_length,
                          this.wall_thickness, this.wall_length + this.wall_thickness);
    },
    draw_tokens : function(tokens, goal) {
        "use strict";
        var i, j, k, t, toks;
        toks = Object.keys(tokens);
        for (t=0; t < toks.length; t++){
            k = toks[t].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            this.draw_token(i, j, tokens[toks[t]], goal);
        }
    },
    draw_token : function (i, j, num, goal) {
        "use strict";
        var size = 12, scale = this.wall_length, Y = this.height;
        var ctx;
        if (goal) {
            ctx = this.background_ctx;
        } else {
            ctx = this.wall_ctx;
        }
        ctx.beginPath();
        ctx.arc((i+0.6)*scale, Y - (j+0.4)*scale, size, 0 , 2 * Math.PI, false);
        if (goal) {
            ctx.strokeStyle = "#666";
            ctx.fillStyle = "black";
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.fillText(num, (i+0.2)*scale, Y - (j)*scale);
        } else {
            ctx.fillStyle = "gold";
            ctx.strokeStyle = "black";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.fillStyle = "black";
            ctx.fillText(num, (i+0.5)*scale, Y - (j+0.3)*scale);
        }
    },
    draw_shapes : function(shapes, goal) {
        "use strict";
        var i, j, k, t, sh;
        sh = Object.keys(shapes);
        for (t=0; t < sh.length; t++){
            k = sh[t].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            this.draw_shape(i, j, shapes[sh[t]], goal);
        }
    },
    draw_shape : function (i, j, shape, goal) {
        "use strict";
        var ctx, size = 12, scale = this.wall_length, Y = this.height;
        if(goal !== undefined){
            ctx = this.background_ctx;
            ctx.lineWidth = 3;
        } else {
            ctx = this.wall_ctx;
        }
        ctx.strokeStyle = "black";
        if (shape === "square") {
            ctx.fillStyle = "blue";
            if(goal !== undefined){
                ctx.beginPath();
                ctx.rect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
                ctx.stroke();
            } else {
                ctx.fillRect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
            }
        } else if (shape === "triangle") { // triangle
            ctx.fillStyle = "green";
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
            ctx.fillStyle = "red";
            this.draw_star(ctx, (i+0.6)*scale, Y-(j+0.4)*scale, 1.5*size, goal);
        }
    },
    draw_star : function (ctx, x, y, r, goal){
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
    },
    draw_robot : function (robot) {
        "use strict";
        var x, y, img, ctx;
        ctx = this.robot_ctx;
        x = robot.x * this.wall_length + this.robot_x_offset;
        y = this.height - (robot.y +1) * this.wall_length + this.robot_y_offset;
        switch(robot.orientation){
        case RUR.world.EAST:
            if (RUR.visible_world.top_view) {
                img = this.robot_top_e_img;
            } else {
                img = this.robot_e_img;
            }
            break;
        case RUR.world.NORTH:
            if (RUR.visible_world.top_view) {
                img = this.robot_top_n_img;
            } else {
                img = this.robot_n_img;
            }
            break;
        case RUR.world.WEST:
            if (RUR.visible_world.top_view) {
                img = this.robot_top_w_img;
            } else {
                img = this.robot_w_img;
            }
            break;
        case RUR.world.SOUTH:
            if (RUR.visible_world.top_view) {
                img = this.robot_top_s_img;
            } else {
                img = this.robot_s_img;
            }
            break;
        default:
            img = this.robot_e_img;
        }
        ctx.drawImage(img, x, y);
        this.draw_trace(robot);
    },
    draw_trace : function (robot) {
        "use strict";
        if (robot === undefined || robot._is_leaky === false) {
            return;
        }
        var ctx = this.trace_ctx;
        ctx.strokeStyle = this.trace_color;
        ctx.lineWidth = this.trace_thickness;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(robot.prev_x* this.wall_length + this.trace_offset[robot.prev_orientation][0],
                        this.height - (robot.prev_y +1) * this.wall_length + this.trace_offset[robot.prev_orientation][1]);
        ctx.lineTo(robot.x* this.wall_length + this.trace_offset[robot.orientation][0],
                        this.height - (robot.y +1) * this.wall_length + this.trace_offset[robot.orientation][1]);
        ctx.stroke();
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
    check_goal : function (frame) {
        var g, goal_status = {}, result;
        g = RUR.world.goal;
        goal_status.message = "<ul>";
        goal_status.success = true;
        if (g.position !== undefined){
            goal_status.position = {};
            if (g.position.x === frame.robots[0].x){
                goal_status.message += RUR.translation["<li class='success'>Reeborg is at the correct x position.</li>"];
            } else {
                goal_status.message += RUR.translation["<li class='failure'>Reeborg is at the wrong x position.</li>"];
                goal_status.success = false;
            }
            if (g.position.y === frame.robots[0].y){
                goal_status.message += RUR.translation["<li class='success'>Reeborg is at the correct y position.</li>"];
            } else {
                goal_status.message += RUR.translation["<li class='failure'>Reeborg is at the wrong y position.</li>"];
                goal_status.success = false;
            }
        }
        if (g.orientation !== undefined){
            if (g.orientation === frame.robots[0].orientation){
                goal_status.message += RUR.translation["<li class='success'>Reeborg has the correct orientation.</li>"];
            } else {
                goal_status.message += RUR.translation["<li class='failure'>Reeborg has the wrong orientation.</li>"];
                goal_status.success = false;
            }
        }
        if (g.shapes !== undefined) {
            result = Object.identical(g.shapes, frame.shapes, true);
            if (result){
                goal_status.message += RUR.translation["<li class='success'>All shapes are at the correct location.</li>"];
            } else {
                goal_status.message += RUR.translation["<li class='failure'>One or more shapes are not at the correct location.</li>"];
                goal_status.success = false;
            }
        }
        if (g.tokens !== undefined) {
            result = Object.identical(g.tokens, frame.tokens, true);
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
                    if ( !(frame.walls !== undefined &&
                           frame.walls[w] !== undefined &&
                           frame.walls[w].indexOf(g.walls[w][i]) !== -1)){
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
    },
    play_single_frame : function () {
        "use strict";
        var frame, goal_status;
        if (RUR.world.frames.length() !== 0) {
            frame = RUR.world.frames.shift();
            if (frame.error === undefined){
                RUR.world.prev_frame = frame;
            }
        } else {
            if (RUR.world.goal !== undefined){
                if (RUR.world.prev_frame !== undefined){
                    goal_status = RUR.visible_world.check_goal(RUR.world.prev_frame);
                } else{
                    RUR.world.add_frame();
                    frame = RUR.world.frames.shift();
                    goal_status = RUR.visible_world.check_goal(frame);
                }
                if (goal_status.success) {
                    $("#Reeborg-says").html(goal_status.message).dialog("open");
                } else {
                    $("#Reeborg-shouts").html(goal_status.message).dialog("open");
                }
                RUR.controls.stop();
                return "stopped";
            } else {
                if (RUR.controls.end_flag) {
                    $("#Reeborg-says").html("<p class='center'>" + RUR.translation["Last instruction completed!"] + "</p>").dialog("open");
                } else {
                    RUR.controls.end_flag = true;
                }
                RUR.controls.stop();
                return "stopped";
            }
        }
        if (frame.delay !== undefined) {
            RUR.visible_world.delay = frame.delay;
            return "immediate";
        }
        if (frame.pause) {
            RUR.controls.pause(frame.pause_time);
            return "pause";
        }
        if (frame.error !== undefined) {
            RUR.controls.stop();
            if (frame.error.message === RUR.translation["Done!"]){
                if (RUR.world.goal !== undefined){
                    goal_status = RUR.visible_world.check_goal(RUR.world.prev_frame);
                    if (goal_status.success) {
                        $("#Reeborg-says").html(goal_status.message).dialog("open");
                    } else {
                        $("#Reeborg-shouts").html(goal_status.message).dialog("open");
                    }
                    RUR.controls.stop();
                    return "stopped";
                } else {
                    $("#Reeborg-says").html(RUR.translation["<p class='center'>Instruction <code>done()</code> executed.</p>"]).dialog("open");
                    RUR.controls.stop();
                    return "stopped";
                }
            } else {
                $("#Reeborg-shouts").html(frame.error.message).dialog("open");
            }
            return "stopped";
        }
        if (frame.output !== undefined) {
            $(frame.output.element).append(frame.output.message + "\n");
            return;
        }
        RUR.visible_world.draw(frame);
    },
    draw_robots : function(robots) {
        var robot, info = '';
        this.robot_ctx.clearRect(0, 0, this.width, this.height);
        if (RUR.world.blank_canvas) return;
        for (robot=0; robot < robots.length; robot++){
            this.draw_robot(robots[robot]); // draws trace automatically
            if (DEBUG.ON) {
                info += RUR.translation.robot + robot + ": x=" + robots[robot].x +
                        ", y=" + robots[robot].y + RUR.translation[", tokens="] + robots[robot].tokens + ".  ";
            }
        }
        if (DEBUG.ON) {
            this.robot_ctx.font = "bold 12px sans-serif";
            this.robot_ctx.fillStyle = "blue";
            this.robot_ctx.fillText(info, 5, 15);
        }
    },
    reset : function () {
        "use strict";
        RUR.world.reset();
        DEBUG.ON = false;
        this.delay = 300;
        this.compiled = false;
        this.running = false;
        this.draw_all();
    },
    draw_all : function () {
        this.draw_background_walls();
        this.draw_goal();
        this.draw_coordinates();
        this.trace_ctx.clearRect(0, 0, this.width, this.height);
        this.draw(RUR.world);
    }
};

