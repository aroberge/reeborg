/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.control = {};

RUR.control.move = function (robot) {
    var tile;
    if (!RUR.control.front_is_clear(robot, true)) {
        throw new RUR.ReeborgError(RUR.translate("Ouch! I hit a wall!"));
    }
    if ((robot.y === RUR.ROWS && robot.orientation === RUR.NORTH) ||
        (robot.x === RUR.COLS && robot.orientation === RUR.EAST)) {
        throw new RUR.ReeborgError(RUR.translate("I am afraid of the void!"));
    }
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    switch (robot.orientation){
    case RUR.EAST:
        robot.x += 1;
        break;
    case RUR.NORTH:
        robot.y += 1;
        break;
    case RUR.WEST:
        robot.x -= 1;
        break;
    case RUR.SOUTH:
        robot.y -= 1;
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.control.move().");
    }
    RUR.control.sound_id = "#move-sound";
    RUR.rec.record_frame("debug", "RUR.control.move");

    tile = RUR.control.get_tile_at_position(robot.x, robot.y);
    if (tile) {
        if (tile.fatal){
            throw new RUR.ReeborgError(tile.message);
        }
        if (tile.slippery){
            RUR.control.write(tile.message + "\n");
            RUR.control.move(robot);
        }
    }
};

RUR.control.turn_left = function(robot, no_frame){
    "use strict";
    robot._prev_orientation = robot.orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot.orientation += 1;  // could have used "++" instead of "+= 1"
    robot.orientation %= 4;
    if (no_frame) return;
    RUR.control.sound_id = "#turn-sound";
    RUR.rec.record_frame("debug", "RUR.control.turn_left");
};

RUR.control.__turn_right = function(robot, no_frame){
    "use strict";
    robot._prev_orientation = (robot.orientation+2)%4; // fix so that oil trace looks right
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot.orientation += 3;
    robot.orientation %= 4;
    if (no_frame) return;
    RUR.rec.record_frame("debug", "RUR.control.__turn_right");
};

RUR.control.pause = function (ms) {
    RUR.rec.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    throw new RUR.ReeborgError(RUR.translate("Done!"));
};

RUR.control.put = function(robot, arg){
    RUR.control.sound_id = "#put-sound";

    arg = RUR.translate_to_english(arg);
    if (["triangle", "square", "star"].indexOf(arg) === -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
    }
    if (robot[RUR.translate(arg)] === 0){
        throw new RUR.ReeborgError(RUR.translate("I don't have any object to put down!").supplant({shape:arg}));
    } else if (RUR.control.object_here(robot, true) !== 0) {
        throw new RUR.ReeborgError(RUR.translate("There is already something here."));
    }
    robot[RUR.translate(arg)] -= 1;
    RUR.control._put_object(robot, arg);
};

RUR.control._put_object = function (robot, obj) {
    RUR.we.ensure_key_exist(RUR.current_world, "objects");
    RUR.current_world.objects[robot.x + "," + robot.y] = obj;
    RUR.rec.record_frame("debug", "RUR.control._put_object");
};


RUR.control.take = function(robot, arg){
    RUR.control.sound_id = "#take-sound";

    arg = RUR.translate_to_english(arg);
    if (["token", "triangle", "square", "star"].indexOf(arg) === -1){
        throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
    }
    if (RUR.control.object_here(robot, true) !== arg) {
        throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: arg}));
    }
    robot[RUR.translate(arg)] += 1;
    RUR.control._take_object(robot, RUR.translate(arg));
};

RUR.control._take_object = function (robot, obj) {
    delete RUR.current_world.objects[robot.x + "," + robot.y];
    RUR.rec.record_frame("debug", "RUR.control._take_object");
};


RUR.control.is_wall_at = function (coords, orientation) {
    if (RUR.current_world.walls === undefined) {
        return false;
    }
    if (RUR.current_world.walls[coords] !== undefined){
        if (RUR.current_world.walls[coords].indexOf(orientation) !== -1) {
            return true;
        }
    }
    return false;
};

