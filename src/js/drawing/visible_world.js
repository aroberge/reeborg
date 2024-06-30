require("./../rur.js");
require("./../translator.js");
require("./../world_api/things.js"); // why ?

//TODO add overlay object (like sensor)

RUR.vis_world = {};

RUR.vis_world.refresh_world_edited = function () {
    RUR.vis_world.draw_all();
    RUR.world_get.world_info();
};

/** @function set_world_size
 * @memberof RUR
 * @instance
 *
 * @desc Change the size of the world
 *
 * @param {integer} max_x The width of the world. Internally, we use
 * `cols` instead of `max_x`.
 * @param {integer} max_y The height of the world. Internally, we use
 * `rows` instead of `max_y`.
 */

RUR.set_world_size = function (max_x, max_y) {
    "use strict";
    var height, width, canvas, world;
    set_scale();

    if (max_x !== undefined && max_y !== undefined) {
        height = (max_y + 1.5) * RUR.WALL_LENGTH;
        width = (max_x + 1.5) * RUR.WALL_LENGTH;
        RUR.MAX_Y = max_y;
        RUR.MAX_X = max_x;
    } else {
        height = (RUR.MAX_Y + 1.5) * RUR.WALL_LENGTH;
        width = (RUR.MAX_X + 1.5) * RUR.WALL_LENGTH;
    }

    world = RUR.get_current_world();
    world.rows = RUR.MAX_Y;
    world.cols = RUR.MAX_X;

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

function set_scale () {
    if (RUR.get_current_world().small_tiles) {
        RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH/2;
        RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS/2;
        RUR.SCALE = 0.5;
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.WALL_LENGTH = RUR.DEFAULT_WALL_LENGTH;
        RUR.WALL_THICKNESS = RUR.DEFAULT_WALL_THICKNESS;
        RUR.SCALE = 1;
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }
}

// retaining compatibility with some of Vincent Maille's worlds.
RUR.vis_world.compute_world_geometry = RUR.set_world_size;

RUR.vis_world.draw_all = function () {
    "use strict";
    var ctx, world = RUR.get_current_world();
    if (world.blank_canvas) { // for game environment
        if (RUR.state.editing_world) {
            RUR.show_feedback("#Reeborg-failure",
                                RUR.translate("Editing of blank canvas is not supported."));
            return;
         }
        clearTimeout(RUR.ANIMATION_FRAME_ID);
        RUR.ANIMATION_FRAME_ID = undefined;
        for (ctx of RUR.ALL_CTX) {
            ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        }
        return;
    }

    RUR.BACKGROUND_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    if (RUR.get_current_world().background_image !== undefined) {
        draw_background_image(RUR.BACKGROUND_IMAGE);
    } else {
        draw_grid_walls(RUR.BACKGROUND_CTX);
    }

    draw_coordinates();
    RUR.animated_images = false;
    RUR.vis_world.refresh();
};


RUR.vis_world.clear_all_ctx = function () {
    // useful for graphics.py
    for (var ctx of RUR.ALL_CTX) {
        ctx.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }
};


RUR.vis_world.refresh = function () {
    "use strict";
    var canvas, canvases, goal, world = RUR.get_current_world();

    if (world.blank_canvas) {
        return;
    }
    // This is not the most efficient way to do things; ideally, one
    // would keep track of changes (e.g. addition or deletion of objects)
    // and only redraw when needed.  However, it is not critical at
    // the moment
    canvases = ["TILES_CTX", "BRIDGE_CTX", "DECORATIVE_OBJECTS_CTX",
                "OBSTACLES_CTX", "GOAL_CTX", "OBJECTS_CTX",
                "PUSHABLES_CTX", "TRACE_CTX", "WALL_CTX", "ROBOT_CTX"];
    for (canvas of canvases) {
        RUR[canvas].clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }

    draw_border(RUR.WALL_CTX);
    draw_tiles(world.tiles, RUR.TILES_CTX);
    draw_tiles(world.bridge, RUR.BRIDGE_CTX);
    draw_tiles(world.decorative_objects, RUR.DECORATIVE_OBJECTS_CTX);
    draw_tiles(world.obstacles, RUR.OBSTACLES_CTX);
    draw_tiles(world.pushables, RUR.PUSHABLES_CTX);
    draw_tiles(world.walls, RUR.WALL_CTX);
    draw_tiles(world.objects, RUR.OBJECTS_CTX);
    if (world._CORRECT_PATH && world._CORRECT_PATH.length > 0) {
        try {
            draw_correct_path(world._CORRECT_PATH, world._CORRECT_PATH_COLOR);
        } catch (e) {
            console.warn("problem with draw_correct_path", e);
        }
    }
    draw_info();     // on ROBOT_CTX
    if (RUR.ROBOT_ANIMATION_FRAME_ID) {
        clearTimeout(RUR.ROBOT_ANIMATION_FRAME_ID);
    }
    draw_robots();  // on ROBOT_CTX; also draws the trace

    // Animated images are redrawn according to their own schedule
    // If we have not drawn any yet, we should see if we need to draw some
    if (!RUR.animated_images) {
        draw_animated_images();
    }

    if (RUR.state.editing_world || RUR.state.visible_grid) {
        // make them appear above background and tiles but below foreground walls.
        draw_grid_walls(RUR.GOAL_CTX, RUR.state.editing_world);
    }

    if (world.goal !== undefined){
        goal = true;
        if (world.goal.pushables !== undefined){
            draw_tiles(world.goal.pushables, RUR.GOAL_CTX, goal);
        }
        if (world.goal.objects !== undefined){
            draw_tiles(world.goal.objects, RUR.GOAL_CTX, goal);
        }
        if (world.goal.walls !== undefined){
            draw_tiles(world.goal.walls, RUR.GOAL_CTX, goal);
        }
        if (world.goal.position !== undefined) {
            draw_goal_position(world.goal);
        }
    }

};

function draw_coordinates () {
    "use strict";
    var x, y, ctx = RUR.BACKGROUND_CTX, grid_size=RUR.WALL_LENGTH;

    // for some reason, background font gets reset to "10px sans-serif"
    // when a session starts, this after I explicitly set it to
    // something else, and never set it to 10px anywhere in my code.
    // The code included here fixes this.
    if (RUR.get_current_world().small_tiles) {
        RUR.BACKGROUND_CTX.font = "8px sans-serif";
    } else {
        RUR.BACKGROUND_CTX.font = "bold 12px sans-serif";
    }

    ctx.fillStyle = RUR.COORDINATES_COLOR;
    y = RUR.HEIGHT + 5 - grid_size/2;
    for(x=1; x <= RUR.MAX_X; x++){
        ctx.fillText(x, (x+0.5)*grid_size, y);
    }
    x = grid_size/2 -5;
    for(y=1; y <= RUR.MAX_Y; y++){
        ctx.fillText(y, x, RUR.HEIGHT - (y+0.3)*grid_size);
    }

    ctx.fillStyle = RUR.AXIS_LABEL_COLOR;
    ctx.fillText("x", RUR.WIDTH/2, RUR.HEIGHT - 10);
    ctx.fillText("y", 5, RUR.HEIGHT/2 );
}

function draw_grid_walls (ctx, edit){
    "use strict";
    var i, j, image_e, image_n, wall_e, wall_n, draw_only_path, x, y,
        x_offset_e, x_offset_n, y_offset_e, y_offset_n;

    if (RUR.SCALE == 0.5) {  // small wall, adjust grid walls to be less visible
        ctx.save();
        ctx.globalAlpha = 0.3;
    } else if (!edit) {
        ctx.save();
        ctx.globalAlpha = 0.5;
    }

    if (edit) {
        wall_e = RUR.THINGS["east_edit"];
        wall_n = RUR.THINGS["north_edit"];
    } else {
        wall_e = RUR.THINGS["east_grid"];
        wall_n = RUR.THINGS["north_grid"];
    }

    image_e = wall_e.image;
    x_offset_e = wall_e.x_offset;
    y_offset_e = wall_e.y_offset;

    image_n = wall_n.image;
    x_offset_n = wall_n.x_offset;
    y_offset_n = wall_n.y_offset;

    /* draw_grid_wall is called initially to draw the grid on the background
       drawing context.
       If may also be called to draw on the goal drawing context (above the tile)
       if we are editing the world **or** if RUR.state.visible_grid evaluates
       to RUR.PATH_ONLY.
       
       If RUR.state.visible_grid is equal to RUR.PATH_ONLY
       and a desired path named RUR.public.path has been defined, then we only
       draw the grid on that desired path.

       If RUR.state.visible_grid is true but not equal to RUR.PATH_ONLY 
       OR if RUR.public.path is not defined 
       (or is not used for something that can be treated as
       as path below, raising an Error), 
       then we draw the grid everywhere.
     */

    draw_only_path = false;
    if (!edit && // always draw when edit
        RUR.state.visible_grid == RUR.PATH_ONLY && 
        RUR.public !== undefined && // should always be the case
        RUR.public.path !== undefined) { // world creator appears to have created a desired path
            draw_only_path = true;
        } 

    if (draw_only_path) {
        try {
            for (i=0; i < RUR.public.path.length; i++) {
                x = RUR.public.path[i][0];
                y = RUR.public.path[i][1];
                // draw all four grid "walls" surrounding each position
                draw_single_object(image_e, x, y, ctx, x_offset_e, y_offset_e);
                draw_single_object(image_e, x-1, y, ctx, x_offset_e, y_offset_e);
                draw_single_object(image_n, x, y, ctx, x_offset_n, y_offset_n);                
                draw_single_object(image_n, x, y-1, ctx, x_offset_n, y_offset_n);                
            }
        } catch (e) {
            draw_only_path = false;
        }
    }

    if (!draw_only_path) { // no path or previous attempt failed
        for (i = 1; i <= RUR.MAX_X; i++) {
            for (j = 1; j <= RUR.MAX_Y; j++) {
                // when drawing full grid, only need to draw East and North
                // grid "wall" for each location
                draw_single_object(image_e, i, j, ctx, x_offset_e, y_offset_e);
                draw_single_object(image_n, i, j, ctx, x_offset_n, y_offset_n);
            }
        }
    }


    if (RUR.SCALE == 0.5 || !edit) {
        ctx.restore();
    }
}

function draw_border (ctx) {
    "use strict";
    var j, image, wall, x_offset, y_offset;
    wall = RUR.THINGS["east_border"];
    image = wall.image;
    x_offset = wall.x_offset;
    y_offset = wall.y_offset;

    for (j = 1; j <= RUR.MAX_Y; j++) {
        draw_single_object(image, 0, j, ctx, x_offset, y_offset);
    }
    for (j = 1; j <= RUR.MAX_Y; j++) {
        draw_single_object(image, RUR.MAX_X, j, ctx, x_offset, y_offset);
    }

    wall = RUR.THINGS["north_border"];
    image = wall.image;
    x_offset = wall.x_offset;
    y_offset = wall.y_offset;

    for (j = 1; j <= RUR.MAX_X; j++) {
        draw_single_object(image, j, 0, ctx, x_offset, y_offset);
    }
    for (j = 1; j <= RUR.MAX_X; j++) {
        draw_single_object(image, j, RUR.MAX_Y, ctx, x_offset, y_offset);
    }
}


function draw_robots () {
    "use strict";
    var body, robot, robots = RUR.get_current_world().robots;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        body = robots[robot];
        if (body._orientation == RUR.RANDOM_ORIENTATION) {
            continue;
        }
        if (body.possible_initial_positions !== undefined && body.possible_initial_positions.length > 1){
            draw_robot_clones(body);
        } else {
            RUR.vis_robot.draw(body); // draws trace automatically
        }
    }

    if (RUR.state.animated_robots) {
        RUR.ROBOT_ANIMATION_FRAME_ID = setTimeout(draw_robots,
            RUR.ROBOT_ANIMATION_TIME);
    }
}

