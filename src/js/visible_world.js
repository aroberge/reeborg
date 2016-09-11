require("./translator.js");
require("./constants.js");
require("./state.js");
require("./extend/add_object_type.js");
require("./extend/add_tile_type.js");
require("./world/create_empty.js");

//TODO add overlay object (like sensor) on robot canvas.

RUR.vis_world = {};

RUR.vis_world.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.world_get.world_info();
};

RUR.vis_world.compute_world_geometry = function (cols, rows) {
    "use strict";
    var height, width, canvas;
    if (RUR.CURRENT_WORLD.small_tiles) {
        RUR.WALL_LENGTH = 20;
        RUR.WALL_THICKNESS = 2;
        RUR.SCALE = 0.5;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = 40;
        RUR.WALL_THICKNESS = 4;
        RUR.SCALE = 1;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }

    if (cols !== undefined && rows !== undefined) {
        height = (rows + 1.5) * RUR.WALL_LENGTH;
        width = (cols + 1.5) * RUR.WALL_LENGTH;
        RUR.ROWS = rows;
        RUR.COLS = cols;
    } else {
        height = (RUR.ROWS + 1.5) * RUR.WALL_LENGTH;
        width = (RUR.COLS + 1.5) * RUR.WALL_LENGTH;
    }
    RUR.CURRENT_WORLD.rows = RUR.ROWS;
    RUR.CURRENT_WORLD.cols = RUR.COLS;

    if (height !== RUR.HEIGHT || width !== RUR.WIDTH) {
        for (canvas of RUR.CANVASES) { //jshint ignore:line
            canvas.width = width;
            canvas.height = height;
        }
        RUR.HEIGHT = height;
        RUR.WIDTH = width;
    }

    RUR.vis_world.draw_all();
};

RUR.vis_world.draw_all = function () {
    "use strict";

    if (RUR.CURRENT_WORLD.blank_canvas) {
        if (RUR.state.editing_world) {
            RUR.show_feedback("#Reeborg-shouts",
                                RUR.translate("Editing of blank canvas is not supported."));
            return;
         }
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = undefined;
        RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TILES_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.OBSTACLES_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

        RUR.OBJECTS_ANIM_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.TILES_ANIM_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

        return;
    }

    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    draw_grid_walls(RUR.BACKGROUND_CTX);
    if (RUR.CURRENT_WORLD.background_image !== undefined) {
        draw_single_object(RUR.BACKGROUND_IMAGE, 1, RUR.ROWS, RUR.BACKGROUND_CTX);
    }
    draw_coordinates(); // on BACKGROUND_CTX
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.animated_images = false;
    RUR.vis_world.refresh();
};


RUR.vis_world.refresh = function () {
    "use strict";
    var current = RUR.CURRENT_WORLD;
    // meant to be called at each step
    // does not draw background (i.e. coordinates, grid walls and possibly image)
    // does not clear trace

    // start by clearing all the relevant contexts first.
    // some objects are drown on their own contexts.
    RUR.OBSTACLES_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.OBJECTS_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.ROBOT_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.TILES_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    if (RUR.state.editing_world) {
        // make them appear above background and tiles but below foreground walls.
        draw_grid_walls(RUR.GOAL_CTX);
    }

    // animated images are redrawn according to their own schedule
    if (!RUR.animated_images) {
        draw_animated_images();
    }

    draw_goal();  // on GOAL_CTX
    draw_tiles(current.tiles); // on TILES_CTX
    draw_foreground_walls(current.walls); // on OBJECTS_CTX
    draw_all_objects(current.decorative_objects);
    draw_all_objects(current.objects);  // on OBJECTS_CTX
        // draw_all_objects also called by draw_goal, and draws on GOAL_CTX
        // and, draws some objects on ROBOT_CTX

    // objects: goal is false, tile is true
    draw_all_objects(current.obstacles, false, true); // likely on RUR.OBSTACLES_CTX

    draw_robots(current.robots);  // on ROBOT_CTX
    compile_info();  // on ROBOT_CTX
    draw_info();     // on ROBOT_CTX
};

