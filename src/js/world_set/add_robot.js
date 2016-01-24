require("./../recorder/record_frame.js");

/** @function _add_robot
 * @memberof RUR.private
 * @instance
 * @summary Adds a robot to the world.  Should _never_ be called directly.
 *
 * @param {object} robot - a robot "body"
 *
 */

RUR._add_robot = function (robot) {
    if (RUR.current_world.robots === undefined){
        RUR.current_world.robots = [];
    }
    RUR.current_world.robots.push(robot);
    RUR.record_frame();
};
