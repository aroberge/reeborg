
require("./rur.js");
require("./translator.js");
require("./programming_ui/exceptions.js");
require("./utils/validator.js");

RUR.robot = {};

RUR.robot.__ID = 1;

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.objects = {};
    if (tokens !== undefined){
        tokens = RUR.utils.filterInt(tokens);
        if (tokens > 0) {
            robot.objects.token = tokens;
        }
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
    robot.__id = 0;
    }

    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot._orientation;

    robot._trace_history = [];
    robot._trace_style = "default";
    robot._trace_color = RUR.DEFAULT_TRACE_COLOR;

    return robot;
};

RUR.robot.cleanup_objects = function (robot) {
    "use strict";
    var obj_name, objects_carried = {};
    for (obj_name in robot.objects) {
        if (robot.objects.hasOwnProperty(obj_name)){
             if (robot.objects[obj_name] == "infinite" ||
                 robot.objects[obj_name] > 0){
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
    if (robot._trace_history === undefined) {
        robot._trace_history = [];
    }
    if (robot._trace_style === undefined) {
        robot._trace_style = "default";
    }
    if (robot._trace_color === undefined) {
        robot._trace_color = RUR.DEFAULT_TRACE_COLOR;
    }
    if (robot._is_leaky === undefined) {
        robot._is_leaky = true;
    }
};

RUR.robot.assign_id = function (robot) {
    robot.__id = RUR.robot.__ID;
    RUR.robot.__ID += 1;
};