draw_coordinates = function() {
    "use strict";
    var x, y, ctx = RUR.BACKGROUND_CTX, size=RUR.WALL_LENGTH;

    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - size/2;
    for(x=1; x <= RUR.COLS; x++){
        ctx.fillText(x, (x+0.5)*size, y);
    }
    x = size/2 -5;
    for(y=1; y <= RUR.ROWS; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*size);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
};

draw_grid_walls = function(ctx){
    var i, j;

    ctx.fillStyle = RUR.SHADOW_WALL_COLOR;
    for (i = 1; i <= RUR.COLS; i++) {
        for (j = 1; j <= RUR.ROWS; j++) {
            draw_north_wall(ctx, i, j);
            draw_east_wall(ctx, i, j);
        }
    }
};

draw_foreground_walls = function (walls) {
    "use strict";
    var keys, key, i, j, k, ctx = RUR.OBJECTS_CTX;


    // border walls (x and y axis)
    ctx.fillStyle = RUR.WALL_COLOR;
    for (j = 1; j <= RUR.ROWS; j++) {
        draw_east_wall(ctx, 0, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        draw_north_wall(ctx, i, 0);
    }
    for (j = 1; j <= RUR.ROWS; j++) {
        draw_east_wall(ctx, RUR.COLS, j);
    }
    for (i = 1; i <= RUR.COLS; i++) {
        draw_north_wall(ctx, i, RUR.ROWS);
    }


    if (walls === undefined || walls == {}) {
        return;
    }

    // other walls
    keys = Object.keys(walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( walls[keys[key]].indexOf("north") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            draw_north_wall(ctx, i, j);
        }
        if (walls[keys[key]].indexOf("east") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            draw_east_wall(ctx, i, j);
        }
    }
};

draw_north_wall = function(ctx, i, j, goal) {
    "use strict";
    var length=RUR.WALL_LENGTH, thick=RUR.WALL_THICKNESS;
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect(i*length, RUR.HEIGHT - (j+1)*length, length + thick, thick);
        ctx.stroke();
        return;
    }
    ctx.fillRect(i*length, RUR.HEIGHT - (j+1)*length, length + thick, thick);
};

draw_east_wall = function(ctx, i, j, goal) {
    "use strict";
    var length=RUR.WALL_LENGTH, thick=RUR.WALL_THICKNESS;
    if (goal){
        ctx.strokeStyle = RUR.GOAL_WALL_COLOR;
        ctx.beginPath();
        ctx.rect((i+1)*length, RUR.HEIGHT - (j+1)*length, thick, length + thick);
        ctx.stroke();
        return;
    }
    ctx.fillRect((i+1)*length, RUR.HEIGHT - (j+1)*length, thick, length + thick);
};

draw_robots = function (robots) {
    "use strict";
    var robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        if (robots[robot].start_positions !== undefined && robots[robot].start_positions.length > 1){
            draw_robot_clones(robots[robot]);
        } else {
            RUR.vis_robot.draw(robots[robot]); // draws trace automatically
        }
    }
};

draw_robot_clones = function(robot){
    "use strict";
    var i, clone;
    RUR.ROBOT_CTX.save();
    RUR.ROBOT_CTX.globalAlpha = 0.4;
    for (i=0; i < robot.start_positions.length; i++){
            clone = JSON.parse(JSON.stringify(robot));
            clone.x = robot.start_positions[i][0];
            clone.y = robot.start_positions[i][1];
            clone._prev_x = clone.x;
            clone._prev_y = clone.y;
            RUR.vis_robot.draw(clone);
    }
    RUR.ROBOT_CTX.restore();
};

