
require("./../rur.js");
require("./../utils/validator.js");
var record_id = require("./../../lang/msg.js").record_id;
record_id("robot0");
record_id("robot1");
record_id("robot2");
record_id("robot3");

RUR.vis_robot = {};
RUR.vis_robot.images = {};
RUR.vis_robot.animated_robots = [];

// we will keep track if we have loaded all images
RUR.vis_robot.loaded_images = 0;
RUR.vis_robot.nb_images = 0;

// enable changing defaults for unit tests or if put on different server location
RUR.BASE_URL = RUR.BASE_URL || '';


function set_images(images) {
    var default_images, east, west, north, south, robot, model = images.model;

    default_images = {east: RUR.BASE_URL + '/src/images/robot_e.png',
        north: RUR.BASE_URL + '/src/images/robot_n.png',
        west: RUR.BASE_URL + '/src/images/robot_w.png',
        south: RUR.BASE_URL + '/src/images/robot_s.png'
    }

    if (RUR.vis_robot.images[model] === undefined) {
        RUR.vis_robot.images[model] = {};
        robot = RUR.vis_robot.images[model];
        robot.robot_e_img = new Image();
        robot.robot_n_img = new Image();
        robot.robot_w_img = new Image();
        robot.robot_s_img = new Image();
    } else {
        robot = RUR.vis_robot.images[model];
    }

    if (robot.robot_e_img.src != images.east) {
        robot.robot_e_img.src = images.east || default_images.east;
        robot.robot_e_img.onload = RUR.onload_new_image;
    }
    if (robot.robot_n_img.src != images.north) {
        robot.robot_n_img.src = images.north || default_images.north;
        robot.robot_n_img.onload = RUR.onload_new_image;
    }
    if (robot.robot_w_img.src != images.west) {
        robot.robot_w_img.src = images.west || default_images.west;
        robot.robot_w_img.onload = RUR.onload_new_image;
    }
    if (robot.robot_s_img.src != images.south) {
        robot.robot_s_img.src = images.south || default_images.south;
        robot.robot_s_img.onload = RUR.onload_new_image;
    }
}

RUR.reset_default_robot_images = function () {
    // classic; uses default
    set_images({model: 0});
    // 2d red rover
    set_images({model: 1,
        east: RUR.BASE_URL + '/src/images/rover_e.png',
        north: RUR.BASE_URL + '/src/images/rover_n.png',
        west: RUR.BASE_URL + '/src/images/rover_w.png',
        south: RUR.BASE_URL + '/src/images/rover_s.png'
    });
    // 3d red rover
    set_images({model: 2,
        east: RUR.BASE_URL + '/src/images/plain_e.png',
        north: RUR.BASE_URL + '/src/images/plain_n.png',
        west: RUR.BASE_URL + '/src/images/plain_w.png',
        south: RUR.BASE_URL + '/src/images/plain_s.png'
    });
    // solar panel
    set_images({model: 3,
        east: RUR.BASE_URL + '/src/images/sp_e.png',
        north: RUR.BASE_URL + '/src/images/sp_n.png',
        west: RUR.BASE_URL + '/src/images/sp_w.png',
        south: RUR.BASE_URL + '/src/images/sp_s.png'
    });

    $("#robot0 img").attr("src", RUR.vis_robot.images[0].robot_e_img.src);
    $("#robot1 img").attr("src", RUR.vis_robot.images[1].robot_e_img.src);
    $("#robot2 img").attr("src", RUR.vis_robot.images[2].robot_e_img.src);
    $("#robot3 img").attr("src", RUR.vis_robot.images[3].robot_e_img.src);
    RUR.select_default_robot_model(localStorage.getItem("robot_default_model"));

    // additional robot images from rur-ple
    set_images({model: 4,
        east: RUR.BASE_URL + '/src/images/blue_robot_e.png',
        north: RUR.BASE_URL + '/src/images/blue_robot_n.png',
        west: RUR.BASE_URL + '/src/images/blue_robot_w.png',
        south: RUR.BASE_URL + '/src/images/blue_robot_s.png'
    });
    set_images({model: 5,
        east: RUR.BASE_URL + '/src/images/purple_robot_e.png',
        north: RUR.BASE_URL + '/src/images/purple_robot_n.png',
        west: RUR.BASE_URL + '/src/images/purple_robot_w.png',
        south: RUR.BASE_URL + '/src/images/purple_robot_s.png'
    });
    set_images({model: 6,
        east: RUR.BASE_URL + '/src/images/green_robot_e.png',
        north: RUR.BASE_URL + '/src/images/green_robot_n.png',
        west: RUR.BASE_URL + '/src/images/green_robot_w.png',
        south: RUR.BASE_URL + '/src/images/green_robot_s.png'
    });
    set_images({model: 7,
        east: RUR.BASE_URL + '/src/images/light_blue_robot_e.png',
        north: RUR.BASE_URL + '/src/images/light_blue_robot_n.png',
        west: RUR.BASE_URL + '/src/images/light_blue_robot_w.png',
        south: RUR.BASE_URL + '/src/images/light_blue_robot_s.png'
    });
    set_images({model: 8,
        east: RUR.BASE_URL + '/src/images/yellow_robot_e.png',
        north: RUR.BASE_URL + '/src/images/yellow_robot_n.png',
        west: RUR.BASE_URL + '/src/images/yellow_robot_w.png',
        south: RUR.BASE_URL + '/src/images/yellow_robot_s.png'
    });
    RUR.state.reset_default_robot_images_needed = false;
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
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }

    localStorage.setItem("robot_default_model", style);
};
$("#robot0").on("click", function (evt) {
    RUR.select_default_robot_model(0);
});

