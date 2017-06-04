require("./../recorder/record_frame.js");


RUR.add_robot = function (robot) {
    if (RUR.CURRENT_WORLD.robots === undefined){
        RUR.CURRENT_WORLD.robots = [];
    }
    if (robot == undefined) {
        robot = RUR.robot.create_robot();
    }
    RUR.CURRENT_WORLD.robots.push(robot);
    RUR.record_frame("RUR.add_robot", robot.__id);
};
