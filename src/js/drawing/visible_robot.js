
require("./../rur.js");
require("./../utils/validator.js");
var record_id = require("./../../lang/msg.js").record_id;
record_id("robot0");
record_id("robot1");
record_id("robot2");
record_id("robot3");

RUR.vis_robot = {};
RUR.vis_robot.images = {};

// we will keep track if we have loaded all images
RUR.vis_robot.loaded_images = 0;
RUR.vis_robot.nb_images = 0;

// enable changing defaults for unit tests or if put on different server location
RUR.BASE_URL = RUR.BASE_URL || '';

function set_images(images) {
    "use strict"
    var default_images, robot, model = images.model;

    default_images = {east: RUR.BASE_URL + '/src/images/robot_e.png',
        north: RUR.BASE_URL + '/src/images/robot_n.png',
        west: RUR.BASE_URL + '/src/images/robot_w.png',
        south: RUR.BASE_URL + '/src/images/robot_s.png'
    }

    if (RUR.KNOWN_ROBOT_MODELS.indexOf(model) == -1) {
        RUR.KNOWN_ROBOT_MODELS.push(model);
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
        robot.e_url = images.east || '/src/images/robot_e.png';
        robot.robot_e_img.onload = RUR.onload_new_image;
        RUR.state.reset_default_robot_images_needed = true;
    }
    if (robot.robot_n_img.src != images.north) {
        robot.robot_n_img.src = images.north || default_images.north;
        robot.n_url = images.north || '/src/images/robot_n.png';
        robot.robot_n_img.onload = RUR.onload_new_image;
        RUR.state.reset_default_robot_images_needed = true;
    }
    if (robot.robot_w_img.src != images.west) {
        robot.robot_w_img.src = images.west || default_images.west;
        robot.w_url = images.west || '/src/images/robot_w.png';
        robot.robot_w_img.onload = RUR.onload_new_image;
        RUR.state.reset_default_robot_images_needed = true;
    }
    if (robot.robot_s_img.src != images.south) {
        robot.robot_s_img.src = images.south || default_images.south;
        robot.s_url = images.south || '/src/images/robot_s.png';
        robot.robot_s_img.onload = RUR.onload_new_image;
        RUR.state.reset_default_robot_images_needed = true;
    }
}

RUR.reset_default_robot_images = function () {
    "use strict"
    var saved_model;
    set_images({model: "classic"}); // classic; uses default
    set_images({model: "2d red rover",
        east: RUR.BASE_URL + '/src/images/rover_e.png',
        north: RUR.BASE_URL + '/src/images/rover_n.png',
        west: RUR.BASE_URL + '/src/images/rover_w.png',
        south: RUR.BASE_URL + '/src/images/rover_s.png'
    });
    set_images({model: "3d red rover",
        east: RUR.BASE_URL + '/src/images/plain_e.png',
        north: RUR.BASE_URL + '/src/images/plain_n.png',
        west: RUR.BASE_URL + '/src/images/plain_w.png',
        south: RUR.BASE_URL + '/src/images/plain_s.png'
    });
    set_images({model: "solar panel",
        east: RUR.BASE_URL + '/src/images/sp_e.png',
        north: RUR.BASE_URL + '/src/images/sp_n.png',
        west: RUR.BASE_URL + '/src/images/sp_w.png',
        south: RUR.BASE_URL + '/src/images/sp_s.png'
    });

    $("#robot0 img").attr("src", RUR.vis_robot.images["classic"].robot_e_img.src);
    $("#robot1 img").attr("src", RUR.vis_robot.images["2d red rover"].robot_e_img.src);
    $("#robot2 img").attr("src", RUR.vis_robot.images["3d red rover"].robot_e_img.src);
    $("#robot3 img").attr("src", RUR.vis_robot.images["solar panel"].robot_e_img.src);

    // handle situation where the user had saved values from old naming styles
    saved_model = localStorage.getItem("robot_default_model");
    if (saved_model==0 || saved_model==1 || saved_model==2 || saved_model==3) {
        saved_model = RUR.reeborg_default_model;
        localStorage.setItem("robot_default_model", saved_model);
    }
    RUR.user_selected_model = saved_model;
    RUR.select_default_robot_model(saved_model);

    // additional robot images from rur-ple
    set_images({model: "blue",
        east: RUR.BASE_URL + '/src/images/blue_robot_e.png',
        north: RUR.BASE_URL + '/src/images/blue_robot_n.png',
        west: RUR.BASE_URL + '/src/images/blue_robot_w.png',
        south: RUR.BASE_URL + '/src/images/blue_robot_s.png'
    });
    set_images({model: "purple",
        east: RUR.BASE_URL + '/src/images/purple_robot_e.png',
        north: RUR.BASE_URL + '/src/images/purple_robot_n.png',
        west: RUR.BASE_URL + '/src/images/purple_robot_w.png',
        south: RUR.BASE_URL + '/src/images/purple_robot_s.png'
    });
    set_images({model: "green",
        east: RUR.BASE_URL + '/src/images/green_robot_e.png',
        north: RUR.BASE_URL + '/src/images/green_robot_n.png',
        west: RUR.BASE_URL + '/src/images/green_robot_w.png',
        south: RUR.BASE_URL + '/src/images/green_robot_s.png'
    });
    set_images({model: "light blue",
        east: RUR.BASE_URL + '/src/images/light_blue_robot_e.png',
        north: RUR.BASE_URL + '/src/images/light_blue_robot_n.png',
        west: RUR.BASE_URL + '/src/images/light_blue_robot_w.png',
        south: RUR.BASE_URL + '/src/images/light_blue_robot_s.png'
    });
    set_images({model: "yellow",
        east: RUR.BASE_URL + '/src/images/yellow_robot_e.png',
        north: RUR.BASE_URL + '/src/images/yellow_robot_n.png',
        west: RUR.BASE_URL + '/src/images/yellow_robot_w.png',
        south: RUR.BASE_URL + '/src/images/yellow_robot_s.png'
    });
    RUR.state.reset_default_robot_images_needed = false;
};

