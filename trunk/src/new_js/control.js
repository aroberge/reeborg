/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.control = {};

RUR.control.move = function (robot) {
    if (!RUR.world.front_is_clear(robot)) {
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
        throw new Error("Should not happen: unhandled case in RUR.World.move_robot().");
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
