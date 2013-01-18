/*jshint browser:true, devel:true, indent:4, white:false */

// Array remove - By John Resig (MIT Licensed) from http://ejohn.org/blog/javascript-array-remove/
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

/*
A world can be modified either by a graphical World Builder or via a JSON string - only the second is currently implemented.
*/


function World () {
    this.EAST = 0;
    this.NORTH = 1;
    this.WEST = 2;
    this.SOUTH = 3;

    this.reset = function (){
        this.robots = [];
        this.needs_update = true;   // true indicates that we should redraw
        this.walls = {};
    };
    this.reset();

    this.add_robot = function (robot) {
        this.robots.push(robot);
        this.needs_update = true;
    };

    this.update = function(){
        this.needs_update = false;
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
                console.log("Should not happen: unhandled case in World.move_robot().");
                console.log("robot.x= ", robot.x, " robot.y= ", robot.y, "robot.orientation= ", robot.orientation);
                throw "Should not happen: unhandled case in World.move_robot().";
        }
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
        var json_object, orientation;
        json_object = JSON.parse(json_string);
        this.robots = [];
        this.walls = json_object.walls;
        for (var i = 0; i < json_object.robots.length; i++){
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
            this.robots.push(new __PrivateRobot(json_object.robots[i].x, json_object.robots[i].y,
                             orientation, json_object.robots[i].tokens));
        }
    };
}

var WORLD = new World();

function __PrivateRobot(x, y, orientation, tokens) {

    this.x = x || 1;
    this.y = y || 1;
    this.tokens = tokens || 0;
    this.jetons = this.tokens;
    this.changed = true;

    if (orientation === undefined){
        this.orientation = WORLD.EAST;
    } else {
        switch (orientation.toLowerCase()){
            case "e":
            case "east":
            case "est":
                this.orientation = WORLD.EAST;
                break;
            case "n":
            case "north":
            case "nord":
                this.orientation = WORLD.NORTH;
                break;
            case "w":
            case "o":
            case "west":
            case "ouest":
                this.orientation = WORLD.WEST;
                break;
            case "s":
            case "south":
            case "sud":
                this.orientation = WORLD.SOUTH;
                break;
            default:
                throw "Should not happen: unknown orientation";
                // TODO: turn this into a warning
        }
    }
}

__PrivateRobot.prototype.turn_left = function(){

    this.orientation += 1;
    this.orientation %= 4;
};

__PrivateRobot.prototype.tourne_à_gauche = __PrivateRobot.prototype.turn_left;

__PrivateRobot.prototype.move = function(){

    WORLD.move_robot(this);
};

__PrivateRobot.prototype.avance = __PrivateRobot.prototype.move;

function UsedRobot(x, y, orientation, tokens)  {

    var robot = new __PrivateRobot(x, y, orientation, tokens);
    WORLD.add_robot(robot);
    return robot;
}

var RobotUsagé = UsedRobot;
