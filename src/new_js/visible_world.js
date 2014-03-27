/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.__visible_world = {};

RUR.__visible_world.draw_coordinates = function(ctx) {
    "use strict";
    var x, y;
    if (RUR.__current_world.blank_canvas) {
        return;
    }
    
    ctx.fillStyle = RUR.__coordinates_color;
    y = RUR.__height - RUR.__wall_length/2;
    for(x=1; x <= RUR.__cols; x++){
        ctx.fillText(x, (x+0.5)*RUR.__wall_length, y);
    }
    x = RUR.__wall_length/2;
    for(y=1; y <= RUR.__rows; y++){
        ctx.fillText(y, x, RUR.__height - (y+0.3)*RUR.__wall_length);
    }

    ctx.fillStyle = RUR.__axis_label_color;
    ctx.fillText("x", RUR.__width/2, RUR.__height - 10);
    ctx.fillText("y", 5, RUR.__height/2 );
};


RUR.__visible_world.draw_background = function () {
    "use strict";
    var i, j, ctx = RUR.__background_ctx;

    ctx.clearRect(0, 0, RUR.__width, RUR.__height);
    if (RUR.__current_world.blank_canvas) {
        return;
    }

    // grid walls - need to be drawn first
    ctx.fillStyle = RUR.__shadow_wall_color;
    for (i = 1; i <= RUR.__cols; i++) {
        for (j = 1; j <= RUR.__rows; j++) {
            RUR.__visible_world.draw_north_wall(ctx, i, j);
            RUR.__visible_world.draw_east_wall(ctx, i, j);
        }
    }

    // border walls (x and y axis)
    ctx.fillStyle = RUR.__wall_color;
    for (j = 1; j <= RUR.__rows; j++) {
        RUR.__visible_world.draw_east_wall(ctx, 0, j);
    }
    for (i = 1; i <= RUR.__cols; i++) {
        RUR.__visible_world.draw_north_wall(ctx, i, 0);
    }
    RUR.__visible_world.draw_coordinates(ctx);
    
};

RUR.__visible_world.draw_foreground_walls = function (walls) {
    "use strict";
    var key, i, j, ctx = RUR.__wall_ctx;
    ctx.clearRect(0, 0, RUR.__width, RUR.__height);
    if (RUR.__current_world.blank_canvas) {
        return;
    }
    ctx.fillStyle = RUR.__wall_color;
    // TODO : make more efficient by not looping over all possible combinations
    // but identifying which walls need to be drawn the same way we do for tokens.
    for (i = 1; i <= RUR.__cols; i++) {
        for (j = 1; j <= RUR.__rows; j++) {
            key = i + "," + j;
            if ( key in walls ) {
                if ( walls[key].indexOf("north") !== -1) {
                    RUR.__visible_world.draw_north_wall(ctx, i, j);
                }
                if (walls[key].indexOf("east") !== -1) {
                    RUR.__visible_world.draw_east_wall(ctx, i, j);
                }
            }
        }
    }
};


RUR.__visible_world.draw_north_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.__goal_wall_color;
        ctx.beginPath();
        ctx.rect(i*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length,
                      RUR.__wall_length + RUR.__wall_thickness, RUR.__wall_thickness);
        ctx.stroke();
        return;
    }
    ctx.fillRect(i*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length,
                      RUR.__wall_length + RUR.__wall_thickness, RUR.__wall_thickness);
};

RUR.__visible_world.draw_east_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.__goal_wall_color;
        ctx.beginPath();
        ctx.rect((i+1)*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length,
                      RUR.__wall_thickness, RUR.__wall_length + RUR.__wall_thickness);
        ctx.stroke();
        return;
    }
    ctx.fillRect((i+1)*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length,
                      RUR.__wall_thickness, RUR.__wall_length + RUR.__wall_thickness);
};

RUR.__visible_world.draw_robots = function (robots) {
    var robot, info = '';
    RUR.__robot_ctx.clearRect(0, 0, RUR.__width, RUR.__height);
    if (RUR.__current_world.blank_canvas) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        RUR.__visible_robot.draw(robots[robot]); // draws trace automatically
        if (DEBUG.ON) {
            info += RUR.translation.robot + robot + ": x=" + robots[robot].x +
                    ", y=" + robots[robot].y + RUR.translation[", tokens="] + robots[robot].tokens + ".  ";
        }
    }
    if (DEBUG.ON) {
        RUR.__robot_ctx.font = "bold 12px sans-serif";
        RUR.__robot_ctx.fillStyle = "blue";
        RUR.__robot_ctx.fillText(info, 5, 15);
    }
}

RUR.__visible_world.draw_all = function (world) {
    "use strict";
    RUR.__visible_world.draw_background();
    RUR.__visible_world.draw_foreground_walls(world.walls);
    RUR.__visible_world.draw_robots(world.robots);
};