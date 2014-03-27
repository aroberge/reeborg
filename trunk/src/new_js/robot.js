/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.__create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.prev_x = robot.x;
    robot.prev_y = robot.y;
    robot.tokens = tokens || 0;
    robot._is_leaky = true;
    // the following can only be found in the world
    robot.triangles = 0;
    robot.squares = 0;
    robot.stars = 0;
    robot.__id = -1;  // id of -1 means inactive robot which could be removed.

    if (orientation === undefined){
        robot.orientation = RUR.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case RUR.translation.east:
            robot.orientation = RUR.EAST;
            break;
        case "n":
        case RUR.translation.north:
            robot.orientation = RUR.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            robot.orientation = RUR.WEST;
            break;
        case "s":
        case RUR.translation.south:
            robot.orientation = RUR.SOUTH;
            break;
        default:
            throw new RUR.Error(RUR.translation["Unknown orientation for robot."]);
        }
    }
    robot.prev_orientation = robot.orientation;
    return robot;
};

RUR.__clone_robot = function (robot) {
    return JSON.parse(JSON.stringify(robot));
};

RUR.__destroy_robot = function (robot) {
    robot.__id = -1;
};



