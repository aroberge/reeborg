/* To ensure that all elements are found before listeners are added,
   we attempt to keep all of the relevant activation functions
   in this single module whose main function is only executed when
   the document has been entirely loaded.

   When we did not do this, but instead tried to attach listeners as
   we defined the relevant functions in separate javascript module, 
   unpredictable "glitches" could occur where a given element did
   not get the proper listener attached.

   Note that there is a somewhat mixed notation (some using JQuery,
   other using plain Javascript) as the relevant code was copied
   from separate functions written over a long period. At some point
   it might be desirable to rewrite everything to not use JQuery, 
   but it is not a priority.

   The unusual choice of defining variables with the var keyword just
   above the one line of code that uses it is not something that is
   going to change.
 */
require("../rur.js");
require("./editors_tabs.js");
require("./frame_slider.js");
require("./human_language.js");
require("./pause.js");
require("./stop.js");
require("./programming_mode.js");
require("./reload.js");
require("./run.js");
require("./step.js");
require("./toggle_highlight.js");
require("./toggle_watch.js");
require("./world_select.js");


$(document).ready(function () {

    // in editor_tabs.js; "tabs" is a jqueryUI method
    $("#tabs").tabs({
        heightStyle: "content",
        activate: RUR.listeners['tabs.activate']
    });

    $("#editor-panel").resizable({
        resize: RUR.listeners['editor-panel.resize']
    }).draggable({cursor: "move", handle: "ul"});
    
    $("#editor-tab").on("click", RUR.listeners['editor-tab']);
    $("#library-tab").on("click", RUR.listeners['library-tab']);
    $("#extra-tab").on("click", RUR.listeners['extra-tab']);

    // in frame_slider.js
    $("#frame-selector").on("input change", function() {
        RUR.listeners['frame-selector']();
    });

    // in human_language.js
    $("#human-language").change(RUR.listeners['human-language']);

    // in pause.js
    var pause_button = document.getElementById("pause");
    pause_button.addEventListener("click", RUR.pause, false);

    // in programming_mode.js
    $('#editor-visible-input').change(function() {
        RUR.listeners['editor-visible-input']();
    });
    $("#programming-mode").change(function() {
        RUR.listeners['programming-mode']();
    });

    // in reload.js
    var reload_button = document.getElementById("reload");
    reload_button.addEventListener("click", RUR.reload, false);

    var reload2_button = document.getElementById("reload2");
    reload2_button.addEventListener("click", RUR.reload2, false);

    // in run.js
    var run_button = document.getElementById("run");
    run_button.addEventListener("click", RUR.listeners.run, false);

    // in step.js
    var step_button = document.getElementById("step");
    step_button.addEventListener("click", RUR.listeners.step, false);
    var reverse_step_button = document.getElementById("reverse-step");
    reverse_step_button.addEventListener("click", RUR.listeners.reverse_step, false);

    // in stop.js
    var stop_button = document.getElementById("stop");
    stop_button.addEventListener("click", RUR.stop, false);

    // in toggle_highlight.js
    var highlight_button = document.getElementById("highlight");
    highlight_button.addEventListener("click", RUR.toggle_highlight, false);

    // in toggle_watch.js
    var watch_button = document.getElementById("watch-variables-btn");
    watch_button.addEventListener("click", toggle_watch_variables, false);

    // in world_select.js
    $("#select-world").change(RUR.listeners['select-world.change']);


    RUR.state.ui_ready = true;
});