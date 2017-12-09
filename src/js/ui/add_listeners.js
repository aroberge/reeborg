/* To ensure that all elements are found before listeners are added,
   we attempt to keep all of the relevant activation functions
   in this single module whose main function is only executed when
   the document has been entirely loaded.

   When we did not do this, but instead tried to attach listeners as
   we defined the relevant functions in separate javascript module, 
   unpredictable "glitches" could occur where a given element did
   not get the proper listener attached.
 */
require("./../rur.js");
require("../rur.js");
require("./editors_tabs.js");
require("./frame_slider.js");
require("./programming_mode.js");
require("./reload.js");
require("./run.js");
require("./step.js");
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


    // in world_select.js
    $("#select-world").change(RUR.listeners['select-world.change']);


});