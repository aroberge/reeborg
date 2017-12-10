
require("./../rur.js");
require("./../translator.js");
require("./../programming_api/exceptions.js");
require("./../utils/validator.js");

RUR.robot = {};

RUR.robot.__ID = 1;

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var saved_model, robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.objects = {};
    if (tokens !== undefined){
        tokens = RUR.utils.filterInt(tokens);
        if (tokens > 0) {
            robot.objects.token = tokens;
        }
    }

    saved_model = localStorage.getItem("robot_default_model");
    if (saved_model !== undefined) {
        robot.model = saved_model;
    } else {
        robot.model = RUR.reeborg_default_model;
    }

    if (orientation === undefined){
        robot._orientation = RUR.EAST;
    } else {
        try {
            orientation = orientation.toLowerCase();
        } catch (e) {}
        switch (orientation){
        case "e":
        case RUR.translation.east:
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
        case "random":
            robot._orientation = RUR.RANDOM_ORIENTATION;
            break;
        default:
            throw new RUR.ReeborgError(RUR.translate("Unknown orientation for robot."));
        }
    }
    RUR.robot.set_private_defaults(robot);

    return robot;
};

RUR.robot.set_private_defaults = function(robot) {
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot._orientation;

    robot._trace_history = [];
    robot._trace_style = "default";
    robot._trace_color = RUR.DEFAULT_TRACE_COLOR;
    robot.__id = assign_id();
};

/* Robot definitions in World files has changed as
   new features were added; we make sure that they are properly
   updated when needed. This should be called when a world is
   imported. */
RUR.robot.modernize = function (robot) {
    "use strict";
    var obj_name, objects_carried = {};
    // In previous version, worlds were recorded with object nb == 0;
    // we need to remove such objects with the new notation.
    // i.e.  {"token": 0} --> {}
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

    RUR.robot.set_private_defaults(robot);
};

assign_id = function () {
    RUR.robot.__ID += 1;
    return RUR.robot.__ID;
};
