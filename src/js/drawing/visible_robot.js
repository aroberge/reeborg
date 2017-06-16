
require("./../rur.js");
require("./../utils/validator.js");
require("./../world_utils/get_world.js");

RUR.vis_robot = {};
// limit to 10 models, from 0 to 9.
RUR.vis_robot.images = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

// we will keep track if we have loaded all images
RUR.vis_robot.loaded_images = 0;
RUR.vis_robot.nb_images = 0;

// elable changing defaults for unit tests or if put on different server location
RUR._BASE_URL = RUR._BASE_URL || '';


function set_images(robot) {
    var model = robot.model;
    RUR.vis_robot.images[model].robot_e_img = new Image();
    RUR.vis_robot.images[model].robot_e_img.src = robot.east;
    RUR.vis_robot.images[model].robot_n_img = new Image();
    RUR.vis_robot.images[model].robot_n_img.src = robot.north;
    RUR.vis_robot.images[model].robot_w_img = new Image();
    RUR.vis_robot.images[model].robot_w_img.src = robot.west;
    RUR.vis_robot.images[model].robot_s_img = new Image();
    RUR.vis_robot.images[model].robot_s_img.src = robot.south;
    if (robot.random) {
        RUR.vis_robot.images[model].robot_random_img = new Image();
        RUR.vis_robot.images[model].robot_random_img.src = robot.random;
    }
}


RUR.reset_default_robot_images = function () {
    // classic
    set_images({model: 0,
        east: RUR._BASE_URL + '/src/images/robot_e.png',
        north: RUR._BASE_URL + '/src/images/robot_n.png',
        west: RUR._BASE_URL + '/src/images/robot_w.png',
        south: RUR._BASE_URL + '/src/images/robot_s.png',
        random: RUR._BASE_URL + '/src/images/robot_random.png',
    });
    // 2d red rover
    set_images({model: 1,
        east: RUR._BASE_URL + '/src/images/rover_e.png',
        north: RUR._BASE_URL + '/src/images/rover_n.png',
        west: RUR._BASE_URL + '/src/images/rover_w.png',
        south: RUR._BASE_URL + '/src/images/rover_s.png',
        random: RUR._BASE_URL + '/src/images/rover_random.png',
    });
    // 3d red rover
    set_images({model: 2,
        east: RUR._BASE_URL + '/src/images/plain_e.png',
        north: RUR._BASE_URL + '/src/images/plain_n.png',
        west: RUR._BASE_URL + '/src/images/plain_w.png',
        south: RUR._BASE_URL + '/src/images/plain_s.png',
        random: RUR._BASE_URL + '/src/images/robot_random.png',
    });
    // solar panel
    set_images({model: 3,
        east: RUR._BASE_URL + '/src/images/sp_e.png',
        north: RUR._BASE_URL + '/src/images/sp_n.png',
        west: RUR._BASE_URL + '/src/images/sp_w.png',
        south: RUR._BASE_URL + '/src/images/sp_s.png',
        random: RUR._BASE_URL + '/src/images/robot_random.png'
    });

    $("#robot0 img").attr("src", RUR.vis_robot.images[0].robot_e_img.src);
    $("#robot1 img").attr("src", RUR.vis_robot.images[1].robot_e_img.src);
    $("#robot2 img").attr("src", RUR.vis_robot.images[2].robot_e_img.src);
    $("#robot3 img").attr("src", RUR.vis_robot.images[3].robot_e_img.src);
    RUR.select_default_robot_model(localStorage.getItem("robot_default_model"));
};

RUR.vis_robot.style = 0;

RUR.select_default_robot_model = function (arg) {
    var style;
    style = parseInt(arg, 10);
    if ( !(style ===0 || style==1 || style==2 || style==3)){
        style = 0;
    }
    RUR.vis_robot.style = style;
    RUR.vis_robot.e_img = RUR.vis_robot.images[style].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[style].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[style].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[style].robot_s_img;
    RUR.vis_robot.random_img = RUR.vis_robot.images[style].robot_random_img;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }

    localStorage.setItem("robot_default_model", style);
};
RUR.reset_default_robot_images();
// the following is to try to ensure that the images are loaded before the "final"
// original drawing is made

RUR.vis_robot.e_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.w_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.n_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.s_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;
RUR.vis_robot.random_img.onload = function () {
    RUR.vis_robot.loaded_images += 1;
};
RUR.vis_robot.nb_images += 1;

RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image;
    // handling legacy Code
    if (robot.orientation !== undefined) {
        robot._orientation = robot.orientation;
        robot.orientation = null;
    }
    if (!robot) {
        return;
    }
    if (robot.x > RUR.MAX_X || robot.y > RUR.MAX_Y) {
        return;
    }

    // all images are taken to be centered on a tile 40x40, which are scaled
    //  appropriately
    width = RUR.TILE_SIZE * RUR.SCALE;
    height = RUR.TILE_SIZE * RUR.SCALE;

    x = robot.x*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;
    y = RUR.HEIGHT - (robot.y+1)*RUR.WALL_LENGTH + RUR.WALL_THICKNESS/2;

    switch(robot._orientation){
        case RUR.EAST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_e_img;
            } else {
                image = RUR.vis_robot.e_img;
            }
            break;
        case RUR.NORTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_n_img;
            } else {
                image = RUR.vis_robot.n_img;
            }
            break;
        case RUR.WEST:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_w_img;
            } else {
                image = RUR.vis_robot.w_img;
            }
            break;
        case RUR.SOUTH:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_s_img;
            } else {
                image = RUR.vis_robot.s_img;
            }
            break;
        case -1:
            if (robot.model !== undefined){
                image = RUR.vis_robot.images[robot.model].robot_random_img;
            } else {
                image = RUR.vis_robot.random_img;
            }
            break;
        default:
            image = RUR.vis_robot.e_img;
        }
    RUR.ROBOT_CTX.drawImage(image, x, y, width, height);
    if (RUR.state.editing_world){
        return;
    }
    RUR.vis_robot.draw_trace_history(robot);
};