draw_goal = function () {
    "use strict";
    var goal, ctx = RUR.GOAL_CTX;

    if (RUR.CURRENT_WORLD.goal === undefined) {
        return;
    }

    goal = RUR.CURRENT_WORLD.goal;
    if (goal.position !== undefined) {
        draw_goal_position(goal, ctx);
    }
    if (goal.objects !== undefined){
        draw_all_objects(goal.objects, true);
        console.log("goal.objects", goal.objects);
    }

    if (goal.walls !== undefined){
        draw_goal_walls(goal, ctx);
    }
};

draw_goal_position = function (goal, ctx) {
    "use strict";
    var image, i, g;

    if (goal.position.image !== undefined &&
        typeof goal.position.image === 'string' &&
        RUR.TILES[goal.position.image] !== undefined){
        image = RUR.TILES[goal.position.image].image;
    } else {    // For anyone wondering, this step might be needed only when using older world
                // files that were created when there was not a choice
                // of image for indicating the home position.
        image = RUR.TILES["green_home_tile"].image;
    }
    if (goal.possible_positions !== undefined && goal.possible_positions.length > 1){
            ctx.save();
            ctx.globalAlpha = 0.5;
            for (i=0; i < goal.possible_positions.length; i++){
                    g = goal.possible_positions[i];
                    draw_single_object(image, g[0], g[1], ctx);
            }
            ctx.restore();
    } else {
        draw_single_object(image, goal.position.x, goal.position.y, ctx);
    }
};

draw_goal_walls = function (goal, ctx) {
    "use strict";
    var key, keys, i, j, k;
    ctx.fillStyle = RUR.WALL_COLOR;
    keys = Object.keys(goal.walls);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if ( goal.walls[keys[key]].indexOf("north") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            draw_north_wall(ctx, i, j, true);
        }
        if (goal.walls[keys[key]].indexOf("east") !== -1 &&
            i <= RUR.COLS && j <= RUR.ROWS) {
            draw_east_wall(ctx, i, j, true);
        }
    }
};

draw_tiles = function (tiles){
    "use strict";
    var i, j, k, keys, key, image, tile, colour;
    if (tiles === undefined) {
        return;
    }
    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        k = keys[key].split(",");
        i = parseInt(k[0], 10);
        j = parseInt(k[1], 10);
        if (tiles[keys[key]] !== undefined) {
            tile = RUR.TILES[tiles[keys[key]]];
            if (tile === undefined) {
                colour = tiles[keys[key]];
                draw_coloured_tile(colour, i, j, RUR.TILES_CTX);
                continue;
            }
        }

        if (tile.choose_image === undefined){
            image = tile.image;
            if (image === undefined){
                console.log("problem in draw_tiles; tile =", tile);
                throw new ReeborgError("Problem in draw_tiles.");
            }
            draw_single_object(image, i, j, RUR.TILES_CTX);
        }
    }
};

draw_animated_images = function (){
    "use strict";
    var objects;

    RUR.OBJECTS_ANIM_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.TILES_ANIM_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);

    RUR.animated_images = false;
    objects = RUR.CURRENT_WORLD.tiles;
    RUR.animated_images = __draw_animated_images(objects,
                                RUR.animated_images, RUR.TILES, RUR.TILES_ANIM_CTX);
    objects = RUR.CURRENT_WORLD.objects;
    RUR.animated_images = __draw_animated_images(objects,
                                RUR.animated_images, RUR.OBJECTS, RUR.OBJECTS_ANIM_CTX);
    if (RUR.animated_images) {
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = setTimeout(draw_animated_images,
            RUR.ANIMATION_TIME);
    }
};

