require("./../drawing/visible_world.js");
require("./../rur.js");

// Returns a random integer between min and max (both included)
randint = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/** @function world_init
 * @memberof RUR
 * @instance
 * @summary This function is called automatically just before a program is run.
 * It identifies which objects (including goals) are initially assigned unknown
 * random values, and assigns the required values.  A world creator should
 * never need to call this function.
 *
 */
RUR.world_init = function () {
    "use strict";
    var coords, i, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};
    var world = RUR.get_current_world();

   // First, deal with objects

    if (world.objects !== undefined){
        objects = world.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb.toString().indexOf("-") != -1){
                            range = nb.split("-");
                            nb = randint(parseInt(range[0], 10), parseInt(range[1], 10));
                            if (nb !== 0){
                                objects_here[obj] = nb;
                            } else {
                                delete objects_here[obj];
                            }
                        }
                        if (total_nb_objects[obj] === undefined){
                            if (parseInt(nb, 10) !== 0) {
                                total_nb_objects[obj] = parseInt(nb, 10);
                            }
                        } else {
                            total_nb_objects[obj] += parseInt(nb, 10);
                        }
                    }
                }
                if (Object.keys(world.objects[coords]).length === 0){
                    delete world.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (world.goal !== undefined &&
        world.goal.objects !== undefined){
        objects = world.goal.objects;
        for (coords in objects){
            if (objects.hasOwnProperty(coords)){
                objects_here = objects[coords];
                for (obj in objects_here){
                    if (objects_here.hasOwnProperty(obj)){
                        nb = objects_here[obj];
                        if (nb == "all") {
                            try {
                                if (total_nb_objects[obj] !== undefined) {
                                    objects_here[obj] = total_nb_objects[obj];
                                } else {
                                    delete objects[coords][obj];
                                }
                            } catch (e) {
                                $("#world-info-button").click();
                                $("#World-info").html("<b>Warning</b> Trying to assign a goal when no corresponding objects are found in the world.");
                            }
                        }
                    }
                }
                if (Object.keys(world.goal.objects[coords]).length === 0){
                    delete world.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    // we can have many robots, with randomly chosen positions
    if (world.robots !== undefined && world.robots.length >= 1){
        for (i=0; i < world.robots.length; i++){
            robot = world.robots[i];
            if (robot.possible_initial_positions !== undefined) {
                position = robot.possible_initial_positions[randint(0, robot.possible_initial_positions.length-1)];
                robot.x = position[0];
                robot.y = position[1];
                robot._prev_x = robot.x;
                robot._prev_y = robot.y;
                delete robot.possible_initial_positions;
            }
            if (robot._orientation == RUR.RANDOM_ORIENTATION){
                robot._orientation = randint(0, 3);
                robot._prev_orientation = robot._orientation;
            }
            robot.initial_position = [robot.x, robot.y]; // used for RUR.check_path
        }
    }
    if (world.goal !== undefined &&
        world.goal.possible_final_positions !== undefined &&
        world.goal.possible_final_positions.length > 1) {
        goal = world.goal;
        position = goal.possible_final_positions[randint(0, goal.possible_final_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_final_positions;
    }
    RUR.vis_world.draw_all(); // draw_all instead of refresh in case
                              // small_tiles was set in the meantime
};
