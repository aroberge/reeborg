/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR */

RUR.control = {};

RUR.control.move = function (robot) {
    "use strict";
    var tile, tiles, tilename, tile_beyond, solid_tile_beyond,
        top_tiles_beyond, solid_top_tile_beyond,
        pushable_object_here, pushable_object_beyond,
        wall_beyond, x_beyond, y_beyond;

    if (RUR.control.wall_in_front(robot)) {
        throw new RUR.ReeborgError(RUR.translate("Ouch! I hit a wall!"));
    }

    robot._prev_x = robot.x;
    robot._prev_y = robot.y;

    x_beyond = robot.x;  // if robot is moving vertically, it x coordinate does not change
    y_beyond = robot.y;

    switch (robot.orientation){
    case RUR.EAST:
        robot.x += 1;
        x_beyond = robot.x + 1;
        break;
    case RUR.NORTH:
        robot.y += 1;
        y_beyond = robot.y + 1;
        break;
    case RUR.WEST:
        robot.x -= 1;
        x_beyond = robot.x - 1;
        break;
    case RUR.SOUTH:
        robot.y -= 1;
        y_beyond = robot.y - 1;
        break;
    default:
        throw new Error("Should not happen: unhandled case in RUR.control.move().");
    }

    pushable_object_here = RUR.control.pushable_object_here(robot.x, robot.y);

    if (pushable_object_here) {
        // we had assume that we have made a successful move as nothing was
        // blocking the robot which is now at its next position.
        // However, something may have prevented the pushable object from
        // actually being pushed
        wall_beyond = RUR.control.wall_in_front(robot);
        pushable_object_beyond = RUR.control.pushable_object_here(x_beyond, y_beyond);
        tile_beyond = RUR.control.get_tile_at_position(x_beyond, y_beyond);
        if (tile_beyond && tile_beyond.solid) {
            solid_tile_beyond = true;
            } else {
            solid_tile_beyond = false;
        }

        top_tiles_beyond = RUR.control.get_top_tiles_at_position(x_beyond, y_beyond);
        solid_top_tile_beyond = false;
        if (top_tiles_beyond) {
            for (tilename in top_tiles_beyond) {
                if (RUR.top_tiles[tilename] !== undefined && RUR.top_tiles[tilename].solid) {
                    solid_top_tile_beyond = true;
                    break;
                }
            }
        }

        if (pushable_object_beyond || wall_beyond || solid_tile_beyond || solid_top_tile_beyond) {
            robot.x = robot._prev_x;
            robot.y = robot._prev_y;
            throw new RUR.ReeborgError(RUR.translate("Something is blocking the way!"));
        } else {
            RUR.control.move_object(pushable_object_here, robot.x, robot.y,
            x_beyond, y_beyond);
        }
    }

    RUR.control.sound_id = "#move-sound";
    RUR.rec.record_frame("debug", "RUR.control.move");

    tile = RUR.control.get_tile_at_position(robot.x, robot.y);
    if (tile) {
        if (tile.fatal){
            if (tile == RUR.tiles.water && RUR.control.top_tile_here(robot, RUR.translate("bridge"))) {
                RUR.control.write(RUR.translate("Useful bridge here!") + "\n");
            } else {
                throw new RUR.ReeborgError(tile.message);
            }
        }
        if (tile.slippery){
            RUR.control.write(tile.message + "\n");
            RUR.control.move(robot);
        }
    }

    tiles = RUR.control.get_top_tiles_at_position(robot.x, robot.y);
    if (tiles) {
        for (tilename in tiles) {
            if (RUR.top_tiles[tilename] !== undefined && RUR.top_tiles[tilename].fatal) {
                robot.x = robot._prev_x;
                robot.y = robot._prev_y;
                throw new RUR.ReeborgError(RUR.top_tiles[tilename].message);
            }
        }
    }
};

