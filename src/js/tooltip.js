/* Author: André Roberge
   License: MIT  */

/*jshint browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals RUR, $, CodeMirror, ReeborgError, editor, library, removeHints, parseUri */

/* Intended to provide information about objects carried by robot */

RUR.tooltip = {};
RUR.tooltip.canvas = document.getElementById("tooltip");
RUR.tooltip.ctx = RUR.tooltip.canvas.getContext("2d");

// request mousemove events
$("#robot_canvas").mousemove(function (evt) {
    RUR.we.mouse_x = evt.pageX;
    RUR.we.mouse_y = evt.pageY;
    RUR.tooltip.handleMouseMove(evt);
});

RUR.tooltip.handleMouseMove = function handleMouseMove(evt) {
    var x, y, hit, position, world, robot, mouse_above_robot, image, nb_obj;
    var size = 40, objects_carried;

    world = RUR.current_world;
    x = evt.pageX - $("#robot_canvas").offset().left;
    y = evt.pageY - $("#robot_canvas").offset().top;
    position = RUR.we.calculate_grid_position();
    RUR.tooltip.canvas.style.left = "-200px";
    if (!RUR.we.mouse_contained_flag) {
        return;
    }

    mouse_above_robot = false;
    if (world.robots !== undefined) {
        for (i=0; i < world.robots.length; i++) {
            robot = world.robots[i];
            if (robot.start_positions === undefined) {
                robot.start_positions = [[robot.x, robot.y]];
            }
            for (j=0; j < robot.start_positions.length; j++){
                pos = robot.start_positions[j];
                if(pos[0]==position[0] && pos[1]==position[1] && robot.objects !== undefined){
                    mouse_above_robot = true;
                    objects_carried = Object.keys(robot.objects);
                    break;
                }
            }
            if (mouse_above_robot) {
                break;
            }
        }
    }

    if (mouse_above_robot){
        RUR.tooltip.canvas = document.getElementById("tooltip");
        RUR.tooltip.canvas.height = size;
        RUR.tooltip.canvas.width = size*objects_carried.length;
        RUR.tooltip.canvas.style.left = x+20 + "px";
        RUR.tooltip.canvas.style.top = y + "px";
        RUR.tooltip.ctx.clearRect(0, 0, RUR.tooltip.canvas.width, RUR.tooltip.canvas.height);
        for (i=0; i < objects_carried.length; i++){
            image = RUR.objects[objects_carried[i]].image;
            nb_obj = robot.objects[objects_carried[i]];
            if (nb_obj == "infinite") {
                nb_obj = "∞";
            }
            RUR.tooltip.ctx.drawImage(image, i*size, 0, image.width, image.height);
            RUR.tooltip.ctx.fillText(nb_obj, i*size+1, size-1);
        }
    }
};