RUR.select_default_robot_model = function (model) {
    "use strict";
    var robot;

    if ( !(model == "classic" || model == "2d red rover"
           || model == "3d red rover" || model == "solar panel")){
        model = RUR.reeborg_default_model;
    }
    // the user could click on the robot model buttons when there are
    // no robot present in the world.
    try {
        robot = RUR.get_current_world().robots[0];
        robot.model = model;
        RUR.user_selected_model = model;
    } catch (e) {}

    RUR.vis_robot.e_img = RUR.vis_robot.images[model].robot_e_img;
    RUR.vis_robot.n_img = RUR.vis_robot.images[model].robot_n_img;
    RUR.vis_robot.w_img = RUR.vis_robot.images[model].robot_w_img;
    RUR.vis_robot.s_img = RUR.vis_robot.images[model].robot_s_img;
    if (RUR.vis_world !== undefined) {
        RUR.vis_world.refresh();
    }
    localStorage.setItem("robot_default_model", model);
};
$("#robot0").on("click", function (evt) {
    RUR.select_default_robot_model("classic");
});

$("#robot1").on("click", function (evt) {
    RUR.select_default_robot_model("2d red rover");
});

$("#robot2").on("click", function (evt) {
    RUR.select_default_robot_model("3d red rover");
});

$("#robot3").on("click", function (evt) {
    RUR.select_default_robot_model("solar panel");
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
 * @desc Robot animation is done by cycling through a list of robot models,
 * each model having 4 images (one for each orientation).
 *
 * @param {array} models A list of robot models. If the list contains a single
 * model, the animation is stopped.
 * @param {object} robot_body A robot_body object.
 */

RUR.animate_robot = function (models, robot_body) {
    "use strict"
    if (robot_body === undefined) {
        robot_body = RUR.get_current_world().robots[0];
    }
    if (models.length > 1) {
        robot_body.models_cycle = models;
        robot_body.model_index = 0;
    } else {
        robot_body.models_cycle = null;
        robot_body.model = models[0];
    }
    RUR.record_frame("animate robot", robot_body.__id);
    RUR.state.animated_robots = true;
};

function update_model(robot) { // robot == robot.body
    var default_robot, nb_models = robot.models_cycle.length;

    if (robot.model_index == undefined) {
        robot.model_index = 0;
    }
    robot.model = robot.models_cycle[robot.model_index];

    default_robot = RUR.get_current_world().robots[0];
    if (default_robot.__id == robot.__id) {
        RUR.user_selected_model = undefined;  // overrides the user's choice
    }
    // do we cycle through the value; a model number of -1 ends a cycle
    if (robot.model_index == nb_models-2){
        if (robot.models_cycle[robot.model_index+1] == -1){
            return;
        }
    }
    robot.model_index += 1;
    robot.model_index %= nb_models;
    return;
};


RUR.vis_robot.draw = function (robot) {
    "use strict";
    var x, y, width, height, image, default_robot;
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

    if (robot.model == undefined) {
        robot.model = RUR.reeborg_default_model;
    } else if (RUR.KNOWN_ROBOT_MODELS.indexOf(robot.model) == -1) {
        console.warn("robot model not defined: " + robot.model);
        robot.model = RUR.reeborg_default_model;
    }

    if (RUR.user_selected_model !== undefined) {
        default_robot = RUR.get_current_world().robots[0];
        if (default_robot.__id == robot.__id ) {
            robot.model = RUR.user_selected_model;
        }
    }

    switch(robot._orientation){
        case RUR.EAST:
            image = RUR.vis_robot.images[robot.model].robot_e_img;
            break;
        case RUR.NORTH:
            image = RUR.vis_robot.images[robot.model].robot_n_img;
            break;
        case RUR.WEST:
            image = RUR.vis_robot.images[robot.model].robot_w_img;
            break;
        case RUR.SOUTH:
            image = RUR.vis_robot.images[robot.model].robot_s_img;
            break;
        case -1:
            RUR.vis_robot.draw_random(robot);
            break;
        default:
            image = RUR.vis_robot.e_img;
        }
    if (robot._orientation != -1){
        RUR.ROBOT_CTX.drawImage(image, x, y, width, height);
    }
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
 * French version, you can use `nouvelles_images_de_robot`. However, the
 * function described here is preferable as it can be used with either
 * Javascript or Python.
 *
 * @param {images} images A Javascript object (similar to a Python dict) that
 * holds the relevant attributes.
 *
 * @param {string} [images.model]  The model name of the robot. Integer values
 * will be accepted as well except for -1 which will raise an error. If the
 * model is not specified, the value `"anonymous"` will be used.
 *
 * @param {string} [images.east]  A url for the source of the image to be used
 * for the robot in the East orientation. If it is not specified, the
 * default "classic" image will be used.
 *
 * @param {string} [images.north]  Similar to `images.east`.
 * @param {string} [images.west]  Similar to `images.east`.
 * @param {string} [images.south]  Similar to `images.east`.
 *
 */

RUR.new_robot_images = function (images) {
    if (images.model !== undefined) {
        if (images.model == -1) {
            throw new RUR.ReeborgError(RUR.translate("Robot model cannot be -1."));
        }
    } else {
        images.model = "anonymous";
    }
    set_images(images);
};

/** @function show_all_robots
 * @memberof RUR
 * @instance
 *
 * @summary This method shows all known robot models in a table.
 *
 */
RUR.show_all_robots = function () {
    var info, model, east, north, west, south, e_url, w_url, s_url, n_url;
    info = "<table border='1'><tr><th>model</th><th>east</th><th>north</th><th>west</th><th>south</th></tr>";

    for (model in RUR.vis_robot.images) {
        if (RUR.vis_robot.images.hasOwnProperty(model)) {
            east = RUR.vis_robot.images[model].robot_e_img.src;
            north = RUR.vis_robot.images[model].robot_n_img.src;
            west = RUR.vis_robot.images[model].robot_w_img.src;
            south = RUR.vis_robot.images[model].robot_s_img.src;
            e_url = RUR.vis_robot.images[model].e_url;
            n_url = RUR.vis_robot.images[model].n_url;
            w_url = RUR.vis_robot.images[model].w_url;
            s_url = RUR.vis_robot.images[model].s_url;

            info += "<tr><td>" +  model + "</td>";
            info += "<td><img src = '" + east + "'><br>" + e_url + "</td>";
            info += "<td><img src = '" + north + "'><br>" + n_url + "</td>";
            info += "<td><img src = '" + west + "'><br>" + w_url + "</td>";
            info += "<td><img src = '" + south + "'><br>" + s_url + "</td></tr>";
        }
    }

    info += "</table>";
    RUR._print_html_(info, true); // true will replace existing content
    return null; // for the python repl
};

