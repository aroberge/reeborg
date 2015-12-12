
/*jshint -W002, browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, editor, library, toggle_contents_button, update_controls, saveAs, toggle_editing_mode,
          save_world, delete_world, parseUri*/

$(document).ready(function() {
    "use strict";

    if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
        alert("Reeborg's World is possibly broken by the latest version of Firefox. "+
              "Under testing, it works with Google Chrome and Microsoft Edge. "+
          "Le monde de Reeborg ne fonctionne plus avec la nouvelle version de Firefox.");
    }

    try {
        RUR.world_select.set_url(localStorage.getItem(RUR.settings.world));
    } catch (e) {
        RUR.world_select.set_default();
    }
    RUR.settings.initial_world = localStorage.getItem(RUR.settings.world);


    RUR.zz_dr_dialogs();
    RUR.zz_dr_onclick();
    RUR.zz_dr_onchange();

    RUR.ui.show_only_reload2(false);

    $("#tabs").tabs({
            heightStyle: "auto",
            activate: function(event, ui){
                editor.refresh();
                library.refresh();
                pre_code_editor.refresh();
                post_code_editor.refresh();
                description_editor.refresh();
            }
    });

    $("#editor-panel").resizable({
        resize: function() {
            editor.setSize(null, $(this).height()-40);
            library.setSize(null, $(this).height()-40);
            pre_code_editor.setSize(null, $(this).height()-40);
            post_code_editor.setSize(null, $(this).height()-40);
            description_editor.setSize(null, $(this).height()-40);
        }
    }).draggable({cursor: "move", handle: "ul"});


    try {
        RUR.reset_code_in_editors();
    } catch (e){
        console.log(e);
        alert("Your browser does not support localStorage; you will not be able to save your functions in the library.");
    }
    // for embedding in iframe
    addEventListener("message", receiveMessage, false);
    function receiveMessage(event){
        RUR.update_permalink(event.data);
    }

    RUR.ui.set_ready_to_run();

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

    RUR.we.set_extra_code();
});
