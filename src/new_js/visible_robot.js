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


// the following si to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    RUR.world.reset();
};
RUR.vis_robot.w_img.onload = function () {
    RUR.world.reset();
};
RUR.vis_robot.n_img.onload = function () {
    RUR.world.reset();
};
RUR.vis_robot.s_img.onload = function () {
    RUR.world.reset();
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
    RUR.vis_robot.draw_trace(robot);
};


RUR.vis_robot.draw_trace = function (robot) {
    "use strict";
    if (robot === undefined || robot._is_leaky === false) {
        return;
    }
    var ctx = RUR.TRACE_CTX;
    ctx.strokeStyle = RUR.vis_robot.trace_color;
    ctx.lineWidth = RUR.vis_robot.trace_thickness;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(robot._prev_x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation][0],
                    RUR.HEIGHT - (robot._prev_y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot._prev_orientation][1]);
    ctx.lineTo(robot.x* RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot.orientation][0],
                    RUR.HEIGHT - (robot.y +1) * RUR.WALL_LENGTH + RUR.vis_robot.trace_offset[robot.orientation][1]);
    ctx.stroke();
};

RUR.vis_robot.set_trace_style = function (choice){
    "use strict";
    if (choice === "thick") {
        RUR.vis_robot.trace_offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        RUR.vis_robot.trace_color = "seagreen";
        RUR.vis_robot.trace_thickness = 4;
    } else {
        RUR.vis_robot.trace_offset = [[30, 30], [30, 20], [20, 20], [20, 30]];
        RUR.vis_robot.trace_color = "seagreen";
        RUR.vis_robot.trace_thickness = 1;
    }
};

RUR.vis_robot.set_trace_style(); 