// TODO: extract to its own file, to reduce dependencies
RUR.vis_robot.update_trace_history = function (robot) {
    var offset, prev_offset, trace_segment={};
    // if we keep track of the trace during world editing tests,
    // it can end up saving a world with a trace history
    // defined.
    if (RUR.state.editing_world) {
        robot._trace_history = [];
        return;
    }
    if (robot._prev_x == robot.x &&
        robot._prev_y == robot.y &&
        robot._prev_orientation == robot._orientation) {
            return;
        }

    if (robot._trace_style == "invisible" || !robot._is_leaky) {
        trace_segment["color"] = "rgba(0,0,0,0)";
    } else {
        trace_segment["color"] = robot._trace_color;
    }

    offset = [[30, 30], [30, 20], [20, 20], [20, 30]];

    if(RUR.get_world().small_tiles) {
        offset = [[12, 12], [12, 12], [12, 12], [12, 12]];
        trace_segment["thickness"] = 2;
    } else if (robot._trace_style === "thick") {
        offset = [[25, 25], [25, 25], [25, 25], [25, 25]];
        trace_segment["thickness"] = 4;
    }  else if (robot._trace_style === "default") {
        trace_segment["thickness"] = 1;
    } // else, invisible and we do not care.

    prev_offset = offset[robot._prev_orientation%4];
    offset = offset[robot._orientation%4];

    trace_segment["prev_x"] = robot._prev_x * RUR.WALL_LENGTH + prev_offset[0];
    trace_segment["x"] = robot.x * RUR.WALL_LENGTH + offset[0];
    trace_segment["prev_y"] = RUR.HEIGHT - (robot._prev_y+1) * RUR.WALL_LENGTH + prev_offset[1];
    trace_segment["y"] = RUR.HEIGHT - (robot.y+1) * RUR.WALL_LENGTH + offset[1];

    robot._trace_history.push(trace_segment);
};

RUR.vis_robot.draw_trace_history  = function(robot) {
    var segment;
    for (segment of robot._trace_history) { //jshint ignore:line
        RUR.vis_robot.draw_trace_segment(segment);
    }
};

RUR.vis_robot.draw_trace_segment = function (segment) {
    "use strict";
    var ctx = RUR.TRACE_CTX;
    ctx.strokeStyle = segment["color"];
    ctx.lineWidth = segment["thickness"];
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(segment["prev_x"], segment["prev_y"]);
    ctx.lineTo(segment["x"], segment["y"]);
    ctx.stroke();
};

/** @function new_robot_images
 * @memberof RUR
 * @instance
 *
 * @todo **Need to document**
 * @todo Implement robot animation by cycling model; do it by instance
 */

RUR.new_robot_images = function (images) {
    var model, random;
    if (images.model !== undefined) {
        model = images.model;
        if (!RUR.is_non_negative_integer(model) || model > 9) {
            throw new ReeborgError(RUR.translate("Robot model must be an integer between 0 and 9."));
        }
        model = images.model;
    } else {
        model = 3;
    }
    if (images.east !== undefined) {
        RUR.vis_robot.images[model].robot_e_img = new Image();
        RUR.vis_robot.images[model].robot_e_img.src = images.east;
        RUR.vis_robot.images[model].robot_e_img.onload = function() {
            RUR.vis_world.refresh()
        }
    }
    if (images.west !== undefined) {
        RUR.vis_robot.images[model].robot_w_img = new Image();
        RUR.vis_robot.images[model].robot_w_img.src = images.west;
        RUR.vis_robot.images[model].robot_w_img.onload = function() {
            RUR.vis_world.refresh()
        }
    }
    if (images.north !== undefined) {
        RUR.vis_robot.images[model].robot_n_img = new Image();
        RUR.vis_robot.images[model].robot_n_img.src = images.north;
        RUR.vis_robot.images[model].robot_n_img.onload = function() {
            RUR.vis_world.refresh()
        }
    }
    if (images.south !== undefined) {
        RUR.vis_robot.images[model].robot_s_img = new Image();
        RUR.vis_robot.images[model].robot_s_img.src = images.south;
        RUR.vis_robot.images[model].robot_s_img.onload = function() {
            RUR.vis_world.refresh()
        }
    }
    if (images.random === undefined) {
        random = RUR._BASE_URL + '/src/images/robot_random.png'
    } else {
        random = images.random;
    }
    RUR.vis_robot.images[model].robot_random_img = new Image();
    RUR.vis_robot.images[model].robot_random_img.src = random;
    RUR.vis_robot.images[model].robot_random_img.onload = function() {
        RUR.vis_world.refresh()
    }


    // change the image displayed in the html file.
    if (model < 4) {
        $("#robot" + model + " img").attr("src", images.east);
    }

    RUR.select_default_robot_model(model);
};