RUR.control.move_object = function(obj, x, y, to_x, to_y){
    "use strict";
    var bridge_already_there = false;
    if (RUR.control.get_top_tiles_at_position(to_x, to_y).bridge !== undefined){
        bridge_already_there = true;
    }


    RUR.we.add_object(obj, x, y, 0);
    if (RUR.objects[obj].in_water &&
        RUR.control.get_tile_at_position(to_x, to_y) == RUR.tiles.water &&
        !bridge_already_there){
        RUR.we.add_top_tile(RUR.objects[obj].in_water, to_x, to_y, 1);
    } else {
        RUR.we.add_object(obj, to_x, to_y, 1);
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
    var translated_arg, objects_carried, obj_type, all_objects;
    RUR.control.sound_id = "#put-sound";

    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.objects.known_objects.indexOf(translated_arg) == -1){
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
    if (robot.objects != "infinite") {
        robot.objects[obj] -= 1;
        if (robot.objects[obj] === 0) {
            delete robot.objects[obj];
        }
    }

    RUR.we.ensure_key_exist(RUR.current_world, "objects");
    coords = robot.x + "," + robot.y;
    RUR.we.ensure_key_exist(RUR.current_world.objects, coords);
    if (RUR.current_world.objects[coords][obj] === undefined) {
        RUR.current_world.objects[coords][obj] = 1;
    } else {
        RUR.current_world.objects[coords][obj] += 1;
    }
    RUR.rec.record_frame("debug", "RUR.control._put_object");
};


RUR.control.take = function(robot, arg){
    var translated_arg, objects_here;
    RUR.control.sound_id = "#take-sound";
    if (arg !== undefined) {
        translated_arg = RUR.translate_to_english(arg);
        if (RUR.objects.known_objects.indexOf(translated_arg) == -1){
            throw new RUR.ReeborgError(RUR.translate("Unknown object").supplant({obj: arg}));
        }
    }

    objects_here = RUR.control.object_here(robot, arg);
    if (arg !== undefined) {
        if (objects_here.length === 0 || objects_here == false) {
            throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: arg}));
        }  else {
            RUR.control._take_object_and_give_to_robot(robot, translated_arg);
        }
    }  else if (objects_here.length === 0 || objects_here == false){
        throw new RUR.ReeborgError(RUR.translate("No object found here").supplant({obj: RUR.translate("object")}));
    }  else if (objects_here.length > 1){
        throw new RUR.ReeborgError(RUR.translate("Many objects are here; I do not know which one to take!"));
    } else {
        RUR.control._take_object_and_give_to_robot(robot, objects_here[0]);
    }
};

