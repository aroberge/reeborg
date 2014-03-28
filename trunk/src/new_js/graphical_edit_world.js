/* Author: André Roberge
   License: MIT
 */

/*jshint  -W002,browser:true, devel:true, indent:4, white:false, plusplus:false */
/*globals $, RUR, add_robot */

RUR.__edit_world.edit_world = function  () {
    RUR.__teleport_robot();
    refresh_world_edited();
};

function toggle_editing_mode () {
    $("#edit-world-panel").toggleClass("active");
    if (RUR.__editing_world) {
        window.clearInterval(RUR._interval_id);
        RUR.__editing_world = false;
        editing_world_show_others();
        RUR.__wall_color = "brown";
        RUR.__shadow_wall_color = "#f0f0f0";
        refresh_world_edited();
    } else {
        RUR.__editing_world = true;
        RUR.__wall_color = "black";
        RUR.__shadow_wall_color = "#ccd";
        refresh_world_edited();
        editing_world_hide_others();
    }
}

function refresh_world_edited () {
    RUR.__visible_world.draw_all(RUR.__current_world);
}

function editing_world_show_others(){
    $("#contents-button").removeAttr("disabled");
    $("#help-button").removeAttr("disabled");
    $("#world-panel-button").removeAttr("disabled");
    $("#output-panel-button").removeAttr("disabled");
    $("#editor-panel-button").removeAttr("disabled");
    $("#editor-panel-button").click();
    $("#run").removeAttr("disabled");
    $("#step").removeAttr("disabled");
    $("#run2").removeAttr("disabled");
    $("#step2").removeAttr("disabled");
}

function editing_world_hide_others() {
    if ($("#editor-panel-button").hasClass("active")) {
        $("#editor-panel-button").click();
    }
    $("#editor-panel-button").attr("disabled", "true");
    if ($("#output-panel-button").hasClass("active")) {
        $("#output-panel-button").click();
    }
    $("#output-panel-button").attr("disabled", "true");
    $("#world-panel-button").attr("disabled", "true");
    $("#contents-button").attr("disabled", "true");
    $("#help-button").attr("disabled", "true");

    $("#stop").attr("disabled", "true");
    $("#pause").attr("disabled", "true");
    $("#run").attr("disabled", "true");
    $("#step").attr("disabled", "true");
    $("#reload").attr("disabled", "true");
    $("#stop2").attr("disabled", "true");
    $("#pause2").attr("disabled", "true");
    $("#run2").attr("disabled", "true");
    $("#step2").attr("disabled", "true");
    $("#reload2").attr("disabled", "true"); 
}