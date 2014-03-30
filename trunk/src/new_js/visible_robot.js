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
    RUR.__robot_e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.__robot_n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.__robot_w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.__robot_s_img = RUR.vis_robot.images[style].robot_s_img;
    RUR.__robot_x_offset = RUR.vis_robot.images[style].robot_x_offset;
    RUR.__robot_y_offset = RUR.vis_robot.images[style].robot_y_offset;
};

if (localStorage.getItem("top_view") === "true") {  // TODO fix this
    RUR.vis_robot.select_style(1);
} else {
    RUR.vis_robot.select_style(0);
}

// the following si to ensure that we won't attempt drawing until the default image is available
RUR.__robot_e_img.onload = function () {
    RUR.vis_world.draw_all();
};

RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y;
    if (!robot) {
        return;
    }
    if (robot.__id && robot.__id === -1){
        return;
    }
    
    x = robot.x * RUR.__wall_length + RUR.__robot_x_offset;
    y = RUR.__height - (robot.y +1) * RUR.__wall_length + RUR.__robot_y_offset;
    switch(robot.orientation){
    case RUR.EAST:
        RUR.__robot_ctx.drawImage(RUR.__robot_e_img, x, y);
        break;
    case RUR.NORTH:
        RUR.__robot_ctx.drawImage(RUR.__robot_n_img, x, y);
        break;
    case RUR.WEST:
        RUR.__robot_ctx.drawImage(RUR.__robot_w_img, x, y);
        break;
    case RUR.SOUTH:
        RUR.__robot_ctx.drawImage(RUR.__robot_s_img, x, y);
        break;
    default:
        RUR.__robot_ctx.drawImage(RUR.__robot_e_img, x, y);
    }
//        this.draw_trace(robot);
};


