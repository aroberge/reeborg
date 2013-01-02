function Universe () {
    this.reset = function (){
        this.robots = {};
        this.robot_counter = 0;
        this.needs_update = false;
    }
    this.reset();
    this.add_robot = function (robot) {
        this.robots["robot" + this.robot_counter] = robot;
        this.robot_counter++;
        this.needs_update = true;
    }
}
UNIVERSE = new Universe();

function UsedRobot(x, y, orientation, coins) {
    this.x = x || 1;
    this.y = y || 1;
    this.coins = coins || 0;
    this["pièces"] = this.coins;    // pièces de monnaie == coins
    this.changed = true;
    UNIVERSE.add_robot(this);

    if (orientation === undefined){
        this.orientation = 0;
    } else {
        switch (orientation.toLowerCase()){
            case "e":
            case "east":
            case "est":
                this.orientation = 0;
                break;
            case "n":
            case "north":
            case "nord":
                this.orientation = 1;
                break;
            case "w":
            case "o":
            case "west":
            case "ouest":
                this.orientation = 2;
                break;
            case "s":
            case "south":
            case "sud":
                this.orientation = 3;
                break;
            default:
                this.orientation = 0;
        }
    }
}

var RobotUsagé = UsedRobot;

UsedRobot.prototype.turn_left = function(){
    this.orientation += 1;
    this.orientation %= 4;
};

UsedRobot.prototype["tourne_à_gauche"] = UsedRobot.prototype.turn_left;

