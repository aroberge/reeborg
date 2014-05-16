/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR*/

RUR.vis_world = {};

RUR.vis_world.draw_coordinates = function(ctx) {
    "use strict";
    var x, y;
    if (RUR.current_world.blank_canvas) {
        return;
    }
    
    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - RUR.WALL_LENGTH/2;
    for(x=1; x <= RUR.COLS; x++){
        ctx.fillText(x, (x+0.5)*RUR.WALL_LENGTH, y);
    }
    x = RUR.WALL_LENGTH/2 -5;
    for(y=1; y <= RUR.ROWS; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*RUR.WALL_LENGTH);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
};


RUR.vis_world.draw_background = function () {
    "use strict";
    var i, j, ctx = RUR.BACKGROUND_CTX;

    ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.current_world.blank_canvas) {
        return;
    }

    // grid walls - need to be drawn first
    ctx.fillStyle = RUR.SHADOW_WALL_COLOR;
    for (i = 1; i <= RUR.COLS; i++) {
        for (j = 1; j <= RUR.ROWS; j++) {
            RUR.vis_world.draw_north_wall(ctx, i, j);
            RUR.vis_world.draw_east_wall(ctx, i, j);
        }
    }

    // border walls (x and y axis)
    ctx.fillStyle = RUR.WALL_COLOR;
    for (j = 1; j <= RUR.ROWS; j++) {
        RUR.vis_world.draw_east_wall(ctx, 0, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        RUR.vis_world.draw_north_wall(ctx, i, 0);
    }
    RUR.vis_world.draw_coordinates(ctx);
    
};

RUR.vis_world.draw_foreground_walls = function (walls) {
    "use strict";
    var keys, key, i, j, k, ctx = RUR.WALL_CTX;
    
    ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    
    if (RUR.current_world.blank_canvas || 
        walls === undefined || walls == {}) {
        return;
    }

    ctx.fillStyle = RUR.WALL_COLOR;
    keys = Object.keys(walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( walls[keys[key]].indexOf("north") !== -1) {
            RUR.vis_world.draw_north_wall(ctx, i, j);
        }
        if (walls[keys[key]].indexOf("east") !== -1) {
            RUR.vis_world.draw_east_wall(ctx, i, j);
        }
    }
};

RUR.vis_world.draw_north_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect(i*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_LENGTH + RUR.WALL_THICKNESS, RUR.WALL_THICKNESS);
        ctx.stroke();
        return;
    }
    ctx.fillRect(i*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_LENGTH + RUR.WALL_THICKNESS, RUR.WALL_THICKNESS);
};

RUR.vis_world.draw_east_wall = function(ctx, i, j, goal) {
    "use strict";
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect((i+1)*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_THICKNESS, RUR.WALL_LENGTH + RUR.WALL_THICKNESS);
        ctx.stroke();
        return;
    }
    ctx.fillRect((i+1)*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH,
                      RUR.WALL_THICKNESS, RUR.WALL_LENGTH + RUR.WALL_THICKNESS);
};

RUR.vis_world.draw_robots = function (robots) {
    var robot, info = '';
    RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.current_world.blank_canvas) {
        return;
    }
    if (!robots) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        info += RUR.translation.robot + "_" + robot + ": x=" + robots[robot].x +
                ", y=" + robots[robot].y + RUR.translation[", tokens="] + robots[robot].tokens + ".  ";
    }
    RUR.ROBOT_CTX.fillStyle = RUR.DEBUG_INFO_COLOR;
    RUR.ROBOT_CTX.fillText(info, 5, 10);
};

RUR.vis_world.draw_tokens = function(tokens, goal) {
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
        RUR.vis_world.draw_token(i, j, tokens[toks[t]], goal);
    }
};

RUR.vis_world.draw_token = function (i, j, num, goal) {
    "use strict";
    var size = 12*RUR.SCALE, scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT;
    var ctx;
    if (goal) {
        ctx = RUR.BACKGROUND_CTX;
    } else {
        ctx = RUR.WALL_CTX;
    }
    ctx.beginPath();
    ctx.arc((i+0.6)*scale, Y - (j+0.4)*scale, size, 0 , 2 * Math.PI, false);
    if (goal) {
        ctx.strokeStyle = RUR.TOKEN_GOAL_COLOR;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = RUR.TEXT_COLOR;
        ctx.fillText(num, (i+0.2)*scale, Y - (j)*scale);
    } else {
        ctx.lineWidth = 1;
        ctx.fillStyle = RUR.TOKEN_COLOR;
        ctx.fill();
        ctx.fillStyle = RUR.TEXT_COLOR;
        ctx.fillText(num, (i+0.5)*scale, Y - (j+0.3)*scale);
    }
};

