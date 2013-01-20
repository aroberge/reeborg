/*jshint indent:4, white:false, browser:true, plusplus: false */

var RUR = RUR || {};

RUR.visible_world = {
    init: function () {
        "use strict";
        this.background_canvas = document.getElementById("background_canvas");
        this.background_ctx = this.background_canvas.getContext("2d");
        this.height = this.background_canvas.height;
        this.width = this.background_canvas.width;
        this.wall_ctx = document.getElementById("wall_canvas").getContext("2d");
        this.robot_ctx = document.getElementById("robot_canvas").getContext("2d");
        this.rows = Math.floor(this.height / this.wall_length) - 2;
        this.cols = Math.floor(this.width / this.wall_length) - 2;
        this.robot_e_img = new Image();
        this.robot_e_img.src = '../src/images/robot_e.png';
        this.robot_n_img = new Image();
        this.robot_n_img.src = '../src/images/robot_n.png';
        this.robot_w_img = new Image();
        this.robot_w_img.src = '../src/images/robot_w.png';
        this.robot_s_img = new Image();
        this.robot_s_img.src = '../src/images/robot_s.png';
        this.draw_background_walls();
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
        //robot = RUR.world.robots[0];
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
        if (RUR.visible_world.x_arr.length !== 0) {
            setTimeout(RUR.visible_world.update, 500);
        }
    },
    draw_frames : function () {
        "use strict";
        var frame, robot;
        this.ctx = RUR.visible_world.robot_ctx;
        if (RUR.world.frames.length !== 0) {
            this.ctx.clearRect(0, 0, RUR.visible_world.width, RUR.visible_world.height);
            frame = RUR.world.frames.shift();
            //RUR.visible_world.draw_robot(RUR.visible_world.x_arr.shift());
            for (robot=0; robot < frame.robots.length; robot++){

                RUR.visible_world.draw_robot(frame.robots[robot]);
            }
        }
    },
    reset : function () {
        "use strict";
        var robot;
        RUR.visible_world.x_arr = [];
        RUR.world.reset();
        robot = new UsedRobot();
        robot = {};
        robot.x = RUR.world.robots[0].x;
        robot.y = RUR.world.robots[0].y;
        RUR.world.frames.push({robots: [robot]});
        RUR.world.frames.push({robots: [robot]});
        this.draw_frames();
        RUR.visible_world.running = false;
    }
};
RUR.visible_world.init();
setTimeout(function(){ RUR.visible_world.reset();}, 200); // needed to ensure image is loaded

var move = function(){
    "use strict";
    var robot;
    RUR.world.robots[0].move();
    robot = {};
    robot.x = RUR.world.robots[0].x;
    robot.y = RUR.world.robots[0].y;
    RUR.visible_world.x_arr.push(robot);
    return;
};

var turn_left = function(){
    "use strict";
    var robot;
    RUR.world.robots[0].turn_left();
    robot = {};
    robot.x = RUR.world.robots[0].x;
    robot.y = RUR.world.robots[0].y;
    RUR.visible_world.x_arr.push(robot);
    return;
};