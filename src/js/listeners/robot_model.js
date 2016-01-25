require("./../visual_robot.js");

$("#classic-image").on("click", function (evt) {
    RUR.select_default_robot_model(0);
});

$("#rover-type").on("click", function (evt) {
    RUR.select_default_robot_model(1);
});

$("#3d-red-type").on("click", function (evt) {
    RUR.select_default_robot_model(2);
});

$("#solar-panel-type").on("click", function (evt) {
    RUR.select_default_robot_model(3);
});

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
RUR.select_default_robot_model(localStorage.getItem("robot_default_model"));

RUR.vis_robot.new_robot_images = function (images) {
    var model;
    if (images.model !== undefined) {
        switch (images.model) {
            case 0:
            case 1:
            case 2:
            case 3:
                model = images.model;
                break;
            default:
                model = 0;
        }
    } else {
        model = 0;
    }

    if (images.east !== undefined) {
        RUR.vis_robot.images[model].robot_e_img.src = images.east;
    }
    if (images.west !== undefined) {
        RUR.vis_robot.images[model].robot_w_img.src = images.west;
    }
    if (images.north !== undefined) {
        RUR.vis_robot.images[model].robot_n_img.src = images.north;
    }
    if (images.south !== undefined) {
        RUR.vis_robot.images[model].robot_s_img.src = images.south;
    }
    if (images.random !== undefined) {
        RUR.vis_robot.images[model].robot_random_img.src = images.random;
    }

    // change the image displayed in the html file.
    switch (model) {
        case 0:
            $("#robot0 img").attr("src", images.east);
            break;
        case 1:
            $("#robot1 img").attr("src", images.east);
            break;
        case 2:
            $("#robot2 img").attr("src", images.east);
            break;
        case 3:
            $("#robot3 img").attr("src", images.east);
            break;
    }

    RUR.select_default_robot_model(model);
};
