/* This function does not need to be documented as it should be called by
   other functions instead of being called directly.
*/

require("./../recorder.js");

RUR._add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    RUR.current_world.robots.push(robot);
    RUR.record_frame();
};