function draw_random_robots (robots) {
    "use strict";
    var body, robot;
    if (!robots || robots[0] === undefined) {
        return;
    }
    for (robot=0; robot < robots.length; robot++){
        body = robots[robot];
        if (body._orientation != RUR.RANDOM_ORIENTATION) {
            continue;
        }
        if (body.possible_initial_positions !== undefined && body.possible_initial_positions.length > 1){
            draw_robot_clones(body, true);
        } else {
            RUR.vis_robot.draw_random(body);
        }
    }
}


function draw_robot_clones (robot, random){
    "use strict";
    var i, clone;
    if (random) {
        RUR.ROBOT_ANIM_CTX.save();
        RUR.ROBOT_ANIM_CTX.globalAlpha = 0.4;
    } else {
        RUR.ROBOT_CTX.save();
        RUR.ROBOT_CTX.globalAlpha = 0.4;
    }

    for (i=0; i < robot.possible_initial_positions.length; i++){
        clone = JSON.parse(JSON.stringify(robot));
        clone.x = robot.possible_initial_positions[i][0];
        clone.y = robot.possible_initial_positions[i][1];
        clone._prev_x = clone.x;
        clone._prev_y = clone.y;
        if (random) {
            RUR.vis_robot.draw_random(clone);
        } else {
            RUR.vis_robot.draw(clone);
        }
    }
    if (random) {
        RUR.ROBOT_ANIM_CTX.restore();
    } else {
        RUR.ROBOT_CTX.restore();
    }
}



