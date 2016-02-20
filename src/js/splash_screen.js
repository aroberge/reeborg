require("./state.js");
require("./visible_world.js");
require("./visible_robot.js");


function everything_loaded () {
    var loaded, total_images, py_modules=0;
    if (RUR._NB_IMAGES_LOADED == RUR._NB_IMAGES_TO_LOAD &&
        RUR.vis_robot.loaded_images == RUR.vis_robot.nb_images &&
        RUR._NB_IMAGES_LOADED !== undefined){
        RUR.vis_world.draw_all();
        $("#splash-screen").hide();
    } else {
        // loaded = RUR._NB_IMAGES_LOADED + RUR.vis_robot.loaded_images;
        // total_images = RUR._NB_IMAGES_TO_LOAD + RUR.vis_robot.nb_images;
        // $("#splash-text").html("Images: " + loaded + "/" + total_images);
        requestAnimationFrame(everything_loaded);
    }
}
everything_loaded();