RUR.vis_world.draw_goal = function () {
    "use strict";
    var goal, key, keys, i, j, k, ctx = RUR.BACKGROUND_CTX;
    if (RUR.current_world.goal === undefined) {
        return;
    }

    goal = RUR.current_world.goal;
    if (goal.position !== undefined) {
        RUR.vis_world.draw_coloured_tile(goal.position.x, goal.position.y, goal.orientation);
    }
    if (goal.shapes !== undefined){
        RUR.vis_world.draw_shapes(goal.shapes, true);
    }
    if (goal.tokens !== undefined) {
        RUR.vis_world.draw_tokens(goal.tokens, true);
    }
    if (goal.walls !== undefined){
        ctx.fillStyle = RUR.WALL_COLOR;
        keys = Object.keys(goal.walls);
        for (key=0; key < keys.length; key++){
            k = keys[key].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            if ( goal.walls[keys[key]].indexOf("north") !== -1) {
                RUR.vis_world.draw_north_wall(ctx, i, j, true);
            }
            if (goal.walls[keys[key]].indexOf("east") !== -1) {
                RUR.vis_world.draw_east_wall(ctx, i, j, true);
            }
        }
    }
};


RUR.vis_world.draw_coloured_tile = function (i, j, orientation) {
    var size = RUR.WALL_THICKNESS, ctx = RUR.BACKGROUND_CTX;
    ctx.fillStyle = RUR.TARGET_TILE_COLOR;
    ctx.fillRect(i*RUR.WALL_LENGTH + size, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + size,
                      RUR.WALL_LENGTH - size, RUR.WALL_LENGTH - size);
    if (orientation === undefined) return;

    ctx.fillStyle = RUR.ORIENTATION_TILE_COLOR;
    switch(orientation){
    case 0:
        ctx.fillRect((i+1)*RUR.WALL_LENGTH - size, RUR.HEIGHT - (j+0.5)*RUR.WALL_LENGTH,
                      size, size);
        break;
    case 1:
        ctx.fillRect((i+0.5)*RUR.WALL_LENGTH, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + size,
                      size, size);
        break;
    case 2:
        ctx.fillRect((i)*RUR.WALL_LENGTH + size, RUR.HEIGHT - (j+0.5)*RUR.WALL_LENGTH,
                      size, size);
        break;
    case 3:
        ctx.fillRect((i+0.5)*RUR.WALL_LENGTH , RUR.HEIGHT - (j)*RUR.WALL_LENGTH - size,
                      size, size);
        break;
    }
};

RUR.vis_world.draw_shapes = function(shapes, goal) {
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
        RUR.vis_world.draw_shape(i, j, shapes[sh[t]], goal);
    }
};

RUR.vis_world.draw_shape = function (i, j, shape, goal) {
    "use strict";
    var ctx, size = 12*RUR.SCALE, scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT;
    if(goal !== undefined){
        ctx = RUR.BACKGROUND_CTX;
        ctx.lineWidth = 3;
    } else {
        ctx = RUR.WALL_CTX;
    }
    ctx.strokeStyle = RUR.SHAPE_OUTLINE_COLOR;
    if (shape === "square") {
        ctx.fillStyle = RUR.SQUARE_COLOR;
        if(goal !== undefined){
            ctx.beginPath();
            ctx.rect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
            ctx.stroke();
        } else {
            ctx.fillRect((i+0.6)*scale - size, Y - (j+0.4)*scale - size, 2*size, 2*size);
        }
    } else if (shape === "triangle") { // triangle
        ctx.fillStyle = RUR.TRIANGLE_COLOR;
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
        ctx.fillStyle = RUR.STAR_COLOR;
        RUR.vis_world.draw_star(ctx, (i+0.6)*scale, Y-(j+0.4)*scale, 1.5*size, goal);
    }
};

RUR.vis_world.draw_star = function (ctx, x, y, r, goal){
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

RUR.vis_world.draw_all = function () {
    "use strict";
    if (RUR.LARGE_WORLD) {
        RUR.WALL_LENGTH = 20;
        RUR.WALL_THICKNESS = 3;
        RUR.SCALE = 0.5;
        RUR.vis_robot.x_offset = 4;
        RUR.vis_robot.y_offset = 4;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = 40;
        RUR.WALL_THICKNESS = 5;
        RUR.SCALE = 1;
        RUR.vis_robot.x_offset = 10;
        RUR.vis_robot.y_offset = 8;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }
    RUR.ROWS = Math.floor(RUR.HEIGHT / RUR.WALL_LENGTH) - 1;
    RUR.COLS = Math.floor(RUR.WIDTH / RUR.WALL_LENGTH) - 2;
    
    RUR.vis_world.draw_background();
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.draw_goal();
    RUR.vis_world.refresh();
};

RUR.vis_world.refresh = function (world) {
    "use strict";
    RUR.vis_world.draw_foreground_walls(RUR.current_world.walls);
    RUR.vis_world.draw_robots(RUR.current_world.robots);
    RUR.vis_world.draw_tokens(RUR.current_world.tokens);
    RUR.vis_world.draw_shapes(RUR.current_world.shapes);
};