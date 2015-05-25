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

    // border walls (x and y axis) -- keep in this drawing routine!
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
    var keys, key, i, j, k, ctx = RUR.OBJECTS_CTX;

    ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    if (RUR.current_world.blank_canvas ||
        walls === undefined || walls == {}) {
        return;
    }
    ctx.fillStyle = RUR.WALL_COLOR;
    // other walls
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
    for (robot=0; robot < robots.length; robot++){
        RUR.vis_robot.draw(robots[robot]); // draws trace automatically
    }
};


RUR.vis_world.draw_goal = function () {
    "use strict";
    var goal, key, keys, i, j, k, ctx = RUR.GOAL_CTX;
    ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.current_world.goal === undefined) {
        return;
    }
    goal = RUR.current_world.goal;
    if (goal.position !== undefined) {
        RUR.vis_world.draw_home_tile(goal.position.x, goal.position.y, goal.orientation);
    }
    if (goal.objects !== undefined){
        RUR.vis_world.draw_all_objects(goal.objects, true);
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

RUR.vis_world.draw_home_tile = function (i, j, orientation) {
    var size = RUR.WALL_THICKNESS, ctx = RUR.GOAL_CTX;
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

RUR.vis_world.draw_all = function () {
    "use strict";
    if (RUR.LARGE_WORLD) {
        RUR.WALL_LENGTH = 20;
        RUR.WALL_THICKNESS = 3;
        RUR.SCALE = 0.5;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = 40;
        RUR.WALL_THICKNESS = 5;
        RUR.SCALE = 1;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }
    RUR.vis_robot.set_offsets()
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

RUR.vis_world.draw_tiles = function (tiles){
    "use strict";
    var i, j, k, keys, key, image;
    if (tiles === undefined) {
        return;
    }
    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        image = RUR.tiles[tiles[keys[key]]].image;
        RUR.vis_world.draw_single_tile(image, i, j);
    }
};

RUR.vis_world.draw_single_tile = function (image, i, j) {
    var thick = RUR.WALL_THICKNESS, ctx = RUR.BACKGROUND_CTX;
    var x, y;
    x = i*RUR.WALL_LENGTH + thick/2;
    y = RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + thick/2;
    ctx.drawImage(image, x, y, image.width*RUR.SCALE, image.height*RUR.SCALE);
};


RUR.vis_world.draw_all_objects = function (objects, goal){
    "use strict";
    var i, j, image, ctx, coords, specific_object, objects_here, obj_name, grid_pos;
    if (objects === undefined) {
        return;
    }

    if (goal) {
        ctx = RUR.GOAL_CTX;
    } else {
        ctx = RUR.OBJECTS_CTX;
    }

    for (coords in objects){
        if (objects.hasOwnProperty(coords)){
            objects_here = objects[coords];
            grid_pos = coords.split(",");
            i = parseInt(grid_pos[0], 10);
            j = parseInt(grid_pos[1], 10);
            for (obj_name in objects_here){
                if (objects_here.hasOwnProperty(obj_name)){
                    specific_object = RUR.objects[obj_name];
                    if (goal) {
                        image = specific_object.image_goal;
                    } else {
                        image = specific_object.image;
                    }
                    RUR.vis_world.draw_single_object(image, i, j, ctx);
                }
            }
        }
    }
};

RUR.vis_world.draw_single_object = function (image, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS;
    var x, y;
    x = i*RUR.WALL_LENGTH + thick/2;
    y = RUR.HEIGHT - (j+1)*RUR.WALL_LENGTH + thick/2;
    ctx.drawImage(image, x, y, image.width*RUR.SCALE, image.height*RUR.SCALE);
};


RUR.vis_world.refresh = function (initial) {
    "use strict";
    var i, t, toks, min_, max_, goal, robot, clone, clones=[], color1_temp, color2_temp, position;

// TODO simplify this entire code
// move selecting initial value to runner - when program is first compiled
// add something like draw_changing  to redraw only the canvas that might be changing

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
            // note that some goal objects might have been placed on the possible positions,
            // hence we must make sure to draw all the goals.
            RUR.TARGET_TILE_COLOR = color1_temp;
            RUR.ORIENTATION_TILE_COLOR = color2_temp;
            goal.position = position;
            RUR.vis_world.draw_goal();
        }
    }

    RUR.vis_world.draw_foreground_walls(RUR.current_world.walls);
    RUR.vis_world.draw_tiles(RUR.current_world.tiles);
    RUR.vis_world.draw_all_objects(RUR.current_world.objects);
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
};

RUR.vis_world.select_initial_values = function() {
    // select initial values if required i.e. when some are specified as
    // being chosen randomly
    "use strict";
    var k, keys, min_, max_, robot, position, goal;


    robot = RUR.current_world.robots[0];
    if (robot === undefined){
        RUR.rec.record_frame();
        return;
    }
    if (robot.orientation == -1){
        RUR.current_world.robots[0].orientation = RUR.randint(0, 3);
        RUR.current_world.robots[0]._prev_orientation = RUR.current_world.robots[0].orientation;
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