/* Author: André Roberge
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