function draw_goal_position (goal) {
    "use strict";
    var image, i, coord, x_offset, y_offset, ctx;

    ctx = RUR.GOAL_CTX;

    if (goal.position.image !== undefined &&
        typeof goal.position.image === 'string' &&
        RUR.THINGS[goal.position.image] !== undefined){
        image = RUR.THINGS[goal.position.image].image;
        x_offset = RUR.THINGS[goal.position.image].x_offset;
        y_offset = RUR.THINGS[goal.position.image].y_offset;
    } else {    // For anyone wondering, this step might be needed only when using older world
                // files that were created when there was not a choice
                // of image for indicating the home position.
                // In that case, it is ok to have x_offset and y_offset undefined.
        image = RUR.THINGS["green_home_tile"].image;
    }
    if (goal.possible_final_positions !== undefined && goal.possible_final_positions.length > 1){
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (i=0; i < goal.possible_final_positions.length; i++){
                coord = goal.possible_final_positions[i];
                draw_single_object(image, coord[0], coord[1], ctx, x_offset, y_offset);
        }
        ctx.restore();
    } else {
        draw_single_object(image, goal.position.x, goal.position.y, ctx, x_offset, y_offset);
    }
}


function draw_tiles (tiles, ctx, goal){
    "use strict";
    var i, j, coords, keys, key, image, tile, colour, t, tile_array;
    if (tiles === undefined) {
        return;
    }

    keys = Object.keys(tiles);
    for (key=0; key < keys.length; key++){
        coords = keys[key].split(",");
        i = parseInt(coords[0], 10);
        j = parseInt(coords[1], 10);
        if (tiles[keys[key]] !== undefined) {
            tile_array = tiles[keys[key]];
            if (Object.prototype.toString.call(tile_array) == "[object Object]") {
                tile_array = Object.keys(tile_array);
            }
            for (t=0; t<tile_array.length; t++) {
                tile = RUR.THINGS[tile_array[t]];
                if (tile === undefined || tile.color) {
                    if (tile === undefined) {
                        colour = tiles[keys[key]];
                    } else {
                        colour = tile.color;
                    }
                    draw_coloured_tile(colour, i, j, ctx);
                    continue;
                } else if (goal) {
                    image = tile.goal.image;
                    if (image === undefined){
                        console.warn("problem in draw_tiles; tile =", tile, ctx);
                        throw new RUR.ReeborgError("Problem in draw_tiles; goal image not defined.");
                    }
                    draw_single_object(image, i, j, ctx, tile.x_offset, tile.y_offset);
                } else if (tile.choose_image === undefined){
                    image = tile.image;
                    if (image === undefined){
                        console.warn("problem in draw_tiles; tile =", tile, ctx);
                        throw new RUR.ReeborgError("Problem in draw_tiles; image not defined.");
                    }
                    draw_single_object(image, i, j, ctx, tile.x_offset, tile.y_offset);
                }
            }
        }
    }
}

