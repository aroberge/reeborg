/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, DEBUG */

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
    var keys, key, i, j, k, ctx = RUR.__wall_ctx;
    
    ctx.clearRect(0, 0, RUR.__width, RUR.__height);
    
    if (RUR.__current_world.blank_canvas || 
        walls === undefined || walls == {}) {
        return;
    }

    ctx.fillStyle = RUR.__wall_color;
    keys = Object.keys(walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( walls[keys[key]].indexOf("north") !== -1) {
            RUR.__visible_world.draw_north_wall(ctx, i, j);
        }
        if (walls[keys[key]].indexOf("east") !== -1) {
            RUR.__visible_world.draw_east_wall(ctx, i, j);
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
};

RUR.__visible_world.draw_tokens = function(tokens, goal) {
    "use strict";
    var i, j, k, t, toks;
    if (!tokens) {
        return;
    }
    toks = Object.keys(tokens);
    for (t=0; t < toks.length; t++){
        k = toks[t].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        RUR.__visible_world.draw_token(i, j, tokens[toks[t]], goal);
    }
};

RUR.__visible_world.draw_token = function (i, j, num, goal) {
    "use strict";
    var size = 12, scale = RUR.__wall_length, Y = RUR.__height;
    var ctx;
    if (goal) {
        ctx = RUR.__background_ctx;
    } else {
        ctx = RUR.__wall_ctx;
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
};

RUR.__visible_world.draw_goal = function () {
    "use strict";
    var goal, key, keys, i, j, k, ctx = RUR.__background_ctx;
    if (RUR.__current_world.goal === undefined) {
        return;
    }

    goal = RUR.__current_world.goal;
    if (goal.position !== undefined) {
        RUR.__visible_world.draw_coloured_tile(goal.position.x, goal.position.y, goal.orientation);
    }
    if (goal.shapes !== undefined){
        RUR.__visible_world.draw_shapes(goal.shapes, true);
    }
    if (goal.tokens !== undefined) {
        RUR.__visible_world.draw_tokens(goal.tokens, true);
    }
    if (goal.walls !== undefined){
//        RUR.__visible_world.draw_foreground_walls(ctx, goal.walls, goal);
        ctx.fillStyle = RUR.__wall_color;
        keys = Object.keys(goal.walls);
        for (key=0; key < keys.length; key++){
            k = keys[key].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            if ( goal.walls[keys[key]].indexOf("north") !== -1) {
                RUR.__visible_world.draw_north_wall(ctx, i, j, true);
            }
            if (goal.walls[keys[key]].indexOf("east") !== -1) {
                RUR.__visible_world.draw_east_wall(ctx, i, j, true);
            }
        }
    }
};


RUR.__visible_world.draw_coloured_tile = function (i, j, orientation) {
    var size = RUR.__wall_thickness, ctx = RUR.__background_ctx;
    ctx.fillStyle = "#99ffcc";
    ctx.fillRect(i*RUR.__wall_length + size, RUR.__height - (j+1)*RUR.__wall_length + size,
                      RUR.__wall_length - size, RUR.__wall_length - size);
    if (orientation === undefined) return;

    ctx.fillStyle = "black";
    switch(orientation){
    case 0:
        ctx.fillRect((i+1)*RUR.__wall_length - size, RUR.__height - (j+0.5)*RUR.__wall_length,
                      size, size);
        break;
    case 1:
        ctx.fillRect((i+0.5)*RUR.__wall_length, RUR.__height - (j+1)*RUR.__wall_length + size,
                      size, size);
        break;
    case 2:
        ctx.fillRect((i)*RUR.__wall_length + size, RUR.__height - (j+0.5)*RUR.__wall_length,
                      size, size);
        break;
    case 3:
        ctx.fillRect((i+0.5)*RUR.__wall_length , RUR.__height - (j)*RUR.__wall_length - size,
                      size, size);
        break;
    }
};

RUR.__visible_world.draw_shapes = function(shapes, goal) {
    "use strict";
    var i, j, k, t, sh;
    if (shapes === undefined) {
        return;
    }
    sh = Object.keys(shapes);
    for (t=0; t < sh.length; t++){
        k = sh[t].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        RUR.__visible_world.draw_shape(i, j, shapes[sh[t]], goal);
    }
};

RUR.__visible_world.draw_shape = function (i, j, shape, goal) {
    "use strict";
    var ctx, size = 12, scale = RUR.__wall_length, Y = RUR.__height;
    if(goal !== undefined){
        ctx = RUR.__background_ctx;
        ctx.lineWidth = 3;
    } else {
        ctx = RUR.__wall_ctx;
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
        RUR.__visible_world.draw_star(ctx, (i+0.6)*scale, Y-(j+0.4)*scale, 1.5*size, goal);
    }
};

RUR.__visible_world.draw_star = function (ctx, x, y, r, goal){
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
};

RUR.__visible_world.draw_all = function () {
    "use strict";
    RUR.__visible_world.draw_background();
    RUR.__visible_world.draw_goal();
    RUR.__visible_world.refresh();
};

RUR.__visible_world.refresh = function (world) {
    "use strict";
    RUR.__visible_world.draw_foreground_walls(RUR.__current_world.walls);
    RUR.__visible_world.draw_robots(RUR.__current_world.robots);
    RUR.__visible_world.draw_tokens(RUR.__current_world.tokens);
    RUR.__visible_world.draw_shapes(RUR.__current_world.shapes);
};