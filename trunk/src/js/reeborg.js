/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */

if (!Array.prototype.remove){
    // Array remove - By John Resig (MIT Licensed) from http://ejohn.org/blog/javascript-array-remove/
    Array.prototype.remove = function(from, to) {
        "use strict";
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}
/*
A world can be modified either by a graphical World Builder or via a JSON string - only the second is currently implemented.
*/

var RUR = RUR || {};

RUR.World = function () {
    "use strict";
    this.EAST = 0;
    this.NORTH = 1;
    this.WEST = 2;
    this.SOUTH = 3;

    this.reset = function (){
        this.robots = [];
        this.walls = {};
        this.frames = [];
    };
    this.reset();

    this.add_robot = function (robot) {
        this.robots.push(robot);
        this.add_frame();
    };

    this.move_robot = function(robot){
        switch (robot.orientation){
        case this.EAST:
            robot.x += 1;
            break;
        case this.NORTH:
            robot.y += 1;
            break;
        case this.WEST:
            if (robot.x===1){
                throw "Hit wall exception";
            } else {
                robot.x -= 1;
            }
            break;
        case this.SOUTH:
            if (robot.y===1){
                throw "Hit wall exception";
            } else {
                robot.y -= 1;
            }
            break;
        default:
            console.log("Should not happen: unhandled case in World__.move_robot().");
            console.log("robot.x= ", robot.x, " robot.y= ", robot.y, "robot.orientation= ", robot.orientation);
            throw "Should not happen: unhandled case in World__.move_robot().";
        }
        this.add_frame();
    };
    this.add_frame = function () {
        var i, robot, robots = [];
        for (i = 0; i < this.robots.length; i++){
            robot = {};
            robot.x = RUR.world.robots[i].x;
            robot.y = RUR.world.robots[i].y;
            robot.orientation = RUR.world.robots[i].orientation;
            robots.push(robot);
        }
        this.frames.push({robots: robots});
    };

    this.toggle_wall = function (x, y, orientation){
        var index, coords;
        coords = x + "," + y;
        if (this.walls[coords] === undefined){
            this.walls[coords] = [orientation];
        } else {
            index = this.walls[coords].indexOf(orientation);
            if (index === -1) {
                this.walls[coords].push(orientation);
            } else {
                this.walls[coords].remove(index);
                if (this.walls[coords].length === 0){
                    delete this.walls[coords];
                }
            }
        }
    };

    this.export_ = function (){
        var json_object;
        json_object = {"robots": this.robots, "walls": this.walls};
        return JSON.stringify(json_object);
    };

    this.import_ = function (json_string){
        var json_object, orientation, i;
        json_object = JSON.parse(json_string);
        this.robots = [];
        this.walls = json_object.walls;
        for (i = 0; i < json_object.robots.length; i++){
            switch(json_object.robots[i].orientation){
            case 0:
                orientation = "e";
                break;
            case 1:
                orientation = "n";
                break;
            case 2:
                orientation = "w";
                break;
            case 3:
                orientation = "s";
                break;
            }
            this.robots.push(new RUR.PrivateRobot(json_object.robots[i].x, json_object.robots[i].y,
                             orientation, json_object.robots[i].tokens));
        }
    };
};

RUR.world = new RUR.World();

RUR.PrivateRobot = function(x, y, orientation, tokens) {
    "use strict";
    this.x = x || 1;
    this.y = y || 1;
    this.tokens = tokens || 0;
    this.jetons = this.tokens;
    this.changed = true;

    if (orientation === undefined){
        this.orientation = RUR.world.EAST;
    } else {
        switch (orientation.toLowerCase()){
        case "e":
        case "east":
        case "est":
            this.orientation = RUR.world.EAST;
            break;
        case "n":
        case "north":
        case "nord":
            this.orientation = RUR.world.NORTH;
            break;
        case "w":
        case "o":
        case "west":
        case "ouest":
            this.orientation = RUR.world.WEST;
            break;
        case "s":
        case "south":
        case "sud":
            this.orientation = RUR.world.SOUTH;
            break;
        default:
            throw "Should not happen: unknown orientation";
            // TODO: turn this into a warning
        }
    }
};

RUR.PrivateRobot.prototype.turn_left = function(){
    "use strict";
    this.orientation += 1;
    this.orientation %= 4;
    RUR.world.add_frame();
};

RUR.PrivateRobot.prototype.tourne_à_gauche = RUR.PrivateRobot.prototype.turn_left;

RUR.PrivateRobot.prototype.move = function(){
    "use strict";
    RUR.world.move_robot(this);
};

RUR.PrivateRobot.prototype.avance = RUR.PrivateRobot.prototype.move;

function UsedRobot(x, y, orientation, tokens)  {
    "use strict";
    var robot = new RUR.PrivateRobot(x, y, orientation, tokens);
    RUR.world.add_robot(robot);
    return robot;
}

var RobotUsagé = UsedRobot;