function draw_animated_images (){
    "use strict";
    var i, flag, anims, canvas, canvases, obj, ctx, world = RUR.get_current_world();
    clearTimeout(RUR.ANIMATION_FRAME_ID);

    canvases = ["TILES_ANIM_CTX", "BRIDGE_ANIM_CTX", "DECORATIVE_OBJECTS_ANIM_CTX",
                "OBSTACLES_ANIM_CTX", "GOAL_ANIM_CTX", "OBJECTS_ANIM_CTX",
                "PUSHABLES_ANIM_CTX", "ROBOT_ANIM_CTX"];
    for (canvas of canvases) {
        RUR[canvas].clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    }

    RUR.state.random_robot = false;
    draw_random_robots(world.robots);
    flag = RUR.state.random_robot; // flag is true when animated images are drawn on a given cycle

    anims = [[world.tiles, RUR.TILES_ANIM_CTX],
             [world.bridge, RUR.BRIDGE_ANIM_CTX],
             [world.decorative_objects, RUR.DECORATIVE_OBJECTS_ANIM_CTX],
             [world.obstacles, RUR.OBSTACLES_ANIM_CTX],
             [world.goal, RUR.GOAL_ANIM_CTX],
             [world.objects, RUR.OBJECTS_ANIM_CTX],
             [world.pushables, RUR.PUSHABLES_ANIM_CTX]];

    for (i=0; i < anims.length; i++) {
        obj = anims[i][0];
        if (obj) {
            ctx = anims[i][1];
            /* Important: flag must come after draw_anim to avoid
               short-circuit evaluation which would result in draw_anim
               being called only once.
            */
            flag = draw_anim(obj, ctx) || flag;
        }
    }

    if (flag) {
        RUR.ANIMATION_FRAME_ID = setTimeout(draw_animated_images,
            RUR.ANIMATION_TIME);
    }

    // make it known globally for refresh() whether or not we have drawn
    // animated images
    RUR.animated_images = flag;
}

