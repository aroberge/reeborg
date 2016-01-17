
/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

require("./constants.js");
require("./translator.js");
require("./exceptions.js");

RUR.robot = {};

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.objects = {};
    if (tokens !== undefined && tokens > 0){
        robot.objects.token = tokens;
    }

    if (orientation === undefined){
        robot._orientation = RUR.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case RUR.translation.east:  /*TODO: see if we can get rid of this
                                            and have incoming in English */
            robot._orientation = RUR.EAST;
            break;
        case "n":
        case RUR.translation.north:
            robot._orientation = RUR.NORTH;
            break;
        case "w":
        case RUR.translation.west:
            robot._orientation = RUR.WEST;
            break;
        case "s":
        case RUR.translation.south:
            robot._orientation = RUR.SOUTH;
            break;
        default:
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
        }
    }

    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot._orientation;

    return robot;
};

RUR.robot.cleanup_objects = function (robot) {
    "use strict";
    var obj_name, objects_carried = {};
    for (obj_name in robot.objects) {
        if (robot.objects.hasOwnProperty(obj_name)){
             if (robot.objects[obj_name] == "infinite" || robot.objects[obj_name] > 0){
                objects_carried[obj_name] = robot.objects[obj_name];
             }
        }
    }
    robot.objects = objects_carried;
    // handling legacy notation
    if (robot.orientation !== undefined){
        robot._orientation = robot.orientation;
        delete robot.orientation;
    }
};
