/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.world = {};

RUR.world.create_empty_world = function (blank_canvas) {
    "use strict";
    var world = {};
    if (blank_canvas) {
        world.blank_canvas = true;
        return world;
    }
    world.robots = [];
    world.walls = {};
    world.tokens = {};
    world.shapes = {};
    return world;
};
RUR.current_world = RUR.world.create_empty_world();

RUR.world.export_world = function () {
    return JSON.stringify(RUR.current_world, null, '   ');
};

RUR.world.import_world = function (json_string) {
    var robot;
    if (json_string === undefined){
        return {};
    }
    RUR.current_world = JSON.parse(json_string) || RUR.world.create_empty_world();
    if (RUR.current_world.robots !== undefined) {
        if (RUR.current_world.robots[0] !== undefined) {
            robot = RUR.current_world.robots[0];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            robot._prev_orientation = robot.orientation;
        }
    }
    RUR.world.saved_world = RUR.world.clone_world();
    RUR.vis_world.draw_all();
    if (RUR.we.editing_world) {
        RUR.we.change_edit_robot_menu();
    }
};

RUR.world.clone_world = function (world) {
    if (world === undefined) {
        return JSON.parse(JSON.stringify(RUR.current_world));
    } else {
        return JSON.parse(JSON.stringify(world));
    }
};

RUR.world.reset = function () {
    RUR.current_world = RUR.world.clone_world(RUR.world.saved_world);
    RUR.TRACE_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
    RUR.vis_world.refresh();
};

RUR.world.add_robot = function (robot) {
    robot.__id = RUR.current_world.robots.length;
    RUR.current_world.robots.push(robot);
};


RUR.world.is_wall_at = function (coords, orientation) {
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

RUR.world.front_is_clear = function(robot){
    var coords;
    switch (robot.orientation){
    case RUR.EAST:
        coords = robot.x + "," + robot.y;
        if (RUR.world.is_wall_at(coords, "east")) {
            return false;
        }
        break;
    case RUR.NORTH:
        coords = robot.x + "," + robot.y;
        if (RUR.world.is_wall_at(coords, "north")) {
            return false;
        }
        break;
    case RUR.WEST:
        if (robot.x===1){
            return false;
        } else {
            coords = (robot.x-1) + "," + robot.y; // do math first before building strings
            if (RUR.world.is_wall_at(coords, "east")) {
                return false;
            }
        }
        break;
    case RUR.SOUTH:
        if (robot.y===1){
            return false;
        } else {
            coords = robot.x + "," + (robot.y-1);  // do math first before building strings
            if (RUR.world.is_wall_at(coords, "north")) {
                return false;
            }
        }
        break;
    default:
        throw new RUR.Error("Should not happen: unhandled case in RUR.World.front_is_clear().");
    }
    return true;
};

RUR.world.right_is_clear = function(robot){
    var result;
    RUR.control.__turn_right(robot, true);
    result = RUR.world.front_is_clear(robot);
    RUR.control.turn_left(robot, true);
    return result;
};