function draw_anim (objects, ctx) {
    "use strict";
    var i, j, i_j, coords, flag, k, n, obj, obj_here,
        recording_state, remove_flag, images_to_remove=[];

    flag = false;
    coords = Object.keys(objects);
    for (k=0; k < coords.length; k++){
        i_j = coords[k].split(",");
        i = parseInt(i_j[0], 10);
        j = parseInt(i_j[1], 10);

        obj_here = objects[coords[k]];
        if (Object.prototype.toString.call(obj_here) == "[object Object]") {
            obj_here = Object.keys(obj_here);
        }

        if (Object.prototype.toString.call(obj_here) == "[object Array]") {
            for (n=0; n < obj_here.length; n++) {
                obj = RUR.THINGS[obj_here[n]];
                if (obj === undefined) {
                    continue;
                } else if (obj.choose_image !== undefined){
                    remove_flag = _draw_single_animated(obj, coords[k], i, j, ctx, obj.x_offset, obj.y_offset);
                    if (remove_flag == RUR.END_CYCLE) {
                        images_to_remove.push([i, j, obj.name, ctx]);
                    }
                    flag = true;
                }
            }
        } else {
            console.warn("Problem: unknown type in draw_anim; canvas =", ctx.canvas);
            console.warn("obj_here = ", obj_here, "objects = ", objects);
        }
    }

    // removing object normally result in the recording of a
    // frame since we normally want the display to be updated
    // to reflect the removal. Here, we are updating the display,
    // and we do not want to trigger new frames recording: at this
    // stage, we are playing back the recorded frames.
    recording_state = RUR.state.do_not_record;
    RUR.state.do_not_record = true;
    for (k=0; k < images_to_remove.length; k++){
        __remove_animated_object(images_to_remove[k]);
    }
    RUR.state.do_not_record = recording_state;
    return flag;
}

function __remove_animated_object(args) {
    var x, y, name, ctx;
    x = args[0];
    y = args[1];
    name = args[2];
    ctx = args[3];

    switch (ctx) {
        case RUR.TILES_ANIM_CTX:
            RUR.remove_background_tile(name, x, y);
            break;
        case RUR.OBSTACLES_ANIM_CTX:
            RUR.remove_obstacle(name, x, y);
            break;
        default:
            console.warn("unknown ctx in __remove_animated_object.");
    }
}

function _draw_single_animated (obj, coords, i, j, ctx, x_offset, y_offset){
    var image, id = coords + ctx.canvas.id + obj.name;
    // each image is uniquely identified by its "id".
    image = obj.choose_image(id);
    if (image === undefined){
        console.warn("problem in _draw_single_animated; obj =", obj);
        throw new RUR.ReeborgError("Problem in _draw_single_animated at" + coords);
    } else if (image == RUR.END_CYCLE) {
        return RUR.END_CYCLE;
    }
    draw_single_object(image, i, j, ctx, x_offset, y_offset);
    return false;
}

function draw_coloured_tile (colour, i, j, ctx) {
    var thick = RUR.WALL_THICKNESS, grid_size = RUR.WALL_LENGTH;
    var x, y;
    if (i > RUR.MAX_X || j > RUR.MAX_Y){
        return;
    }
    x = i*grid_size + thick/2;
    y = RUR.HEIGHT - (j+1)*grid_size + thick/2;
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, grid_size, grid_size);
}

