/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.control = {};

RUR.control.move = function (robot) {
    if (!RUR.control.front_is_clear(robot)) {
        throw new RUR.Error(RUR.translation["Ouch! I hit a wall!"]);
    }
    if ((robot.y === RUR.ROWS && robot.orientation === RUR.NORTH) ||
        (robot.x === RUR.COLS && robot.orientation === RUR.EAST)) {
        throw new RUR.Error(RUR.translation["I am afraid of the void!"]);
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
    RUR.rec.record_frame();
};

RUR.control.turn_left = function(robot, no_frame){
    "use strict";
    robot._prev_orientation = robot.orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot.orientation += 1;
    robot.orientation %= 4;
    if (no_frame) return;
    RUR.rec.record_frame();
};

RUR.control.__turn_right = function(robot, no_frame){
    "use strict";
    robot._prev_orientation = robot.orientation;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot.orientation += 3;
    robot.orientation %= 4;
    if (no_frame) return;
    RUR.rec.record_frame();
};

RUR.control.pause = function (ms) {
    RUR.rec.record_frame("pause", {pause_time:ms});
};

RUR.control.done = function () {
    throw new RUR.Error(RUR.translation["Done!"]);
};

RUR.control.token_here = function (robot) {
    // returns the number of tokens at the location where the robot is
    var coords = robot.x + "," + robot.y;
    if (RUR.current_world.tokens === undefined) return 0;
    if (RUR.current_world.tokens[coords] === undefined) return 0;
    return RUR.current_world.tokens[coords];
};

RUR.control.put = function(robot, arg){
    if (arg === undefined || arg === RUR.translation.token) {
        RUR.control._put_token(robot);
    }
};

RUR.control._put_token = function (robot) {
    var token;
    if (robot.tokens === 0){
        throw new RUR.Error(RUR.translation["I don't have any token to put down!"]);
    }
    token = RUR.control.token_here(robot);
    RUR.we.ensure_key_exist(RUR.current_world, "tokens");
    RUR.current_world.tokens[robot.x + "," + robot.y] = token+1;
    if (typeof robot.tokens === typeof 42){  // robot could have "infinite" amount
        robot.tokens -= 1;
    }
    RUR.rec.record_frame();
};

RUR.control.has_token = function (robot) {
    if (robot.tokens !== 0) return true;
    return false;
};
RUR.control.take = function(robot, arg){
    if (arg === undefined || arg === RUR.translation.token) {
        RUR.control._take_token(robot);
    }
};

RUR.control._take_token = function (robot) {
    var token = RUR.control.token_here(robot);
    if (token === 0){
        throw new RUR.Error(RUR.translation["No token found here!"]);
    }
    token --;
    if (token > 0) {
        RUR.current_world.tokens[robot.x + "," + robot.y] = token;
    } else {
        delete RUR.current_world.tokens[robot.x + "," + robot.y];
    }
    if (typeof robot.tokens === typeof 42){  // robot could have "infinite" amount
        robot.tokens += 1;
    }
    RUR.rec.record_frame();
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
        throw new RUR.Error(RUR.translation["There is already a wall here!"]);
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
        throw new RUR.Error("Should not happen: unhandled case in RUR.control.build_wall().");
    }

    coords = x + "," + y;
    walls = RUR.current_world.walls;

    if (walls[coords] === undefined){
        walls[coords] = [orientation];
    } else {
        walls[coords].push(orientation);
    }
    RUR.rec.record_frame();
};

RUR.control.front_is_clear = function(robot){
    var coords;
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
        throw new RUR.Error("Should not happen: unhandled case in RUR.control.front_is_clear().");
    }
    return true;
};

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
        throw new RUR.Error(RUR.translation["There is no position as a goal in this world!"]);
    }
    throw new RUR.Error(RUR.translation["There is no goal in this world!"]);
};

RUR.control.at_goal_orientation = function (robot) {
    var goal = RUR.current_world.goal;
    if (goal !== undefined){
        if (goal.orientation !== undefined) {
            return (robot.orientation === goal.orientation);
        }
        throw new RUR.Error(RUR.translation["There is no orientation as a goal in this world!"]);
    }
    throw new RUR.Error(RUR.translation["There is no goal in this world!"]);
};

RUR.control.object_here = function (robot) {
    var coords = robot.x + "," + robot.y;
    if (RUR.control.token_here(robot) !== 0) {
        return RUR.translation.token;
    }
    
    if (RUR.current_world.shapes === undefined) {
        return 0;
    }
    return RUR.translation[RUR.current_world.shapes[coords]] || 0;
};
