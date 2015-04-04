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
    if (!robots || robots[0] === undefined) {
        return;
    }

    // take care of case where number of tokens carried by robot could be random
    // this will be before the programm is run

    if (typeof robots[0].tokens === "string" && robots[0].tokens.indexOf("-") != -1){
        for (robot=0; robot < robots.length; robot++){
            RUR.vis_robot.draw(robots[robot]); // draws trace automatically
            info = RUR.translate("robot")+ "_" + robot + ": x=" + robots[0].x +
                    ", y=" + robots[0].y + RUR.translate(", tokens=");
            RUR.ROBOT_CTX.fillStyle = RUR.ROBOT_INFO_COLOR;
            RUR.ROBOT_CTX.fillText(info, 5, 10);
            RUR.ROBOT_CTX.fillStyle = "red";
            RUR.ROBOT_CTX.fillText(robots[0].tokens, 5 + RUR.ROBOT_CTX.measureText(info).width, 10);
        }
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        info += RUR.translate("robot")+ "_" + robot + ": x=" + robots[robot].x +
                ", y=" + robots[robot].y + RUR.translate(", tokens=") + robots[robot].tokens + ".  ";
    }
    RUR.ROBOT_CTX.fillStyle = RUR.ROBOT_INFO_COLOR;
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
    var size = 12*RUR.SCALE, scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;
    var ctx;
    if (goal) {
        ctx = RUR.BACKGROUND_CTX;
    } else {
        ctx = RUR.WALL_CTX;
    }
    ctx.beginPath();

    text_width = ctx.measureText(num).width/2;
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
        ctx.fillText(num, (i+0.6)*scale - text_width, Y - (j+0.3)*scale);
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
        RUR.vis_world.draw_home_tile(goal.position.x, goal.position.y, goal.orientation);
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

RUR.vis_world.draw_mud = function (i, j) {
    var size = RUR.WALL_THICKNESS, ctx = RUR.BACKGROUND_CTX;
    ctx.fillStyle = RUR.MUD_COLOR;
    ctx.fillRect(i*RUR.WALL_LENGTH + size, RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + size,
                      RUR.WALL_LENGTH - size, RUR.WALL_LENGTH - size);
};

RUR.vis_world.draw_home_tile = function (i, j, orientation) {
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
    RUR.vis_world.refresh("initial");
};

RUR.vis_world.clear_trace = function(){
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
};

RUR.vis_world.draw_other = function (other){
    "use strict";
    var obj, mud, i, j, k, t;
    if (other === undefined) {
        return;
    }
    if (other.mud !== undefined){
        mud = other.mud;
        for (t=0; t < mud.length; t++){
            k = mud[t].split(",");
            i = parseInt(k[0], 10);
            j = parseInt(k[1], 10);
            RUR.vis_world.draw_mud(i, j);
        }
    }
};