function draw_single_object (image, i, j, ctx, x_offset, y_offset) {
    var x, y, offset=RUR.WALL_THICKNESS/2, grid_size=RUR.WALL_LENGTH;
    if (x_offset === undefined) {
        x_offset = 0;
    }
    if (y_offset === undefined) {
        y_offset = 0;
    }
    x_offset *= RUR.SCALE;
    y_offset *= RUR.SCALE;
    x = i*grid_size + offset + x_offset;
    y = RUR.HEIGHT - (j+1)*grid_size + offset + y_offset;
    try{
        if (RUR.SCALE == 0.5) {
            ctx.drawImage(image, x, y, image.width/2, image.height/2);
        } else {
            ctx.drawImage(image, x, y);
        }
    } catch (e) {
        console.warn("problem in draw_single_object", image, ctx, e);
    }
}


function draw_background_image (image) {
    // we draw the image so that it fills the entire world
    var thick=RUR.WALL_THICKNESS/2, grid_size=RUR.WALL_LENGTH,
        image_width, image_height, world_width, world_height,
        x, y, ctx=RUR.BACKGROUND_CTX;

    world_width = RUR.MAX_X*grid_size;  // space to
    world_height = RUR.MAX_Y*grid_size; // be filled

    image_width = image.width;
    image_height = image.height;

    if (image_width > world_width) {
        image_width = world_width;  // crop
    }
    if (image_height > world_height) {
        image_height = world_height;
    }

    y = RUR.HEIGHT - (RUR.MAX_Y+1)*grid_size + thick; // location of top ...
    x = grid_size + thick;                            // ... left corner

    try{
        ctx.drawImage(image, 0, 0, image_width, image_height,
                             x, y, world_width, world_height);
    } catch (e) {
        console.warn("problem in draw_background_image", image, ctx, e);
    }
}

function compile_info () {
    // compiles the information about objects and goal found at each
    // grid location, so that we can determine what should be
    // drawn - if anything.
    var world = RUR.get_current_world();
    RUR.vis_world.information = {};
    RUR.vis_world.goal_information = {};
    RUR.vis_world.goal_present = false;
    if (world.goal !== undefined && world.goal.objects !== undefined) {
        compile_partial_info(RUR.get_current_world().goal.objects,
            RUR.vis_world.goal_information, 'goal');
            RUR.vis_world.goal_present = true;
    }

    if (world.objects !== undefined) {
        compile_partial_info(world.objects, RUR.vis_world.information, 'objects');
    }
}

function compile_partial_info (objects, information, type){
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
                                console.warn("WARNING: this should not happen in compile_info");
                            }
                        }
                        if (RUR.vis_world.goal_present && typeof quantity == 'number' && goal_information !== undefined) {
                            if ( goal_information[coords] !== undefined &&  goal_information[coords][1] == objects[coords][obj]) {
                            information[coords] = [obj, objects[coords][obj], RUR.GREEN];
                            } else {
                                information[coords] = [obj, objects[coords][obj], RUR.RED];
                            }
                        } else {
                            information[coords] = [obj, quantity, color];
                        }
                    }
                }
            }
        }
    }
}

