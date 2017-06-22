require("./../rur.js");
require("./../recorder/record_frame.js");


RUR.add_robot = function (robot) {
    var world = RUR.get_current_world();
    if (world.robots === undefined){
        world.robots = [];
    }
    if (robot == undefined) {
        robot = RUR.robot.create_robot();
    }
    world.robots.push(robot);
    RUR.record_frame("RUR.add_robot", robot.__id);
};
