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