function draw_info () {
    var i, j, coords, keys, key, info, ctx;
    var scale = RUR.WALL_LENGTH, Y = RUR.HEIGHT;

    if (RUR.state.do_not_draw_info) {
        return;
    }

    compile_info();
    if (RUR.vis_world.information === undefined &&
        RUR.vis_world.goal_information === undefined) {
        return;
    }
    // make sure it appears on top of everything (except possibly robots)
    ctx = RUR.ROBOT_CTX;
    ctx.font = RUR.BACKGROUND_CTX.font;

    if (RUR.vis_world.information !== undefined) {
        keys = Object.keys(RUR.vis_world.information);
        for (key=0; key < keys.length; key++){
            coords = keys[key].split(",");
            i = parseInt(coords[0], 10);
            j = parseInt(coords[1], 10);
            info = RUR.vis_world.information[coords][1];
            if (i <= RUR.MAX_X && j <= RUR.MAX_Y){
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
            if (i <= RUR.MAX_X && j <= RUR.MAX_Y){
                ctx.fillStyle = RUR.vis_world.goal_information[coords][2];
                // information drawn to right side of object
                ctx.fillText(info, (i+0.8)*scale, Y - (j)*scale);
            }
        }
    }
}


function draw_correct_path (path, color) {
    "use strict";
    var i, x, y, arrow_offset, offset, prev_x, prev_y, ctx = RUR.OBJECTS_CTX; // below RUR.TRACE_CTX
    var grid_x, grid_y, prev_grid_x, prev_grid_y, current_segment, segments = new Set();
    ctx.strokeStyle = color;
    ctx.lineCap = "round";

    if(RUR.get_current_world().small_tiles) {
        offset = 12;
        arrow_offset = 5;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 2]);
    } else {
        offset = 25;
        arrow_offset = 8;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
    }
    grid_x = path[0][0];
    grid_y = path[0][1];

    x = grid_x * RUR.WALL_LENGTH + offset;
    y = RUR.HEIGHT - (grid_y + 1) * RUR.WALL_LENGTH + offset;

    ctx.beginPath();
    ctx.moveTo(x, y);
    prev_grid_x = grid_x;
    prev_grid_y = grid_y;


    for (i=1; i < path.length; i++){
        grid_x = path[i][0];
        grid_y = path[i][1];
        x = grid_x * RUR.WALL_LENGTH + offset;
        y = RUR.HEIGHT - (grid_y + 1) * RUR.WALL_LENGTH + offset;
        // We need to avoid redrawing over a previously drawn dashed path
        // as this messes up the dash pattern.
        // We first create string that identify uniquely any path segment, irrespective of
        // the direction in which it is traversed
        if (grid_x < prev_grid_x) {
            current_segment = grid_x +"," + prev_grid_x + "," + grid_y + "," + grid_y;
        } else if (grid_x > prev_grid_x) {
            current_segment = prev_grid_x +"," + grid_x + "," + grid_y + "," + grid_y;
        } else if (grid_y < prev_grid_y) {
            current_segment = grid_x +"," + grid_x + "," + grid_y + "," + prev_grid_y;            
        } else {
            current_segment = grid_x +"," + grid_x + "," + prev_grid_y + "," + grid_y;            
        }
        if (segments.has(current_segment)) {
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y);
            segments.add(current_segment);
        }
        prev_grid_x = grid_x;
        prev_grid_y = grid_y;
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // draw arrows.
    ctx.lineWidth = 1;
    x = path[0][0] * RUR.WALL_LENGTH + offset;
    y = RUR.HEIGHT - (path[0][1] + 1) * RUR.WALL_LENGTH + offset;
    for (i=1; i < path.length; i++){
        prev_x = x;
        prev_y = y;
        x = path[i][0] * RUR.WALL_LENGTH + offset;
        y = RUR.HEIGHT - (path[i][1] + 1) * RUR.WALL_LENGTH + offset;
        draw_arrow(x, y, prev_x, prev_y, ctx, arrow_offset);
    }
}


function draw_arrow(x, y, prev_x, prev_y, ctx, arrow_offset) {
    var len = ctx.lineWidth * 4;
    ctx.beginPath();
    if (x == prev_x) { // vertical arrow
        if (y > prev_y) {
            x -= arrow_offset;
        } else {
            x += arrow_offset;
        }
        y = (y + prev_y)/2; 
        if (y > prev_y) {
            y += arrow_offset;
            ctx.moveTo(x, y);
            ctx.lineTo(x-len, y-len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+len, y-len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - 2*arrow_offset);
            ctx.stroke();            
        } else {
            y -= arrow_offset;
            ctx.moveTo(x, y);            
            ctx.lineTo(x-len, y+len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+len, y+len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + 2*arrow_offset);
            ctx.stroke();              
        }
    } else {
        if (x > prev_x) {
            y += arrow_offset;
        } else {
            y -= arrow_offset;
        }
        x = (x + prev_x)/2;
        if (x > prev_x) {
            x += arrow_offset;
            ctx.moveTo(x, y);            
            ctx.lineTo(x-len, y-len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x-len, y+len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x - 2* arrow_offset, y);
            ctx.stroke();  
        } else {
            x -= arrow_offset
            ctx.moveTo(x, y);
            ctx.lineTo(x+len, y-len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x+len, y+len);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 2* arrow_offset, y);
            ctx.stroke();              
        }
    }
}
