
require("./state.js");
require("./zz_dr_onclick.js");

var rec_reset = require("./recorder/reset.js").reset;

    var prog_lang, url_query, name;

    function everything_loaded () {
        var loaded, total_images, py_modules=0;
        if (RUR._NB_IMAGES_LOADED == RUR._NB_IMAGES_TO_LOAD &&
            RUR.vis_robot.loaded_images == RUR.vis_robot.nb_images){
            RUR.vis_world.draw_all();
            $("#splash-screen").hide();
        } else {
            loaded = RUR._NB_IMAGES_LOADED + RUR.vis_robot.loaded_images;
            total_images = RUR._NB_IMAGES_TO_LOAD + RUR.vis_robot.nb_images;
            if (!RUR.state.images_loaded) {
                $("#splash-text").html("Loading Python modules. <br>Images: " + loaded + "/" + total_images);
            } else {
                $("#splash-text").html("Images: " + loaded + "/" + total_images);
            }
            requestAnimationFrame(everything_loaded);
        }
    }
    everything_loaded();
    rec_reset();


    //TODO: replace the following
    RUR.zz_dr_onclick();

    brython({debug:1, pythonpath:['/src/python']});

    // for embedding in iframe
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.permalink.update(event.data);
    }
