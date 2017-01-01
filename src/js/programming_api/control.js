
require("./../rur.js");
require("./../translator.js");
require("./../default_tiles/tiles.js");
require("./output.js");
require("./../recorder/record_frame.js");
require("./exceptions.js");
require("./../world_get/world_get.js");
require("./../world_set/world_set.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");

require("./../world_api/wall.js");
require("./../world_api/obstacles.js");
require("./../world_api/background_tile.js");
require("./../world_api/pushables.js");

require("./../world_utils/get_world.js");


/* First, some utility functions */

function get_next_positions (robot) {
    "use strict";
    var next_x, next_y, x_beyond, y_beyond, orientation;

    switch (robot._orientation){
    case RUR.EAST:
        next_x = robot.x + 1;
        x_beyond = robot.x + 2;
        next_y = y_beyond = robot.y;
        orientation = "east";
        break;
    case RUR.NORTH:
        next_y = robot.y + 1;
        y_beyond = robot.y + 2;
        next_x = x_beyond = robot.x;
        orientation = "north";
        break;
    case RUR.WEST:
        next_x = robot.x - 1;
        x_beyond = robot.x - 2;
        next_y = y_beyond = robot.y;
        orientation = "west";
        break;
    case RUR.SOUTH:
        next_y = robot.y - 1;
        y_beyond = robot.y - 2;
        next_x = x_beyond = robot.x;
        orientation = "south";
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.control.move().");
    }
    return {next_x:next_x, next_y:next_y, x_beyond:x_beyond, y_beyond:y_beyond,
            orientation:orientation};
}


/* Next, our namespace and its methods, for use in other modules */
RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var positions, next_x, next_y, orientation, pushable_in_the_way, tile,
        x_beyond, y_beyond, recording_state;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.WallCollisionError(RUR.translate("Ouch! I hit a wall!"));
    }

    positions = get_next_positions(robot);
    next_x = positions.next_x;
    next_y = positions.next_y;

    // If we move, are we going to push something else in front of us? 
    pushable_in_the_way = RUR.get_pushable(next_x, next_y);
    if (pushable_in_the_way !== null) {
        orientation = positions.orientation;
        x_beyond = positions.x_beyond;
        y_beyond = positions.y_beyond;
        if (RUR.is_wall(orientation, next_x, next_y) ||
            RUR.get_pushable(x_beyond, y_beyond) ||
            RUR.get_solid_obstacle(x_beyond, y_beyond) ||
            RUR.is_robot(x_beyond, y_beyond)) {
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR.push_pushable(pushable_in_the_way, next_x, next_y, x_beyond, y_beyond);
        }
    }
    
    // Ok, so we do the actual move
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

    robot.x = next_x;
    robot.y = next_y;
    RUR.state.sound_id = "#move-sound";

    // To avoid possibly messing up the drawing of the trace at a future
    // time, we perform this check
    if (robot._is_leaky !== undefined && !robot._is_leaky) {
        robot._prev_x = robot.x;
        robot._prev_y = robot.y;
    }

    // A "safe obstacle" (like a bridge) allows us to move safely,
    // so we can end there.
    if (RUR.is_obstacle_safe(robot.x, robot.y)) {
        RUR.record_frame("move", robot.__id);
        return;
    }

    // A move has been performed ... but it may have been a fatal decision
    tile = RUR.get_fatal_obstacle(robot.x, robot.y);
    if (tile && tile.fatal) {
        throw new RUR.ReeborgError(tile.message);
    }
    tile = RUR.get_background_tile(robot.x, robot.y);
    if (tile) {
        if (tile.fatal) {
            throw new RUR.ReeborgError(tile.message);
        } else if (tile.slippery) {
            RUR.output.write(RUR.translate(tile.message) + "\n");
            RUR.control.move(robot);    
        }
    }
    RUR.record_frame("move", robot.__id);
};


