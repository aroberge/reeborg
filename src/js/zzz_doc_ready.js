//
// require("./translator.js");
// require("./state.js");
// require("./objects.js");
// require("./visible_robot.js");
// require("./zz_dr_onclick.js");
// require("./zz_dr_onchange.js");
// require("./zz_dr_editor_ui.js");
// require("./zz_dr_blockly.js");
// require("./recorder.js");
// require("./storage.js");
// require("./world_select.js");
// require("./world.js");
// require("./keyboard.js");
// require("./tooltip.js");
// require("./custom_world_select.js");
// require("./aa_utils.js");
// var export_world = require("./world/export_world.js").export_world;


$(document).ready(function() {
    "use strict";
    var prog_lang, url_query, name;
    RUR.state.human_language = document.documentElement.lang;

    RUR.state.set_initial_values();

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

    RUR.rec.reset();
    try {
        RUR.world_select.set_url(localStorage.getItem(RUR.settings.world));
    } catch (e) {
        RUR.world_select.set_default();
    }

    RUR.tooltip.init();

    // check if this is needed or does conflict with MakeCustomMenu
    RUR.settings.initial_world = localStorage.getItem(RUR.settings.world);

    //TODO: replace the following
    //RUR.cd.create_custom_dialogs();
    RUR.zz_dr_onclick();
    RUR.zz_dr_onchange();
    RUR.zz_dr_editor_ui();

    brython({debug:1, pythonpath:['/src/python']});

    try {
        RUR.reset_code_in_editors();
    } catch (e){
        console.log(e);
        RUR.show_feedback("#Reeborg-shouts",
                        "Your browser does not support localStorage. " +
                        "You will not be able to save your functions in the library.");
    }
    // for embedding in iframe
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.permalink.update(event.data);
    }

    RUR.kbd.select();

    RUR.make_default_menu(RUR.state.human_language);


    url_query = parseUri(window.location.href);
    if (url_query.queryKey.proglang !== undefined &&
       url_query.queryKey.world !== undefined &&
       url_query.queryKey.editor !== undefined &&
       url_query.queryKey.library !== undefined) {
        prog_lang = url_query.queryKey.proglang;
        $('input[type=radio][name=programming_language]').val([prog_lang]);
        RUR.reset_programming_language(prog_lang);
        RUR.world.import_world(decodeURIComponent(url_query.queryKey.world));
        name = RUR.translate("PERMALINK");
        localStorage.setItem("user_world:"+ name, export_world());
        RUR.storage.save_world(name);

        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    } else {
        prog_lang = localStorage.getItem("last_programming_language_" + RUR.state.human_language);
        switch (prog_lang) {
            case 'python-' + RUR.state.human_language:
                $("#python_choices").val("editor").change();  // jshint ignore:line
            case 'javascript-' + RUR.state.human_language:
                $("#javascript_choices").val("editor").change(); // jshint ignore:line
            default:
                RUR.reset_programming_language('python-' + RUR.state.human_language);
        }
        // trigger it to load the initial world.
        $("#select-world").change();
    }
});
