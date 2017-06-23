
require("./../rur.js");
require("./../translator.js");
require("./../default_tiles/tiles.js");
require("./output.js");
require("./../recorder/record_frame.js");
require("./exceptions.js");
require("./../world_get/world_get.js");
require("./../utils/supplant.js");
require("./../utils/key_exist.js");

require("./../world_api/walls.js");
require("./../world_api/obstacles.js");
require("./../world_api/background_tile.js");
require("./../world_api/pushables.js");
require("./../world_api/robot.js");
require("./../world_api/composition.js");
require("./../world_api/is_fatal.js");

RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var position, next_x, next_y, orientation, pushable_in_the_way, tile, tiles,
        x_beyond, y_beyond, recording_state, next_position, current_x, current_y,
        message;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.WallCollisionError(RUR.translate("Ouch! I hit a wall!"));
    }

    position = RUR.get_position_in_front(robot);
    next_x = position.x;
    next_y = position.y;

    // attempt a move, by first saving the current position
    current_x = robot.x;
    current_y = robot.y;
    robot.x = next_x;
    robot.y = next_y;

    // If we move, are we going to push something else in front of us?
    pushable_in_the_way = RUR.get_pushable(next_x, next_y);
    if (pushable_in_the_way !== null) {
        next_position = RUR.get_position_in_front(robot);
        x_beyond = next_position.x;
        y_beyond = next_position.y;

        if (RUR.control.wall_in_front(robot) ||
            RUR.get_pushable(x_beyond, y_beyond) ||
            RUR.get_solid_obstacle(x_beyond, y_beyond) ||
            RUR.is_robot(x_beyond, y_beyond)) {
            // reverse the move
            robot.x = current_x;
            robot.y = current_y;
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR.push_pushable(pushable_in_the_way, next_x, next_y, x_beyond, y_beyond);
            RUR.transform_tile(pushable_in_the_way, x_beyond, y_beyond);
        }
    }

    // We can now complete the move
    if (robot._is_leaky !== undefined && !robot._is_leaky) {
        // avoid messing the trace if and when we resume having a leaky robot
        robot._prev_x = robot.x;
        robot._prev_y = robot.y;
    } else {
        robot._prev_x = current_x;
        robot._prev_y = current_y;
    }
    RUR.state.sound_id = "#move-sound";


    // A move has been performed ... but it may have been a fatal decision
    message = RUR.is_fatal_position(robot.x, robot.y, robot);
    if (message) {
        throw new RUR.ReeborgError(message);
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
        RUR.record_frame("done");
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
        if (RUR.KNOWN_THINGS.indexOf(translated_arg) == -1){
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
        throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
    }
    if (arg !== undefined) {
        if (robot.objects[translated_arg] === undefined) {
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }  else {
            RUR.control._robot_put_down_object(robot, translated_arg);
        }
    }  else {
        if (objects_carried.length === 0){
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
        } else if (all_objects.length > 1){
             throw new RUR.MissingObjectError(RUR.translate("I carry too many different objects. I don't know which one to put down!"));
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

    RUR.utils.ensure_key_for_obj_exists(RUR.get_current_world(), "objects");
    coords = robot.x + "," + robot.y;
    RUR.utils.ensure_key_for_obj_exists(RUR.get_current_world().objects, coords);
    if (RUR.get_current_world().objects[coords][obj] === undefined) {
        RUR.get_current_world().objects[coords][obj] = 1;
    } else {
        RUR.get_current_world().objects[coords][obj] += 1;
    }

    RUR.transform_tile(obj, robot.x, robot.y); // TODO: testing needed

    RUR.record_frame("put", [robot.__id, obj]);
};


RUR.control.take = function(robot, arg){
    var translated_arg, objects_here, message;
    RUR.state.sound_id = "#take-sound";
    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.KNOWN_THINGS.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_here = RUR.world_get.object_at_robot_position(robot, arg);
    if (arg !== undefined) {
        if (Array.isArray(objects_here) && objects_here.length === 0) {
            throw new RUR.MissingObjectError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else if(RUR.is_fatal_thing(arg)) {
            message = RUR.get_property(arg, 'message');
            if (message == undefined) {
                message = "I picked up a fatal object.";
            }
            throw new RUR.ReeborgError(RUR.translate(message));
        } else {
            RUR.control._take_object_and_give_to_robot(robot, arg);
        }
    }  else if (Array.isArray(objects_here) && objects_here.length === 0){
        throw new RUR.MissingObjectError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.MissingObjectError(RUR.translate("Many objects are here; I do not know which one to take!"));
    }  else if(RUR.is_fatal_thing(objects_here[0])) {
        message = RUR.get_property(objects_here[0], 'message');
        if (message == undefined) {
            message = "I picked up a fatal object.";
        }
        throw new RUR.ReeborgError(RUR.translate(message));
    } else {
        RUR.control._take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

RUR.control._take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    obj = RUR.translate_to_english(obj);
    coords = robot.x + "," + robot.y;
    RUR.get_current_world().objects[coords][obj] -= 1;

    if (RUR.get_current_world().objects[coords][obj] === 0){
        delete RUR.get_current_world().objects[coords][obj];
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (RUR.world_get.object_at_robot_position(robot) == false){ // jshint ignore:line
            delete RUR.get_current_world().objects[coords];
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
    var tile, tiles, solid, name, position, next_x, next_y;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    position = RUR.get_position_in_front(robot);
    next_x = position.x;
    next_y = position.y;

    if (RUR.is_fatal_position(next_x, next_y, robot) &&
        RUR.is_detectable(next_x, next_y)) {
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
    var old_delay = RUR.PLAYBACK_TIME_PER_FRAME;
    RUR.PLAYBACK_TIME_PER_FRAME = delay;
    return old_delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.get_current_world().goal;
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
        return RUR.get_current_world().tiles[x + "," + y];
    } else {
        return null;
    }
};
