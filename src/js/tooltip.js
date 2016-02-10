/* Intended to provide information about objects carried by robot */
require("./rur.js");
require("./world_editor.js");

RUR.tooltip = {};

RUR.tooltip.init = function () {  // call in zzz.doc_ready.js
    RUR.tooltip.canvas = document.getElementById("tooltip");
    RUR.tooltip.ctx = RUR.tooltip.canvas.getContext("2d");

    // request mousemove events
    $("#robot-canvas").mousemove(function (evt) {
        RUR.mouse_x = evt.pageX;
        RUR.mouse_y = evt.pageY;
        RUR.tooltip.handleMouseMove(evt);
    });
};


RUR.tooltip.handleMouseMove = function handleMouseMove(evt) {
    var x, y, hit, position, world, robot, mouse_above_robot, image, nb_obj;
    var size = 40, objects_carried;

    world = RUR.CURRENT_WORLD;
    x = evt.pageX - $("#robot-canvas").offset().left;
    y = evt.pageY - $("#robot-canvas").offset().top;
    position = RUR.we.calculate_grid_position();
    RUR.tooltip.canvas.style.left = "-200px";
    if (!RUR.we.mouse_contained_flag) {
        return;
    }

    //mouse_above_robot = false;
    if (world.robots !== undefined) {
        for (i=0; i < world.robots.length; i++) {
            robot = world.robots[i];
            if (robot.start_positions === undefined) {
                robot.start_positions = [[robot.x, robot.y]];
            }
            for (j=0; j < robot.start_positions.length; j++){
                pos = robot.start_positions[j];
                if(pos[0]==position[0] && pos[1]==position[1]){
                    mouse_above_robot = true;
                    if (robot.objects !== undefined){
                        objects_carried = Object.keys(robot.objects);
                        break;
                    }
                }
            }
            if (mouse_above_robot) {
                break;
            }
        }
    }

    RUR.tooltip.canvas.height = size;
    if (objects_carried !== undefined) {
        RUR.tooltip.canvas.width = size*Math.max(objects_carried.length, 1);
    } else {
        RUR.tooltip.canvas.width = size;
        objects_carried = [];
    }
    if (mouse_above_robot){
        RUR.tooltip.canvas.style.left = x+20 + "px";
        RUR.tooltip.canvas.style.top = y + "px";
        RUR.tooltip.ctx.clearRect(0, 0, RUR.tooltip.canvas.width, RUR.tooltip.canvas.height);
        for (i=0; i < objects_carried.length; i++){
            image = RUR.OBJECTS[objects_carried[i]].image;
            nb_obj = robot.objects[objects_carried[i]];
            if (nb_obj == "infinite" || nb_obj == Infinity) {
                nb_obj = "∞";
            }
            RUR.tooltip.ctx.drawImage(image, i*size, 0, image.width, image.height);
            RUR.tooltip.ctx.fillText(nb_obj, i*size+1, size-1);
        }
    }
};