function __draw_animated_images (objects, flag, obj_ref, ctx) {
    "use strict";
    var i, j, i_j, coords, k, image, obj, obj_here, elem;
    if (objects === undefined) {
        return flag;
    }
    coords = Object.keys(objects);
    for (k=0; k < coords.length; k++){
        i_j = coords[k].split(",");
        i = parseInt(i_j[0], 10);
        j = parseInt(i_j[1], 10);

        obj_here = objects[coords[k]];
        if (typeof obj_here == "string") {  // e.g. tiles: single object at position
            obj = obj_ref[obj_here];
            if (obj === undefined) {
                continue;
            } else if (obj.choose_image !== undefined){
                _draw_single_animated(obj, coords[k], i, j, ctx);
                flag = true;
            }
        } else if (typeof obj_here == "object") { // e.g. objects: many at position
            for (elem in obj_here) {
                obj = obj_ref[elem];
                if (obj === undefined) {
                    continue;
                } else if (obj.choose_image !== undefined){
                    clear_single_cell(i, j, ctx);
                    _draw_single_animated(obj, coords[k], i, j, ctx);
                    flag = true;
                }
            }
        } else {
            console.log("Unknown type in __draw_animated_images");
        }
    }
    return flag;
}

function _draw_single_animated (obj, coords, i, j, ctx){
    var image;
    image = obj.choose_image(coords);
    if (image === undefined){
        console.log("problem in _draw_single_animated; obj =", obj);
        throw new ReeborgError("Problem in _draw_single_animated at" + coords);
    }
    draw_single_object(image, i, j, ctx);
}

draw_coloured_tile = function (colour, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS, size = RUR.WALL_LENGTH;
    var x, y;
    if (i > RUR.COLS || j > RUR.ROWS){
        return;
    }
    x = i*size + thick/2;
    y = RUR.HEIGHT - (j+1)*size + thick/2;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, size, size);
};

draw_all_objects = function (objects, goal, tile){
    "use strict";
    var i, j, image, ctx, coords, specific_object, objects_here, obj_name, grid_pos;
    if (objects === undefined) {
        return;
    }

    for (coords in objects){
        if (objects.hasOwnProperty(coords)){
            objects_here = objects[coords];
            grid_pos = coords.split(",");
            i = parseInt(grid_pos[0], 10);
            j = parseInt(grid_pos[1], 10);
            if (i <= RUR.COLS && j <= RUR.ROWS) {
                for (obj_name in objects_here){
                    if (objects_here.hasOwnProperty(obj_name)){
                        if (tile){
                            specific_object = RUR.OBSTACLES[obj_name];
                        } else {
                            specific_object = RUR.OBJECTS[obj_name];
                        }
                        if (goal) {
                            ctx = RUR.GOAL_CTX;
                            image = specific_object.goal.image;
                            console.log("goal image,", image);
                        } else if (specific_object === undefined){
                            console.log("specific_object is undefined");
                            console.log("obj_name = ", obj_name, "  tile = ", tile);
                            if (tile) {
                                console.log("RUR.OBSTACLES = ", RUR.OBSTACLES);
                            } else {
                                console.log("RUR.OBJECTS = ", RUR.OBJECTS);
                            }
                            image = undefined;
                        } else if (specific_object.ctx !== undefined){
                            ctx = specific_object.ctx;
                            image = specific_object.image;
                        } else {
                            ctx = RUR.OBJECTS_CTX;
                            image = specific_object.image;
                        }

                        if (goal) {
                            console.log("before draw_single_object, image=", image);
                            draw_single_object(image, i, j, ctx);
                        } else if (specific_object.choose_image === undefined){
                            if (image === undefined){
                                console.log("problem in draw_all_objects; obj =", specific_object);
                            }
                            draw_single_object(image, i, j, ctx);
                        }
                    }
                }
            }
        }
    }
};

draw_single_object = function (image, i, j, ctx) {
    var thick=RUR.WALL_THICKNESS/2, size=RUR.WALL_LENGTH;
    var x, y;
    if (i > RUR.COLS || j > RUR.ROWS){
        return;
    }
    x = i*size + thick;
    y = RUR.HEIGHT - (j+1)*size + thick;
    try{
       ctx.drawImage(image, x, y, size, size);
   } catch (e) {
       console.log("problem in draw_single_object", image, ctx, e);
   }
};

