
/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world, parseUri*/

$(document).ready(function() {
    "use strict";
    RUR._browser = "unknown";

    if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
        alert("Code highlighting and variables watch do not work with Firefox. "+
              "They do work with Google Chrome, Opera and Microsoft Edge. "+
          "Certaines fonctions ne fonctionnent pas avec Firefox.");
        RUR._highlight = false;
        $("#highlight").addClass("blue-gradient");
        $("#highlight").removeClass("reverse-blue-gradient");
        RUR.ui.watch = function () {
            alert("Not supported with Firefox.");
        };
        RUR.ui.highlight = function () {
            alert("Not supported with Firefox.");
        };
        RUR._browser = "Firefox";
    }
    RUR.rec.reset();
    try {
        RUR.world_select.set_url(localStorage.getItem(RUR.settings.world));
    } catch (e) {
        RUR.world_select.set_default();
    }

    // check if this is needed or does conflict with MakeCustomMenu
    RUR.settings.initial_world = localStorage.getItem(RUR.settings.world);


    RUR.zz_dr_dialogs();
    RUR.zz_dr_onclick();
    RUR.zz_dr_onchange();
    RUR.zz_dr_editor_ui();

    RUR.ui.show_only_reload2(false);

    try {
        RUR.reset_code_in_editors();
    } catch (e){
        console.log(e);
        alert("Your browser does not support localStorage; you will not be able to save your functions in the library.");
    }
    // for embedding in iframe
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.permalink.update(event.data);
    }

    RUR.ui.set_ready_to_run();
    RUR.kbd.select();
});


$(document).ready(function() {
    var prog_lang, url_query, name;
    var human_language = document.documentElement.lang;
    RUR._highlight = true;

    RUR.make_default_menu(human_language);


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
        localStorage.setItem("user_world:"+ name, RUR.world.export_world());
        RUR.storage.save_world(name);

        editor.setValue(decodeURIComponent(url_query.queryKey.editor));
        library.setValue(decodeURIComponent(url_query.queryKey.library));
    } else {
        prog_lang = localStorage.getItem("last_programming_language_" + human_language);
        switch (prog_lang) {
            case 'python-' + human_language:
            case 'javascript-' + human_language:
            case 'coffeescript-' + human_language:
                $('input[type=radio][name=programming_language]').val([prog_lang]);
                RUR.reset_programming_language(prog_lang);
                break;
            default:
                RUR.reset_programming_language('python-' + human_language);
        }
        // trigger it to load the initial world.
        $("#select_world").change();
    }
    if(url_query.queryKey.css !== undefined) {
        var new_css = decodeURIComponent(url_query.queryKey.css);
        eval(new_css);  // jshint ignore:line
    }

    function everything_loaded () {
        var loaded, total_images, py_modules=0;
        if (RUR.objects.loaded_images == RUR.objects.nb_images &&
            RUR.vis_robot.loaded_images == RUR.vis_robot.nb_images &&
                (RUR._browser == "Firefox" ||
                    (RUR.reeborg_loaded &&
                      RUR.py_console_loaded &&
                      RUR.common_def_loaded)
                )){
            RUR.vis_world.draw_all();
            $("#splash-screen").hide();
        } else {
            loaded = RUR.objects.loaded_images + RUR.vis_robot.loaded_images;
            total_images = RUR.objects.nb_images + RUR.vis_robot.nb_images;
            if (RUR.reeborg_loaded) {
                py_modules ++;
            }
            if (RUR.py_console_loaded) {
                py_modules ++;
            }
            if (RUR.common_def_loaded) {
                py_modules ++;
            }
            $("#splash-text").html("Images: " + loaded + "/" + total_images +
                                   "<br>Python modules: " + py_modules + "/3");
            requestAnimationFrame(everything_loaded);
        }
    }
    everything_loaded ();

});
