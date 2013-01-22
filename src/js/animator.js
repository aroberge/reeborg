/*jshint indent:4, white:false, browser:true, plusplus: false */
/*globals UsedRobot */

var RUR = RUR || {};

RUR.visible_world = {
    init: function () {
        "use strict";
        this.background_canvas = document.getElementById("background_canvas");
        this.background_ctx = this.background_canvas.getContext("2d");
        this.height = this.background_canvas.height;
        this.width = this.background_canvas.width;
        this.wall_ctx = document.getElementById("wall_canvas").getContext("2d");
        this.trace_ctx = document.getElementById("trace_canvas").getContext("2d");
        this.robot_ctx = document.getElementById("robot_canvas").getContext("2d");
        this.rows = Math.floor(this.height / this.wall_length) - 2;
        this.cols = Math.floor(this.width / this.wall_length) - 2;
        this.robot_e_img = new Image();
        this.robot_e_img.src = '../src/images/robot_e.png';
        // the following ensures that we won't attempt drawing until the default image is available
        this.robot_e_img.onload = function () {
            RUR.visible_world.reset();
        };
        this.robot_n_img = new Image();
        this.robot_n_img.src = '../src/images/robot_n.png';
        this.robot_w_img = new Image();
        this.robot_w_img.src = '../src/images/robot_w.png';
        this.robot_s_img = new Image();
        this.robot_s_img.src = '../src/images/robot_s.png';
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
    trace_color: "seagreen",
    trace_offset : [[30, 30], [30, 20], [20, 20], [20, 30]],
    //trace_offset : [[25, 30], [25, 25], [25, 20], [25, 25]],
    draw : function () {
        "use strict";
        // fake wall configuration
        this.walls = {
            "1,3" : ["EAST"],
            "3,3" : ["NORTH"],
            "7,3" : ["EAST"],
            "9,3" : ["NORTH"],
            "5,5" : ["EAST", "NORTH"],
            "4,5" : ["EAST"],
            "5,4" : ["NORTH"]
        };
        this.draw_foreground_walls();
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
                    if ( key in this.walls ) {
                        if ( this.walls[key].indexOf("NORTH") !== -1) {
                            this.draw_north_wall(i, j);
                        }
                        if (this.walls[key].indexOf("EAST") !== -1) {
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
        this.ctx = this.trace_ctx;
        this.ctx.strokeStyle = this.trace_color;
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
        this.update();
    },
    update : function () {
        "use strict";
        if (!RUR.visible_world.running){
            return;
        }
        RUR.visible_world.draw_frames();
        if (RUR.world.frames.length !== 0) {
            setTimeout(RUR.visible_world.update, 50);
        }
    },
    draw_frames : function () {
        "use strict";
        var frame, robot;
        this.ctx = RUR.visible_world.robot_ctx;
        if (RUR.world.frames.length !== 0) {
            this.ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
            frame = RUR.world.frames.shift();
            for (robot=0; robot < frame.robots.length; robot++){
                RUR.visible_world.draw_robot(frame.robots[robot]);
            }
        }
    },
    reset : function () {
        "use strict";
        var dummy;
        RUR.world.reset();
        this.draw_background_walls();
        this.draw_foreground_walls();
        this.trace_ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
        dummy = new UsedRobot();
        this.draw_frames();
        RUR.visible_world.running = false;
    }
};
RUR.visible_world.init();

var move = function(){
    "use strict";
    RUR.world.robots[0].move();
};

var turn_left = function(){
    "use strict";
    RUR.world.robots[0].turn_left();
};