RUR.control.build_wall = function (robot){
    var coords, orientation, x, y, walls;
    if (!RUR.control.front_is_clear(robot)){
        throw new RUR.ReeborgError(RUR.translate("There is already a wall here!"));
    }

    switch (robot.orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        orientation = "east";
        x = robot.x;
        y = robot.y;
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        orientation = "north";
        x = robot.x;
        y = robot.y;
        break;
    case RUR.WEST:
        orientation = "east";
        x = robot.x-1;
        y = robot.y;
        break;
    case RUR.SOUTH:
        orientation = "north";
        x = robot.x;
        y = robot.y-1;
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.build_wall().");
    }

    coords = x + "," + y;
    walls = RUR.current_world.walls;
    if (walls === undefined){
        walls = {};
        RUR.current_world.walls = {};
    }

    if (walls[coords] === undefined){
        walls[coords] = [orientation];
    } else {
        walls[coords].push(orientation);
    }
    RUR.control.sound_id = "#build-sound";
    RUR.rec.record_frame("debug", "RUR.control.build_wall");
};

RUR.control.front_is_clear = function(robot, flag){
    var coords;
    if (!flag) {
        RUR.rec.record_frame("debug", "RUR.control.front_is_clear");
    }
    switch (robot.orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        if (RUR.control.is_wall_at(coords, "east")) {
            return false;
        }
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        if (RUR.control.is_wall_at(coords, "north")) {
            return false;
        }
        break;
    case RUR.WEST:
        if (robot.x===1){
            return false;
        } else {
            coords = (robot.x-1) + "," + robot.y; // do math first before building strings
            if (RUR.control.is_wall_at(coords, "east")) {
                return false;
            }
        }
        break;
    case RUR.SOUTH:
        if (robot.y===1){
            return false;
        } else {
            coords = robot.x + "," + (robot.y-1);  // do math first before building strings
            if (RUR.control.is_wall_at(coords, "north")) {
                return false;
            }
        }
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.front_is_clear().");
    }
    return true;
};

RUR.control.right_is_clear = function(robot){
    var result;
    RUR.control.__turn_right(robot, true);
    result = RUR.control.front_is_clear(robot, true);
    RUR.control.turn_left(robot, true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    RUR.rec.record_frame("debug", "RUR.control.is_facing_north");
    return robot.orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    RUR.rec.delay = delay;
    RUR.rec.record_frame("debug", "RUR.control.think");
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.current_world.goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
             RUR.rec.record_frame("debug", "RUR.control.at_goal");
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};

RUR.control.object_here = function (robot, do_not_record) {
    var coords = robot.x + "," + robot.y;
    if (!do_not_record) {
        RUR.rec.record_frame("debug", "RUR.control.object_here");
    }

    if (RUR.current_world.objects === undefined) {
        return 0;
    }
    return RUR.translate_to_english(RUR.current_world.objects[coords]) || 0;
};

RUR.control.write = function () {
    RUR.control.sound_id = "#write-sound";
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        output_string += arguments[i].toString();
  }
    RUR.rec.record_frame("output", {"element": "#stdout", "message": output_string});
};

RUR.control.sound_flag = false;
RUR.control.sound = function(on){
    if(!on){
        RUR.control.sound_flag = false;
        return;
    }
    RUR.control.sound_flag = true;
};

RUR.control.sound_id = undefined;
RUR.control.play_sound = function (sound_id) {
    var current_sound;
    current_sound = $(sound_id)[0];
    current_sound.load();
    current_sound.play();
};


RUR.control.get_tile_at_position = function (x, y) {
    var coords = x + "," + y;
    if (RUR.current_world.tiles === undefined) return false;
    if (RUR.current_world.tiles[coords] === undefined) return false;
    return RUR.tiles[RUR.current_world.tiles[coords]];
};