// leave end of line comments below such as using += 1
// as I (indirectly) refer to these comments in the programming tutorial

RUR.control.turn_left = function(robot){
    "use strict";
    robot._prev_orientation = robot._orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 1;  // could have used "++" instead of "+= 1"
    robot._orientation %= 4;
    RUR.state.sound_id = "#turn-sound";
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_orientation = robot._orientation;
    }
    RUR.record_frame("turn_left", robot.__id);
};

RUR.control.__turn_right = function(robot){
    "use strict";
    robot._prev_orientation = (robot._orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._orientation += 3;
    robot._orientation %= 4;
    if (robot._is_leaky !== undefined && !robot._is_leaky) {  // update to avoid drawing from previous point.
        robot._prev_orientation = robot._orientation;
    }
    RUR.record_frame("__turn_right", robot.__id);
};

RUR.control.pause = function (ms) {
    RUR.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    if (RUR.state.input_method === "py-repl") {
        RUR.frames = [];
        RUR.nb_frames = 1;
        RUR.record_frame();
        RUR.rec.conclude();
    } else {
        throw new RUR.ReeborgError(RUR.translate("Done!"));
    }
};

RUR.control.put = function(robot, arg){
    var translated_arg, objects_carried, obj_type, all_objects;
    RUR.state.sound_id = "#put-sound";

    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_TILES.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_carried = robot.objects;
    all_objects = [];
    for (obj_type in objects_carried) {
        if (objects_carried.hasOwnProperty(obj_type)) {
            all_objects.push(obj_type);
        }
    }
    if (all_objects.length === 0){
        throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
    }
    if (arg !== undefined) {
        if (robot.objects[translated_arg] === undefined) {
            throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }  else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }  else {
        if (objects_carried.length === 0){
            throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
        } else if (all_objects.length > 1){
             throw new RUR.ReeborgError(RUR.translate("I carry too many different objects. I don't know which one to put down!"));
        } else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }
};

RUR.control._robot_put_down_object = function (robot, obj) {
    "use strict";
    var objects_carried, coords, obj_type;
    if (obj === undefined){
        objects_carried = robot.objects;
        for (obj_type in objects_carried) {
            if (objects_carried.hasOwnProperty(obj_type)) {
                obj = obj_type;
            }
        }
    }
    if (robot.objects[obj] != "infinite") {
        robot.objects[obj] -= 1;
    }
    if (robot.objects[obj] === 0) {
        delete robot.objects[obj];
    }

    RUR.utils.ensure_key_for_obj_exists(RUR.get_world(), "objects");
    coords = robot.x + "," + robot.y;
    RUR.utils.ensure_key_for_obj_exists(RUR.get_world().objects, coords);
    if (RUR.get_world().objects[coords][obj] === undefined) {
        RUR.get_world().objects[coords][obj] = 1;
    } else {
        RUR.get_world().objects[coords][obj] += 1;
    }
    RUR.record_frame("put", [robot.__id, obj]);
};


RUR.control.take = function(robot, arg){
    var translated_arg, objects_here;
    RUR.state.sound_id = "#take-sound";
    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_TILES.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_here = RUR.world_get.object_at_robot_position(robot, arg);
    if (arg !== undefined) {
        if (Array.isArray(objects_here) && objects_here.length === 0) {
            throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else {
            RUR.control._take_object_and_give_to_robot(robot, arg);
        }
    }  else if (Array.isArray(objects_here) && objects_here.length === 0){
        throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.ReeborgError(RUR.translate("Many objects are here; I do not know which one to take!"));
    } else {
        RUR.control._take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

RUR.control._take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    obj = RUR.translate_to_english(obj);
    coords = robot.x + "," + robot.y;
    RUR.get_world().objects[coords][obj] -= 1;

    if (RUR.get_world().objects[coords][obj] === 0){
        delete RUR.get_world().objects[coords][obj];
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (RUR.world_get.object_at_robot_position(robot) == false){ // jshint ignore:line
            delete RUR.get_world().objects[coords];
        }
    }
    RUR.utils.ensure_key_for_obj_exists(robot, "objects");
    if (robot.objects[obj] === undefined){
        robot.objects[obj] = 1;
    } else {
        if (robot.objects[obj] != "infinite") {
            robot.objects[obj]++;
        }
    }
    RUR.record_frame("take", [robot.__id, obj]);
};


RUR.control.build_wall = function (robot){
    RUR.state.sound_id = "#build-sound";
    switch (robot._orientation){
    case RUR.EAST:
        RUR.add_wall("east", robot.x, robot.y); // records automatically
        break;
    case RUR.NORTH:
        RUR.add_wall("north", robot.x, robot.y);
        break;
    case RUR.WEST:
        RUR.add_wall("west", robot.x, robot.y);
        break;
    case RUR.SOUTH:
        RUR.add_wall("south", robot.x, robot.y);
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.build_wall().");
    }
};


RUR.control.wall_in_front = function (robot) {
    switch (robot._orientation){
    case RUR.EAST:
        return RUR.is_wall("east", robot.x, robot.y);
    case RUR.NORTH:
        return RUR.is_wall("north", robot.x, robot.y);
    case RUR.WEST:
        return RUR.is_wall("west", robot.x, robot.y);
    case RUR.SOUTH:
        return RUR.is_wall("south", robot.x, robot.y);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
    }
};

RUR.control.wall_on_right = function (robot) {
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.wall_in_front(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};


RUR.control.front_is_clear = function(robot){
    var tile, tiles, solid, name, positions, next_x, next_y;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    positions = get_next_positions(robot);
    next_x = positions.next_x;
    next_y = positions.next_y;

    if (RUR.get_fatal_detectable_obstacle(next_x, next_y)) {
        return false;
    }
    // "safe obstacles" protect us from any problem from background tiles
    if (RUR.is_obstacle_safe(next_x, next_y)) {
        return true;
    }
    tile = RUR.get_background_tile(next_x, next_y);
    if (tile && tile.detectable && tile.fatal){
        return false;
    }

    return true;
};

RUR.control.right_is_clear = function(robot){
    var result;
    RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    return robot._orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    RUR.playback_delay = delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.get_world().goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};


RUR.control.carries_object = function (robot, obj) {
    var obj_type, all_objects, carried=false;

    if (robot === undefined || robot.objects === undefined) {
        return 0;
    }

    all_objects = {};

    if (obj === undefined) {
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type)) {
                all_objects[RUR.translate(obj_type)] = robot.objects[obj_type];
                carried = true;
            }
        }
        if (carried) {
            return all_objects;
        } else {
            return 0;
        }
    } else {
        obj = RUR.translate_to_english(obj);
        for (obj_type in robot.objects) {
            if (robot.objects.hasOwnProperty(obj_type) && obj_type == obj) {
                return robot.objects[obj_type];
            }
        }
        return 0;
    }
};


RUR.control.set_model = function(robot, model){
    robot.model = model;
    RUR.record_frame("set_model", robot.__id);
 };

RUR.control.set_trace_color = function(robot, color){
    robot._trace_color = color;
 };

RUR.control.set_trace_style = function(robot, style){
    robot._trace_style = style;
 };

if (RUR.state === undefined){
    RUR.state = {};
}

RUR.state.sound_on = false;
RUR.control.sound = function(on){
    if(!on){
        RUR.state.sound_on = false;
        return;
    }
    RUR.state.sound_on = true;
};

RUR.control.get_colour_at_position = function (x, y) {
    if (RUR.world_get.tile_at_position(x, y)===false) {
        return null;
    } else if (RUR.world_get.tile_at_position(x, y)===undefined){
        return RUR.get_world().tiles[x + "," + y];
    } else {
        return null;
    }
};
RUR.control.get_color_at_position = RUR.control.get_colour_at_position;
