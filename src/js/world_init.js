
require("./visible_world.js");
require("./constants.js");

RUR.world_init = {};

// Returns a random integer between min and max (both included)
randint = function (min, max, previous) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// assigns initial values
RUR.world_init.set = function () {
    "use strict";
    var coords, obj, objects, objects_here, nb, range, robot;
    var position, goal, total_nb_objects = {};

   // First, deal with objects

    if (RUR.current_world.objects !== undefined){
        objects = RUR.current_world.objects;
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
                if (Object.keys(RUR.current_world.objects[coords]).length === 0){
                    delete RUR.current_world.objects[coords];
                }
            }
        }
    }

    // then look for "goals" with "all" as value;

    if (RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.objects !== undefined){
        objects = RUR.current_world.goal.objects;
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
                if (Object.keys(RUR.current_world.goal.objects[coords]).length === 0){
                    delete RUR.current_world.goal.objects[coords];
                }
            }
        }
    }

    // next, initial position for robot
    if (RUR.current_world.robots !== undefined && RUR.current_world.robots.length == 1){
        robot = RUR.current_world.robots[0];
        if (robot.start_positions !== undefined) {
            position = robot.start_positions[randint(0, robot.start_positions.length-1)];
            robot.x = position[0];
            robot.y = position[1];
            robot._prev_x = robot.x;
            robot._prev_y = robot.y;
            delete robot.start_positions;
        }
        if (robot._orientation == -1){
            RUR.current_world.robots[0]._orientation = randint(0, 3);
            RUR.current_world.robots[0]._prev_orientation = RUR.current_world.robots[0]._orientation;
        }
    }

    // then final position for robot

    if (RUR.current_world.goal !== undefined &&
        RUR.current_world.goal.possible_positions !== undefined &&
        RUR.current_world.goal.possible_positions.length > 1) {
        goal = RUR.current_world.goal;
        position = goal.possible_positions[randint(0, goal.possible_positions.length-1)];
        goal.position.x = position[0];
        goal.position.y = position[1];
        delete goal.possible_positions;
    }
    if (RUR.current_world.goal !== undefined) {
        RUR.GOAL_CTX.clearRect(0, 0, RUR.WIDTH, RUR.HEIGHT);
        RUR.vis_world.draw_goal();
    }
    RUR.vis_world.refresh();
};
