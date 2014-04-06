/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR */

RUR.robot = {};
RUR.RobotFactory = {};

RUR.robot.create_robot = function (x, y, orientation, tokens) {
    "use strict";
    var robot = {};
    robot.x = x || 1;
    robot.y = y || 1;
    robot.tokens = tokens || 0;

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
    
    // private variables that should not be set directly in user programs.
    robot._is_leaky = true;
    robot._prev_x = robot.x;
    robot._prev_y = robot.y;
    robot._prev_orientation = robot.orientation;
    robot.triangle = 0; // can only be found in the world
    robot.square = 0;   // same
    robot.star = 0;     // same
    robot.__id = -1;
    return robot;
};



//function RobotFactory(x, y, o, t) {
//    UsedRobot.call(this, x, y, o, t);
//}
//RobotFactory.prototype = new UsedRobot();
//RobotFactory.constructor = RobotFactory;
//
//RobotFactory.prototype.right = function () {
//    RUR.control.__turn_right(this.robot);
//};
//var t = new RobotFactory(3, 3);
//t.move();
//t.right();
//t.move();
//t.move();

