
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
    var position, next_x, next_y, pushable_in_the_way,
        x_beyond, y_beyond, next_position, current_x, current_y,
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
            RUR.is_solid_obstacle(x_beyond, y_beyond) ||
            RUR.is_robot(x_beyond, y_beyond)) {
            // reverse the move
            robot.x = current_x;
            robot.y = current_y;
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR._push_pushable(pushable_in_the_way, next_x, next_y, x_beyond, y_beyond);
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
    var random;
    if (robot._orientation == RUR.RANDOM_ORIENTATION) {
        random = Math.floor(Math.random() * 4);
        robot._orientation = random;
        robot._prev_orientation = random;
    } else {
        robot._prev_orientation = robot._orientation;
        robot._orientation ++;
        robot._orientation %= 4;
    }
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

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
    RUR.state.done_executed = true;
    throw new RUR.ReeborgError(RUR.translate("Done!"));
};

RUR.control.put = function(robot, arg){
    "use strict";
    var arg_in_english, all_objects;
    RUR.state.sound_id = "#put-sound";
    arg_in_english = confirm_object_is_known(arg);
    all_objects = get_names_of_objects_carried(robot.objects);
    put_check_for_error (arg, arg_in_english, all_objects, robot.objects);
    // no error, we can proceed
    robot_put_or_toss_object(robot, arg_in_english, "put");
};

RUR.control.toss = function(robot, arg){
    "use strict";
    var arg_in_english, all_objects;
    arg_in_english = confirm_object_is_known(arg);
    all_objects = get_names_of_objects_carried(robot.objects);
    put_check_for_error (arg, arg_in_english, all_objects, robot.objects);
    // no error, we can proceed
    robot_put_or_toss_object(robot, arg_in_english, "throw");
};

function confirm_object_is_known(arg) {
    var arg_in_english;
    if (arg !== undefined) {
        arg_in_english = RUR.translate_to_english(arg);
        if (RUR.KNOWN_THINGS.indexOf(arg_in_english) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }
    return arg_in_english;
}

function get_names_of_objects_carried(objects_carried) {
    var obj_type, all_objects = [];
    for (obj_type in objects_carried) {
        if (objects_carried.hasOwnProperty(obj_type)) {
            all_objects.push(obj_type);
        }
    }
    return all_objects;
}

function put_check_for_error (arg, arg_in_english, all_objects, carried) {
    "use strict";
    if (arg !== undefined) {
        if (all_objects.length === 0){
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }
        if (carried[arg_in_english] === undefined) {
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj:arg}));
        }
    } else {
        if (all_objects.length === 0){
            throw new RUR.MissingObjectError(RUR.translate("I don't have any object to put down!").supplant({obj: RUR.translate("object")}));
        } else if (all_objects.length > 1){
             throw new RUR.MissingObjectError(RUR.translate("I carry too many different objects. I don't know which one to put down!"));
        }
    }
}

robot_put_or_toss_object = function (robot, obj, action) {
    "use strict";
    var objects_carried, coords, obj_type, position, x, y;

    RUR.utils.ensure_key_for_obj_exists(RUR.get_current_world(), "objects");
    if (action == "put") {
        x = robot.x;
        y = robot.y;
    } else if (action == "throw") {
        position = RUR.get_position_in_front(robot);
        x = position.x;
        y = position.y;
    } else {
        throw new RUR.ReeborgError("Fatal error, unknown action in put/throw :", action);
    }
    coords = x + "," + y;

    if (obj === undefined){
        //obj = Object.keys(robot.objects)[0]; // we have already ensured that there is only one
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

    RUR.utils.ensure_key_for_obj_exists(RUR.get_current_world().objects, coords);
    if (RUR.get_current_world().objects[coords][obj] === undefined) {
        RUR.get_current_world().objects[coords][obj] = 1;
    } else {
        RUR.get_current_world().objects[coords][obj] += 1;
    }

    RUR.transform_tile(obj, x, y);
    RUR.record_frame(action, [robot.__id, obj]);
};

function is_fatal_thing(thing, robot) {
    var protections;

    protections = RUR.get_protections(robot);

    if (RUR.get_property(thing, "fatal")) {
        if (protections.indexOf(RUR.get_property(thing, "fatal")) === -1) {
            return true;
        }
    }
    return false;
}

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
        }  else if(is_fatal_thing(arg, robot)) {
            message = RUR.get_property(arg, 'message');
            if (!message) {
                message = "I picked up a fatal object.";
            }
            throw new RUR.ReeborgError(RUR.translate(message));
        } else {
            take_object_and_give_to_robot(robot, arg);
        }
    }  else if (Array.isArray(objects_here) && objects_here.length === 0){
        throw new RUR.MissingObjectError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.MissingObjectError(RUR.translate("Many objects are here; I do not know which one to take!"));
    }  else if(is_fatal_thing(objects_here[0], robot)) {
        message = RUR.get_property(objects_here[0], 'message');
        if (!message) {
            message = "I picked up a fatal object.";
        }
        throw new RUR.ReeborgError(RUR.translate(message));
    } else {
        take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    obj = RUR.translate_to_english(obj);
    coords = robot.x + "," + robot.y;
    RUR.get_current_world().objects[coords][obj] -= 1;

    if (RUR.get_current_world().objects[coords][obj] === 0){
        delete RUR.get_current_world().objects[coords][obj];
        // Testing for empty array.
        // In Javascript []==[] is false and ![] is false ...
        // Python is so much nicer than Javascript.
        objects_here = RUR.world_get.object_at_robot_position(robot);
        if (Array.isArray(objects_here) && objects_here.length === 0){
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
        return RUR._is_wall("east", robot.x, robot.y);
    case RUR.NORTH:
        return RUR._is_wall("north", robot.x, robot.y);
    case RUR.WEST:
        return RUR._is_wall("west", robot.x, robot.y);
    case RUR.SOUTH:
        return RUR._is_wall("south", robot.x, robot.y);
    case RUR.RANDOM_ORIENTATION:
        throw new RUR.ReeborgError(RUR.translate("I am too dizzy!"));
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
    }
};

RUR.control.wall_on_right = function (robot) {
    var result, saved_recording_state;
    saved_recording_state = RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.wall_in_front(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(saved_recording_state);
    return result;
};


RUR.control.front_is_clear = function(robot){
    var position, next_x, next_y;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    position = RUR.get_position_in_front(robot);
    next_x = position.x;
    next_y = position.y;

    if (RUR.is_fatal_position(next_x, next_y, robot) &&
        RUR.is_detectable_position(next_x, next_y)) {
        return false;
    }

    return true;
};

RUR.control.right_is_clear = function(robot){
    var result, saved_recording_state;
    saved_recording_state = RUR._recording_(false);
    RUR.control.__turn_right(robot);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot);
    RUR._recording_(saved_recording_state);
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
    var default_robot;
    robot.model = model;
    default_robot = RUR.get_current_world().robots[0];
    if (default_robot.__id == robot.__id) {
        RUR.user_selected_model = undefined;  // overrides the user's choice
    }
    RUR.record_frame("set_model", robot.__id);
 };

/** @function set_model
 * @memberof RUR
 * @instance
 * @summary This function, intended for world creators, allow to set the
 * model for the default robot, overriding the user's default choice.
 *
 *  @param {string} model The name of the model
 */

RUR.set_model = function(model){
    var robot;
    robot = RUR.get_current_world().robots[0];
    robot.model = model;
    RUR.user_selected_model = undefined;  // overrides the user's choice
    RUR.record_frame("RUR.set_model", robot.__id);
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