RUR.control._take_object_and_give_to_robot = function (robot, obj) {
    var objects_here, coords;
    coords = robot.x + "," + robot.y;
    RUR.current_world.objects[coords][obj] -= 1;

    if (RUR.current_world.objects[coords][obj] == 0){
        delete RUR.current_world.objects[coords][obj];
        // WARNING: do not change this silly comparison to false
        // to anything else ... []==false is true  but []==[] is false
        // and ![] is false
        if (RUR.control.object_here(robot) == false){
            delete RUR.current_world.objects[coords];
        }
    }
    RUR.we.ensure_key_exist(robot, "objects");
    if (robot.objects[obj] === undefined){
        robot.objects[obj] = 1;
    } else if (robot.objects[obj] == "infinite") {
        return;
    } else {
        robot.objects[obj]++;
    }
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


RUR.control.wall_in_front = function (robot) {
    var coords;
    switch (robot.orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        if (robot.x == RUR.COLS){
            return true;
        }
        if (RUR.control.is_wall_at(coords, "east")) {
            return true;
        }
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        if (robot.y == RUR.ROWS){
            return true;
        }
        if (RUR.control.is_wall_at(coords, "north")) {
            return true;
        }
        break;
    case RUR.WEST:
        if (robot.x===1){
            return true;
        } else {
            coords = (robot.x-1) + "," + robot.y; // do math first before building strings
            if (RUR.control.is_wall_at(coords, "east")) {
                return true;
            }
        }
        break;
    case RUR.SOUTH:
        if (robot.y===1){
            return true;
        } else {
            coords = robot.x + "," + (robot.y-1);  // do math first before building strings
            if (RUR.control.is_wall_at(coords, "north")) {
                return true;
            }
        }
        break;
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.wall_in_front().");
    }
    return false;
};

RUR.control.tile_in_front = function (robot) {
    // returns single tile
    switch (robot.orientation){
    case RUR.EAST:
        return RUR.control.get_tile_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.control.get_tile_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.control.get_tile_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.control.get_tile_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.tile_in_front().");
    }
};


RUR.control.top_tiles_in_front = function (robot) {
    // returns list of tiles
    switch (robot.orientation){
    case RUR.EAST:
        return RUR.control.get_top_tiles_at_position(robot.x+1, robot.y);
    case RUR.NORTH:
        return RUR.control.get_top_tiles_at_position(robot.x, robot.y+1);
    case RUR.WEST:
        return RUR.control.get_top_tiles_at_position(robot.x-1, robot.y);
    case RUR.SOUTH:
        return RUR.control.get_top_tiles_at_position(robot.x, robot.y-1);
    default:
        throw new RUR.ReeborgError("Should not happen: unhandled case in RUR.control.top_tiles_in_front().");
    }
};


RUR.control.front_is_clear = function(robot){
    var tile, tiles, tilename;
    if( RUR.control.wall_in_front(robot)) {
        return false;
    }
    tile = RUR.control.tile_in_front(robot);
    if (tile) {
        if (tile.detectable && tile.fatal){
                if (tile == RUR.tiles.water) {
                    if (!RUR.control._bridge_present(robot)){
                        return false;
                    }
                } else {
                    return false;
                }
        }
    }

    tiles = RUR.control.top_tiles_in_front(robot);
    if (tiles) {
        for (tilename in tiles) {
            if (RUR.top_tiles[tilename] !== undefined &&
                RUR.top_tiles[tilename].detectable &&
                RUR.top_tiles[tilename].fatal) {
                return false
            }
        }
    }

    return true;
};


RUR.control._bridge_present = function(robot) {
    var tiles, tilename;
        tiles = RUR.control.top_tiles_in_front(robot);
    if (tiles) {
        for (tilename in tiles) {
            if (tilename == "bridge") {
                return true;
            }
        }
    }
    return false;
}


RUR.control.right_is_clear = function(robot){
    var result;
    RUR.control.__turn_right(robot, true);
    result = RUR.control.front_is_clear(robot);
    RUR.control.turn_left(robot, true);
    return result;
};

RUR.control.is_facing_north = function (robot) {
    return robot.orientation === RUR.NORTH;
};

RUR.control.think = function (delay) {
    RUR.rec.delay = delay;
};

RUR.control.at_goal = function (robot) {
    var goal = RUR.current_world.goal;
    if (goal !== undefined){
        if (goal.position !== undefined) {
            return (robot.x === goal.position.x && robot.y === goal.position.y);
        }
        throw new RUR.ReeborgError(RUR.translate("There is no position as a goal in this world!"));
    }
    throw new RUR.ReeborgError(RUR.translate("There is no goal in this world!"));
};

RUR.control.object_here = function (robot, obj) {

    var obj_here, obj_type, all_objects;
    var coords = robot.x + "," + robot.y;

    if (RUR.current_world.objects === undefined ||
        RUR.current_world.objects[coords] === undefined) {
        return [];
    }

    obj_here =  RUR.current_world.objects[coords];
    all_objects = [];


    for (obj_type in obj_here) {
        if (obj_here.hasOwnProperty(obj_type)) {
            if (obj !== undefined && obj_type == RUR.translate_to_english(obj)) {
                return [obj_type];
            }
            all_objects.push(RUR.translate(obj_type));
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
};

RUR.control.top_tile_here = function (robot, tile) {
    var tile_here, tile_type, all_top_tiles;
    var coords = robot.x + "," + robot.y;

    if (RUR.current_world.top_tiles === undefined ||
        RUR.current_world.top_tiles[coords] === undefined) {
        return false;
    }

    tile_here =  RUR.current_world.top_tiles[coords];

    for (tile_type in tile_here) {
        if (tile_here.hasOwnProperty(tile_type)) {
            if (tile!== undefined && tile_type == RUR.translate_to_english(tile)) {
                return true;
            }
        }
    }
    return false;
};


RUR.control.carries_object = function (robot, obj) {
    var obj_carried, obj_type, all_objects;

    if (robot === undefined || robot.objects === undefined) {
        return [];
    }

    obj_carried =  robot.objects;
    all_objects = [];

    for (obj_type in obj_carried) {
        if (obj_carried.hasOwnProperty(obj_type)) {
            all_objects.push(RUR.translate(obj_type));
            if (RUR.translate(obj_type) == obj){
                return [obj_type];
            }
        }
    }

    if (obj !== undefined) {
        return [];
    } else if (all_objects.length === 0){
        return [];
    } else {
        return all_objects;
    }
};

RUR.control.set_model = function(robot, model){
    robot.model = model;
    RUR.rec.record_frame();
 };

RUR.control.set_trace_color = function(robot, color){
    robot.trace_color = color;
 };


RUR.control.write = function () {
    var output_string = '';
    RUR.control.sound_id = "#write-sound";
    for (var i = 0; i < arguments.length; i++) {
        output_string += arguments[i].toString();
  }
    RUR.rec.record_frame("output", {"element": "#stdout", "message": output_string});
};

RUR.control._write = function () {
    var output_string = '';
    for (var i = 0; i < arguments.length; i++) {
        output_string += arguments[i].toString();
  }
    RUR.rec.record_frame("output", {"element": "#_write", "message": output_string});
};

RUR.control.narration = function (arg) {
    RUR.rec.record_frame("output", {"element": "#narrates", "message": arg, "html": true});
};

RUR.control.clear_print = function () {
    RUR.rec.record_frame("output", {"element": "#stdout", "message": '', "html": true, "other_element": "#narrates"});
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
    "use strict";
    var coords = x + "," + y;
    if (RUR.current_world.tiles === undefined) return false;
    if (RUR.current_world.tiles[coords] === undefined) return false;
    return RUR.tiles[RUR.current_world.tiles[coords]];
};

RUR.control.get_top_tiles_at_position = function (x, y) {
    "use strict";
    var coords = x + "," + y;
    if (RUR.current_world.top_tiles === undefined) return false;
    if (RUR.current_world.top_tiles[coords] === undefined) return false;
    return RUR.current_world.top_tiles[coords];
};


RUR.control.pushable_object_here = function(x, y) {
    "use strict";
    var objects_here, obj_here, obj_type, coords = x + ',' + y;
    if (RUR.current_world.objects === undefined) return false;
    if (RUR.current_world.objects[coords] === undefined) return false;
    objects_here = RUR.current_world.objects[coords];

    for (obj_type in objects_here) {
        if (objects_here.hasOwnProperty(obj_type)) {
            if (RUR.objects[obj_type].pushable) {
                return obj_type;
            }
        }
    }
};

RUR.control.set_max_nb_robots = function(nb){
    if (RUR.MAX_NB_ROBOTS !== undefined){
        throw new RUR.ReeborgError(RUR.translate("Cheater! You are not allowed to change the number of robots this way!"));
    } else {
        RUR.MAX_NB_ROBOTS = nb;
    }
};

RUR.control.get_world_map = function () {
    return JSON.stringify(RUR.current_world);
};