$("#robot1").on("click", function (evt) {
    RUR.select_default_robot_model(1);
});

$("#robot2").on("click", function (evt) {
    RUR.select_default_robot_model(2);
});

$("#robot3").on("click", function (evt) {
    RUR.select_default_robot_model(3);
});

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

/**@function animate_robot
 * @memberof RUR
 * @instance
 *
 * @desc Description to be added.
 */

RUR.animate_robot = function (models, robot) {
    if (robot === undefined) {
        robot = RUR.get_current_world().robots[0];
    }
    RUR.vis_robot.animated_robots.push({
        robot_id: robot.__id,
        index: 0
    })
    robot.models_cycle = models;
    RUR.record_frame("animate robot", robot.__id);
    RUR.state.animated_robots = true;
};

function update_model(robot) {
    var animated_robots = RUR.vis_robot.animated_robots,
        nb_robots = RUR.vis_robot.animated_robots.length,
        nb_models = robot.models_cycle.length;
    for (var r = 0; r < nb_robots; r++) {
        if (animated_robots[r].robot_id == robot.__id) {
            animated_robots[r].index += 1;
            animated_robots[r].index %= nb_models;
            robot.model = robot.models_cycle[animated_robots[r].index];
            return;
        }
    }
};


RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image;
    if (!robot) {
        console.warn("RUR.vis_robot.draw called with no robot.");
        return;
    }
    // handling legacy Code
    if (robot.orientation !== undefined) {
        robot._orientation = robot.orientation;
        robot.orientation = null;
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

    if (robot.models_cycle) {
        update_model(robot);
    }

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
            RUR.vis_robot.draw_random(robot);
        default:
            image = RUR.vis_robot.e_img;
        }
    RUR.ROBOT_CTX.drawImage(image, x, y, width, height);
    if (RUR.state.editing_world){
        return;
    }
    RUR.vis_robot.draw_trace_history(robot);
};


// drawing random orientation robot
RUR.vis_robot.draw_random = function (robot) {
    "use strict";
    var x, y, width, height, image, random_orientation;
    if (!robot) {
        console.warn("RUR.vis_robot.draw_random called with no robot.");
        return;
    }

    if (!(robot._orientation == -1 || robot.orientation == -1)) {
        console.warn("RUR.vis_robot.draw_random but orientation != -1.");
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

    random_orientation = Math.floor(Math.random() * 4)
    switch(random_orientation){
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
        default:
            image = RUR.vis_robot.e_img;
            console.warn("default should not happen in RUR.vis_robot.draw_random.");
        }
    RUR.ROBOT_ANIM_CTX.drawImage(image, x, y, width, height);
    RUR.state.random_robot = true;
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
 * @desc Create new images for the robot.
 *
 * **Suggestion**: use in the Onload editor, so that images can be fetched
 * as soon as the world is loaded.
 *
 * **Python**: You _can_ use `new_robot_images` without the `RUR` prefix. For the
 * French version, you can use `nouvelles_images_de_robot`. However, this form
 * is preferable as it can be used with either Javascript or Python in the
 * Onload editor.
 *
 *
 * @param {Object} images A Javascript object (similar to a Python dict) that
 * holds the relevant attributes.
 *
 * @param {integer} [images.model]  The model number for the robot; it must
 * be a non-negative integer.
 * If it is one of [0, 1, 2, 3], it will take the place of one of the visible
 * robot images that can be selected by the user. The default value is 3.
 *
 * @param {string} [images.east]  A url for the source of the image to be used
 * for the robot in the East orientation. If it is not specified, the
 * default "classic" image will be used.
 *
 * @param {string} [images.north]  Similar to `images.east`.
 * @param {string} [images.west]  Similar to `images.east`.
 * @param {string} [images.south]  Similar to `images.east`.
 *
 * @todo Implement robot animation by cycling model; do it by instance
 * @todo Add example
 */

RUR.new_robot_images = function (images) {
    var model, random;
    if (images.model !== undefined) {
        model = images.model;
        if (!RUR.is_non_negative_integer(model)) {
            throw new RUR.ReeborgError(RUR.translate("Robot model must be a non-negative integer."));
        }
    } else {
        model = 3;
    }
    RUR.state.reset_default_robot_images_needed = true;

    set_images(images);

    // change the image displayed in the html file.
    if (model < 4) {
        $("#robot" + model + " img").attr("src", images.east);
    }

    RUR.select_default_robot_model(model);
};

/** @function show_all_robots
 * @memberof RUR
 * @instance
 *
 * @summary This method shows all known robot models in a table.
 *
 */
RUR.show_all_robots = function () {
    var info, model, east, north, west, south;
    info = "<table border='1'><tr><th>model</th><th>east</th><th>north</th><th>west</th><th>south</th></tr>";

    for (model in RUR.vis_robot.images) {
        if (RUR.vis_robot.images.hasOwnProperty(model)) {
            east = RUR.vis_robot.images[model].robot_e_img.src;
            north = RUR.vis_robot.images[model].robot_n_img.src;
            west = RUR.vis_robot.images[model].robot_w_img.src;
            south = RUR.vis_robot.images[model].robot_s_img.src;

            info += "<tr><td>" +  model + "</td>";
            info += "<td><img src = '" + east + "'></td>";
            info += "<td><img src = '" + north + "'></td>";
            info += "<td><img src = '" + west + "'></td>";
            info += "<td><img src = '" + south + "'></td></tr>";
        }
    }

    info += "</table>";
    RUR._print_html_(info, true); // true will replace existing content
    return null; // for the python repl
};