RUR.vis_world.refresh = function (initial) {
    "use strict";
    var i, t, toks, min_, max_, goal, robot, clone, clones=[], color1_temp, color2_temp, position;
    if (initial !== undefined && RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.possible_positions !== undefined) {
        goal = RUR.current_world.goal;
        for (i=0; i < goal.possible_positions.length; i++){
            goal.position.x = goal.possible_positions[i][0];
            goal.position.y = goal.possible_positions[i][1];
            RUR.vis_world.draw_goal();
            //RUR.vis_world.draw_home_tile(goal.position.x, goal.position.y, goal.orientation);
        }
    } else {
        if ( RUR.current_world.goal !== undefined && RUR.current_world.goal.possible_positions !== undefined &&
            RUR.current_world.goal.possible_positions.length > 1) {
            // erase all possible tiles for goal position by drawing them all white
            // if needed this could be made more efficient by setting up a flag and not redoing while
            // the program is running i.e. after the first frame ...
            color1_temp = RUR.TARGET_TILE_COLOR;
            color2_temp = RUR.ORIENTATION_TILE_COLOR;
            RUR.TARGET_TILE_COLOR = "white";
            RUR.ORIENTATION_TILE_COLOR = "white";
            goal = RUR.current_world.goal;
            position = {'x': goal.position.x, 'y': goal.position.y};
            for (i=0; i < goal.possible_positions.length; i++){
                goal.position.x = goal.possible_positions[i][0];
                goal.position.y = goal.possible_positions[i][1];
                RUR.vis_world.draw_home_tile(goal.position.x, goal.position.y, goal.orientation);
            }
            // restore colour and position, and then redraw all.
            // note that some goal shapes might have been placed on the possible positions,
            // hence we must make sure to draw all the goals.
            RUR.TARGET_TILE_COLOR = color1_temp;
            RUR.ORIENTATION_TILE_COLOR = color2_temp;
            goal.position = position;
            RUR.vis_world.draw_goal();
        }
    }

    RUR.vis_world.draw_foreground_walls(RUR.current_world.walls);
    RUR.vis_world.draw_other(RUR.current_world.other);
    if (initial !== undefined && RUR.current_world.robots !== undefined &&
            RUR.current_world.robots[0] !== undefined &&
            RUR.current_world.robots[0].start_positions !== undefined &&
            RUR.current_world.robots[0].start_positions.length > 1) {
            robot = RUR.current_world.robots[0];
        for (i=0; i < robot.start_positions.length; i++){
            clone = JSON.parse(JSON.stringify(robot));
            clone.x = robot.start_positions[i][0];
            clone.y = robot.start_positions[i][1];
            clone._prev_x = clone.x;
            clone._prev_y = clone.y;
            clones.push(clone);
        }
        RUR.ROBOT_CTX.save();
        RUR.ROBOT_CTX.globalAlpha = 0.4;
        RUR.vis_world.draw_robots(clones);
        RUR.ROBOT_CTX.restore();
    } else {
        RUR.vis_world.draw_robots(RUR.current_world.robots);
    }

    RUR.vis_world.draw_tokens(RUR.current_world.tokens);
    if (initial !== undefined){
        if (RUR.current_world.tokens_range !== undefined) {
            RUR.vis_world.draw_tokens(RUR.current_world.tokens_range);
        }
    }
    RUR.vis_world.draw_shapes(RUR.current_world.shapes);
};

RUR.vis_world.select_initial_values = function() {
    // select initial values if required i.e. when some are specified as
    // being chosen randomly
    "use strict";
    var k, keys, min_, max_, robot, position, goal;
    if (RUR.current_world.tokens_range !== undefined) {
        RUR.vis_world.draw_tokens(RUR.current_world.tokens_range);
        keys = Object.keys(RUR.current_world.tokens_range);
        for (k=0; k < keys.length; k++){
            min_ = RUR.current_world.min_tokens[keys[k]];
            max_ = RUR.current_world.max_tokens[keys[k]];
            RUR.current_world.tokens[keys[k]] = RUR.randint(min_, max_);
            if (RUR.current_world.tokens[keys[k]] === 0) {
                delete RUR.current_world.tokens[keys[k]];
            }
        }
    }

    if (RUR.current_world.goal !== undefined){
        goal = RUR.current_world.goal;
        if (goal.possible_positions !== undefined && goal.possible_positions.length > 1) {
            position = goal.possible_positions[RUR.randint(0, goal.possible_positions.length-1)];
            goal.position.x = position[0];
            goal.position.y = position[1];
        }
    }

    robot = RUR.current_world.robots[0];
    if (robot === undefined){
        RUR.rec.record_frame();
        return;
    }
    if (robot.orientation == -1){
        RUR.current_world.robots[0].orientation = RUR.randint(0, 3);
        RUR.current_world.robots[0]._prev_orientation = RUR.current_world.robots[0].orientation;
    }
    if (robot.tokens_range !== undefined){
        RUR.current_world.robots[0].tokens = RUR.randint(robot.min_tokens, robot.max_tokens);
    }
    if (robot.start_positions !== undefined && robot.start_positions.length > 1) {
        position = robot.start_positions[RUR.randint(0, robot.start_positions.length-1)];
        RUR.current_world.robots[0].x = position[0];
        RUR.current_world.robots[0].y = position[1];
        RUR.current_world.robots[0]._prev_x = RUR.current_world.robots[0].x;
        RUR.current_world.robots[0]._prev_y = RUR.current_world.robots[0].y;
    }
    RUR.rec.record_frame();
};