clear_single_cell = function (i, j, ctx) {
    var x, y, thick=RUR.WALL_THICKNESS/2, size=RUR.WALL_LENGTH;
    x = i*size + thick;
    y = RUR.HEIGHT - (j+1)*size + thick;
    ctx.clearRect(x, y, size, size);
};

compile_info = function() {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drown - if anything.
    var coords, obj, quantity;
    RUR.vis_world.information = {};
    RUR.vis_world.goal_information = {};
    RUR.vis_world.goal_present = false;
    if (RUR.CURRENT_WORLD.goal !== undefined &&
        RUR.CURRENT_WORLD.goal.objects !== undefined) {
        compile_partial_info(RUR.CURRENT_WORLD.goal.objects,
            RUR.vis_world.goal_information, 'goal');
            RUR.vis_world.goal_present = true;
    }


    if (RUR.CURRENT_WORLD.objects !== undefined) {
        compile_partial_info(RUR.CURRENT_WORLD.objects,
            RUR.vis_world.information, 'objects');
    }
};

compile_partial_info = function(objects, information, type){
    "use strict";
    var coords, obj, quantity, color, goal_information;
    if (type=="objects") {
        color = "black";
        goal_information = RUR.vis_world.goal_information;
    } else {
        color = "blue";
    }

    for (coords in objects) {
        if (objects.hasOwnProperty(coords)){
            // objects found here
            for(obj in objects[coords]){
                if (objects[coords].hasOwnProperty(obj)){
                    if (information[coords] !== undefined){
                        // already at least one other object there
                        information[coords] = [undefined, "?"];  // assign impossible object
                    } else {
                        quantity = objects[coords][obj];
                        if (quantity.toString().indexOf("-") != -1) {
                            quantity = "?";
                        } else if (quantity == "all") {
                            quantity = "?";
                        } else {
                            try{
                                quantity = parseInt(quantity, 10);
                            } catch (e) {
                                quantity = "?";
                                console.log("WARNING: this should not happen in compile_info");
                            }
                        }
                        if (RUR.vis_world.goal_present && typeof quantity == 'number' && goal_information !== undefined) {
                            if ( goal_information[coords] !== undefined &&  goal_information[coords][1] == objects[coords][obj]) {
                            information[coords] = [obj, objects[coords][obj], 'green'];
                            } else {
                                information[coords] = [obj, objects[coords][obj], 'red'];
                            }
                        } else {
                            information[coords] = [obj, quantity, color];
                        }
                    }
                }
            }
        }
    }
};

draw_info = function() {
    var i, j, coords, keys, key, info, ctx;
    var scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT, text_width;
    if (RUR.vis_world.information === undefined &&
        RUR.vis_world.goal_information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;

    if (RUR.vis_world.information !== undefined) {
        keys = Object.keys(RUR.vis_world.information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.information[coords][1];
            if (i <= RUR.COLS && j <= RUR.ROWS){
                text_width = ctx.measureText(info).width/2;
                ctx.font = RUR.BACKGROUND_CTX.font;
                ctx.fillStyle = RUR.vis_world.information[coords][2];
                // information drawn to left side of object
                ctx.fillText(info, (i+0.2)*scale, Y - (j)*scale);
            }
        }
    }

    if (RUR.vis_world.goal_information !== undefined) {
        keys = Object.keys(RUR.vis_world.goal_information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.goal_information[coords][1];
            if (i <= RUR.COLS && j <= RUR.ROWS){
                text_width = ctx.measureText(info).width/2;
                ctx.font = RUR.BACKGROUND_CTX.font;
                ctx.fillStyle = RUR.vis_world.goal_information[coords][2];
                // information drawn to right side of object
                ctx.fillText(info, (i+0.8)*scale, Y - (j)*scale);
            }
        }
    }
};
